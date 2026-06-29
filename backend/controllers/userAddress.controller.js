import userAddressModule from "../models/userAddress.module.js";

export const createAddress = async (req, res) => {
  try {
    const data = await userAddressModule.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      resultObj: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAddress = async (req, res) => {
  try {
    const data = await userAddressModule.find({
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      resultObj: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const oldData = await userAddressModule.findById(id);

    if (!oldData) {
      return res.status(404).json({
        success: false,
        message: "Address Not Found"
      });
    }

    const result = await userAddressModule.findByIdAndUpdate(
      id,
      {
        $set: req.body
      },
      {
        new: true,
        runValidators: true
      }
    );

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      resultObj: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    let { id } = req.params;
    console.log(id)

    const result = await userAddressModule.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({
        success: true,
        message: "Address Deleted successfully",
        resultObj:result
      });
    }

    res.status(404).json({
      success: false,
      message: "Address not found"
    })
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}