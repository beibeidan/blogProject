const {
    bloglist,
    blogDetail,
    blogAdd,
    blogUpdate,
    blogDelete,
} = require('../controller/blog');

const { SuccessModel, ErrorModel } = require('../model/resModel');

// 统一登录验证函数
const loginCheck = (req) => {
    // 在没有登录的时候提示
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel('尚未登录'));
    }
};
const handleBlog = (req, res) => {
    const method = req.method;
    const id = req.query.id;

    // 新增博客接口
    if (method === 'POST' && req.path === '/api/blog/add') {
        const loginCheckresult = loginCheck(req);
        if (loginCheckresult) {
            // 未登录直接把promise return出去
            return loginCheckresult;
        }
        // 新建作者要是登录后的作者本人
        req.body.author = req.session.username
        const blogData = req.body;
        const result = blogAdd(blogData);
        return result.then((res) => {
            return new SuccessModel(res);
        });
    }

    // 博客详情接口
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const result = blogDetail(id);

        return result.then((res) => {
            return new SuccessModel(res);
        });
    }

    // 博客列表接口
    if (method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || '';
        const keyword = req.query.keyword || '';
        if (req.query.isadmin) {
            // 管理员界面
            const loginCheckresult = loginCheck(req);
            if (loginCheckresult) {
                // 未登录
                return loginCheckresult
            }
            // 强制查询自己的博客
            author = req.session.username
        }
        const result = bloglist(author, keyword);
        return result.then((res) => {
            return new SuccessModel(res);
        });
    }

    // 博客删除接口
    if (method === 'POST' && req.path === '/api/blog/del') {
        const loginCheckresult = loginCheck(req);
        if (loginCheckresult) {
            // 未登录直接把promise return出去
            return loginCheckresult;
        }
        const author = req.session.username
        const result = blogDelete(id, author);
        return result.then((res) => {
            if (res) {
                return new SuccessModel();
            } else {
                return new ErrorModel('删除失败');
            }
        });
    }

    // 博客更新接口
    if (method === 'POST' && req.path === '/api/blog/update') {
        const loginCheckresult = loginCheck(req);
        if (loginCheckresult) {
            // 未登录直接把promise return出去
            return loginCheckresult;
        }
        const result = blogUpdate(id, req.body);
        return result.then((res) => {
            if (res) {
                return new SuccessModel();
            } else {
                return new ErrorModel('更新失败');
            }
        });
    }
};
module.exports = handleBlog;