import {UsernamePasswordInput} from "./UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
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
}