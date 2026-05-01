const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

const mainSections = document.querySelectorAll('.page-section');
const mainNavLinks = document.querySelectorAll('.nav-link[data-page]');

function showPage(pageId, updateHash = true) {
  const target = document.getElementById(pageId) ? pageId : 'inicio';

  mainSections.forEach(section => {
    section.classList.toggle('active-page', section.id === target);
  });

  mainNavLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.page === target);
  });

  if (navLinks) navLinks.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (updateHash) {
    history.pushState(null, '', `#${target}`);
  }
}

mainNavLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    showPage(link.dataset.page);
  });
});

window.addEventListener('popstate', () => {
  showPage(location.hash.replace('#', '') || 'inicio', false);
});

document.addEventListener('DOMContentLoaded', () => {
  showPage(location.hash.replace('#', '') || 'inicio', false);
});

document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    button.classList.add('active');
    document.getElementById(button.dataset.tab).classList.add('active');
  });
});

const chatbot = document.getElementById('chatbot');
const chatToggle = document.getElementById('chatToggle');
const chatMinimize = document.getElementById('chatMinimize');
const chatBody = document.getElementById('chatBody');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

if (chatToggle && chatbot) chatToggle.addEventListener('click', () => chatbot.classList.toggle('minimized'));
if (chatMinimize && chatbot) chatMinimize.addEventListener('click', () => chatbot.classList.add('minimized'));

document.querySelectorAll('.quick-options button').forEach(button => {
  button.addEventListener('click', () => handleMessage(button.dataset.option));
});

if (chatForm) {
  chatForm.addEventListener('submit', event => {
    event.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;
    addMessage(message, 'user');
    handleMessage(message);
    chatInput.value = '';
  });
}

function addMessage(message, sender = 'bot') {
  const div = document.createElement('div');
  div.className = sender === 'user' ? 'user-message' : 'bot-message';
  div.innerHTML = message;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function handleMessage(message) {
  const text = String(message).toLowerCase();
  let response = '';

  if (text.includes('hola') || text.includes('buenas') || text.includes('menu') || text.includes('menú')) {
    response = `Con gusto. Indicá el número de la opción que necesitás:<br><br>
    <strong>1.</strong> Servicios disponibles<br>
    <strong>2.</strong> Experiencia en juntas de educación<br>
    <strong>3.</strong> Solicitar información<br>
    <strong>4.</strong> Hablar con un asesor`;
  } else if (text === '1' || text.includes('servicio')) {
    response = `Nuestros servicios incluyen asesoría contable mensual, registros contables, conciliaciones bancarias, presupuestos, informes para juntas, control de pagos, ordenamiento documental, capacitación y apoyo general en compras públicas.`;
  } else if (text === '2' || text.includes('experiencia')) {
    response = `Contamos con experiencia en sector público, juntas de educación, revisión presupuestaria, manejo de SICOP, informes mensuales, apertura de cuentas bancarias y control documental.`;
  } else if (text === '3' || text.includes('información') || text.includes('informacion')) {
    response = `Podés solicitar información sobre nuestros servicios escribiendo al correo <strong>blconsultoresoficial@gmail.com</strong> o mediante WhatsApp al <strong>+506 7048-6880</strong>.`;
  } else if (text === '4' || text.includes('asesor') || text.includes('whatsapp') || text.includes('contactar')) {
    response = `Claro, podés comunicarte con nosotros por WhatsApp o correo electrónico:<div class="chat-actions"><a href="https://wa.me/50670486880" target="_blank" rel="noopener">Enviar WhatsApp</a><a href="mailto:blconsultoresoficial@gmail.com">Enviar correo</a></div>`;
  } else {
    response = `Gracias por escribirnos. Para ayudarte mejor, seleccioná una opción:<br><br>
    <strong>1.</strong> Servicios disponibles<br>
    <strong>2.</strong> Experiencia en juntas de educación<br>
    <strong>3.</strong> Solicitar información<br>
    <strong>4.</strong> Hablar con un asesor`;
  }

  setTimeout(() => addMessage(response, 'bot'), 300);
}
