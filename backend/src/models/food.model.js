const mongoose = require('mongoose')


const foodSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    video: {
        type: String,
        required: true
    },

    description: {
        type: String,
    },

    foodPartner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "FoodPartner"
    }
}, { timestamps: true })

const foodModel = mongoose.model("food", foodSchema)

module.exports = foodModel;