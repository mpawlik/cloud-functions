'use strict';
// var exec = require('child_process').exec;

exports.http = (request, response) => {
  // const t = process.hrtime();
  //
  // exec('bin/hello', function(error, stdout, stderr) {
  //   const t2 = process.hrtime(t);
  //
  //   const resp = ({
  //       ts:   (new Date()).toString(),
  //       exec: {"stdout":stdout, "stderr": stderr, "error": error},
  //       time: [t2[0], t2[1]]
  //   });
  //   response.status(200).json(resp);
  // });
    response.status(200).send('hello');
};

exports.hello_256 = exports.http;

exports.event = (event, callback) => {
  callback();
};

