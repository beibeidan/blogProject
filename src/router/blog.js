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

    // 新增博客接口
    if (method === 'POST' && req.path === '/blog/add') {
        const blogData = req.body;
        const result = blogAdd(blogData);
        return result.then(res => {
            return new SuccessModel(res)
        })
    }

    // 博客详情接口
    if (method === 'GET' && req.path === '/blog/detail') {
        const result = blogDetail(id);
        return result.then(res => {
            return new SuccessModel(res)
        })
    }

    // 博客列表接口
    if (method === 'GET' && req.path === '/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const result = bloglist(author, keyword);
        return result.then(res => {
            return new SuccessModel(res)
        })
    }

    // 博客删除接口
    if (method === 'POST' && req.path === '/blog/del') {
        const result = blogDelete(id)
        return result.then(res => {
            if (res) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除失败')
            }
        })
    }

    // 博客更新接口
    if (method === 'POST' && req.path === '/blog/update') {
        const result = blogUpdate(id, req.body);
        return result.then(res => {
            if (res) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新失败')
            }

        })
    }
}
module.exports = handleBlog