import redis from 'redis';

let redisClient;

// Middleware to check Redis client state
const checkRedisClient = async(req, res, next) => {
    if (await redisClient) {
        next();
    } else {
        redisClient = redis.createClient({
            url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
        });

        await redisClient.connect();

        await redisClient.on('connect', (err)=>{
            if(err) throw err;
            else console.log('Redis Connected..!');
        });

        next();
    }
};

export {redisClient};
export default checkRedisClient;
