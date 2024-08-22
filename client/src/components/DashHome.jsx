import React, { useEffect } from 'react';

const DashHome = () => {
  useEffect(() => {
    document.title = "Dashboard | TechBlog"
}, [])
  return (
    <div>
      dashboard-home-page
    </div>
  );
}

export default DashHome;
