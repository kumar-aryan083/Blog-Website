import userModel from "../models/user.model.js"
import commentModel from "../models/comment.model.js"
import jwt from 'jsonwebtoken';
import blogModel from "../models/blog.model.js";

export const login = async (req, res) => {
    try {
        // Logic for this controller
        // console.log('hit in login');
        const existingUser = await userModel.findOne({ username: req.body.username });
        if (!existingUser) {
            res.status(404).json({
                success: false,
                message: "user doesn't exists"
            })
        } else {
            const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
            const { password, __v, ...others } = existingUser._doc;
            res.cookie("token", token, { httpOnly: true }).status(200).json({
                data: others,
                token: token
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const register = async (req, res) => {
    try {
        // Logic for this controller
        const existingUser = await userModel.findOne({ username: req.body.username })
        if (!existingUser) {
            const newUser = new userModel({ ...req.body });
            await newUser.save();
            if (newUser) {
                const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
                const { password, __v, ...others } = newUser._doc;
                res.cookie("token", token, { httpOnly: true }).status(200).json({
                    data: others,
                    token: token
                })
            } else {
                res.status(401).json({
                    succes: false,
                    message: "User already exists"
                })
            }
        } else {
            res.status(401).json({
                succes: false,
                message: "User already exists"
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const addComment = async (req, res) => {
    try {
        // Logic for this controller
        // console.log("hit inside add-comment")
        const newComment = new commentModel({ ...req.body, userId: req.user.id });
        await newComment.save();

        const blog = await blogModel.findOne({ _id: newComment.blogId });
        blog.comments.push(newComment._id);
        await blog.save();

        const user = await userModel.findOne({ _id: req.user.id })
        user.comments.push(newComment._id);
        await user.save();

        const comments = await commentModel.find();

        res.status(200).json({
            success: true,
            message: "new comment created successfully",
            comments
        })

    } catch (error) {
        console.log(error);
    }
}
export const editComment = async (req, res) => {
    try {
        // Logic for this controller
        const comment = await commentModel.findByIdAndUpdate(req.body.id, { ...req.body, edited: true }, {
            new: true,
            runValidators: true
        });
        if (!comment) {
            res.status(401).json({
                success: false,
                message: "comment not found"
            })
        } else {
            const comments = await commentModel.find();
            res.status(200).json({
                success: true,
                message: "comment edited",
                comments
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const deleteComment = async (req, res) => {
    try {
        // Logic for this controller
        const commentData = await commentModel.findOne({ _id: req.params.cId });
        await commentModel.findByIdAndDelete(commentData._id);

        const blog = await blogModel.findOne({ _id: commentData.blogId });
        blog.comments.pop(commentData._id);
        await blog.save();

        const user = await userModel.findOne({ _id: commentData.userId });
        user.comments.pop(commentData._id);
        await user.save();

        const populatedComments = (await blog.populate('comments')).comments
        if(populatedComments){
            res.status(200).json({
                success: true,
                message: "comment deleted successfully",
                comments: populatedComments
            })
        }else{
            res.status(200).json({
                success: true,
                message: "there are no comments to show"
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const saveBlog = async (req, res) => {
    try {
        // Logic for this controller
        const user = await userModel.findOne({ _id: req.user.id });
        user.savedBlogs.push(req.params.bId);
        await user.save();

        const { password, __v, ...others } = user._doc;
        res.status(200).json({
            success: true,
            message: "blog saved...",
            user: others
        })
    } catch (error) {
        console.log(error);
    }
}
export const likeComment = async(req, res) => {
    try {
        // Logic for this controller
        const comment = await commentModel.findOne({_id: req.params.cId});
        const isDislikeBefore = comment.dislikes.some(dislikeId => dislikeId.toString()===req.user.id);
        if(isDislikeBefore){
            comment.dislikes.pop(req.user.id);
            await comment.save();
        }
        const isLikedBefore = comment.likes.some(likesId => likesId.toString() === req.user.id);
        if(isLikedBefore){
            res.status(401).json({
                success: false,
                message: "already liked before"
            })
        }else{
            comment.likes.push(req.user.id);
            await comment.save();
            const comments = (await blogModel.findOne({ _id: comment.blogId }).populate('comments')).comments;
            res.status(200).json({
                success: true,
                message: 'Liked successfully',
                comments: comments
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const disLikeComment = async(req, res) => {
    try {
        // Logic for this controller
        const comment = await commentModel.findOne({_id: req.params.cId});
        const isLikeBefore = comment.likes.some(likeId => likeId.toString()===req.user.id);
        if(isLikeBefore){
            comment.likes.pop(req.user.id);
            await comment.save();
        }
        const isdislikedBefore = comment.dislikes.some(dislikesId => dislikesId.toString() === req.user.id);
        if(isdislikedBefore){
            res.status(401).json({
                success: false,
                message: "already disliked before"
            })
        }else{
            comment.dislikes.push(req.user.id);
            await comment.save();
            const comments = (await blogModel.findOne({ _id: comment.blogId }).populate('comments')).comments;
            res.status(200).json({
                success: true,
                message: 'Liked successfully',
                comments: comments
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const likeBlog = async(req, res) => {
    try {
        // Logic for this controller
        const blog = await blogModel.findOne({_id: req.params.bId});
        const isdislikeBefore = blog.dislikes.some(dislikeId => dislikeId.toString()===req.user.id);
        if(isdislikeBefore){
            blog.dislikes.pop(req.user.id);
            await blog.save();
        }
        const isLikedBefore = blog.likes.some(likeId => likeId.toString()===req.user.id);
        if(isLikedBefore){
            res.status(401).json({
                success: false, 
                message: "blog already liked"
            })
        }else{
            blog.likes.push(req.user.id);
            await blog.save();

            const blogs = await blogModel.find();

            res.status(200).json({
                success: true,
                message: "blog has been liked",
                blogs: blogs
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const disLikeBlog = async(req, res) => {
    try {
        // Logic for this controller
        const blog = await blogModel.findOne({_id: req.params.bId});
        const islikeBefore = blog.likes.some(likeId => likeId.toString()===req.user.id);
        if(islikeBefore){
            blog.likes.pop(req.user.id);
            await blog.save();
        }
        const isdislikedBefore = blog.dislikes.some(dislikeId => dislikeId.toString()===req.user.id);
        if(isdislikedBefore){
            res.status(401).json({
                success: false, 
                message: "blog already disliked"
            })
        }else{
            blog.dislikes.push(req.user.id);
            await blog.save();

            const blogs = await blogModel.find();

            res.status(200).json({
                success: true,
                message: "blog has been disliked",
                blogs: blogs
            })
        }
    } catch (error) {
        console.log(error);
    }
}