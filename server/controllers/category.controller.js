import blogModel from '../models/blog.model.js';
import categoryModel from '../models/category.model.js'

export const allCat = async (req, res) => {
    try {
        // Fetch categories and populate the 'blogs' field
        const categories = await categoryModel.find().populate('blogs');

        res.status(200).json({
            success: true,
            message: 'Categories Fetched Successfully',
            categories
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' }); 
    }
};


export const addNewCat = async (req, res) => {
    try {
        // Check if a category with the same name already exists
        const preCat = await categoryModel.findOne({ catName: req.body.catName });
        
        if (preCat) {
            return res.status(403).json({
                success: false,
                message: 'Category already exists'
            });
        } else {
            // Create a new category with the request data
            const newCategory = new categoryModel({
                ...req.body
            });

            // Save the new category to the database
            await newCategory.save();

            // Fetch all categories and populate the 'blogs' field
            const allCategories = await categoryModel.find().populate('blogs');

            res.status(200).json({
                success: true,
                message: 'Category added successfully',
                allCategories
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const deleteCat = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findById(id); 

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        await blogModel.deleteMany({ _id: { $in: category.blogs } });
        await category.deleteOne();
        const categories = await categoryModel.find();
        res.status(200).json({ message: 'Category and related blogs deleted successfully', categories});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
export const updateCat = async (req, res) => {
    try {
        // console.log(req.body);
        const category = await categoryModel.findById(req.params.id);
        category.catName = req.body.catName;
        await category.save();
        const categories = await categoryModel.find();
        res.status(200).json({
            success: true,
            message: "category updated",
            categories
        })
    } catch (error) {
        console.log(error)
    }
}
export const catById = async (req, res) => {
    try {
        const cat = await categoryModel.findOne({_id: req.params.id});
        const fullCat = await cat.populate({
            path: 'blogs',
            populate: [
                {path: 'cat', select: 'catName'}
            ]
        });
        res.status(200).json({
            success: true,
            message: "fetched succesfully",
            catBlog: fullCat
        })
    } catch (error) {
        
    }
}
export const catByName = async (req, res) => {
    try {
        const cat = await categoryModel.findOne({catName: req.params.catName});
        const fullCat = await cat.populate({
            path: 'blogs',
            populate: [
                {path: 'cat', select: 'catName'}
            ]
        });
        res.status(200).json({
            success: true,
            message: "fetched succesfully",
            catBlog: fullCat
        })
    } catch (error) {
        
    }
}