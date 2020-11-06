import { createMachine, assign, interpret } from 'xstate';

const elBox = document.querySelector('#box');
const elBody = document.body;

const machine = createMachine({
  initial: 'idle',
  // Set the initial context
  // Clue: {
  //   x: 0,
  //   y: 0,
  //   dx: 0,
  //   dy: 0,
  //   px: 0,
  //   py: 0,
  // }
  context:{
    x:0,
    y:0,
    px:0,
    py:0,
    dx:0,
    dy:0
  },
  states: {
    idle: {
      on: {
        mousedown: {
          actions:assign({
            px: (_,event) => event.clientX,
            py: (_,event) => event.clientY
          }),
          target: 'dragging',
        },
      },
    },
    dragging: {
      on: {
        mousemove: {
          // Assign the delta
          // ...
          // (no target!)
          actions:assign({
            dx: (context,event) => {
              return event.clientX - context.px;
            },
            dy:(context,event) => {
              return event.clientY - context.py;
            } 
          })
        },
        mouseup: {
          // Assign the position
          actions: assign({
            x : (context,_) => context.x + context.dx,
            y: (context,_) => context.y + context.dy,
            dx:0,
            dy:0,
            px:0,
            py:0,
          }),
          target: 'idle',
        },
      },
    },
  },
});

const service = interpret(machine);

service.onTransition((state) => {
  if (state.changed) {
    console.log(state.context);

    elBox.dataset.state = state.value;

    elBox.style.setProperty('--dx', state.context.dx);
    elBox.style.setProperty('--dy', state.context.dy);
    elBox.style.setProperty('--x', state.context.x);
    elBox.style.setProperty('--y', state.context.y);
  }
});

service.start();

// Add event listeners for:
// - mousedown on elBox
elBox.addEventListener('mousedown',service.send);
// - mousemove on elBody
elBody.addEventListener('mousemove',service.send);
// - mouseup on elBody
elBody.addEventListener('mouseup',service.send);
