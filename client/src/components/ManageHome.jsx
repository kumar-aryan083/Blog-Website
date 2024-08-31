import React, { useState } from 'react';

const ManageHome = () => {
  const [tabs, setTabs] = useState(0);

  const handleTabChange = (e) => {
    setTabs(Number(e.target.value));
  }
  return (
    <>
      <div className="full-manage-home">
        <h1>Home Page Manager</h1>
        <hr/>
        <form>
          <div className="no-of-tabs">
            <label htmlFor="tabs">Number of Tabs:</label>
            <input type="number" id = "tabs" value ={tabs} onChange={handleTabChange} />
          </div>
        </form>
      </div>
    </>
  );
}

export default ManageHome;
