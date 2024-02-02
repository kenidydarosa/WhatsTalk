const http = require('http');
const express = require('express');
const app = express();
const servidorHttp = http.createServer(app); //cria o servidor
const io = require('socket.io')(servidorHttp); //Pega as funcionalidades e entrega para o servidor
//socket é um canal de comunicação que faz todos os usuarios que entram acessam a porta recebam as notificações

io.addListener('connection', (socket) => {
  console.log('Um usuário conectou');
  socket.addListener('nova mensagem', (msg) => {
    io.emit('nova mensagem', msg);
  });
});

app.use(express.static('public')); //Entrega todos os arquivos que estão na pasta public para o servidor
servidorHttp.listen(1000, '192.168.1.6'); //  cria a porta
