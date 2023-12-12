 import {useState,useEffect} from 'react';

 
 
 const API ='http://localhost:3001';
function App() {
  const [todos,settodos]=useState([]);
  const [newTodo,setNewTodo]=useState('');
  const [popUpActive,setPopupActive]=useState(false);
   
  
  useEffect(()=>{
     GetTodo();
     console.log(todos);
  },[]);

  const GetTodo=()=>{
  fetch(  API + '/todos')
    .then(res=>res.json())
    .then(data=>settodos(data))
    .catch(err=>console.log(err));
  }

  const completeTodo = async (id) => {
		const data = await fetch(API + '/todo/complete/' + id)
    .then(res => res.json());

		settodos(todos => todos.map(todo => {
			if (todo._id === data._id) {
				todo.complete = !data.complete;
			}

			return todo;
		}));
     
     

  }


  // delete todo
  const DeleteTodo =  async (id)=>{
    const data= await fetch(API + '/todo/delete/' + id, 
    {method:"DELETE"} )
    .then(res=>res.json());
    settodos(todos => todos.filter(todo => todo._id !== data._id));
  }
// add Todo

const addTodo=async ()=>{
  const data= await fetch(API +'/todos/create',
  {method:"POST",
  headers :{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({
    text:newTodo
  })
  }).then(res=>res.json())
  settodos([...todos, data]);

  setPopupActive(false);
  setNewTodo("");
}
  
  return (
    <div className="App">
       <h1> Abdullah </h1>
       <h4>Todos List</h4>
       <div className="todos">
        {todos.map(todo=>( 
        <div className= {
           "todo " + (todo.complete ? "is-complete" : "")}
          key={todo._id} onClick={()=>completeTodo(todo._id)}>
          <div className="checkbox"></div>
          <div className="text"> {todo.text}</div>
          <div className="delete-todo" onClick={()=>DeleteTodo(todo._id)}>x</div>
        </div>
        ))}
        


         
       </div>

       <div className="addPopup" onClick={()=>setPopupActive(true)}>+</div>
       {popUpActive ? (
         <div className="popup">
          <div className="closePopup" onClick={()=>setPopupActive(false)}>X</div>
          <div className="content">
            <h3>Add Todo</h3>
            <input type="text" className=".add-todo-input" 
            onChange={e=>setNewTodo(e.target.value)} value={newTodo} />
            <div className="button" onClick={()=> addTodo()}>Cretae Todod</div>

          </div>
         </div>
          
       ): '' }
    </div>
  );
}

export default App;
