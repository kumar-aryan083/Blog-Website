import React, { useEffect, useState } from 'react';
import './Styles/ContactForms.css';

const ContactForms = ({handleAlert}) => {
    const [contactData, setContactData] = useState(null);
    const [message, setMessage] = useState("");
    const [replyForm, setReplyForm] = useState({
        email: "",
        subject: "",
        reply: ""
    });

    useEffect(()=>{
        const getData = async()=>{
            const res = await fetch("/api/admin/contact-forms", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("token")
                }
            });
            const data = await res.json();
            if(res.ok){
                // console.log(data.allForms);
                setContactData(data.allForms);
            }else{
                handleAlert('unable to fecth forms')
            }
        }
        getData();
    },[])

    const handleChange = (e)=>{
        setReplyForm({
            ...replyForm,
            [e.target.name]: e.target.value
        })
    }

    const handleReply = (email)=>{
        setReplyForm({...replyForm, email})
        document.querySelector(".reply-popup").style.display = "block";
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        // console.log(replyForm);
        const res = await fetch("/api/admin/reply-form",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token")
            },
            body: JSON.stringify(replyForm)
        });
        const data = await res.json();
        if(res.ok){
            // console.log(data);
            setReplyForm({
                email: "",
                subject: "",
                reply: ""
            })
            handleAlert(data.message)
        }
        document.querySelector(".reply-popup").style.display = "none";
    }
    
    const handleDelete = async(id) =>{
        // console.log(id)
        const res = await fetch(`/api/admin//delete-contact-form/${id}`, {
            method:"DELETE",
            headers:{
                "Contact-Type": "application/json",
                token: localStorage.getItem("token")
            }
        });
        const data = await res.json();
        if(res.ok){
            // console.log(data.allForms);
            setContactData(data.allForms);
            handleAlert(data.message)
        }else{
            handleAlert(data.message)
        }
    }
    
    const showMessage = (msg) =>{
        setMessage(msg);
        console.log(msg);
        document.querySelector('.sm-popup').style.display = "block";
    }
    const handleClose = ()=>{
        document.querySelector(".sm-popup").style.display = "none";
    }
    const replyClose = ()=>{
        document.querySelector(".reply-popup").style.display = "none";
    }

  return (
    <>
      <div className="full-form-dash">
        <div className="ffd-card">
            <h1>All Forms</h1>
            <div className="c-form-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Topics</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactData?.length > 0 ? (contactData.map((c, index)=>(
                            <tr key={index}>
                                <td>{c.name}</td>
                                <td>{c.keyword}</td>
                                <td>{c.email}</td>
                                <td>
                                    <div className="cf-btn" onClick={()=>{showMessage(c.message)}}>Message</div>
                                    <div className="cf-btn" onClick={()=>{handleReply(c.email)}}>Reply</div>
                                    <div className="cf-btn" onClick={()=>{handleDelete(c._id)}}>Delete</div>
                                </td>
                            </tr>
                        ))):(
                            <tr>
                                <td>There are no Forms submitted to show</td>
                                <td></td>
                                <td></td>
                                <td></td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
      <div className="sm-popup">
        <div className="sm-popup-card">
            <div className="head">
                <h2>Message</h2>
                <p onClick={handleClose}>X</p>
            </div>
            <hr />
            <div>{message}</div>
        </div>
      </div>
      <div className="reply-popup">
        <div className="rp-card">
            <div className="r-head">
                <h2>Reply Form</h2>
                <p onClick={replyClose}>X</p>
            </div>
            <hr />
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='To: Email' name='email' value={replyForm.email} onChange={handleChange} readOnly/>
                <input type="text" name='subject' placeholder='Subject' onChange={handleChange} value={replyForm.subject}/>
                <textarea name="reply" rows={8} placeholder='Write your reply here' onChange={handleChange} value={replyForm.reply}></textarea>
                <input type="submit" value="Send Reply" />
            </form>
        </div>
      </div>
    </>
  );
}

export default ContactForms;
