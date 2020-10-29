const { SuccessModel } = require("../model/resModel");

const { SuccessModel, ErrorModel } = require('../model/resModel')
const { userLogin } = require('../controller/user')
const handleUser = (req, res) => {
    const method = req.method;
    if (method === 'POST' && req.url === '/login') {
        let result = userLogin(username, password);
        if (result) {
            return new SuccessModel(result)
        }
    }
}
module.exports = handleUser