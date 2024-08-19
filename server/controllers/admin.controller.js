import adminModel from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import blogModel from "../models/blog.model.js";

export const register = async(req, res)=>{
    try {
        const existingAdmin = await adminModel.findOne({username: req.body.username})
        if(!existingAdmin){
            const newAdmin = new adminModel({...req.body});
            await newAdmin.save();
            if(newAdmin){
                const token = jwt.sign({id: newAdmin._id}, process.env.JWT_SECRET);
                const {password, __v, ...others} = newAdmin._doc;
                res.cookie("token", token, {httpOnly: true}).status(200).json({
                    success: true,
                    message: "New Admin created",
                    ...others,
                    token: token
                })
            }else{
                res.status(401).json({
                    succes: false,
                    message: "Admin already exists"
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
export const login = async(req, res)=>{
    try {
        const existingAdmin = await adminModel.findOne({username: req.body.username});
        if(!existingAdmin){
            res.status(404).json({
                success: false,
                message: "user doesn't exists"
            })
        }else{
            const token = jwt.sign({id: existingAdmin._id}, process.env.JWT_SECRET);
            const {password, __v, ...others} = existingAdmin._doc;
            res.cookie("token", token, {httpOnly: true}).status(200).json({
                ...others,
                token: token
            })
        }
        console.log("admin end point")
    } catch (error) {
        console.log(error);
    }
}
export const addBlog = async(req, res)=>{
    try {
        const newBlog = new blogModel({...req.body});
        await newBlog.save();

        const admin = await adminModel.findOne({_id: req.user.id});
        admin.blogs.push(newBlog._id);
        await admin.save();

        if(newBlog){
            res.status(200).json({
                success: true,
                message: "blog created successfully"
            })
        }else{
            res.status(401).json({
                success: true,
                message: "unable to create blog"
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const editBlog = async(req, res)=>{
    try {
        const blog = await blogModel.findByIdAndUpdate(req.body.id, {...req.body}, {
            new: true,
            runValidators: true
        });
        if(!blog){
            res.status(404).json({
                success: false,
                message: "blog doesn't exists"
            })
        }else{
            res.status(200).json({
                success: true,
                message: "blog edited..."
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const deleteBlog = async(req, res)=>{
    try {
        console.log("delete blog endpoint")
    } catch (error) {
        console.log(error);
    }
}
export const deleteComment = (req, res)=>{
    try {
        console.log("admin end point")
    } catch (error) {
        console.log(error);
    }
}