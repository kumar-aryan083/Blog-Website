import homeModel from "../models/home.model.js";

export const editHomeArray = async (req, res) => {
    try {
        // Log the request body for debugging

        // Update the document in the collection
        const updatedHome = await homeModel.findOneAndUpdate(
            {},
            { homeRow: req.body }, // Update with the array of ObjectIds
            { new: true, upsert: true } // Return the updated document and create one if it doesn't exist
        );

        // Respond with success if the update is successful
        res.status(200).json({
            success: true,
            message: 'Home array updated successfully',
            data: updatedHome
        });
    } catch (error) {
        console.error('Error updating home array:', error); // Log the error for debugging

        // Respond with an error message if something goes wrong
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating the home array'
        });
    }
};


export const findStucture = async (req, res) => {
    try {
        const structure = await homeModel.find();
        res.status(200).json({
            structure
        })
    } catch (error) {
        
    }
}