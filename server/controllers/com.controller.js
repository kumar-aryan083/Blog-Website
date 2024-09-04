import blogModel from '../models/blog.model.js';

export const allBlogs = async(req, res)=>{
    console.log('hit');
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

export const blogBySlug = async (req, res) => {
    try {
        const blog = await blogModel.findOne({slug: req.params.slug}).populate('adminId').populate('cat').populate({
            path: 'comments',
            populate: [
                {path: 'userId', select: 'name'}
            ]
        });
        res.status(200).json({
            success: true,
            message: 'data fetched',
            blog
        })
    } catch (error) {
        console.log(error);
    }
}