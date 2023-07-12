import { getAllBlogs, deleteBlog, createBlog } from '../../helper/blogHelper.js'
import { uploadFile, getFile } from '../../helper/upload.js';
import convertToBase64 from '../../helper/convert.js';
import { useNavigate, Navigate } from "react-router-dom";
import { getAllUser } from '../../helper/helper.js';
import { blog } from '../../assets/data/data.js';
import toast,{ Toast } from 'react-hot-toast';
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai"
import "../../styles/blog.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
export default function BlogNew() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newData, setNewData] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [title, setTitle] = useState([]);
  const [image, setImage] = useState([]);
  const navigate = useNavigate();
  const showImg = (id) => {
    return getFile(id)
  }
  const fetchData = async () => {
    const blogs = await getAllBlogs();
    const authors = await getAllUser();
    const image = await getAllBlogs();
    setBlogs(blogs.data)
    setAuthors(authors.data)
    setImage(image.src)
    console.log(blogs)
  }
  useEffect(() => {
    let dataPromise = fetchData();
      toast.promise(dataPromise, {
        loading: "Loading...",
        success: <b>Successfully...!</b>,
        error: <b>Failed !!!</b>,
      });
      dataPromise
        .then(function () {
          navigate("/homeblog");
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);
  //     return(
  //         <section>

  //           <div className='grid grid-cols-3 bg-blue-100'>
  //            {blogs.map((blog) => (

  //             <div className='box boxItems' key={blog._id}>
  //                         {/* <img src='{blog._image}'></img>
  //                  <h5>{blog.title}</h5>
  //             <div className='img'>
  //                 <img src={blog._image} alt='' />
  //             </div>

  //                 <p>{blog.content}</p> */}

  //      <div className="bg-white-100">

  //      <div className="container mx-auto px-4 py-8">
  //         {/* Blog Posts */}
  //         <div className=" mt-10">
  //           <div className="h">
  //             {/* Blog Post 1 */}
  //             <div className=" bg-white rounded-lg p-6 shadow-md h-500">
  //               <div className="max-w-sm rounded overflow-hidden shadow-lg">
  //                 <img className="w-full h-150" src={showImg(blog._image)} alt="Blog Post" />
  //                 <div className="px-6 py-4">
  //                   <div className=" flex justify-between items-center font-bold text-xl mb-2">{blog.title}</div>
  //                   {/* <p className="text-gray-700 text-base">{blog.content}</p> */}
  //                   <p className="text-gray-700 text-base">{blog.content.slice(0, 180)}...</p>
  //                 </div>
  //                 <div className="px-6 pb-4">
  //                   {/* <a href="#" className="inline-block bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Read more</a>
  //                  */}

  //                   <Link to={`/detailblog/${blog._id}`}> 
  //                     <p className="inline-block bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" ><button>Read more</button></p>
  //                 </Link>
  //                 </div>
  //               </div>
  //             </div>

  //             {/* Blog Post 2 */}


  //             {/* Blog Post 3 */}

  //           </div>
  //         </div>

  //         </div>




  //             </div>
  //  </div>
  //            ))}


  // </div>   
  //     </section>
  //     )

  return (
    <section className='blog'>

      <div className='container grid grid-cols-3 '>
        {blogs.map((blog) => (

          <div className='box boxItems' key={blog._id}>


            <div className='img'>
              <img src={showImg(blog._image)} alt='' />
            </div>
            <div className='details'>
              <div className='tag'>
                <AiOutlineTags className='icon' />
                <a href='/'>#Yoga</a>
              </div>
              <h3>{blog.title}</h3>
              <p>{blog.content.slice(0, 180)}...</p>
              <Link to={`/detailblog/${blog._id}`}>
                <p className="inline-block bg-yellow-500 hover:bg-black-700 text-black py-2 px-4 rounded" ><button>Read more</button></p>
              </Link>

              <div className='date'>
                <AiOutlineClockCircle className='icon' /> <label htmlFor=''>30/08</label>
                <AiOutlineComment className='icon' /> <label htmlFor=''>27</label>
                <AiOutlineShareAlt className='icon' /> <label htmlFor=''>SHARE</label>
              </div>
            </div>

          </div>
        ))}

      </div>
    </section>
  )
}