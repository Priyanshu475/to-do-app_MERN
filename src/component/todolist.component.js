import { useState, useEffect } from 'react';


const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    // abort controller
    const abortCont = new AbortController(); // this is used to stop the fetching of data when we switch the page


    setTimeout(() => {
      fetch(url,{signal: abortCont.signal})
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch(err => {
        // auto catches network / connection error
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        }
        setIsPending(false);
        setError(err.message);
      })
    }, 1000);

    return () => abortCont.abort(); // cleanup function

  }, [url])

  return { data, isPending, error };
}


const Deletefunction=((id) => {
  console.log(id)
  fetch('http://localhost:3000/to-do/'+id,{
      method:'DELETE'}).then(()=>{
        window.location.reload();
      })
      .catch(err => {
        console.log(err)
      })
    })



const BlogList = ({ blogs }) => {
  return (
    <div>
	<section class="todo" id="todo">
		<h2 class="todo__title">TO-DO-List</h2>
		<ul class="todo__list">
    {blogs.map(blog => (
    <div className="abc">
			<li class="todo__list-item">
				<span class="todo__list-item-text">{blog.title}</span>
				<button type="button" class="todo__list-item-trash" aria-label="delete list item" onClick={()=>Deletefunction(blog._id)}>
					<i class="todo__list-item-trash-icon fas fa-trash-alt"></i>
				</button>
			</li>
			<li class="todo__list-item">
      <span class="todo__list-item-text-1">{blog.description}</span>
      <span class="todo__list-item-text">{blog.date.slice(0,10)}</span>
			</li>
      </div>
    ))}
		</ul>
	</section>

 
  </div>
  );
}


const Home = () => {
  const { error, isPending, data: blogs } = useFetch('http://localhost:3000/to-do')
  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { blogs && <BlogList blogs={blogs} /> }
    </div>
  );
}
 
export default Home;

