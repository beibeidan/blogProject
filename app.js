// 处理请求回调
const querystring = require('querystring');
const handleBlog = require('./src/router/blog')
const handleUser = require('./src/router/user')

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
        const key = arr[0];
        const val = arr[1];
        req.cookie[key] = val;
    });

    getPostData(req).then(postData => {
        req.body = postData

        // 处理博客路由
        const blogResult = handleBlog(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(JSON.stringify(blogData))
            })
            return
        }

        // 处理用户路由
        const userResult = handleUser(req, res);
        if (userResult) {
            userResult.then(userData => {
                res.end(JSON.stringify(userData))
                return
            })
        }
    })


}
module.exports = serviceHandle;