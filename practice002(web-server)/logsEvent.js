const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');
const { v4: uuid } = require('uuid');
const { format } = require('date-fns');

const logEvents = async (message) => {
  const dateTime = `${format(new Date(), 'yyy-MM-dd\tHH:mm:ss')} ${uuid()}`;
  console.log(dateTime);
  const logItem = `${dateTime} ${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, 'logs'))) {
      fs.mkdirSync(path.join(__dirname, 'logs'));
    }

    await fsPromise.appendFile(
      path.join(__dirname, 'logs', 'textLogs.txt'),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = logEvents;
