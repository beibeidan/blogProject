const { exec } = require('../db/mysql')
const userLogin = (username, password) => {
    let sql = `select username, realname from users where username='${username}' and password='${password}'`
    return exec(sql).then(res => {
        return res[0] || {}
    })
}
module.exports = {
    userLogin
}