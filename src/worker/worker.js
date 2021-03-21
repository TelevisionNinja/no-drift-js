// default nodrift functions are nodriftzero
const {
    setNoDriftZeroInterval,
    setNoDriftZeroTimeout,
    clearNoDriftZero
} = require('../nodriftzero.js');

const { parentPort } = require('worker_threads');

// collection of IDs so that the timers can be cleared
const IDs = new Map();

// execute certain function
parentPort.on('message', vars => {
    const {
        type,
        time,
        ID
    } = vars;

    switch (type) {
        case 'interval':
            IDs.set(ID, setNoDriftZeroInterval(() => parentPort.postMessage({
                type,
                ID
            }), time));

            break;
        case 'timeout':
            IDs.set(ID, setNoDriftZeroTimeout(() => parentPort.postMessage({
                type,
                ID
            }), time));

            break;
        default:
            clearNoDriftZero(IDs.get(ID));
            IDs.delete(ID);

            break;
    }
});
