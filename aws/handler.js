const exec = require('child_process').exec;

// process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + "/bin";


exports.hello = (event, context, callback) => {
    const t = process.hrtime();

    // console.log(process.memoryUsage());

    //~128MB od mem used
    const eq = 4080; // no of equations
    const leading_dimensions = 4080; // leading dimension of array

    exec('echo -e "\n\n1\n' + eq + '\n' + leading_dimensions + '\n1\n4\n" | ./bin/xlinpack_xeon64', function (error, stdout, stderr) {
        const t2 = process.hrtime(t);

        const lines = stdout.split('\n');
        var result_idx;
        lines.forEach((element, index) => {
            if(element.includes('Average')) {
                result_idx = index + 1;
            }
        });

        const result = lines[result_idx].split(/\s+/)[3];

        const response = {
            statusCode: 200,
            body: JSON.stringify({
                ts: (new Date()).toString(),
                exec: {"stdout": stdout, "stderr": stderr, "error": error},
                time: [t2[0], t2[1]],
                performance: parseFloat(result)
            }),
        };
        callback(null, response);
    });
};