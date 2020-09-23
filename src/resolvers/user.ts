import {Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver} from "type-graphql";
import {MyContext} from "../types";
import {User} from "../entities/User";
import * as argon2 from 'argon2';
import {EntityManager} from '@mikro-orm/postgresql'
import {COOKE_NAME} from "../constants";
import {UsernamePasswordInput} from "../utils/UsernamePasswordInput";
import {validateRegister} from "../utils/validateRegister";

@ObjectType()
class FieldError {
    @Field()
    field: string;
    @Field()
    message: string
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];

    @Field(() => User, {nullable: true})
    user?: User;
}

@Resolver()
export class UserResolver {

    @Mutation(() => Boolean)
    async forgotPassword(@Arg("email") email: string, @Ctx() {em}: MyContext) {
        // const user = await em.findOneOrFail(User, {email});
        return true;
    }

    @Query(() => [User])
    users(@Ctx() {em}: MyContext): Promise<User[]> {
        return em.find(User, {});
    }

    @Query(() => User, {nullable: true})
    async me(@Ctx() {req, em}: MyContext) {
        // you're aren't Login
        if (!req.session.userId) {
            return null;
        }
        return await em.findOne(User, {id: req.session.userId});
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() {em, req}: MyContext
    ): Promise<UserResponse> {
        const errors = validateRegister(options);

        if (errors) {
            return {errors};
        }

        const hashedPassword = await argon2.hash(options.password);
        let user;
        try {
            const result = await (em as EntityManager).createQueryBuilder(User)
                .getKnexQuery()
                .insert({
                    username: options.username,
                    email: options.email,
                    password: hashedPassword,
                    created_at: new Date(),
                    updated_at: new Date(),
                }).returning("*")
            user = result[0];
        } catch (e) {
            if (e.code === '23505') { // || e.detail.includes('already exists')) {
                // duplicate username error
                return {
                    errors: [{
                        field: 'username',
                        message: 'username is already taken'
                    }]
                }
            }
        }
        // store user id session
        // this will se t a cookie on the user
        // keep them logged in
        req.session.userId = user.id
        return {user};
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("usernameOrEmail") usernameOrEmail: string,
        @Arg("password") password: string,
        @Ctx() {em, req}: MyContext
    ): Promise<UserResponse> {
        const user = await em.findOne(User,
            usernameOrEmail.includes('@') ? {email: usernameOrEmail}
            : {username: usernameOrEmail});
        if (!user) {
            return {
                errors: [
                    {
                        field: "username",
                        message: 'The credentials not found. Please check your credentials.'
                    },
                ],
            };
        }

        const valid = await argon2.verify(user.password, password);

        if (!valid) {
            return {
                errors: [
                    {
                        field: "password",
                        message: 'The credentials not found. Please check your credentials.'
                    },
                ],
            };
        }

        req.session.userId = user.id;

        return {
            user
        }
    }

    @Mutation(() => Boolean)
    logout(@Ctx() {req, res}: MyContext) {

        return new Promise((resolve) => {
            req.session.destroy((err) => {
                if (err) {
                    console.log(err)
                    resolve(false)
                    return;
                }
                res.clearCookie(COOKE_NAME);
                resolve(true)
            })
        })
    }
}