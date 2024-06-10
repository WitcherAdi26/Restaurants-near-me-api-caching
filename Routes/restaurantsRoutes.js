import express from "express";
import nearbyRestaurantsWithinRadius from "../middlewares/nearbyRestaurantsWithinRadius.js";
import nearbyRestaurantsWithinRange from "../middlewares/nearbyRestaurantsWithinRange.js";

const restoRouter=express.Router();

// restaurants home
restoRouter.get("",(req,res)=>{
    res.send("<h1>Resto</h1>");
});

// POST request based on Latitude and longitude with specified radius
restoRouter.post('/radius',nearbyRestaurantsWithinRadius);

// POST request based on Latitude and longitude with specified radius range
restoRouter.post('/range',nearbyRestaurantsWithinRange);


export default restoRouter;