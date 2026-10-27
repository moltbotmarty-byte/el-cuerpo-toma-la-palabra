'use strict';
const feedback={
  '11':{
    validar:['Buen punto de partida: creer y escuchar valida la experiencia sin asumir una causa. Preguntar por el contexto puede ampliar la conversación; no reemplaza la evaluación clínica.','careful'],
    dismiss:['Que los estudios iniciales estén bien no vuelve imaginario el dolor. Es mejor reconocer lo que siente y acompañar la búsqueda de orientación profesional.','rethink'],
    cause:['Las emociones pueden influir en cómo vivimos los síntomas, pero no podemos concluir que reprimir la ira causó el SII. Evitemos convertir una posibilidad en culpa o diagnóstico.','rethink']
  },
  '12':{
    story:['Exacto: una historia nos ayuda a conocer a la persona y sus necesidades; no demuestra por qué desarrolló ELA. Una historia individual no establece causalidad.','careful'],
    cause:['Cuidar de otras personas no demuestra la causa de la ELA. Podemos escuchar ese relato sin convertir la generosidad en explicación médica.','rethink'],
    prevention:['No podemos afirmar que poner límites habría evitado la ELA. Los límites pueden apoyar el bienestar, pero no son una promesa de prevención.','rethink']
  },
  '13':{
    metaphor:['Sí: la comparación puede abrir una conversación sobre necesidades y límites, siempre que la dejemos en el terreno de la metáfora, no de la causa biológica.','careful'],
    biology:['La metáfora no describe cómo se origina una enfermedad autoinmune. Su desarrollo es complejo; no lo explica la dificultad de poner límites.','rethink'],
    blame:['Eso podría hacer sentir culpable a alguien sin fundamento. Nadie causa una enfermedad autoinmune por no defenderse emocionalmente.','rethink']
  }
};
const completed=new Set();
const count=document.querySelector('#progress-count');
const fill=document.querySelector('#progress-fill');
function updateProgress(){count.textContent=`${completed.size} de 3 estaciones exploradas`;fill.style.width=`${completed.size/3*100}%`;}
document.querySelectorAll('.activity').forEach(activity=>{
  const id=activity.dataset.station;
  const feedbackEl=activity.querySelector('.feedback');
  const retry=activity.querySelector('.retry');
  const next=document.createElement('button');
  next.type='button';next.className='continue';
  next.textContent=id==='13'?'Ver cierre del recorrido ↓':'Ir a la siguiente estación ↓';
  next.addEventListener('click',()=>{const target=id==='13'?document.querySelector('.closing'):document.querySelector(`#cap${Number(id)+1}`);target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});});
  activity.append(next);
  activity.querySelectorAll('[data-answer]').forEach(button=>button.addEventListener('click',()=>{
    const [message,kind]=feedback[id][button.dataset.answer];
    feedbackEl.textContent=message;feedbackEl.dataset.kind=kind;feedbackEl.hidden=false;
    activity.querySelectorAll('[data-answer]').forEach(option=>option.disabled=true);
    retry.hidden=false;next.hidden=false;completed.add(id);updateProgress();
  }));
  retry.addEventListener('click',()=>{activity.querySelectorAll('[data-answer]').forEach(option=>option.disabled=false);feedbackEl.hidden=true;retry.hidden=true;next.hidden=true;activity.querySelector('[data-answer]').focus();});
});
const viewer=document.createElement('dialog');viewer.setAttribute('aria-label','Vista ampliada de la ilustración');viewer.innerHTML='<button type="button" aria-label="Cerrar ilustración">Cerrar ×</button><img alt="">';document.body.append(viewer);const large=viewer.querySelector('img');viewer.querySelector('button').addEventListener('click',()=>viewer.close());viewer.addEventListener('click',e=>{if(e.target===viewer)viewer.close()});document.querySelectorAll('figure img').forEach(img=>{img.addEventListener('click',()=>{large.src=img.src;large.alt=img.alt;viewer.showModal()})});

