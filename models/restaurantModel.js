import mongoose from "mongoose";

const RestaurantsSchema=new mongoose.Schema({
    
});

const restaurantModel=mongoose.model.restaurants;

export default restaurantModel || mongoose.model("restaurants",RestaurantsSchema);