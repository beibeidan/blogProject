const { exec, escape } = require('../db/mysql')
const userLogin = (username, password) => {
    username = escape(username)
    password = escape(password)
    let sql = `select username, realname from users where username=${username} and password=${password}`
    return exec(sql).then(res => {
        return res[0] || {}
    })
}
module.exports = {
    userLogin
}