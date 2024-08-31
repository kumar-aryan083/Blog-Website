import homeModel from "../models/home.model.js";

export const editHomeArray = async (req, res) => {
    try {
        const updatedHome = await homeModel.findOneAndUpdate(
            {},
            {homeRow: req.body},
            {new: true}
        );
        res.status(200).json({
            success: true,
            message: 'Home array updated successfully',
            data: updatedHome
        });
    } catch (error) {
        console.error(error);
        res.status(500). json({
            success: false,
            message: 'An error occurred while updating the home array'
        })
    }
}

export const findStucture = async (req, res) => {
    try {
        const structure = await homeModel.find();
        res.status(200).json({
            structure
        })
    } catch (error) {
        
    }
}