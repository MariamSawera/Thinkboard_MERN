import {Ratelimit} from "@upstash/ratelimit"
import {Redis} from "@upstash/redis"

import dotenv from "dotenv";
dotenv.config();
//create a rate limit 10 req per 20s
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
        limiter:Ratelimit.slidingWindow(10,"20 s")
    
})

export default ratelimit;