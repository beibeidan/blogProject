const crypto = require('crypto')

// 密匙（ 用于和密码一起加密）

const SECRET_KEY = 'SWJk@sdfk_21389$'

function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex') // 最终转换为十六进制
}

function generatePassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}
console.log(generatePassword('123'))

module.exports = {
    generatePassword
}