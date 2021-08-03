const express = require("express");
const app = express()
const cors = require("cors")
const pool = require("./db")


//middleware
app.use(cors());
app.use(express.json())


//ROUTES//

//create

app.post("/scores", async(req, res) => {
    try {
        const respo = req.body
        console.log(respo);
        const newTodo = await pool.query("INSERT INTO scores (username, score) VALUES($1, $2) RETURNING *", [respo[0].username, respo[1].score]);
        console.log(newTodo);
        res.json(newTodo.rows[0])
    } catch (error) {
        console.log(error);
    }
})

//get all

app.get("/scores", async(req, res) => {
    try {
        const allscores = await pool.query("SELECT * FROM scores ORDER BY score DESC");
        res.json(allscores.rows);
    } catch (err) {
        console.error(err.message);
    }
});


//get one

app.get("/scores/:name", async(req, res) => {
    try {
        const { name } = req.params
        const todo = await pool.query("SELECT * FROM scores WHERE username = $1 ORDER BY score DESC", [name])
        console.log(todo.rows);
        res.json(todo.rows)
    } catch (error) {
        console.log(error);
    }
})

//update 

app.put("/scores/:id", async(req, res) => {
    try {
        const { id } = req.params
        const respo = req.body
        console.log(respo);


        const updateTodo = await pool.query("UPDATE scores SET username = $1, score = $2 WHERE id = $3", [respo[0].username, respo[1].score, id]);
        res.json("todo was updated")
    } catch (error) {
        console.log(error);
    }
})

//delete

app.delete("/scores/:id", async(req, res) => {
    try {
        const { id } = req.params
        const deleteTodo = await pool.query("DELETE FROM scores WHERE id = $1", [id]);
        res.json("Todo was deleted!")
    } catch (error) {
        console.log(error);
    }
})

const port = process.env.port || 4001

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})