import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

function Game() {
    const [score, setScore] = useState(0)
    var history = useHistory()
    function submit(){
        history.push("/")
    }
    var mousePos  = {
        x: 500,
        y: 500
    };
    var fr = 0
    var rand = Math.random()*1350;
    var speed = 3
    
  
    const canvasRef = useRef(null)
  
    const draw = (ctx, fr) => {
        
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(rand, fr*speed, 20, 0, 2*Math.PI)
      ctx.fill()
      speed+=0.01

      ctx.fillRect(mousePos.x, 450, 100, 20)

      if(rand < mousePos.x){
          return
      }else if(rand > mousePos.x + 100){
        return
      }else if(fr < 100){
        return
      }else if(fr > 130){
          localStorage.setItem("score", score)
        history.push("/fail")
      }
      else{
        setScore(score + 1)
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      }

    }
    
    useEffect(() => {
      
      const canvas = canvasRef.current
      canvas.width = 1350
      canvas.height = 525
      const context = canvas.getContext('2d')
      let frameCount = 0
      let animationFrameId
      

      const render = () => {
        frameCount++

        fr = frameCount

        
        draw(context, fr)
        animationFrameId = window.requestAnimationFrame(render)
      }
      render()
      
      return () => {
        window.cancelAnimationFrame(animationFrameId)
      }
    }, [draw])

    function move(e){
        mousePos = {
            x: e.pageX,
            y: e.pageY
        };
    }

    return (
        <div>
            <form onSubmit={submit}>
                <button className="quit">Quit</button>
                <h1 className="name">{localStorage.getItem("username") ? localStorage.getItem("username") : submit()}</h1>
                <h1 className="score">Score: {score}</h1>
            </form>
            <canvas onMouseMove={e => move(e)} className="canvas" ref={canvasRef}/>
        </div>
    )
}

export default Game
