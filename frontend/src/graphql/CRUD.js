import { gql } from '@apollo/client';

export const GET_USER = gql `
    query User($email: String!){
        user(email: $email){
            id
            name
            email
            completedSection
            details{
                currentPosition
                about
                status
                experience{
                    role
                    duration
                }
                skills
                projects
            }
        }
    }
`

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

export const UPDATE_USER = gql `
    mutation UpdateUser($id: ID!, $property: String!, $userData: updateUser){
        updateUser(id: $id, property:$property, userData: $userData){
            id
            name
            email
            completedSection
            details{
                currentPosition
                about
                status
                experience{
                    role
                    duration
                }
                skills
                projects
            }
        }
    }
`