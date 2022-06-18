import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {w3cwebsocket as W3CWebSocket} from "websocket";

const Chat = (props) =>{
    let {channelId,userName} = useParams();
    const client = useRef(undefined);
    const historyRef = useRef("");
    const [history, setHistory] = useState('');
    const [msg,setMsg] = useState('');

    useEffect( ()=> {
        client.current = new W3CWebSocket("ws://localhost:8081/chatserver/" + channelId);

        client.current.onmessage = (msg) => {
            historyRef.current = historyRef.current + msg.data + "\n";
            setHistory(historyRef.current)
        };
    },[])

    const handleSendMessage = () => {
        client.current.send(userName+": "+msg);
        setMsg("");
    }

    return(
        <div className="chat-container">
            <div> <textarea value={history} readOnly /> </div>
            <div>
                <input type={"text"}
                       value={msg}
                       onChange={e=>{
                    setMsg(e.target.value)
                    }}/>
                <input type={"button"} value={"Send Message"} onClick={handleSendMessage} />
            </div>
        </div>
    )
}

export default Chat;