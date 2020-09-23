"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
exports.validateRegister = (options) => {
    if (options.username.length <= 2) {
        return [
            {
                field: 'username',
                message: 'length must be greater than 2'
            },
        ];
    }
    if (options.email.length <= 2) {
        return [
            {
                field: 'email',
                message: 'length must be greater than 2'
            },
        ];
    }
    if (options.password.length <= 2) {
        return [
            {
                field: 'password',
                message: 'length must be greater than 2'
            },
        ];
    }
    return null;
};
//# sourceMappingURL=validateRegister.js.map