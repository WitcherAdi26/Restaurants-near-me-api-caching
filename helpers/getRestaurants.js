import restaurantModel from "../models/restaurantModel.js";
import checkCache from "./checkCache.js";
import { redisClient } from "../middlewares/checkRedisClient.js";

// to get all restaurant either from cache or database
const getRestaurants=async()=>{
    const isCachePresent=await checkCache("restaurants");
    if(isCachePresent==null){
        let restaurants=await restaurantModel.find();
        const restos=JSON.stringify(restaurants);

        // cache response
        await redisClient.set('restaurants', restos, 'EX', 3600);
        restaurants=await JSON.parse(restos);
        return restaurants;
    }else{
        return isCachePresent;
    }
}

export default getRestaurants;