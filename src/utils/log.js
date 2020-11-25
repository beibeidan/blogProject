const fs = require('fs')
const path = require('path')

// 生成写日志流writeStream
function createWriteStream(fileName) {
    const fullName = path.resolve(__dirname, '../', '../', 'logs', fileName)
    const writeStream = fs.createWriteStream(fullName, {
        flags: 'a'
    })
    return writeStream
}

// 写访问日志
const accessWriteStream = createWriteStream('access.log') // 访问日志对象
function access(log) {
    writeLog(accessWriteStream, log)
}


// 写日志
function writeLog(writeStream, log) {
    writeStream.write(log + '\n') // 访问日志对象和访问日志
}

module.exports = {
    access
}