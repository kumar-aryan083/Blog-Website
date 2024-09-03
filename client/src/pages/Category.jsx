import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Category = () => {
  const {cat} = useParams();
  const [catBlog, setCatBlog] = useState(null);
  useEffect(() => {
    const getCatBlog = async () => {
      const res = await fetch(`/api/category/${cat}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json();
      if(res.ok){

      }
    }
  }, [cat])
  return (
    <>
    
    </>
  );
}

export default Category;
