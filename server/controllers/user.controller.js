import userModel from "../models/user.model.js"
import commentModel from "../models/comment.model.js"
import jwt from 'jsonwebtoken';
import blogModel from "../models/blog.model.js";

export const login = async(req, res)=>{
    try {
        // Logic for this controller
        const existingUser = await userModel.findOne({username: req.body.username});
        if(!existingUser){
            res.status(404).json({
                success: false,
                message: "user doesn't exists"
            })
        }else{
            const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET);
            const {password, __v, ...others} = existingUser._doc;
            res.cookie("token", token, {httpOnly: true}).status(200).json({
                ...others,
                token: token
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const register = async(req, res)=>{
    try {
        // Logic for this controller
        const existingUser = await userModel.findOne({username: req.body.username})
        if(!existingUser){
            const newUser = new userModel({...req.body});
            await newUser.save();
            if(newUser){
                res.status(200).json({
                    success: true,
                    message: "New user created",
                    ...newUser._doc
                })
            }else{
                res.status(401).json({
                    succes: false,
                    message: "User already exists"
                })
            }
        }else{
            res.status(401).json({
                succes: false,
                message: "User already exists"
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const addComment = async(req, res)=>{
    try {
        // Logic for this controller
        const newComment = new commentModel({...req.body});
        await newComment.save();

        const blog = await blogModel.findOne({_id: newComment.blogId});
        blog.comments.push(newComment._id);
        blog.save();

        const user = await userModel.findOne({_id: req.body.userId})
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
export const editComment = async(req, res)=>{
    try {
        // Logic for this controller
        const comment = await commentModel.findByIdAndUpdate(req.body.id, {...req.body, edited: true},{
            new: true,
            runValidators: true
        });
        if(!comment){
            res.status(401).json({
                success: false,
                message: "comment not found"
            })
        }else{
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
export const deleteComment = async(req, res)=>{
    try {
        // Logic for this controller
        const commentData = await commentModel.findOne({_id: req.params.cId});
        await commentModel.findByIdAndDelete(commentData._id);

        const blog = await blogModel.findOne({_id: commentData.blogId});
        blog.comments.pop(commentData._id);
        await blog.save();

        const user = await userModel.findOne({_id: commentData.userId});
        user.comments.pop(commentData._id);
        await user.save();

        const populatedComments = (await blog.comments.populate('comments')).comments

        res.status(200).json({
            success: true,
            message: "comment deleted successfully",
            comments: populatedComments
        })
    } catch (error) {
        console.log(error);
    }
}
export const saveBlog = async(req, res)=>{
    try {
        // Logic for this controller
        const user = await userModel.findOne({_id: req.user.id});
        user.savedBlogs.push(req.params.bId);
        await user.save();

        const {password, __v, ...others} = user;
        res.status(200).json({
            success: true,
            message: "blog saved...",
            user: others
        })
    } catch (error) {
        console.log(error);
    }
}
export const likeComment = (req, res)=>{
    try {
        // Logic for this controller
        console.log("user endpoint ok");
    } catch (error) {
        console.log(error);
    }
}
export const disLikeComment = (req, res)=>{
    try {
        // Logic for this controller
        console.log("user endpoint ok");
    } catch (error) {
        console.log(error);
    }
}
export const likeBlog = (req, res)=>{
    try {
        // Logic for this controller
        console.log("user endpoint ok");
    } catch (error) {
        console.log(error);
    }
}
export const disLikeBlog = (req, res)=>{
    try {
        // Logic for this controller
        console.log("user endpoint ok");
    } catch (error) {
        console.log(error);
    }
}