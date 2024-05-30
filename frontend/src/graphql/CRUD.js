import { gql } from '@apollo/client';

export const GET_USER = gql `
    query User($email: String!){
        user(email: $email){
            id
            name
            email
            provider
            completedSection
            details{
                currentPosition
                about
                status
                experience{
                    role
                    duration
                    company
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
    mutation UpdateUser($id: ID!, $property: String!, $operation: String, $matchItem: MatchItem, $userData: updateUser){
        updateUser(id: $id, property: $property, operation: $operation, matchItem: $matchItem, userData: $userData){
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

export const POST_PROJECT = gql `
    mutation CreateProject($projectInput: addProject!){
        createProject(projectInput: $projectInput){
            userId
            title
            about
            thumbnail
            collaborators
            budget
            timeline
            carousel
            seeking {
                role
                vacancy
                skills
                responsibility
                experience
            }
        }
    }
`
export const POST_IDEA = gql `
    mutation CreateIdea($ideaInput: addIdea!){
        createIdea(ideaInput: $ideaInput){
            userId
            title
            summary
            description
            status
            category
            skills
            tags
        }
    }
`