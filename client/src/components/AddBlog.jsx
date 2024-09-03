import React, { useEffect, useState, useRef } from 'react';
import './Styles/AddBlog.css';
import { Editor } from '@tinymce/tinymce-react';
import app from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const AddBlog = ({ handleAlert, onSubmit }) => {
    const [blogData, setBlogData] = useState({
        title: "",
        description: "",
        keyword: "",
        image: "",
        content: "",
        category: "",
        slug: ""
    });
    const [imgPerc, setImgPerc] = useState(0);
    const editorRef = useRef(null);
    const imageRef = useRef(null);
    const categoryRef = useRef(null);
    const [cat, setCat] = useState(null);

    const handleChange = (e) => {
        setBlogData({
            ...blogData,
            [e.target.name]: e.target.value
        });
    };

    const handleEditorChange = (content) => {
        setBlogData({
            ...blogData,
            content: content
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        blogData.category = categoryRef.current.value;
        console.log(blogData); // Display the form data in the console for testing
        const res = await fetch("/api/admin/add-blog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token")
            },
            body: JSON.stringify(blogData)
        });
        const data = await res.json();
        if (res.ok) {
            onSubmit("1");
            handleAlert(data.message);
            // console.log(blogData);
        } else {
            handleAlert(data.message);
        }
    };

    useEffect(() => {
        if (imgPerc === 100) {
            document.querySelector('.showUploading').style.display = 'none';
            document.querySelector('.showUploaded').style.display = 'block';
        }
    }, [imgPerc]);

    const handleImageUpload = () => {
        const file = imageRef.current.files[0];
        if (file) {
            const storage = getStorage(app);
            const fileName = `${new Date().getTime()}_${file.name}`;
            const storageRef = ref(storage, `blogImage/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImgPerc(Math.round(progress));
                    document.querySelector('.showUploading').style.display = 'block';
                },
                (error) => {
                    console.error('Upload failed:', error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setBlogData({ ...blogData, image: downloadURL });
                    });
                }
            );
        }
    };

    useEffect(() => {
        document.title = "Add New Blog | TechBlog";
        getCat();
    }, []);

    const getCat = async () => {
        const res = await fetch('/api/category/all-category', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token')
            }
        });
        const resData = await res.json();
        if (res.ok) {
            setCat(resData);
            console.log(resData?.categories?.length);
        } else {
            handleAlert('Something went wrong');
        }
    };
    
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
                        <div className="form-input">
                            <label htmlFor="slug">Slug:</label>
                            <input type="text" placeholder='Enter your Slug here' name="slug" value={blogData.slug}
                                onChange={handleChange} />
                        </div>
                        <div className="form-input file-inpt">
                            <label htmlFor="image">Image:</label>
                            <input type="file" name="image" accept=".jpg,.jpeg,.png,.gif"
                                onChange={handleImageUpload} ref={imageRef} id="image" required />
                        </div>
                        <p className='showUploading'>Uploading: {imgPerc}%</p>
                        <p className='showUploaded'>Uploaded: {imgPerc}%</p>
                        <div className="form-input">
                            <label htmlFor="category">Category:</label>
                            <select name="category" id="category" ref={categoryRef} required>
                                <option value="">Select Category</option>
                                {cat?.categories?.length > 0 ? (
                                    cat.categories.map((e) => (
                                        <option key={e._id} value={e._id}>{e.catName}</option>
                                    ))
                                ) : (
                                    <option value="none">No Category Added</option>
                                )}
                            </select>
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
                                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
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
