const socket = io()

let user
let chatBox = document.getElementById("chatbox")


Swal.fire({
    title: 'Identificate',
    input: 'text',
    text: 'Ingresar usuario',
    inputValidator: value => {
        return !value && 'Necesitas escribir un nombre de usuario para continuar'
    },
    allowOutsideClick: false
}).then(result=>{
    user = result.value
    socket.emit('authenticated', user)
})


const handleSocket = (e) => {
    if (e.key === 'Enter') {
        if (chatBox.value.trim().lenght > 0 || chatBox.value.trim().lenght === undefined) {
            socket.emit('message', {
                user,
                message: chatBox.value
            })
            chatBox.value = ''
        }
    }
}

chatBox.addEventListener('keyup', handleSocket)

socket.on('messageLog', data=>{
    let log = document.getElementById("messageLog")
    let messages = ''
    data.forEach(mes => {
        messages+= `<li>${mes.user} dice: ${mes.message}</li><br>`
    });
    log.innerHTML = messages
})

socket.on('newUserConnected', data =>{
    console.log(data);
    console.log(user);
    if(!user) return
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        title: `${data} se ha unido al chat`,
        icon: success
    })
})