
export const typeDefs = `#graphql
type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    token: String!
    details: Details
}

type Details {
    currentPosition: String!
    about: String!
    status: String!
    experience: [ExperienceType!]!
    skills: [String!]!
    projects: [String!]!
}

type ExperienceType {
    role: String!
    duration: String!
}

type Showcase {
  title: String!
  thumbnail: String!
  description: String!
  category: String!
  link: String
}

type Project {
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
  userId: String!
  title: String!
  description: String!
  status: String!
  category: String!
}

type Query {
  ideas: [Idea]
  projects: [Project]
  showcases: [Showcase]
  users: [User]
  project(id: ID!): Project
  showcase(id: ID!): Showcase
  idea(id: ID!): Idea
}

type Mutation {
  deleteProject(id: ID!): Boolean
  deleteShowcase(id: ID!): Boolean
  createUser(userInput: addUser!): User!
  createIdea(ideaInput: addIdea!): Idea!
  createProject(projectInput: addProject): Project!
  createShowcase(id: ID!,showcase: addShowcase): Showcase!
  updateUser(id: ID!, userData: updateUser): User
  updateProject(id: ID!, projectData: updateProject): Project
  updateShowcase(id: ID!, showcaseData: updateShowcase): Showcase
  loginUser(loginData: loginInput!): User!
}

input loginInput {
  email: String!
  password: String!
}

input addUser {
  name: String!
  email: String!
  password: String!
  details: addDetails
}

input addDetails {
  currentPosition: String!
  about: String!
  status: String!
  experience: [addExperienceType!]
  skills: [String!]!
  projects: [String!]!
}

input addExperienceType {
  role: String!
  duration: String!
}

input addIdea {
  userId: String!
  title: String!
  description: String!
  status: String!
  category: String!
}

input addProject {
  title: String!
  about: String!
  thumbnail: String!
  carousel: [String!]
  presentation: String
  seeking: [addSeeking!]!
}

input addSeeking {
  role: String!
  vacancy: String!
  skills: [String!]!
  responsibilities: String!
  experience: String!
}

input addShowcase {
  title: String!
  thumbnail: String!
  description: String!
  category: String!
  link: String
}

input updateUser {
  name: String
  email: String
  password: String
  details: updateDetails
}

input updateDetails {
  currentPosition: String
  about: String
  status: String
  experience: [updateExperience]
  skills: [String]
  projects: [String]
}

input updateExperience {
  role: String
  duration: String
}

input updateProject {
  title: String
  about: String
  thumbnail: String
  carousel: [String]
  presentation: String
  seeking: [updateSeeking]
}

input updateSeeking {
  role: String
  vacancy: String
  skills: [String]
  responsibilities: String
  experience: String
}

input updateShowcase {
  title: String
  thumbnail: String
  description: String
  category: String
  link: String
}


`