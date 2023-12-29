
export interface UserInterface {
    username?: string
    fullname: string
    image: string
    email: string
    type: TypeUser
}

export interface UserSignUp {
    username: string
    fullname: string
    image: string
    email: string
    password: string
    confirmpassword: string
}
export enum TypeUser {
    NORMAL = 'normal',
    GOOGLE = 'google',
    GITHUB = 'github'
}