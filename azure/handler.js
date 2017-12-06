'use strict';
var exec = require('child_process').exec;

module.exports.hello = function (context, req) {
    const t = process.hrtime();

    //~128MB od mem used
    const eq = 4080; // no of equations
    const leading_dimensions = 4080; // leading dimension of array

    // exec("dir " + __dirname, function(error, stdout, stderr) {
    exec(__dirname + "\\linpack_xeon64.exe -i " + __dirname + "\\lininput.txt", function (error, stdout, stderr) {
        const t2 = process.hrtime(t);

        const lines = stdout.split('\n');
        var result_idx;
        lines.forEach((element, index) => {
            if (element.includes('Average')) {
                result_idx = index + 1;
            }
        });

        let parsed_result = '-1';
        if (result_idx != undefined) {
            parsed_result = parseFloat(lines[result_idx].split(/\s+/)[3]);
        }

        const response = {
            ts: (new Date()).toString(),
            exec: {"stdout": stdout, "stderr": stderr, "error": error},
            time: [t2[0], t2[1]],
            performance: parsed_result
        };
        context.done(null, {body: response});
    });
};


