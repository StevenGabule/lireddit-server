"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
exports.validateRegister = ({ username, email, password, }) => {
    if (username.length <= 2) {
        return [
            {
                field: "username",
                message: "length must be greater than 2",
            },
        ];
    }
    if (!email.includes("@")) {
        return [
            {
                field: "email",
                message: "Invalid email address",
            },
        ];
    }
    if (username.includes("@")) {
        return [
            {
                field: "username",
                message: "username must not include @ symbol",
            },
        ];
    }
    if (email.length <= 2) {
        return [
            {
                field: "email",
                message: "length must be greater than 2",
            },
        ];
    }
    if (password.length <= 2) {
        return [
            {
                field: "password",
                message: "length must be greater than 2",
            },
        ];
    }
    return null;
};
//# sourceMappingURL=validateRegister.js.map