import Wishlist from "../models/wishlist.module.js"

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body

    const item = await Wishlist.create({
      user: req.user._id,
      product: productId,
    })

    res.status(201).json({
      success: true,
      message: "Added to wishlist",
      item,
    })
  } catch (error) {

    // Duplicate product handle
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Already in wishlist",
      })
    }

    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getWishlist = async (req, res) => {
  try {
    const data = await Wishlist.find({
      user: req.user._id,
    }).populate("product")

    res.status(200).json({
      success: true,
      resultObj: data,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const removeWishlist = async (req, res) => {
  try {
    console.log(req.params.id)
    await Wishlist.findOneAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: "Removed from wishlist",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}