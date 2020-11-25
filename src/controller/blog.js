const { exec, escape } = require('../db/mysql');
const xss = require('xss')
const bloglist = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        author = escape(author)
        sql += `and author = ${author} `;
    }
    if (keyword) {
        keyword = escape(keyword)
        sql += `and title like '%${keyword}%' `;
    }
    sql += `order by createtime desc`

    // 这里返回的是一个promise
    return exec(sql)
}
const blogDetail = (id) => {
    let sql = `select * from blogs where id=${id}`;
    return exec(sql).then(rows => {
        return rows[0];
    });
}
const blogAdd = (blogData = {}) => {
    const title = xss(blogData.title);
    const content = xss(blogData.content);
    const createtime = Date.now();
    const author = escape(blogData.author);
    // const author = 'zhangsan';
    // 作者应该是从登陆的地方拿到的
    let sql = `insert into blogs(title,content,createtime,author) values (${title},${content},'${createtime}',${author})`;
    return exec(sql).then(res => {
        return {
            id: res.insertId
        }
    });
}
const blogUpdate = (id, blogData = {}) => {
    const title = xss(blogData.title);
    const content = xss(blogData.content);
    let sql = `update blogs set title=${title},content=${content} where id=${id}`;
    return exec(sql).then(res => {
        if (res.affectedRows > 0) {
            return true
        }
        return false
    })
}
const blogDelete = (id, author) => {
    author = escape(author);
    let sql = `delete from blogs where id=${id} and author=${author}`
    return exec(sql).then(res => {
        if (res.affectedRows > 0) {
            return true
        }
        return false
    })
}
module.exports = {
    bloglist,
    blogDetail,
    blogAdd,
    blogUpdate,
    blogDelete
}