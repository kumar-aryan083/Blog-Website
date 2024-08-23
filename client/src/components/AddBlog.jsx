import React, { useEffect, useState, useRef } from 'react';
import './Styles/AddBlog.css'
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';

const AddBlog = ({handleAlert}) => {
    const [blogData, setBlogData] = useState({
        title: "",
        description: "",
        keyword: "",
        image: "",
        content: ""
    });

    const editorRef = useRef(null);

    const handleChange = (e) => {
        setBlogData({
            ...blogData,
            [e.target.name]: e.target.value
        });
    }

    const handleEditorChange = (content) => {
        setBlogData({
            ...blogData,
            content: content
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(blogData); // Display the form data in the console for testing
        const res = await fetch("/api/admin/add-blog",{
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                token: localStorage.getItem("token")
            },
            body: JSON.stringify(blogData)
        })
        const data = await res.json();
        if(res.ok){
            handleAlert(data.message);
        }else{
            handleAlert(data.message);
        }
    }

    useEffect(() => {
        document.title = "Add New Blog | TechBlog"
    }, []);

    return (
        <>
            <div className="full-add-blog">
                <div className="heading-add-blog">
                    <h2>Add Blog</h2>
                </div>
                <div className="add-blog-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-input">
                            <label htmlFor="title">Title:</label>
                            <input type="text" placeholder='Write your title here' name="title" value={blogData.title}
                                onChange={handleChange} />
                        </div>
                        <div className="form-input">
                            <label htmlFor="description">Description:</label>
                            <input type="text" placeholder='Write your description here' name="description" value={blogData.description}
                                onChange={handleChange} />
                        </div>
                        <div className="form-input">
                            <label htmlFor="keyword">Keyword:</label>
                            <input type="text" placeholder='Enter your Keyword here' name="keyword" value={blogData.keyword}
                                onChange={handleChange} />
                        </div>
                        <div className="form-input file-inpt">
                            <label htmlFor="image">Image:</label>
                            <input type="file" name="image"
                                onChange={(e) => setBlogData({
                                    ...blogData,
                                    image: e.target.files[0] // Assuming a single file input
                                })} />
                        </div>
                        <label htmlFor="content">Content: </label>
                        <Editor
                            apiKey='cen6pw58w47qzqvolhnhn1l5xtuxtnqg49kopee4ld29cet1'
                            initialValue=""
                            onInit={(evt, editor) => editorRef.current = editor}
                            value={blogData.content}
                            onEditorChange={handleEditorChange}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                        <input type="submit" value="Add Blog" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddBlog;
