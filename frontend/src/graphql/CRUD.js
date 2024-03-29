import { gql } from '@apollo/client';

export const CREATE_USER = gql `
    mutation CreateUser($userInput: addUser!){
        createUser(userInput: $userInput){
            id
            email
            token
    }
}
`
export const LOGIN_USER = gql `
    mutation LoginUser($loginData: loginInput!){
        loginUser(loginData: $loginData){
            id
            email
            token
        }
}
`