const express = require("express");
const app = express()
const cors = require("cors")
const pool = require("./db")


//middleware
app.use(cors());
app.use(express.json())


//ROUTES//

//create

app.post("/todos", async(req, res)=>{
    try {
        const respo = req.body
        console.log(respo);
        const newTodo = await pool.query("INSERT INTO todo (body, username, ctime, isedited, stared) VALUES($1, $2, $3, $4, $5) RETURNING *",
         [respo[0].body, respo[1].username, new Date().toLocaleString(), respo[3], false]);
        console.log(newTodo);
        res.json(newTodo.rows[0])
    } catch (error) {
        console.log(error);
    }
})

//get all

app.get("/todos", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM todo");
      res.json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
  

//get one

app.get("/todos/:id", async(req, res)=>{
    try {
        const {id} = req.params
        const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id])
        
        res.json(todo.rows[0])
    } catch (error) {
        console.log(error);
    }
})

//update 

app.put("/todos/:id", async(req, res)=>{
    try {
        const {id} = req.params
        const respo = req.body
        console.log(respo);

        if(respo[0]){
            const updateTodo = await pool.query("UPDATE todo SET body = $1, isedited = $2 WHERE id = $3", [respo[0].body, respo[1].isedited, id]);
        }else{
            const updateTodo = await pool.query("UPDATE todo SET stared = NOT stared WHERE id = $1", [id]);
            console.log(updateTodo);
        }
        res.json("todo was updated")
    } catch (error) {
        console.log(error);
    }
})

//delete

app.delete("/todos/:id", async(req, res)=>{
    try {
        const {id} = req.params
        const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1", [id]);
        res.json("Todo was deleted!")
    } catch (error) {
        console.log(error);
    }
})

const port = process.env.port || 4001

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})