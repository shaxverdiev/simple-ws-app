import WebSocket from "ws"

const server = new WebSocket.Server({port: 3000}, () => {
    console.log('webSocket server start on port 3000...')
})

server.on('connection', onConnect)  // событие которое сработает тогда когда клиен подключится к серверу

function onConnect(wsClient: any) {
    console.log('New User connected..')
    wsClient.send("hello, new User")  // отправка приветственного сообщения на клиент\

    wsClient.on('message', function(message: any) {
        //обработчик сообщения от клиента
        try {
            const jsonMessage = JSON.parse(message)
            switch (jsonMessage.action) {
                case 'ECHO':
                    console.log(jsonMessage.data)
                    wsClient.send(jsonMessage.data)
                    break;
                case 'PING':
                    setTimeout(() => {
                        wsClient.send('PONG')
                    }, 300)
                    break;
                default: 
                console.log('Неизвестная команда')
            }
        } catch (error) {
            console.log('ERROR', error)
        }
    })
    wsClient.on('close', function() {
        console.log('user DISCONNECT')
    })
}

