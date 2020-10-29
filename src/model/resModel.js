class BaseModel {
    constructor(data, message) {
        // 合并处理
        if (typeof data == 'string') {
            this.message = data;
            message = null;
            data = null;
        }
        if (data) {
            this.data = data;
        }
        if (message) {
            this.message = message;
        }
    }
}
class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = 0
    }
}
class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = -1
    }
}
module.exports = {
    SuccessModel,
    ErrorModel
}