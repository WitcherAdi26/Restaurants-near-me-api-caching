import { redisClient } from "../middlewares/checkRedisClient.js";

// To check weathers restaurants data is available in cache or not
const checkCache = async(cache) => {
    try{
        const data = await redisClient.get(cache);
        if(data!=null){
            const restos=await JSON.parse(data);
            return restos;
        }
        return null;
      }catch(error){
        console.error('Redis error:', error);
        return {};
      }
};

export default checkCache;