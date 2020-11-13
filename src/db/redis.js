const { REDIS_CONF } = require('../conf/db')
const redis = require('redis');

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

function set(key, val) {
    redisClient.set(key, val, redis.print)
}

function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
            }
            if (val == null) {
                resolve(null)
            }
            try {
                resolve(JSON.parse(val))
            } catch {
                resolve(val)
            }
        })
    })
    return promise
}
module.exports = {
    set,
    get
}