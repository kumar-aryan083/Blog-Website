import adminModel from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import blogModel from "../models/blog.model.js";
import commentModel from "../models/comment.model.js";
import categoryModel from "../models/category.model.js";
import userModel from "../models/user.model.js";
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    try {
        // console.log("hit")
        const existingAdmin = await adminModel.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email },
                { phone: req.body.phone }
            ]
        });
        if (!existingAdmin) {
            const allChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
            let otp = "";
            for (let i = 0; i < 6; i++) {
                const randomIdx = Math.floor(Math.random() * allChar.length);
                otp += allChar[randomIdx];
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const newAdmin = new adminModel({ ...req.body, password: hash, otp });
            await newAdmin.save();
            if (newAdmin) {
                const transporter = nodemailer.createTransport({
                    host: "smtp.hostinger.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: "noreply@rohankumar.cloud",
                        pass: "X@Va8hSo3y"
                    }
                });
                const mailBody = {
                    from: `Aryan Srivastava <noreply@rohankumar.cloud>`,
                    to: req.body.email,
                    cc: "",
                    subject: "OTP for registration",
                    html: `<div style="border-radius: 20px; padding: 20px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; background-color: rgb(230, 230, 230);">
                                <h1>Thanks for Registering with us.</h1>
                                <p><strong>Note</strong>: Please don't share this otp with anyone</p>
                                <h2 style="width: fit-content; background-color: white; padding: 20px 50px; margin: 100px auto; border-radius: 10px;">OTP: ${otp}</h2>
                                <h4>Best Regards</h4>
                                <h5>Aryan Srivastava</h5>
                                <a href="mailto:connect@codesofrohan.com">connect@codesofrohan.com</a>
                            </div>`
                };
                const info = await transporter.sendMail(mailBody);
                res.status(200).json({
                    success: true,
                    message: "Email Sent",
                })
            } else {
                res.status(401).json({
                    succes: false,
                    message: "Admin already exists"
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
export const login = async (req, res) => {
    try {
        // console.log("hit")
        const existingAdmin = await adminModel.findOne({
            $or: [
                { username: req.body.id },
                { email: req.body.id },
                { phone: req.body.id }
            ]
        });
        if (!existingAdmin) {
            res.status(404).json({
                success: false,
                message: "user doesn't exists"
            })
        } else {
            if(bcrypt.compareSync(req.body.password, existingAdmin.password)){
                if (existingAdmin.verified) {
                    const token = jwt.sign({ id: existingAdmin._id }, process.env.JWT_SECRET);
                    const { password, __v, ...others } = existingAdmin._doc;
                    res.cookie("token", token, { httpOnly: true }).status(200).json({
                        ...others,
                        message: "Logged in successfully",
                        token: token
                    })
                } else {
                    res.status(403).json({
                        success: false,
                        message: "Please verify your email"
                    })
                }
            }else{
                res.status(400).json({
                    success: false,
                    message: "Incorrect password"
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}
export const addBlog = async (req, res) => {
    try {
        // console.log("hit")
        const newBlog = new blogModel({ ...req.body, adminId: req.user.id, cat: req.body.category });
        await newBlog.save();
        const cat = await categoryModel.findOne({ _id: req.body.category });
        cat.blogs.push(newBlog._id);
        await cat.save();
        const admin = await adminModel.findOne({ _id: req.user.id });
        admin.blogs.push(newBlog._id);
        await admin.save();

        if (newBlog) {
            res.status(200).json({
                success: true,
                message: "blog created successfully"
            })
        } else {
            res.status(401).json({
                success: true,
                message: "unable to create blog"
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const editBlog = async (req, res) => {
    try {
        const blog = await blogModel.findByIdAndUpdate(req.body.id, { ...req.body }, {
            new: true,
            runValidators: true
        });
        if (!blog) {
            res.status(404).json({
                success: false,
                message: "blog doesn't exists"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "blog edited..."
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const deleteBlog = async (req, res) => {
    try {
        // delete the blog
        const blog = await blogModel.findOne({ _id: req.params.bId });
        await blogModel.findByIdAndDelete({ _id: blog._id });

        // pop the blog from admin document
        const admin = await adminModel.findOne({ _id: req.user.id });
        admin.blogs.pop(blog._id);
        await admin.save();

        // Remove the blog from all user's savedBlogs
        await userModel.updateMany(
            { savedBlogs: blog._id },
            { $pull: { savedBlogs: blog._id } }
        );

        const commentIds = blog.comments.map(comment => comment._id);
        await commentModel.deleteMany({ _id: { $in: commentIds } });
        await userModel.updateMany(
            { comments: { $in: commentIds } },
            { $pull: { comments: { $in: commentIds } } }
        );

        const blogs = await blogModel.find();

        res.status(200).json({
            success: true,
            message: "blog deleted successfully",
            data: blogs
        });
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
        if (populatedComments) {
            res.status(200).json({
                success: true,
                message: "comment deleted successfully",
                comments: populatedComments
            })
        } else {
            res.status(200).json({
                success: true,
                message: "there are no comments to show"
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const validate = async (req, res) => {
    try {
        const isAdmin = await adminModel.findOne({ _id: req.user.id });
        if (isAdmin) {
            res.status(200).json({
                success: true,
                message: "is admin",
            })
        } else {
            res.status(404).json({
                success: false,
                message: "not admin"
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const verifyOtp = async (req, res)=>{
    const admin = await adminModel.findOne({username: req.body.username});
    if (admin && admin.otp === req.headers.otp) {
        // Update the `verified` field to true
        admin.verified = true;
        await admin.save();

        // Respond with a success message
        res.status(200).json({ message: 'OTP verified successfully.', verified: true });
    }else{
        res.status(400).json({ message: 'Invalid OTP.', verified: false });
    }
}