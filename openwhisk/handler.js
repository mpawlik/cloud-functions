'use strict';

var exec = require('child_process').exec;

function hello(params) {
    return new Promise((resolve, reject) => {
        const t = process.hrtime();

        const eq = 4080; // no of equations
        const leading_dimensions = 4080; // leading dimension of array

        exec(`chmod +x ${__dirname}/bin/xlinpack_xeon64` + ' && echo -e "\n\n1\n' + eq + '\n' + leading_dimensions + `\n1\n4\n" | OMP_NUM_THREADS=1 KMP_AFFINITY=disabled ${__dirname}/bin/xlinpack_xeon64`, function (error, stdout, stderr) {
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

            const resp = {
                ts: (new Date()).toString(),
                exec: {"stdout": stdout, "stderr": stderr, "error": error},
                time: [t2[0], t2[1]],
                performance: parsed_result
            };
            resolve(resp)
        });
    })
}

exports.hello = hello;

