const asyncHandler = require("../utils/asyncHandler")
const ApiError = require("../utils/ApiError")
const ApiResponse = require("../utils/ApiResponse")
const Product = require("./Product.model")
const uploadOneCloudinary = require("./cloudinary")

const Home = asyncHandler(async(req, res)=> {
    try {
        res.status(200).json("this is koto home")
    } catch (error) {
        console.log("home test", error)
    }
})

const PostProduct = asyncHandler(async(req, res) => {
    const { productName, productMeasurement, productType } = req.body;
    const price = JSON.parse(req.body.price); // Add this line

   // Validate top-level required fields
   if(!productName || !productMeasurement || !productType){
        throw new ApiError(400, "Product name, measurement, product type are required")
   }

   if (!price || typeof price !== 'object') {
    throw new ApiError(400, "Invalid price format");
   }

   const divisions = Object.keys(price);

   if(divisions.length === 0) { throw new ApiError(400, "At least one division price data must be provided"); }

   // Process each division's price data
   for(const divisionKey of divisions){
        const divisionData = price[divisionKey]

        // Validate required fields for each division
        if(!divisionData.currentMinPrice && !divisionData.currentMaxPrice) {throw new ApiError(400, "currentMinPrice and currentMaxPrice prices are required")}

        // Convert all numerical fields to Numbers
        const numericalFields = [
            'currentMinPrice', 'currentMaxPrice',
            'lastWeekMinPrice', 'lastWeekMaxPrice',
            'lastMonthMinPrice', 'lastMonthMaxPrice',
            'lastYearPrice'
        ];

        numericalFields.forEach(element => {
            if(divisionData[element]){
                divisionData[element] = Number(divisionData[element])
            }
        });

        // Calculate price differences if available
        if(divisionData.lastWeekMaxPrice){
            divisionData.price_Difference_current_lastWeek = Number( ((divisionData.currentMaxPrice - divisionData.lastWeekMaxPrice) / divisionData.lastWeekMaxPrice * 100).toFixed(2) );
        }

        if(divisionData.lastMonthMaxPrice) {
            divisionData.price_Difference_current_lastMonth = Number( ((divisionData.currentMaxPrice - divisionData.lastMonthMaxPrice) / divisionData.lastMonthMaxPrice * 100).toFixed(2) );
        }
    }

    const productAvaterPath = req.file?.path
    if(!productAvaterPath) {throw new ApiError(400, "product avater path not found")}

    const porductAvater = await uploadOneCloudinary(productAvaterPath)
    if(!porductAvater) {throw new ApiError(400, "product avater not found")}

    const createNewProduct = await Product.create({
        productName: productName,
        productMeasurement: productMeasurement,
        productType: productType,
        price: price,
        porductAvater:porductAvater?.url
    })

    if(!createNewProduct){ throw new ApiError(400, "Failed to save product")}

    res.status(201).json(new ApiResponse(201, createNewProduct, "new product created"))

});

const GetAllProducts = asyncHandler(async(req, res) => {
    const allProducts = await Product.find({})

    if(!allProducts) { throw new ApiError(400, "not product found")}

    res.status(200).json(new ApiResponse(200, allProducts, "all products"))
})

const GetAllProductByDivisionAndType = asyncHandler(async (req, res) => {
    const { division, productType } = req.query;

    // Check if division is provided
    if (!division) {
        return res.status(400).json(new ApiResponse(400, null, "Division is required"));
    }

    const fieldPath = `price.${division}`;

    // Build query object
    const query = {
        [fieldPath]: { $exists: true }
    };

    // Add productType to query if provided
    if (productType) {
        query.productType = productType;
    }

    // Build projection to include required fields
    const projection = {
        productName: 1,
        productType: 1,
        [fieldPath]: 1,
        porductAvater: 1
    };

    const filtered_data = await Product.find(query, projection);

    res.status(200).json(new ApiResponse(200, filtered_data, "Filtered data by division and product type"));
});

const GetOnlyProductByType = asyncHandler(async(req, res) => { // fruits, vegetables etc
    
    const DataByType = await Product.find({}).select({productType: 1, _id: 0})
    
    if(!DataByType){ throw new ApiError(400, "this type of product is not available")}

    res.status(200).json(new ApiResponse(200, DataByType, ""))
})

const GetSearchProduct = asyncHandler(async(req, res)=>{
    const { division, productName } = req.query;

    // Check if division is provided
    if (!division) {
        return res.status(400).json(new ApiResponse(400, null, "Division is required"));
    }

    const fieldPath = `price.${division}`;

    // Build query object
    const query = {
        [fieldPath]: { $exists: true }
    };

    // Add productType to query if provided
    if (productName) {
        query.productName = {$regex: productName, $options: "i"};
    }

    // Build projection to include required fields
    const projection = {
        productName: 1,
        productType: 1,
        [fieldPath]: 1,
        porductAvater: 1
    };

    const filtered_data = await Product.find(query, projection);

    res.status(200).json(new ApiResponse(200, filtered_data, "searched data by division and product name"));

})

const GetAllProduct_A_Z = asyncHandler(async (req, res) => {
    const { division } = req.query;

    // Check if division is provided
    if (!division) {
        return res.status(400).json(new ApiResponse(400, null, "Division is required"));
    }

    const fieldPath = `price.${division}`;

    // Build query object
    const query = {
        [fieldPath]: { $exists: true }
    };

    // Build projection to include required fields
    const projection = {
        productName: 1,
        productType: 1,
        [fieldPath]: 1,
        porductAvater: 1
    };

    const filtered_data = await Product.find(query, projection).collation({ locale: 'en', strength: 2 }).sort({productName: 1});

    res.status(200).json(new ApiResponse(200, filtered_data, "A-Z filtered data by division and product name"));

})

const GetAllProduct_Z_A = asyncHandler(async (req, res) => {
    const { division } = req.query;

    // Check if division is provided
    if (!division) {
        return res.status(400).json(new ApiResponse(400, null, "Division is required"));
    }

    const fieldPath = `price.${division}`;

    // Build query object
    const query = {
        [fieldPath]: { $exists: true }
    };

    // Build projection to include required fields
    const projection = {
        productName: 1,
        productType: 1,
        [fieldPath]: 1,
        porductAvater: 1
    };

    const filtered_data = await Product.find(query, projection).collation({ locale: 'en', strength: 2 }).sort({productName: -1});

    res.status(200).json(new ApiResponse(200, filtered_data, "A-Z filtered data by division and product name"));
})

const GetAllProduct_LOW_HIGH = asyncHandler(async (req, res) => {
    const { division } = req.query;

    // Check if division is provided
    if (!division) {
        return res.status(400).json(new ApiResponse(400, null, "Division is required"));
    }

    const fieldPath = `price.${division}`;

    // Build query object
    const query = {
        [fieldPath]: { $exists: true }
    };

    // Build projection to include required fields
    const projection = {
        productName: 1,
        productType: 1,
        [fieldPath]: 1,
        porductAvater: 1
    };

    const filtered_data = await Product.find(query, projection).collation({ locale: 'en', strength: 2 }).sort({ [fieldPath]: 1});

    res.status(200).json(new ApiResponse(200, filtered_data, "low-high filtered data by division and product name"));
})

const GetAllProduct_HIGH_LOW = asyncHandler(async (req, res) => {
    const { division } = req.query;

    // Check if division is provided
    if (!division) {
        return res.status(400).json(new ApiResponse(400, null, "Division is required"));
    }

    const fieldPath = `price.${division}`;

    // Build query object
    const query = {
        [fieldPath]: { $exists: true }
    };

    // Build projection to include required fields
    const projection = {
        productName: 1,
        productType: 1,
        [fieldPath]: 1,
        porductAvater: 1
    };

    const filtered_data = await Product.find(query, projection).collation({ locale: 'en', strength: 2 }).sort({ [fieldPath]: -1});

    res.status(200).json(new ApiResponse(200, filtered_data, "high-low filtered data by division and product name"));
})

const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id
    await Product.deleteOne({_id:id})
    res.status(200).json(new ApiResponse(200, {}, "product deleted"))
})

module.exports = {Home, PostProduct, GetAllProducts, GetAllProductByDivisionAndType, GetOnlyProductByType, GetSearchProduct, deleteProduct,
    GetAllProduct_A_Z, GetAllProduct_Z_A, GetAllProduct_LOW_HIGH, GetAllProduct_HIGH_LOW
}
