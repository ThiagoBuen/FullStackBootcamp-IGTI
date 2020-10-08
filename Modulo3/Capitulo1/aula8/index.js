import eve from './events.js';

eve.on('testEvent', () => {
  console.log('echo');
});
eve.emit('testEvent', 'teste export');
