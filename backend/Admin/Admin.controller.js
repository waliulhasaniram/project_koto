const asyncHandler = require("../utils/asyncHandler")
const User = require("../Users/User.model") 
const Product = require("../Product/Product.model")
const ApiError = require("../utils/ApiError")
const ApiResponse = require("../utils/ApiResponse")

const GetAllUsers = asyncHandler(async(req, res)=>{
    const allUsers = await User.find({})

    if(!allUsers) {throw new ApiError(400, "not users are available")}

    res.status(200).json(new ApiResponse(200, allUsers, "all users"))
})

const adminUpdatesUserData = asyncHandler(async(req, res)=>{
    const id = req.params.id

    if(!id) {throw new ApiError(400, "id is not available")}

    const collectUpdatedData = req.body

    if(!collectUpdatedData) {throw new ApiError(400, "cannot collect updated data")}

    const updatedData = await User.updateOne({_id:id}, {$set: collectUpdatedData})

    if(!updatedData) {throw new ApiError(400, "updated data not found")}

    res.status(200).json(new ApiResponse(200, updatedData, "updated use data"))
})

const adminDeletesUser = asyncHandler(async(req, res) => {
    const id = req.params.id
    if(!id) {throw new ApiError(400, "id not found")}

    const deleteUser = await User.deleteOne({_id:id})
    res.status(200).json(new ApiResponse(200, {}, "one user deleted"))
})


const adminGetAllProduct = asyncHandler(async(req, res)=>{
    const allProducts = await Product.find({})

    if(!allProducts) {throw new ApiError(400, "no product found")}

    res.status(200).json(new ApiResponse(200, allProducts, "these are all the products"))
})

const adminSearchProduct = asyncHandler(async (req, res) => {
    const { productName } = req.query;

    // // Build query object
    const query = {};

    // Add productType to query if provided
    if (productName) {
        query.productName = {$regex: productName, $options: "i"};
    }

    const filtered_data = await Product.find(query);

    res.status(200).json(new ApiResponse(200, filtered_data, "searched data by product name"));
})

const productPriceUpdate = asyncHandler(async(req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) throw new ApiError(400, "Product ID is required");
  
      // Directly access price from request body
      const price = req.body.price;
  
      // Add validation for empty price object
      if (!price || typeof price !== 'object' || Object.keys(price).length === 0) {
        throw new ApiError(400, "Valid price data required for at least one division");
      }
  
      // Process price data
      const processedPrice = {};
      for (const [divisionKey, divisionData] of Object.entries(price)) {
        // Validate required fields
        if (typeof divisionData.currentMinPrice === 'undefined' || 
            typeof divisionData.currentMaxPrice === 'undefined') {
          throw new ApiError(400, `${divisionKey} requires both currentMinPrice and currentMaxPrice`);
        }
  
        // Convert numerical fields
        processedPrice[divisionKey] = {
          currentMinPrice: Number(divisionData.currentMinPrice),
          currentMaxPrice: Number(divisionData.currentMaxPrice),
          lastWeekMinPrice: divisionData.lastWeekMinPrice ? Number(divisionData.lastWeekMinPrice) : undefined,
          lastWeekMaxPrice: divisionData.lastWeekMaxPrice ? Number(divisionData.lastWeekMaxPrice) : undefined,
          lastMonthMinPrice: divisionData.lastMonthMinPrice ? Number(divisionData.lastMonthMinPrice) : undefined,
          lastMonthMaxPrice: divisionData.lastMonthMaxPrice ? Number(divisionData.lastMonthMaxPrice) : undefined,
          lastYearPrice: divisionData.lastYearPrice ? Number(divisionData.lastYearPrice) : undefined
        };
  
        // Calculate differences
        if (processedPrice[divisionKey].lastWeekMaxPrice) {
          processedPrice[divisionKey].price_Difference_current_lastWeek = Number(
            ((processedPrice[divisionKey].currentMaxPrice - 
             processedPrice[divisionKey].lastWeekMaxPrice) / 
             processedPrice[divisionKey].lastWeekMaxPrice * 100
            ).toFixed(2)
          );
        }
  
        if (processedPrice[divisionKey].lastMonthMaxPrice) {
          processedPrice[divisionKey].price_Difference_current_lastMonth = Number(
            ((processedPrice[divisionKey].currentMaxPrice - 
             processedPrice[divisionKey].lastMonthMaxPrice) / 
             processedPrice[divisionKey].lastMonthMaxPrice * 100
            ).toFixed(2)
          );
        }
      }
  
      // Update only the price field
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: { price: processedPrice } },
        { new: true, runValidators: true }
      );
  
      if (!updatedProduct) {
        throw new ApiError(404, "Product not found");
      }
  
      res.status(200).json(new ApiResponse(
        200, 
        updatedProduct,
        "Product prices updated successfully"
      ));
  
    } catch (error) {
      console.error("Backend error:", error);
      if (error.name === 'CastError') {
        throw new ApiError(400, "Invalid product ID format");
      }
      if (error.name === 'ValidationError') {
        throw new ApiError(400, error.message);
      }
      throw new ApiError(500, error.message || "Price update failed");
    }
  });

  

module.exports = {GetAllUsers, adminUpdatesUserData, adminDeletesUser, adminGetAllProduct, adminSearchProduct, productPriceUpdate}