'use strict';

module.exports.terminator = (sig, processName) => {
    if (typeof sig === 'string') {
        console.log('%s: Received %s - Terminating ' + processName + '...', Date(Date.now()), sig);
        process.exit(1);
    }

    console.log('%s: ' + processName + ' Stopped', Date(Date.now()));
};

module.exports.setupTerminationHandlers = (processName) => {
    var self = this;

    process.on('exit', () => {
        self.terminator(undefined, processName);
    });

    ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
        'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
    ].forEach((element) => {
        process.on(element, () => {
            self.terminator(element, processName);
        });
    });
};

module.exports.setupUncaughtException = () => {
    process.on('uncaughtException', (err) => {
        console.log(new Date().toString(), err.stack || err);
        process.kill(process.pid, 'SIGKILL');
    });
};
