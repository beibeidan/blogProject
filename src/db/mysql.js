const mysql = require('mysql');
const { MYSQL_CONF } = require('../conf/db')

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()

// 执行sql统一成一个函数
function exec(sql) {
    // 因为执行结果是异步的，所以要用promise封装
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, res) => {
            if (err) {
                reject(err)
                return
            }
            resolve(res)

        })
    })
    return promise
}

module.exports = {
    exec,
    escape: mysql.escape
}