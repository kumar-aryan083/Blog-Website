import React, { useEffect, useState } from 'react';
import SideNav from '../../components/SideNav';
import '../Styles/Dash.css';
import DashHome from '../../components/DashHome';
import AddBlog from '../../components/AddBlog';
import { checkValidation } from '../../utils/setValues';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ handleAlert, user }) => {
    const [number, setNumber] = useState("1");
    const [res, setRes] = useState(false);
    const nav = useNavigate();
    useEffect(() => {
        const verifyAdmin = async () => {
            const adminCheck = await checkValidation();
            setRes(adminCheck);
            document.title = 'Dashboard | AdminPanel'
            if(!adminCheck){
                nav('/')
            }
        }
        verifyAdmin();
        handleAlert('Admin Logged Out Successfully') 
    }, [user])

    const handleContent = (pageNo) => {
        setNumber(pageNo);
    };

    const handleSubmit = (num) => {
        setNumber(num);
    };

    const renderContent = () => {
        switch (number) {
            case "1":
                return <DashHome />;
            case "2":
                return <AddBlog handleAlert={handleAlert} onSubmit={handleSubmit} />;
            case "3":
                return <div>Content for Page 3</div>;
            case "4":
                return <div>Content for Page 4</div>;
            case "5":
                return <div>Content for Page 5</div>;
            default:
                return <div>Default Content</div>;
        }
    };

    return (
        <div className="full-dashboard">
            <div className="left-dash-nav">
                <SideNav setPage={handleContent} />
            </div>
            <div className="right-dash-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default Dashboard;
