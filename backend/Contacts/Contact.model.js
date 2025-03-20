const {Schema, model} = require('mongoose')

const contactDataSchema = new Schema({

    userName: {type: String, required: true, trim:true},

    email: {type: String, required: true, trim:true}, 

    message: {type:String, required: true, trim:true}  

})

const Contact = new model('contact', contactDataSchema)

module.exports = Contact
