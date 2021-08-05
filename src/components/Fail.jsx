import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {IoIosPeople} from "react-icons/io"

function Fail() {
    const [data, setData] = useState(null)
    const [dataP, setDataP] = useState()
    var score = parseInt(localStorage.getItem("score")) + 1
    var place = 0
    var place1 = 0
    const [best, setBest] = useState(null)
    const [done, setDone] = useState(false)
    const [isAsc, setIsAsc] = useState(false)


    
    
    useEffect(()=>{
        getTodos()
        getTodosP()
    },[])

    async function getTodos(){
        try {
            const response = await fetch("http://localhost:4001/scores");
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.log(error);
        }
    }

    
    async function getTodosP(){
        try {
            const response = await fetch(`http://localhost:4001/scores/${localStorage.getItem("username")}`);
            const jsonData = await response.json();
            setDataP(jsonData && jsonData);
        } catch (error) {
            console.log(error);
        }
    }

    function changeSort(){
        setData(data.reverse());

        setIsAsc(!isAsc)
    }
    
    var history = useHistory()
    return (

        <div className="fail">
            <title>end</title>

            <a className="titleS" href="/"><h1><IoIosPeople/>benics</h1></a>

            <div className="pers">
                <h1>Your scores: </h1>
                <table>
                        <thead>
                            <tr>
                                <th>place</th>
                                <th>name</th>
                                <th>score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataP && dataP.map(d => {
                                if(!done){
                                    setDone(true)
                                    setBest(dataP[0].score);
                                }
                                place1++
                                return(
                                        <tr key={d.id}>
                                            <td>{place1}.</td>
                                            <td>{d.username}</td>
                                            <td>{d.score}</td>
                                        </tr>
                                )
                            })}
                        </tbody>

                </table>
            </div>            
            
            <h1 className="persbest">{best && score >= best ? "Personal best!!" : ""}</h1>
            <h1>Game over</h1>
            <h1>Score: {score}</h1>
            <button className="start" onClick={()=>history.push("/game")}>try again</button>

            <div className="leader">
                <h1>Leaderboards: </h1> 

                <label htmlFor="select">Sort by: </label>
                <button className="select" onClick={changeSort} id="select">{isAsc ? "worst" : "best"}</button>

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
                                    <tr key={d.id}>
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
