const {Schema, model} = require("mongoose");

const division_PriceSchema = new Schema({
    currentMinPrice: { type: Number,  trim: true },
    currentMaxPrice: { type: Number, trim: true },
    
    lastWeekMinPrice: { type: Number, trim: true },
    lastWeekMaxPrice: { type: Number, trim: true },
    
    price_Difference_current_lastWeek: { type: Number, trim: true },
    
    lastMonthMinPrice: { type: Number, trim: true },
    lastMonthMaxPrice: { type: Number, trim: true },
    
    price_Difference_current_lastMonth: { type: Number, trim: true },
    
    lastYearPrice: { type: Number, trim: true }
})


const productSchema = new Schema({
    productName: { type: String, required: true, trim: true, index: { collation: { locale: 'en', strength: 2 } } },
    productMeasurement: { type: String, required: true, trim: true },
    productType: { type: String, required: true, trim: true },
    
    price: {
        dhaka_division_price: {type: division_PriceSchema},
        rajshahi_division_price: {type: division_PriceSchema},
        khulna_division_price: {type: division_PriceSchema},
        barishal_division_price: {type: division_PriceSchema},
        chottogram_division_price: {type: division_PriceSchema},
        sylhet_division_price: {type: division_PriceSchema},
        mymensingh_division_price: {type: division_PriceSchema},
        rangpur_division_price: {type: division_PriceSchema},
    },
    porductAvater: {type: String}
})

const Product = new model("product", productSchema)

module.exports = Product;