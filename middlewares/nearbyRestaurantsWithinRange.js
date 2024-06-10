import getRestaurants from "../helpers/getRestaurants.js";
import getDistance from "../helpers/getDistance.js";


const nearbyRestaurantsWithinRange=async (req, res) => {
    const {latitude,longitude,minimumDistance,maximumDistance}=req.body;
    if (!latitude || !longitude || !minimumDistance || !maximumDistance) {
        return res.status(400).json({msg:'All fields are required'});
    }

    // gets list of all restaurants from either cache or database
    let restaurants=await getRestaurants();

    const rangeRestaurants=restaurants.filter(r=>{
        const distance=getDistance(latitude,longitude,r.address.coord[0],r.address.coord[1]);
        return distance>=minimumDistance && distance<=maximumDistance;
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

    return res.status(200).json({"Restaurants within specified range ":rangeRestaurants});
};

export default nearbyRestaurantsWithinRange;