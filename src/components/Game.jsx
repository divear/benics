import React from 'react'
import { useHistory } from 'react-router-dom'

function Game() {

    var history = useHistory()

    function submit(){
        history.push("/")
    }

    return (
        <div>
            <form onSubmit={submit}>
                <button className="quit">Quit</button>
                <h1 className="name">{localStorage.getItem("username") ? localStorage.getItem("username") : submit()}</h1>
            </form>
            <h1>game</h1>
        </div>
    )
}

export default Game
