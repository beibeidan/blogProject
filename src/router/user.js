const { SuccessModel, ErrorModel } = require('../model/resModel')
const { userLogin } = require('../controller/user')
const handleUser = (req, res) => {
    const method = req.method;

    // 登录
    if (method === 'GET' && req.url === '/user/login') {
        // const {
        //     username,
        //     password
        // } = req.body;
        const {
            username,
            password
        } = req.query;
        console.log('看看用户名和密码', username, password)
        const result = userLogin(username, password);
        return result.then(res => {
            if (res.username) {
                // 设置cookie的时候一定要把路径设置为根目录
                // res.setHeader('Set-Cookie', `username=${res.username}; path=/`)
                return new SuccessModel()
            }
            return new ErrorModel('登陆失败')
        })
    }

    // 登录验证
    if (method === 'GET' && req.path === '/user/logintest') {
        if (req.cookie.username) {
            return Promise.resolve(new SuccessModel())
        }
        return Promise.resolve(new ErrorModel('尚未登录'))
    }
}
module.exports = handleUser