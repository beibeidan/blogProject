const bloglist = (author, keyword) => {
    return [{
        "title": "title1",
        "content": "content1",
        "createtime": 220201029
    }]
}
const blogDetail = (id) => {
    return [{
        "title": "title2222",
        "content": "content4444",
        "createtime": 220201029
    }]
}
const blogAdd = () => {
    return true
}
const blogUpdate = (id) => {
    return true
}
const blogDelete = (ids) => {
    return true
}
module.exports = {
    bloglist,
    blogDetail,
    blogAdd,
    blogUpdate,
    blogDelete
}