const { send } = require("xstate/lib/actionTypes");

const elBox = document.querySelector('#box');

// Pure function that returns the next state,
// given the current state and sent event
// function transition(state, event) {
//   switch (
//     state
//     // Add your state/event transitions here
//     // to determine and return the next state
//   ) {
//     case 'inactive':
//       switch(event){
//         case 'CLICK':
//           return 'active';
//         default:
//           return state;
//       }
//     case 'active':
//       switch(event){
//         case 'CLICK':
//           return 'inactive';
//         default:
//           return state;
//       }
//     default:
//       return state;  
//   }
// }

const machine = {
  initial:'inactive',
  states:{
    inactive:{
      on:{
        CLICK:'active',
      }
    },
    active:{
      on:{
        CLICK:'inactive',
      }
    }
  }
}

const transition = (state,event) => {
  return machine.states[state]?.on?.[event] || state;
}

// Keep track of your current state

function useMachine(machine) {
  // Determine the next value of `currentState`
  let currentState = machine.initial
  return function send(event){
    const nextState = transition(currentState,event);
    currentState = nextState;

    elBox.dataset.state = currentState;
  }
}

const SendEvent = useMachine(machine);

elBox.addEventListener('click', () => {
  // send a click event
  SendEvent('CLICK');
});
