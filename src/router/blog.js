const {
    bloglist,
    blogDetail,
    blogAdd,
    blogUpdate,
    blogDelete
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const handleBlog = (req, res) => {
    const method = req.method;
    const id = req.query.id;
    const ids = req.query.ids;

    // 新增博客接口
    if (method === 'POST' && req.path === '/blog/add') {
        let result = blogAdd();
        if (result) {
            return new SuccessModel(result)
        }
        // console.log('这是博客新增')
    }

    // 博客详情接口
    if (method === 'GET' && req.path === '/blog/detail') {
        let result = blogDetail(id);
        if (result) {
            return new SuccessModel(result)
        }
    }

    // 博客列表接口
    if (method === 'GET' && req.path === '/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        let result = bloglist(author, keyword)
        if (result) {
            return new SuccessModel(result)
        }
    }

    // 博客删除接口
    if (method === 'POST' && req.path === '/blog/del') {
        let result = blogDelete(ids)
        if (result) {
            return new SuccessModel(result)
        }
    }

    // 博客更新接口
    if (method === 'POST' && req.path === '/blog/update') {
        let result = blogUpdate(id);
        if (result) {
            return new SuccessModel(result)
        }
    }
}
module.exports = handleBlog