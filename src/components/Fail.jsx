import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {IoIosPeople} from "react-icons/io"

function Fail() {
    const [data, setData] = useState("")
    
    useEffect(()=>{
        async function getTodos(){
            try {
                const response = await fetch("http://localhost:4001/scores");
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.log(error);
            }
        }
        getTodos()
    },[])
    
    var history = useHistory()
    return (
        <div className="fail">
            <title>end</title>


            <a className="titleS" href="/"><h1><IoIosPeople/>benics</h1></a>
            

            <h1>Game over</h1>
            <h1>Score: {localStorage.getItem("score")}</h1>
            <button className="start" onClick={()=>history.push("/game")}>try again</button>

            <div className="leader">
                <h1>Leaderboards: </h1> 
                <ol>
                    {data && data.map(d => {
                        return(
                            <li>
                                {d.username}: {d.score}
                            </li>
                        )
                    })}
                    
                </ol>
            </div>
            
        </div>
    )
}

export default Fail
