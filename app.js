// 处理请求回调
const querystring = require('querystring');
const {set, get } = require('./src/db/redis')
const handleBlog = require('./src/router/blog')
const handleUser = require('./src/router/user')

// 定义session数据
const SESSION_DATA = {}

// 处理请求数据
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        // get请求 没有参数直接返回空就可以，不存在报错
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        // headers如果不是application/json，暂时忽略
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk;
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise
}
const getCookieExpire = () => {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
    return d.toGMTString()

}
const serviceHandle = (req, res) => {
    // 请求数据格式
    res.setHeader('Content-type', 'application/json')

    // 获取url和需要传递的路径
    const url = req.url;
    req.path = url.split('?')[0];

    // 解析请求参数
    req.query = querystring.parse(url.split('?')[1])

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=');
        const key = arr[0].trim();
        const val = arr[1].trim();
        req.cookie[key] = val;
    });

    // // 解析session
    // let needCookie = false; // 是否需要写入cookie的标识
    // let userId = req.cookie.userid;
    // if (userId) {
    //     if (!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {};
    //     }
    // } else {
    //     // 如果cookie中没有userid，要将userid写入cookie中
    //     needCookie = true;
    //     userId = `${Date.now()}_${Math.random()}`; // 没有的话赋值为一个随机数
    //     SESSION_DATA[userId] = {};
    // }
    // req.session = SESSION_DATA[userId];

    // 解析session (使用redis)
    let needCookie = false; // 是否需要写入cookie的标识
    let userId = req.cookie.userid;
    if (!userId) {
        needCookie = true;
        userId = `${Date.now()}_${Math.random()}`; // 没有的话赋值为一个随机数
        set(userId, {})
    }
    req.sessionId = userId;
    get(req.sessionId).then(sessionData => {
        if (sessionData == null) {
            set(req.sessionId, {})
        }
        req.session = sessionData
        console.log('req.session is', req.session)
    })


    getPostData(req).then(postData => {
        req.body = postData

        // 处理博客路由
        const blogResult = handleBlog(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                // 根据needCookie的值判断是否需要设置cookie
                if (needCookie) {
                    // 即生成userid之后要写入cookie中
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/ ;httpOnly; expires=${getCookieExpire()}`)
                }
                res.end(JSON.stringify(blogData))
            })
            return
        }

        // 处理用户路由
        const userResult = handleUser(req, res);
        if (userResult) {
            userResult.then(userData => {
                if (needCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/ ;httpOnly; expires=${getCookieExpire()}`)
                }
                res.end(JSON.stringify(userData))
            })
            return
        }
    })


}
module.exports = serviceHandle;