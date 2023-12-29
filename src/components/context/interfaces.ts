import { TypeUser } from "@/app/auth-page/sign-up/page"

export interface UserInterface {
    username?: string
    fullname: string
    image: string
    email: string
    type: TypeUser
}