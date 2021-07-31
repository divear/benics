import React from 'react'
import { useHistory } from 'react-router-dom'
import {IoIosPeople} from "react-icons/io"

function Fail() {
    var history = useHistory()
    return (
        <div className="fail">
            <title>end</title>


            <h1 className="titleS"><IoIosPeople/>benics</h1>
            

            <h1>Game over</h1>
            <h1>Score: {localStorage.getItem("score")}</h1>
            <button className="start" onClick={()=>history.push("/game")}>try again</button>

            <div className="leader">
                <h1>Leaderboards: </h1> 
                <ul>
                    <li>
                        Lukas: 200
                    </li>
                </ul>
            </div>
            
        </div>
    )
}

export default Fail
