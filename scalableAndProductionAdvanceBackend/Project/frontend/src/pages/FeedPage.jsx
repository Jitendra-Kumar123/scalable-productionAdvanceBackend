import React, {useState, useEffect} from 'react'
import axios from "axios"


const FeedPage = () => {

 const [posts, setPosts] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:3000/posts")
        .then((res) =>{
            setPosts(res.data.posts)
        })
    },[])

  return (
    <>
    <section className='feed-section'>
        {
            posts.length > 0 ? (posts.map((post)=>(
                <div key={post._id} className='post-card'>
                    <img src={post.image} alt={post.caption} />
                    <p>{post.caption}</p>
                </div>
            ))) : (<h1>no posts available</h1>)
        }
    </section>
    </>
  )
}

export default FeedPage