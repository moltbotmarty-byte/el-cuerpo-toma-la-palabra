'use strict';
const notes = {
  tiempo: '«Déjame revisarlo y te respondo.» Pedir tiempo puede abrir un pequeño espacio. No hace falta resolverlo todo en el momento.',
  compartir: '«¿Qué parte podríamos repartir?» Compartir una tarea necesita acuerdos y apoyo real, no solo buena voluntad.',
  pasar: 'Escuchar en silencio también es participar. No le debes a nadie una explicación ni una historia personal.'
};
document.querySelectorAll('[data-note]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-note]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelector('#takeaway').textContent = notes[button.dataset.note];
  });
});
// Native details work by keyboard and without JavaScript. Open for print only.
let previouslyOpen = [];
addEventListener('beforeprint', () => {
  previouslyOpen = [...document.querySelectorAll('details')].filter(item => item.open);
  document.querySelectorAll('details').forEach(item => { item.open = true; });
});
addEventListener('afterprint', () => {
  document.querySelectorAll('details').forEach(item => { item.open = previouslyOpen.includes(item); });
});
