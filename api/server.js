const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const Todo=require('./models/Todo');

const app=express();

app.use(express.json());

app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/todo-list", {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })

  .then(() => {
    console.log("mongo Connection open");
  })

  .catch((err) => {
    console.log(err);
  });
app.get('/',(req,res)=>{
    res.send('Abdullah');
})

// get all todos
app.get('/todos',async(req,res)=>{
    const todos= await Todo.find();
    res.json(todos);
})

// create a new todo
app.post('/todos/create',(req,res)=>{
   const todo=new Todo({
    text:req.body.text
   })
   todo.save()
   res.json(todo);

})
// Delete Todo
app.delete('/todo/delete/:id',async (req,res)=>{
   const id=req.params.id;

    const result=  await Todo.findByIdAndDelete(id);
    res.json(result);
})


// Update todo  status

app.get('/todo/complete/:id',async (req,res)=>{
    const id=req.params.id;
   // const updatedTodo=req.body;
    

    const todo=await Todo.findByIdAndUpdate(id);

    todo.complete = !todo.complete;
    todo.save();

    res.json(todo);
    

     

})

app.listen(3001,(req,res)=>{
    console.log('Server listening on 3001');
})