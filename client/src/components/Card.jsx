import React, { useEffect, useState } from 'react';
import './Styles/Card.css';
import { Link } from 'react-router-dom';

const Card = ({blog}) => {
    const [date, setDate] = useState('');
    useEffect(() => {
        setDate(formatDate(blog.createdAt));
    }, [])
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = date.getUTCDate();
        const month = date.toLocaleString('en-US', {month: 'long'});
        const year = date.getUTCFullYear();

        const getDaySuffix= (day) => {
            if(day>3 && day < 21) return 'th';
            switch (day % 10){
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        }

        const formattedDate = `${day}${getDaySuffix(day)} ${month}, ${year}`;

        return formattedDate;
    }
    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    }
  return (
    <>
      <div className="full-card">
        <div className="fc-img-ctrl">
            <img src={blog.image} alt="" />
        </div>
        <div className="fc-content">
            <h4>{blog.title}</h4>
            <p>{truncateText(blog.description, 80)}</p>
            <div className="fc-info">
                <p>{date}</p>
                {/* <p>{new Date(blog.createdAt).toLocaleDateString()}</p> */}
                <Link to = {`/${blog.cat.catName.toLowerCase()}/${blog._id}`}><div className="fci-btn">Read More</div></Link>
            </div>
        </div>
      </div>
    </>
  );
}

export default Card;
