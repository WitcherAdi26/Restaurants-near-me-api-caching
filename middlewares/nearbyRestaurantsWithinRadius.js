import getRestaurants from "../helpers/getRestaurants.js";
import getDistance from "../helpers/getDistance.js";


const nearbyRestaurantsWithinRadius=async (req, res) => {
    const {latitude,longitude,radius}=req.body;
    if (!latitude || !longitude || !radius) {
        return res.status(400).json({msg:'All fields are required'});
    }

    let restaurants=await getRestaurants();

    const nearbyRestaurants=restaurants.filter(r => {
        const distance=getDistance(latitude,longitude,r.address.coord[0],r.address.coord[1]);
        return distance<=radius;
    }).sort((a,b)=>{
        const distanceA=getDistance(latitude,longitude,a.address.coord[0],a.address.coord[1]);
        const distanceB=getDistance(latitude,longitude,b.address.coord[0],b.address.coord[1]);
        return distanceA-distanceB;
    }).map(r=>({
        restaurant_id: r.restaurant_id,
        name: r.name,
        address: r.address,
        cuisine: r.cuisine       
    }));

    return res.status(200).json({"Restaurants near you ":nearbyRestaurants});
};

export default nearbyRestaurantsWithinRadius;