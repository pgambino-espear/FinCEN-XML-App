const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const PromiseFtp = require('promise-ftp');
const ftp = new PromiseFtp;
const Client = require('ftp');
const qs = require('querystring')

module.exports = function upload(req, res) {

  var testForm = new IncomingForm();

  // if (req.body != null) {
  //   console.log(req)
  //   res.status(200).json(req.body)
  // }
  // let body = '';
  // req.on('data', data => {
  //   console.log("Data to string: ", data.toString());
  //   body += data;
  //   // console.log(req)
  // })

  // req.on('end', function () {
  //   let post = qs.parse(body);
  //   // console.log("Post body: ", post);
  //   console.log(post);
  //   res.end();
  // });

  config = {
    host: 'localhost',
    port: 21,
    user: 'audreykreiser',
    password: '1344'
  }
  let body = "";
  req.on('data', data => {
    // console.log(req.body)
    // console.log(data.toString());
    body += data.toString();
  })

  req.on('end', () => {
    let client = new Client();
    client.connect(config);
    const formattedName = req.headers['content-disposition'];
    // console.log(body);

    // console.log(data.toString());
    let pattern = /<\?xml[\s\S.]*<\/fc2:EFilingBatchXML>/i;
    let result = body.match(pattern);
    // console.log(result[0]);

    client.on('ready', () => {
      console.log("Hello from the client!")
      // console.log("File name: ", formattedName);
      client.put(result[0], formattedName, function (error) {
        if (error) throw error;
        client.end();
      })
      res.end();
    })
  })

  // config = {
  //   host: '127.0.0.1',
  //   port: 21,
  //   user: 'testuser',
  //   password: 'test'
  // }

  // let client = new Client();

  // var form = new IncomingForm();
  // let readStream;
  // form.on('file', (field, file) => {
  //   //   let formattedName = file.name;
  //   //   // client.connect(config);
  //   //   // client.on('ready', function() {
  //   //   //   // console.log("Hello from the client!");
  //   //   //   // console.log("file name from inside the client: ", file.name)
  //   //   //   // console.log("Formatted name from inside the client: ",  formattedName)
  //   //   //   client.put(file.path, file.name, function(err) {
  //   //   //     if(err) throw err;
  //   //   //       client.end();
  //   //   //     })
  //   //   //   })


  //   console.log("File name from inside form on: ", file.name)
  //   // console.log("Formatted name from inside form on: ", formattedName)
  //   console.log(file);
  //   console.log("File name:", file.name)
  //   readStream = fs.createReadStream(file.path);
  // });
  // form.on('end', () => {
  //   res.json("Hello!");
  // });
  // form.parse(req);
};
