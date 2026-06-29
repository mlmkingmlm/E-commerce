import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import productRoute from "./routes/product.route.js";
import mainCategoryRoute from "./routes/mainCategory.route.js"
import subCategoryRoute from "./routes/subCategory.route.js"
import brandRoute from "./routes/brand.route.js"
import faqRoute from "./routes/faq.route.js"
import featureRoute from "./routes/feature.route.js"
import userRoute from "./routes/user.route.js"
import wishListRoute from "./routes/wishlist.route.js"
import cartRoute from "./routes/cart.route.js"
import userAddressRoute from "./routes/userAddress.route.js"
import checkoutRoutes from "./routes/checkout.route.js"
import cors from "cors";


const app = express();
app.use(cors());

// middleware
app.use(express.json());

// routes
app.use("/api/product", productRoute);
app.use("/api/maincategory", mainCategoryRoute);
app.use("/api/subcategory", subCategoryRoute);
app.use("/api/brand", brandRoute);
app.use("/api/faq", faqRoute)
app.use("/api/feature", featureRoute)
app.use("/api/user", userRoute)
app.use("/api/wishlist", wishListRoute)
app.use("/api/cart", cartRoute)
app.use("/api/address", userAddressRoute)
app.use("/api/checkout", checkoutRoutes)

app.get("/", (req, res) => {
  res.send("running")
})

// DB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected with DB");

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });

  } catch (error) {
    console.log("❌ DB Error:", error.message);
    process.exit(1);
  }
};

connectDB();