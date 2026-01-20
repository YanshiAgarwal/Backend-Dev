console.log('Start');

setTimeout(() => {
    console.log('Inside setTimeout');
}, 0);

setImmediate(() => {
    console.log('Inside setImmediate');
});

process.nextTick(() => {
    console.log('Inside nextTick');
});

console.log('End');