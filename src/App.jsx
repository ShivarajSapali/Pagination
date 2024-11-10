import { useEffect, useState } from 'react'
import { Posts } from './posts'
import Pagination from './pagination';
import "./App.css";
function App() {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false) 
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] =useState(10)

  const url = "https://jsonplaceholder.typicode.com/posts" 

  useEffect(()=>{
    const fetchData = async () => {
      setLoading(true)
      const res = await fetch(url)
      const data = await res.json()
      setPosts(data)
      setLoading(false)
    }

    fetchData()
  },[])

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>My Blog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App
