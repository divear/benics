import React, { useState } from 'react'
import {IoIosPeople} from "react-icons/io"

function Input() {
    const [uname, setUname] = useState("")

    function start(){
         localStorage.setItem("username",uname)
    }

    return (
        <div>
            <title>benics</title>
            <a className="titleS" href="/"><h1><IoIosPeople/>benics</h1></a>
            
            <form onSubmit={start} className="sign" action="/game">
                <label htmlFor="i">Type in your name: </label>
                <br />
                <input onChange={e => setUname(e.target.value)} value={uname} id="i" type="text" className="inputText"/>
                <br />
                <button className="start">Start playing!!</button>
            </form>
        </div>
    )
}

export default Input;
