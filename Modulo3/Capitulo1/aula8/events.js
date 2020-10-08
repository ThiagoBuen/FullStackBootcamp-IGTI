import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

eventEmitter.on('testEvent', (obj) => {
  console.log(obj);
});

//eventEmitter.emit('testEvent', 'abc');

export default eventEmitter;
