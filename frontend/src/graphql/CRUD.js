import { gql } from '@apollo/client';

export const USER_SIGNUP = gql `
    mutation UserSignup($userInput: addUser!){
        userSignup(userInput: $userInput){
            id
            email
            token
    }
}
`
export const USER_LOGIN = gql `
    mutation UserLogin($loginData: loginInput!){
        userLogin(loginData: $loginData){
            id
            email
            token
        }
}
`