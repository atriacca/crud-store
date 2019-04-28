const mongoose = require('mongoose')
const Schema = mongoose.Schema

const inventorySchema = new Schema({
    item: {
        type: String,
        required: true
    },
    dept: {
        type: String,
        required: true,
        enum: ["skiing", "football", "baseball", "volleyball"]
    },
    isInStock: {
        type: Boolean,
        default: true
    },
    price: {
        type: Number,
        default: true
    }
})
                            // Model Name    // Model Blueprint
module.exports = mongoose.model("InventoryModel", inventorySchema)

