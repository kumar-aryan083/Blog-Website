import React, { useEffect } from 'react';
import './Styles/AddBlog.css'

const AddBlog = () => {
    useEffect(() => {
        document.title = "Add New Blog | TechBlog"
    }, [])
    return (
        <>
            <div className="full-add-blog">
                <div className="heading-add-blog">
                    <h2>Add Blog</h2>
                    <div className="add-blog-btn">Add new Blog</div>
                </div>
                <div className="add-blog-form">
                    <form>
                        <div className="form-input">
                            <label htmlFor="title">Title:</label>
                            <input type="text" placeholder='Write your title here' />
                        </div>
                        <div className="form-input">
                            <label htmlFor="description">Description:</label>
                            <input type="text" placeholder='Write your description here' />
                        </div>
                        <div className="form-input">
                            <label htmlFor="keyword">Keyword:</label>
                            <input type="text" placeholder='Enter your Keyword here' />
                        </div>
                        <div className="form-input">
                            <label htmlFor="image">Image:</label>
                            <input type="file" placeholder='Enter your Keyword here' />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddBlog;
