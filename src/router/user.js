const { SuccessModel, ErrorModel } = require('../model/resModel')
const { userLogin } = require('../controller/user');
const { set } = require('../db/redis');

// const getCookieExpire = () => {
//     const d = new Date();
//     d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
//     return d.toGMTString()

// }
const handleUser = (req, res) => {
    const method = req.method;

    // 登录
    if (method === 'GET' && req.path === '/user/login') {

        const {
            username,
            password
        } = req.query;
        // const {
        //     username,
        //     password
        // } = req.body;
        const result = userLogin(username, password);
        return result.then(data => {
            if (data.username) {
                // 设置cookie的时候一定要把路径设置为根目录
                // res.setHeader('Set-Cookie', `username=${data.username}; path=/ ;httpOnly; expires=${getCookieExpire()}`)

                // 设置session
                req.session.username = data.username;
                req.session.realname = data.realname;

                // 登陆后将信息存入session中
                set(req.sessionId, req.session)
                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })
    }

    // 登录验证
    if (method === 'GET' && req.path === '/user/logintest') {
        if (req.session.username) {
            return Promise.resolve(new SuccessModel({
                session: req.session
            }))
        }
        return Promise.resolve(new ErrorModel('尚未登录'))
    }
}
module.exports = handleUser