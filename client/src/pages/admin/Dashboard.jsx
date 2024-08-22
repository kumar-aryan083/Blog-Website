import React, { useState } from 'react';
import SideNav from '../../components/SideNav';
import '../Styles/Dash.css'
import DashHome from '../../components/DashHome';
import AddBlog from '../../components/AddBlog';

const Dashboard = () => {
    const [number, setNumber] = useState("1");

    const handleContent = (pageNo) => {
        setNumber(pageNo);
    }

    const renderContent = () => {
        switch (number) {
            case "1":
                return <DashHome/>;
            case "2":
                return <AddBlog/>;
            case "3":
                return <div>Content for Page 3</div>;
            case "4":
                return <div>Content for Page 4</div>;
            case "5":
                return <div>Content for Page 5</div>;
            default:
                return <div>Default Content</div>;
        }
    }

    return (
        <>
            <div className="full-dashboard">
                <div className="left-dash-nav">
                    <SideNav setPage={handleContent} />
                </div>
                <div className="right-dash-content">
                    {renderContent()}
                </div>
            </div>
        </>
    );
}

export default Dashboard;
