
const status1 = document.getElementById('status')
const messages = document.getElementById('messages')
const form = <HTMLFormElement>document.getElementById('form')
const input = <HTMLInputElement>document.getElementById('input')
const button = document.getElementById('button')
const pingCheck = document.getElementById('pingCheck')


const ws = new WebSocket('ws://localhost:3000') //url сервера с которым открываем соединение



// проверка соединения
function setStatus(value: any) {
    status1!.innerHTML = value
}

//отрисовка ответа от сервера
function printMessage(value: any) {

    const li = document.createElement('li')

    li.innerHTML = value
    messages?.appendChild(li)
}

// подписываемся на события
ws.onopen = () => setStatus('ONLINE')  // когда соединение открыто
ws.onclose = () => setStatus('DISCONNECTED') // когда соединение закрыто
ws.onmessage = (response) => printMessage(response.data) // когда пришло сообщение





// функция для отправки echo-сообщений на сервер(1)
form.addEventListener('submit', (e) => {
    e.preventDefault()
    wsSendEcho(messages)
})
//(2)
function wsSendEcho(message: any) {
    message = input.value
    ws.send(JSON.stringify({action: "ECHO", data: message.toString()}))
    console.log(message) // выводим в консоль отправленное сообщение
}



// функция для отправки ping на сервер
pingCheck?.addEventListener('click', (e) => {
    e.preventDefault()
    wsSendPing()
})
function wsSendPing() {
    console.log('PING!!!!')
    ws.send(JSON.stringify({action: 'PING'}));
  }


