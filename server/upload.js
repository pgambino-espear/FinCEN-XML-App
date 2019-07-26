const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const PromiseFtp = require('promise-ftp');
const ftp = new PromiseFtp;
const Client = require('ftp');

module.exports = function upload(req, res) {

  config = {
    host: '127.0.0.1',
    port: 21,
    user: 'testuser',
    password: 'test'
  }

  let client = new Client();

  var form = new IncomingForm();
  let readStream;
  form.on('file', (field, file) => {
    let formattedName = file.name;
    client.connect(config);
    client.on('ready', function() {
      console.log("Hello from the client!");
      console.log("file name from inside the client: ", file.name)
      console.log("Formatted name from inside the client: ",  formattedName)
      client.put(file.path, file.name, function(err) {
        if(err) throw err;
          client.end();
        })
      })

  
    console.log("File name from inside form on: ", file.name)
    console.log("Formatted name from inside form on: ", formattedName)
    console.log(file);
    console.log("File name:", file.name)
    readStream = fs.createReadStream(file.path);
  });
  form.on('end', () => {
    res.json("Hello!");
  });
  form.parse(req);
};
