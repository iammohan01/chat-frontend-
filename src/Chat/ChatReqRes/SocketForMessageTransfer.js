

export let socketForMessageTransfer = new WebSocket(`ws://localhost:8080/demo2_war_exploded/chat/${localStorage.getItem("uid")}`)
// let socketForMessageTransfer = new WebSocket(`ws://${end}/demo2_war_exploded/chat/${localStorage.getItem("uid")}`))
socketForMessageTransfer.onopen = ()=>{
    console.log("socket opened");
    alert('connection open')
}
socketForMessageTransfer.onclose =()=>{
    alert('Connection closed')
}


export function sendMessage(data){
    alert('message sent')
       socketForMessageTransfer.send(data)
}