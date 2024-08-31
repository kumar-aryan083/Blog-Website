import blogModel from '../models/blog.model.js';

export const allBlogs = async(req, res)=>{
    const blogs = await blogModel.find()
    .populate('adminId')
    .populate('cat')
    .populate('likes')
    .populate('dislikes')
    .populate('comments');
    if(blogs){
        res.status(200).json({
            success: true,
            message: "Blogs fetched Successfully",
            allBlogs: blogs
        })
    }else{
        res.status(401).json({
            success: true,
            message: "Unable to fetch blogs"
        })
    }
}