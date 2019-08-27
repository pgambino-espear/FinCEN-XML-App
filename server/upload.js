"use strict"
const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const PromiseFtp = require('promise-ftp');
const ftp = new PromiseFtp;
const Client = require('ftp');
const qs = require('querystring')

module.exports = function upload(req, res) {

  var testForm = new IncomingForm();

  const config = {
    host: 'Audreys-MacBook-Pro.local',
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
};
