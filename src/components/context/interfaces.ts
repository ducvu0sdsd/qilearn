
export interface UserInterface {
    username?: string
    fullname: string
    image: string
    email: string
    type: TypeUser
    _id: string
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

export interface WordInterface {
    english: string
    vietnamese: string
    types: string[]
}

export interface InputTextInterface {
    setCurrentWord: React.Dispatch<React.SetStateAction<WordInterface | undefined>>
}