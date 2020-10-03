const fs = require('fs');
const crypto = require('crypto');

process.env.UV_THREADPOOL_SIZE = 4; // initialising the amount of threads

const start = Date.now();
setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile('text-file.txt', () => {
    console.log("I/O finished.");
    console.log("------------------");

    // below instructions inside callback function
    setTimeout(() => console.log("Timer 2 finished"), 0);
    setTimeout(() => console.log("Timer 3 finished"), 3000); // take 3 sec to complete execution
    setImmediate(() => console.log("Immediate 2 finished"));

    process.nextTick(() => {
        console.log("Process.nextTick()"); // will get executed before loop completion hence before setImmediate()
    });

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password encrypted");
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password encrypted");
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password encrypted");
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password encrypted");
    });

    // below function would take larger execution time since thread size is 4

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password encrypted");
    });

    // using crypto.pbkdf2Sync() doesn't require callbacks but what it does is it executes sync manner
    // due to which large execution time is consumed

});

console.log("Hello from the top level code");


