import React, { useEffect, useRef, useState } from 'react'

function Game() {
    var frameCount = 0
    var [score, setScore] = useState(0)
    function submit(){
        window.location = "/"
    }
    var mousePos  = {
        x: 500,
        y: 500
    };
    var fr = 0
    var rand = Math.random() * window.innerWidth;
    const [speed, setSpeed] = useState(3)
    console.log("b");
    
  
    const canvasRef = useRef(null)
  
    const draw = (ctx, fr) => {
        
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.fillStyle = '#ffffff'
      
      ctx.beginPath()
      ctx.arc(rand, fr*speed, 20, 0, 2*Math.PI)
      ctx.fill()
    
      

      ctx.fillRect(mousePos.x, mousePos.y, 100, 20)

      if(rand > mousePos.x && rand < mousePos.x + 100){
        
        //if he catches the ball
        if(fr < 5){
          rand = Math.random() * window.innerWidth
        }
        fr = 0
        frameCount = 0
        setScore(score + 1)
        localStorage.setItem("score", score);
      }

    }
    
    useEffect(() => {
      
      const canvas = canvasRef.current
      canvas.width = window.innerWidth - 50
      canvas.height = window.innerHeight - 60
      const context = canvas.getContext('2d')
      frameCount = 0
      let animationFrameId
      let myVar = setInterval(end,10000)
      

      const render = () => {
        frameCount++
        fr = frameCount

        if(fr > 150){
          reset()
          return
        }
       

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
    function reset(){
      fr = 0
      frameCount = 0
      rand = Math.random() * window.innerWidth       
    }
    function end(){
      localStorage.getItem("score")
      window.location = "fail"
    }

    return (
        <div>
          <title>Game</title>
            <form onSubmit={()=>submit}>
                <button className="quit">Quit</button>
                <h1 className="name">{localStorage.getItem("username") ? localStorage.getItem("username") : submit()}</h1>
                <h1 className="score">Score: {score}</h1>
            </form>
            <canvas onClick={reset} onMouseMove={(e) => move(e)} className="canvas" ref={canvasRef}/>
        </div>
    )
}

export default Game;
