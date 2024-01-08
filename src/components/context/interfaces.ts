
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
    _id?: any
    english: string
    vietnamese: string
    types: string[]
}

export interface InputTextInterface {
    setCurrentWord: React.Dispatch<React.SetStateAction<WordInterface | undefined>>
}

export interface PronouncesInterface {
    name: string,
    voiceName: string,
    image: string
}

export interface ResultPracticeVocabularyInterface {
    _id?: any
    english: string
    vietnamese: string
    result: string
}

export interface ResultPracticeGrammarInterface {
    _id?: any
    structure: string
    vietnamese: string
    result: string
}

export interface GrammarInterface {
    _id?: any
    structure: string
    vietnamese: string
    user_id?: string
}

export interface SubtitleItemInterface {
    id: number,
    firstTime: number,
    lastTime: number,
    content: string
}