

// Function to calculate distance between two points using Haversine formula
const getDistance=(lat1, lon1, lat2, lon2)=>{
    function toRad(x) {
        return x*Math.PI/180;
    }

    const R=6371;
    const dLat=toRad(lat2-lat1);
    const dLon=toRad(lon2-lon1);
    const a=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)*Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R*c*1000;
};

export default getDistance;