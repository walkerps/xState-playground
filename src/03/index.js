import { createMachine, interpret } from 'xstate';

const elBox = document.querySelector('#box');

const machine = createMachine({
  // Create your state machine here
  // ...
  initial:'inactive',
  states:{
    inactive:{
      on:{
        MOUSE_DOWN:'active',
      }
    },
    active:{
      on:{
        MOUSE_UP:'inactive',
      }
    },
  }
});

// Create a service using interpret(...)
const service = interpret(machine);

// Listen to state transitions and set
// `elBox.dataset.state` to the state value as before.
// ...
service.onTransition(state => {
  elBox.dataset.state = state.value;
});

// Start the service.
// ...
service.start();

elBox.addEventListener('mousedown', (event) => {
  // Send a mousedown event
  // ...
  service.send('MOUSE_DOWN');
});

elBox.addEventListener('mouseup', (event) => {
  // Send a mouseup event
  // ...

  service.send('MOUSE_UP');
});
