import React, { useEffect, useState } from 'react';
import './Styles/ContactForms.css';

const ContactForms = ({handleAlert}) => {
    const [contactData, setContactData] = useState(null);
    const [message, setMessage] = useState("");

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

    
    const handleReply = (id)=>{
        console.log(id)
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
                                    <div className="cf-btn" onClick={()=>{handleReply(c._id)}}>Reply</div>
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
    </>
  );
}

export default ContactForms;
