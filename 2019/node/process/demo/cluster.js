const http = require('http');
const numCPUs = require('os').cpus().length;
const cluster = require('cluster');

if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        console.log(`fork worker ${i}`);
        cluster.fork();
    }
    cluster.on('message', (worker, message, handle) => {
        console.log(`received child(${worker.id}, ${worker.process.pid})'s message:`)
        console.log(message);
    })

    cluster.on('exit', (worker, code) => {
        console.log(`worker ${worker.process.pid} exit with code ${code}!`)
    })

    console.log(`master pid: ${process.pid}`)
    process.on('exit', code => {
        console.log(`master exit with code: ${code}`)
    })
}
else if (cluster.isWorker) {
    let server = http.createServer((req, res) => {
        setTimeout(() => {
            res.end(`Hello World From Worker ${process.pid}`);
        },3000)
    });

    server.on('error', err => {
        console.log(err);
    })

    server.on('close', () => {
        console.log(`worker ${process.pid} closed!`)
    })

    cluster.worker.on('exit', code => {
        console.log(`worker ${process.pid} exit with code ${code}!`)
    })

    server.listen(3000, () => {
        process.send('server started!');
    });
}