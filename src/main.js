var events = require('events');
var eventEmitter = new events.EventEmitter();

States = {
  idle: 0,
  loading: 1,
  busy: 2,
}
let currentState = States.idle;

function EventStorage() {
  this.storage = [];
  this.eventStorageObj = {
    channel : String,
    args: States
  }
}

EventStorage.prototype.addToStorage = function(channel, args) {
  const obj = this.eventStorageObj;
  obj.channel = channel;
  obj.args = args;

  this.storage.push(obj);
}

EventStorage.prototype.toString = function() {
  for (const obj of this.storage) {
    console.log(obj.channel, obj,States);
  }
}
// Initialize the evebt handler on our channel
eventEmitter.on('change-state',function (state, eventStorage) {
  console.log(`I am in change state`);
  console.log(`State coming in: ${state}`);
  currentState = state
  console.log(`Now the state is  ${currentState}`);

  eventStorage.addToStorage('change-state', state);
});

run = function() {
  const eventStorage = new EventStorage();
  console.log(`App initialized current state ${currentState}`)
  eventEmitter.emit('change-state', States.loading, eventStorage);
  eventEmitter.emit('change-state', States.busy, eventStorage);

  if(currentState == States.busy) {
    console.log('I\'m Busy!');
  } else {
    console.log('hello!');
  }

  eventStorage.toString();
}


run();