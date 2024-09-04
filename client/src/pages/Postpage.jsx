import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Styles/Postpage.css';
import { checkValidation } from '../utils/setValues';

const Postpage = ({ handleAlert }) => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [blog, setBlog] = useState(null);
    const [comments, setComment] = useState([]);
    const { slug } = useParams();
    const [isAdmin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cat, setCat] = useState(null);
    const [com, setCom] = useState({
        blogId: "",
        commentContent: ""
    });

    useEffect(() => {
        setLoading(true);
        fetch(`/api/common/${slug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((data) => {
                setBlog(data.blog);
                setComment(data.blog.comments.reverse());
                setCom({ ...com, blogId: data.blog._id });
                document.title = `${data.blog.title} | ${data.blog.cat.catName}`;
                setLikes(data.blog.likes.length);
                setDislikes(data.blog.dislikes.length);
                setLoading(false);
            });
    }, [slug]);
    useEffect(() => {
        const getCat = async () => {
            setLoading(true);
            const res = await fetch('/api/category/all-category', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if (res.ok) {
                setCat(data.categories);
                setLoading(false);
                console.log(data.categories);
            }
            const admin = await checkValidation();
            setAdmin(admin);
        }
        getCat();
        document.documentElement.scrollTop = 0;
    }, [])
    const handleComment = (e) => {
        setCom({ ...com, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch('/api/user/add-comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token')
            },
            body: JSON.stringify(com)
        }).then((res) => res.ok ? res.json() : Promise.reject())
            .then((data) => {
                setComment(data.comments.reverse());
                setCom((prev) => ({
                    blogId: prev.blogId,
                    commentContent: ""
                }));
                handleAlert(data.message);
                setLoading(false);
            });
    };

    const handlePostLike = (id) => {
        setLoading(true);
        fetch(`/api/user/like-blog/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token')
            }
        }).then((res) => res.json())
            .then((data) => {
                setLikes(data?.blogs?.likes?.length);
                setDislikes(data?.blogs?.dislikes?.length);
                handleAlert(data?.message);
                setLoading(false);
            });
    };

    const handlePostDislike = (id) => {
        setLoading(true);
        fetch(`/api/user/dislike-blog/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token')
            }
        }).then((res) => res.json())
            .then((data) => {
                setLikes(data.blogs.likes.length);
                setDislikes(data.blogs.dislikes.length);
                handleAlert(data?.message);
                setLoading(false);
            });
    };

    const handleCommentLike = (commentId) => {
        setLoading(true);
        fetch(`/api/user/like-comment/${commentId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token')
            }
        }).then((res) => res.json())
            .then((data) => {
                setComment(data?.comments);
                handleAlert(data?.message);
                setLoading(false);
            });
    };

    const handleCommentDislike = (commentId) => {
        setLoading(true);
        fetch(`/api/user/dislike-comment/${commentId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token')
            }
        }).then((res) => res.json())
            .then((data) => {
                setComment(data?.comments);
                handleAlert(data?.message);
                setLoading(false);
            });
    };

    return (
        <>
            <div className="load" style={{ display: loading ? "flex" : "none" }}>
                <div className="loading"></div>
                <p>Loading...</p>
            </div>
            <div className="post-page-wrapper">
                <div className="pp-left">
                    <div className="left-post-wrapper">
                        <div className="lpw-ctrl">
                            <img src={blog?.image} alt="" />
                        </div>
                        <div className="blog-info">
                            <p>{blog?.adminId?.name}</p>
                            <p><i className="fa-solid fa-thumbs-up"></i>{likes}</p>
                            <p><i className="fa-solid fa-thumbs-down"></i>{dislikes}</p>
                            <p><i className="fa-solid fa-comment"></i>{comments?.length}</p>
                            <p><i className="fa-solid fa-layer-group"></i>{blog?.cat?.catName}</p>
                        </div>
                        <hr />
                        <h1>{blog?.title}</h1>
                        <div className='blog-content' dangerouslySetInnerHTML={{ __html: blog?.content }} />
                    </div>
                    <div className="left-comment-wrapper">
                        <div className="action-btn-wrapper">
                            <div className="like" onClick={() => handlePostLike(blog?._id)}><i className="fa-solid fa-thumbs-up"></i> {likes} {likes <= 1 ? " Like" : " Likes"}</div>
                            <div className="dislike" onClick={() => handlePostDislike(blog?._id)}><i className="fa-solid fa-thumbs-down"></i> {dislikes} {dislikes <= 1 ? " Dislike" : " Dislikes"}</div>
                        </div>
                        <h3>Comments</h3>
                        <hr />
                        <div className="all-comment-wrapper">
                            <div className="a-comment">
                                {comments.length > 0 ? (
                                    comments.map((e, i) => (
                                        <div className="single-comment" key={e.id || i}>
                                            <div className="info-head">
                                                <div className="pi-img-ctrl">
                                                    <img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" alt="" />
                                                </div>
                                                <h4>{e.userId?.name}</h4>
                                            </div>
                                            <hr />
                                            <p>{e?.commentContent}</p>
                                            <div className="sc-action-btn">
                                                <div className="like" onClick={() => handleCommentLike(e._id)}>
                                                    <i className="fa-solid fa-thumbs-up"></i>
                                                    {e.likes?.length} {e.likes?.length === 1 ? "Like" : "Likes"}
                                                </div>
                                                <div className="dislike" onClick={() => handleCommentDislike(e._id)}>
                                                    <i className="fa-solid fa-thumbs-down"></i>
                                                    {e.dislikes?.length} {e.dislikes?.length === 1 ? "Dislike" : "Dislikes"}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No one has commented yet...</p>
                                )}
                            </div>
                        </div>
                       {isAdmin ? (
                        <>
                            <p style={{padding: "20px 10px"}}>Login as a user to comment on this post...</p>
                        </>
                       ) : (
                        <form onSubmit={handleSubmit}>
                        <input type="text" name="commentContent" id="commentContent" value={com.commentContent} onChange={handleComment} placeholder='Add a comment' />
                        <input type="submit" value="Add" />
                    </form>
                       )}
                    </div>
                </div>
                <div className="pp-right">
                    <div className="cat-wrapper">
                        <h1>Categories</h1>
                        <ul>
                            {cat?.length > 0 ? (<>
                                {cat?.reverse().map((e, i) => (
                                    <>
                                        <Link to = {`/${e?.catName.toLowerCase()}`}><li key = {i || e._id} >{e?.catName}</li></Link>
                                    </>
                                ))}
                            </>) : (<>
                                <li>No category to show</li>
                            </>)}
                        </ul>
                    </div>
                    <div className="recent-wrapper"></div>
                </div>
            </div>
        </>
    );
};

export default Postpage;
