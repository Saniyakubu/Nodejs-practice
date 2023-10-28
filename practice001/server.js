// console.log('Hello World');

// console.log(globalThis);

// const os = require('os');
// const path = require('path');

// const { person, city } = require('./check');

// person.language = 'Hausa';

// console.log(person, city);
// console.log(os.type());
// console.log(os.tmpdir());
// console.log(os.homedir());
// console.log(os.version());

// console.log(__dirname);
// console.log(__filename);

// console.log(path);

// console.log(path.dirname(__filename));
// console.log(path.dirname(__dirname));
// console.log(path.basename(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__dirname));
// console.log(path.extname(__filename));
// console.log(path.parse(__filename));

// const fs = require('fs').promises;
// const path = require('path');
// // console.log(path.join(__dirname, 'newFile', 'text.txt'));

// const files = async () => {
//   try {
//     const read = await fs.readFile(
//       path.join(__dirname, 'newFile', 'text.txt'),
//       'utf8'
//     );
//     await fs.writeFile(
//       path.join(__dirname, 'newFile', 'newText.txt'),
//       'this is async text' + ' ' + read
//     );

//     await fs.appendFile(
//       path.join(__dirname, 'newFile', 'newText.txt'),
//       '\n\n edited New text'
//     );

//     await fs.rename(
//       path.join(__dirname, 'newFile', 'newText.txt'),
//       path.join(__dirname, 'newFile', 'newText01.txt')
//     );

//     const read2 = await fs.readFile(
//       path.join(__dirname, 'newFile', 'newText01.txt'),
//       'utf8'
//     );
//     await fs.unlink(path.join(__dirname, 'newFile', 'text.txt'));
//     console.log(read2);
//   } catch (error) {}
// };
// files();

// fs.readFile(
//   path.join(__dirname, 'newFile', 'text.txt'),
//   'utf8',
//   (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   }
// );

// fs.writeFile(
//   path.join(__dirname, 'newFile', 'newText.txt'),
//   'this is new text',
//   (err) => {
//     if (err) throw err;
//     console.log('completed..');

//     fs.appendFile(
//       path.join(__dirname, 'newFile', 'newText.txt'),
//       '\n\nnew text appended',
//       (err) => {
//         if (err) throw err;
//         console.log('append complete..');
//         fs.rename(
//           path.join(__dirname, 'newFile', 'newText.txt'),
//           path.join(__dirname, 'newFile', 'newRenameFile.txt'),
//           (err) => {
//             if (err) throw err;
//             console.log('Rename complete..');
//           }
//         );
//       }
//     );
//   }
// );

// console.log('Hello..');

// process.on('uncaughtException', (err) => {
//   console.error(`this is error handling: ${err}`);
//   process.exit(1);
// });

// const path = require('path');

// const rs = fs.createReadStream(path.join(__dirname, 'newFile', 'lorem.txt'), {
//   encoding: 'utf8',
// });

// const ws = fs.createWriteStream(path.join(__dirname, 'newFile', 'lorem2.txt'));

// rs.pipe(ws);

// fs.mkdir('./new', (err) => {
//   if (err) throw err;
// });

// if (fs.existsSync) {
//   fs.rmdir('./new', (err) => {
//     if (err) throw err;
//   });
// }

const logEvent = require('./check.js');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

// initialize object

const myEmitter = new MyEmitter();

myEmitter.on('log', (msg) => logEvent(msg));

setTimeout(() => {
  myEmitter.emit(
    'log',
    'logEvent Emitted...' + '  ' + Math.floor(Math.random() * 10 + 1)
  );
}, 2000);

const os = require('os');
console.log(os.platform());
