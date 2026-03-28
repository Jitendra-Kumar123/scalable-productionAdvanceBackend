import React, {useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"


const CreatePost = () => {

  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault()

    const formData = new FormData(e.target);

  
    axios.post("http://localhost:3000/create-post", formData)
    .then((res)=>{
      navigate("/posts");
    })
    .catch((err)=>{
      console.log(err);
      alert("error creating post");
    })

  }
  

  return (
    <>
    <section className='create-post-section'>
        <h1>create post</h1>
        <form onSubmit={handleSubmit}>
            <input type="file" name='image' accept='image/*' />
            <input type="text" name='caption' placeholder='enter caption' required/>
            <button type='submit'>submit</button>
        </form>
    </section>
    </>
  )
}

export default CreatePost