import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState(``);
  const [description, setDescription] = useState(``);
  const [date, setDate] = useState(``);
  const [isPending,setIsPending]=useState(false);
  const history=useHistory();


  const handleSubmit=(e)=>{
    e.preventDefault()
    const blog={title,description,date};
    setIsPending(true);
    fetch('http://localhost:3000/to-do/create',{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(blog)
    }).then(()=>{
        setIsPending(false)
        history.push('/')
        })
  }

  
  return (
    <div>
    <div>
    <form on onSubmit={handleSubmit}>
    <label><h2>Add a new Task</h2></label>
    <br></br>
		<label>Task:</label><input name="name" placeholder="What is your task?" class="name" required type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
		<label>Date</label><DatePicker  placeholderText={date} className="email"  onChange={(date) => setDate(date)}  />
    <label>Description:</label><textarea rows="4" cols="50" name="subject" placeholder="Please enter the description" class="message" required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
    <br></br>
    {! isPending && <button >Add Blog</button>}
    {isPending && <button disabled >Adding Blog..</button>}
</form>
    </div>
    </div>
    
  );
};

export default Create;

