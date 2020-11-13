const env = process.env.NODE_ENV // 配置环境参数

let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        port: '3306',
        password: '123456',
        database: 'myblog'
    }

    // redis配置
    REDIS_CONF = {
        host: '127.0.0.1',
        port: 6379
    }
}

if (env === 'production') {
    // 这里应该是线上的服务器地址等
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        port: '3306',
        password: '123456',
        database: 'myblog'
    }
    REDIS_CONF = {
        host: '127.0.0.1',
        port: 6379
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}