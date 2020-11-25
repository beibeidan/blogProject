const fs = require('fs')
const path = require('path')
const readline = require('readline')

const fileName = path.resolve(__dirname, '../', '../', 'logs', 'access.log')
const readStream = fs.createReadStream(fileName)

const rl = readline.createInterface({
    input: readStream // 读入的文件流
})


let chromeNum = 0;
let sum = 0;
// 逐行读取
rl.on('line', (lineData) => {
    if (!lineData) {
        return
    }
    // 判断总行数
    sum++
    const arr = lineData.split(' -- ')
    if (arr[2] && arr[2].indexOf('Chrome') > 0) {
        chromeNum++
    }
})
rl.on('close', () => {
    console.log('chrome 占比', chromeNum / sum)
})