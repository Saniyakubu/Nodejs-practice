const http = require('http');
const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');

const logEvents = require('./logsEvent');

const MyEmitter = require('events');

class Emitter extends MyEmitter {}

const myEmitter = new Emitter();

// const PORT = 3500;
// console.log(PORT);

const serveFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromise.readFile(
      filePath,
      !contentType.includes('image') ? 'utf8' : ''
    );
    const data =
      contentType === 'application/json' ? JSON.parse(rawData) : rawData;
    response.writeHead(filePath.includes('404.html') ? 404 : 200, {
      'Content-Type': contentType,
    });
    response.end(
      contentType === 'application/json' ? JSON.stringify(data) : data
    );
  } catch (err) {
    console.log(err);
    myEmitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt');
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(req.method);
  const extension = path.extname(req.url);
  console.log(extension, 'ext');

  let contentType;

  switch (extension) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.txt':
      contentType = 'text/plain';
      break;
    default:
      contentType = 'text/html';
  }

  let filePath =
    contentType === 'text/html' && req.url === '/'
      ? path.join(__dirname, 'views', 'index.html')
      : contentType === 'text/html' && req.url.slice(-1) === '/'
      ? path.join(__dirname, 'views', req.url, 'index.html')
      : contentType === 'text/html'
      ? path.join(__dirname, 'views', req.url)
      : path.join(__dirname, req.url);

  if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    serveFile(filePath, contentType, res);
  } else {
    switch (path.parse(filePath).base) {
      case 'old-page.html':
        res.writeHead(301, { Location: '/new-page.html' });
        res.end();
        break;
      case 'www-page.html':
        res.writeHead(301, { Location: '/' });
        res.end();
        break;
      default:
        serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
    }
  }
});

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

// myEmitter.on('log', (msg) => logEvents(msg));

// myEmitter.emit('log', 'log Event Emitted....');
