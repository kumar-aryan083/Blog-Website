import React, { useEffect, useState } from 'react';
import './Styles/Xscroll.css';

const Xsroll = ({
    catId,
    blogs
}) => {

  // State to hold the filtered blogs
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    // Filter the blogs based on catId and save it to the usestate
    const filtered = blogs?.allBlogs?.filter(blog => blog.cat._id === catId);
    setFilteredBlogs(filtered);
    // Print the filtered blogs to the console
    console.log(filtered);
  }, [catId, blogs]); // Re-run the effect when catId or blogs change

  return (
    <>
      {catId}
    </>
  );
}

export default Xsroll;
