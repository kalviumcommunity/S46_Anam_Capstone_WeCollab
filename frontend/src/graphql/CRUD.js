import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql `
    query Users{
        users{
            id
            name
            email
            details{
                profileImage
                currentPosition
            }
        }
    }
`

export const GET_USER = gql `
    query User($email: String!){
        user(email: $email){
            id
            name
            email
            provider
            completedSection
            details{
                profileImage
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
                profileImage
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

export const POST_SHOWCASE = gql `
    mutation CreateShowcase($showcaseInput: addShowcase) {
        createShowcase(showcaseInput: $showcaseInput) {
            id
            userId
            title
            collaborators
            summary
            thumbnail
            description
            feedback {
                userId
                rating
                comment
            }
            category
            showcaseLink
            user {
            id
            name
            details {
                profileImage
            }
        }
    }
}
`

export const GET_PROJECT = gql `
    query Project($projectId: ID!) {
        project(id: $projectId) {
            id
            userId
            title
            about
            thumbnail
            collaborators
            budget
            timeline
            carousel
            presentation
            seeking {
            role
            vacancy
            skills
            responsibility
            experience
            }
            createdAt
            user {
                id
                name
                details{
                    profileImage
                }
            }
        }
    }
`

export const GET_ALL_PROJECTS = gql `
    query Projects {
        projects {
            id
            userId
            title
            about
            thumbnail
            collaborators
            budget
            timeline
            carousel
            presentation
            createdAt
            seeking {
                role
                vacancy
                skills
                responsibility
                experience
            }
            user {
                id
                name
                details{
                    profileImage
                }
            }
        }
    }
`
export const GET_ALL_IDEAS = gql `
    query Ideas{
        ideas{
            id
            userId
            title
            thumbnail
            summary
            description
            status
            category
            skills
            tags
            user {
                id
                name
                details{
                    profileImage
                }
            }
        }
    }
`

export const GET_IDEA = gql `
    query Idea($ideaId: ID!) {
        idea(id: $ideaId) {
            id
            userId
            title
            thumbnail
            summary
            description
            status
            category
            skills
            tags
            user {
                id
                name
                details{
                    profileImage
                }
            }
        }
    }
`
export const GET_ALL_SHOWCASE = gql ` 
    query Showcases {
        showcases {
            id
            userId
            title
            collaborators
            summary
            thumbnail
            description
            feedback {
                userId
                rating
                comment
            }
            category
            showcaseLink
            user {
                id
                name
                details {
                    currentPosition
                    profileImage
                }
            }
        }
    }
`
export const GET_SHOWCASE = gql `
    query Showcase($showcaseId: ID!) {
        showcase(id: $showcaseId) {
            id
            userId
            title
            collaborators
            summary
            thumbnail
            description
            feedback {
                userId
                rating
                comment
                user{
                    id
                    name
                    details{
                        profileImage
                    }
                }
            }
            category
            showcaseLink
            user {
                id
                name
                details {
                    profileImage
                }
            }
        }
    }
`