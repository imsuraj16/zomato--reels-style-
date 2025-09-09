const foodModel = require("../models/food.model");
const foodPartnerModel = require("../models/foodPartner.model");

const foodPartnerDetails = async(req,res)=>{

    const{id} = req.params;

    const foodPartner = await foodPartnerModel.findById(id);

    if(!foodPartner){
        return res.status(404).json({message:"Food Partner not found"});
    }

    return res.status(200).json({foodPartner});

}


module.exports = foodPartnerDetails;