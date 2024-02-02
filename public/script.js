const botaoEnviar = document.getElementById('enviar');
const caixaMensagem = document.getElementById('texto');
const chat = document.getElementById('mensagens');

const socket = io();
botaoEnviar.addEventListener('click', () => {
  if (caixaMensagem.value !== '') {
    socket.emit('nova mensagem', caixaMensagem.value);
    caixaMensagem.value = '';
    caixaMensagem.focus()
  }
});
socket.addEventListener('nova mensagem', (msg) => {
  const horaAtual = getFormattedTime();

  const divMensagem = document.createElement('div'); //<li></li>
  const elementoMensagem = document.createElement('span'); //<li></li>
  const horario = document.createElement('span'); //<li></li>

  horario.textContent = horaAtual;
  elementoMensagem.textContent = msg;
  divMensagem.appendChild(elementoMensagem);
  divMensagem.appendChild(horario);
  horario.classList.add('horario');
  divMensagem.classList.add('mensagem');
  chat.appendChild(divMensagem);
});

function getFormattedTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

