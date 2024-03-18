
export const typeDefs = `#graphql
type User {
    name: String!
    email: String!
    password: String!
    details: Details!
}

type Details {
    currentposition: String!
    about: String!
    status: String!
    experience: [ExperienceType!]
    skills: [String!]!
    projects: [String!]!
}

type ExperienceType {
    role: String!
    duration: String!
}

type Showcase {
  _id: ID!
  title: String!
  thumbnail: String!
  description: String!
  category: String!
  link: String
}

type Project {
  _id: ID!
  title: String!
  about: String!
  thumbnail: String!
  carousel: [String!]
  presentation: String
  seeking: [Seeking!]!
}

type Seeking {
  role: String!
  vacancy: String!
  skills: [String!]!
  responsibilities: String!
  experience: String!
}

type Idea {
  _id: ID!
  userId: ID!
  title: String!
  description: String!
  status: String!
  category: String!
}

type Query {
    idea: [Idea]
    project: [Project]
    showcase: [Showcase]
    user: [User]
}

`