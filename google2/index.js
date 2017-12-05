'use strict';
var exec = require('child_process').exec;

exports.http = (request, response) => {
    const t = process.hrtime();

    //~128MB od mem used
    const eq = 4080; // no of equations
    const leading_dimensions = 4080; // leading dimension of array

    exec('echo -e "\n\n1\n' + eq + '\n' + leading_dimensions + '\n1\n4\n" | KMP_AFFINITY=disabled ./bin/xlinpack_xeon64', function (error, stdout, stderr) {
        const t2 = process.hrtime(t);

        const lines = stdout.split('\n');
        var result_idx;
        lines.forEach((element, index) => {
            if (element.includes('Average')) {
                result_idx = index + 1;
            }
        });
        // console.log('stdout');
        // console.log(stdout);
        // console.log('stderr');
        // console.log(stderr);

        // console.log('error');
        // console.log(error);

        let parsed_result = '-1';
        if (result_idx != undefined) {
            parsed_result = parseFloat(lines[result_idx].split(/\s+/)[3]);
        }

        const resp = ({
            ts: (new Date()).toString(),
            exec: {"stdout": stdout, "stderr": stderr, "error": error},
            time: [t2[0], t2[1]],
            performance: parsed_result
        });
        response.status(200).json(resp);
    });
};

exports.hello_256 = exports.http;

exports.event = (event, callback) => {
    callback();
};

