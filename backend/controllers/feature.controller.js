import featureModule from "../models/feature.module.js";

// ✅ CREATE
export const createFeature = async (req, res) => {
    try {
        const { name, description, icon, active } = req.body;

        const feature = await featureModule.create({
            name,
            description,
            icon,
            active
        });

        res.status(201).json({
            success: true,
            message: "Feature Added Successfully",
            feature
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ✅ GET ALL
export const getFeature = async (req, res) => {
    try {
        const data = await featureModule.find();

        res.status(200).json({
            success: true,
            resultObj: data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ✅ UPDATE
export const updateFeature = async (req, res) => {
    try {
        const { id } = req.params;

        const oldData = await featureModule.findById(id);

        if (!oldData) {
            return res.status(404).json({
                success: false,
                message: "Feature Not Found"
            });
        }

        const updateData = {
            name: req.body.name,
            description: req.body.description,
            icon: req.body.icon,
            active: req.body.active
        };

        const data = await featureModule.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Feature Updated Successfully",
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ✅ DELETE
export const deleteFeature = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await featureModule.findById(id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Feature Not Found"
            });
        }

        await featureModule.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Feature Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};