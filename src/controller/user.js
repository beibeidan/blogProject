const { exec, escape } = require('../db/mysql')
const { generatePassword } = require('../utils/cryp')
const userLogin = (username, password) => {
    username = escape(username)
    password = generatePassword(password)
    password = escape(password)
    console.log('看看密码是啥', password)
    let sql = `select username, realname from users where username=${username} and password=${password}`
    return exec(sql).then(res => {
        return res[0] || {}
    })
}
module.exports = {
    userLogin
}