import { gql } from '@apollo/client';

export const CREATE_USER = gql `
    mutation CreateUser($user: addUser!){
        createUser(user: $user){
            name
            email
            password
        }
    }
`
export const LOGIN_USER = gql `
    mutation LoginUser($user: userLogin!){
        loginUser(user: $user){
            email
            password
        }
    }
`