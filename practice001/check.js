// const person = {
//   name: 'Sani',
//   age: 15,
//   city: 'New York',
// };
// const city = {
//   name: 'New York',
//   age: 20,
//   country: 'Us',
// };

// module.exports = { person, city };

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const logEvent = async (message) => {
  const dateTime = `${format(new Date(), 'yyy-MM-dd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n\n`;
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, 'log'))) {
      fs.mkdirSync(path.join(__dirname, 'log'));
    }
    await fsPromises.appendFile(
      path.join(__dirname, 'log', 'logTextItems.txt'),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = logEvent;
