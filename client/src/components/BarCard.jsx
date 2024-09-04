import React from 'react';
import './Styles/BarCard.css'
import { Link } from 'react-router-dom';

const BarCard = ({details}) => {
  return (
    <>
        <div className="full-bar-wrapper">
            <div className="fbw-img-ctrl">
                <img src={details.image} alt="" />
            </div>
            <div className="fbw-content-ctrl">
                <h1>{details.title}</h1>
                <p>{details.description}</p>
                <div className="info-wrapper">
                    <p>{new Date(details.createdAt).toLocaleDateString()}</p>
                    <Link to = {`/${details.cat.catName.toLowerCase()}/${details.slug}`}><div className="c-b-btn">Read More</div></Link>
                </div>
            </div>
        </div>
    </>
  );
}

export default BarCard;
