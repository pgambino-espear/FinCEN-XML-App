const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');

module.exports = function upload(req, res) {
  var form = new IncomingForm();
  let readStream;
  form.on('file', (field, file) => {
    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path
    
    console.log(file);
    console.log("FILE NAME:", file.name)
    console.log("Hello!")
    readStream = fs.createReadStream(file.path);
  });
  form.on('end', () => {
    res.json();
  });
  form.parse(req);
};
