
export const typeDefs = `#graphql
type User {
  id: ID!
  name: String!
  email: String!
  password: String!
  provider: String
  token: String!
  completedSection: [String]
  details: Details
}

type Details {
  profileImage: String!
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
  company: String!
}

type Showcase {
  id: ID!
  userId: String!
  title: String!
  collaborators: [String!]!
  summary: String
  thumbnail: String!
  description: String!
  feedback: [Feedback!]!
  category: String!
  showcaseLink: String!
  user: User!
}

type Feedback {
  userId: String!
  rating: Int!
  comment: String!
  user: User!
}

type Project {
  id: ID!
  userId: String!
  title: String!
  about: String!
  thumbnail: String!
  collaborators: Int!
  budget: String!
  timeline: String!
  carousel: [String!]
  presentation: String
  seeking: [Seeking!]!
  createdAt: String!
  user: User!
}

type Seeking {
  role: String!
  vacancy: Int!
  skills: [String!]!
  responsibility: String!
  experience: String!
}

type Idea {
  id: ID!
  userId: String!
  title: String!
  thumbnail: String!
  summary: String!
  description: String!
  status: String!
  category: String!
  skills: [String!]!
  tags: [String!]!
  user: User!
}

type Query {
  ideas: [Idea]
  projects: [Project]
  showcases: [Showcase]
  users: [User]
  user(email: String!): User!
  userById(id:ID!): User!
  project(id: ID!): Project
  showcase(id: ID!): Showcase
  idea(id: ID!): Idea
}

input MatchItem {
  skill: String
  project: String
  experience: experienceObject
}

input experienceObject{
  role: String
  duration: String
  company: String
}

type Mutation {
  userSignup(userInput: addUser!): User!
  userLogin(loginData: loginInput!): User!
  deleteProject(id: ID!): Boolean
  deleteShowcase(id: ID!): Boolean
  createIdea(ideaInput: addIdea!): Idea!
  createProject(projectInput: addProject!): Project!
  createShowcase(showcaseInput: addShowcase): Showcase!
  updateUser(id: ID!, property: String!, operation: String, matchItem: MatchItem, userData: updateUser): User
  updateProject(id: ID!, projectData: updateProject): Project
  updateShowcase(id: ID!, showcaseData: updateShowcase): Showcase
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
  summary: String!
  description: String!
  status: String!
  category: String!
  skills: [String!]!
  tags: [String!]!
}

input addProject {
  userId: String!
  title: String!
  about: String!
  thumbnail: String!
  collaborators: Int!
  budget: String!
  timeline: String!
  carousel: [String!]
  presentation: String
  seeking: [addSeeking!]!
}

input addSeeking {
  role: String!
  vacancy: Int!
  skills: [String!]!
  responsibility: String!
  experience: String!
}

input addShowcase {
  userId: String!
  title: String!
  thumbnail: String!
  collaborators: [String!]
  summary: String!
  description: String!
  category: String!
  showcaseLink: String!
  feedback: [addFeedback]
}

input addFeedback {
  userId: String!
  rating: Int!
  comment: String
}

input updateUser {
  name: String
  email: String
  password: String
  section: String
  details: updateDetails
}

input updateDetails {
  profileImage: String
  currentPosition: String
  about: String
  status: String
  experience: updateExperience
  skills: String
  projects: String
}

input updateExperience {
  role: String
  duration: String
  company: String
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