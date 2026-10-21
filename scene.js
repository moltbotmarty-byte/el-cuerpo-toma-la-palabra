'use strict';
const branches = {
  yes: {
    response: 'Sí, yo puedo',
    title: 'Tu «sí» también merece cuidado.',
    copy: 'Tal vez quiere hacerlo. Tal vez le cuesta dejar algo pendiente. No hace falta juzgar ese «sí». Aceptar una tarea no borra su cansancio ni la posibilidad de compartirla.',
    question: '¿Qué necesitaría para que cuidar no signifique quedarse sola con todo?'
  },
  help: {
    response: 'Hoy necesito ayuda',
    title: 'No tienes que poder con todo.',
    copy: 'Pedir ayuda puede traer alivio, incomodidad o las dos cosas a la vez. No hace falta sentirse segura para decirlo. Y si la ayuda no llega, eso no vuelve menos legítima su necesidad.',
    question: '¿Con quién podría compartir una parte de lo que hoy pesa?'
  }
};
const choices = document.querySelector('#choice-panel');
const reflection = document.querySelector('#reflection');
const heading = document.querySelector('#reflection-title');
let previous = null;
document.querySelectorAll('[data-choice]').forEach(button => {
  button.addEventListener('click', event => {
    const branch = branches[button.dataset.choice];
    previous = button;
    document.querySelector('#chosen').textContent = `Ella responde: «${branch.response}».`;
    heading.textContent = branch.title;
    document.querySelector('#reflection-copy').textContent = branch.copy;
    document.querySelector('#reflection-question').textContent = branch.question;
    choices.hidden = true;
    reflection.hidden = false;
    heading.focus({preventScroll:true});
    // Only pointer activation has a brief ink-like fade; keyboard is immediate.
    if (event.detail > 0 && !matchMedia('(prefers-reduced-motion: reduce)').matches && reflection.animate) {
      reflection.animate([{opacity:.45},{opacity:1}],{duration:180,easing:'cubic-bezier(.23,1,.32,1)'});
    }
  });
});
document.querySelector('#back').addEventListener('click', () => {
  reflection.hidden = true;
  choices.hidden = false;
  previous?.focus({preventScroll:true});
});
