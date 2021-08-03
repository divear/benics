import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {IoIosPeople} from "react-icons/io"

function Fail() {
    const [data, setData] = useState("")
    var place = 0
    var place1 = 0
    
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

            <div className="pers">
                <h1>Your scores: </h1>
                <table>
                        <thead>
                            <th>place</th>
                            <th>name</th>
                            <th>score</th>
                        </thead>
                        <tbody>
                            {data && data.map(d => {
                                place1++
                                return(
                                        <tr>
                                            <td>{place1}.</td>
                                            <td>{d.username}</td>
                                            <td>{d.score}</td>
                                        </tr>
                                )
                            })}
                        </tbody>

                </table>
            </div>            
            

            <h1>Game over</h1>
            <h1>Score: {localStorage.getItem("score")}</h1>
            <button className="start" onClick={()=>history.push("/game")}>try again</button>

            <div className="leader">
                <h1>Leaderboards: </h1> 
                <table>
                    <thead>
                        <th>place</th>
                        <th>name</th>
                        <th>score</th>
                    </thead>
                    <tbody>
                        {data && data.map(d => {
                            place++
                            return(
                                    <tr>
                                        <td>{place}.</td>
                                        <td>{d.username}</td>
                                        <td>{d.score}</td>
                                    </tr>
                            )
                        })}
                    </tbody>

                </table>
            </div>
            
        </div>
    )
}

export default Fail
