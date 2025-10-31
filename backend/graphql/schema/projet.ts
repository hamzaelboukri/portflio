export const projectType = `
type Project {
    id: ID!
    name: String!
    description: String!
    image: String!
    githubLink: String!
    webLink: String!    
}

type Query {
    getProjects: [Project!]!
    getProject(id: ID!): Project
}

type Mutation {
    createProject(input: ProjectInput!): Project!
    updateProject(id: ID!, input: ProjectInput!): Project!
    deleteProject(id: ID!): String!
}

input ProjectInput {
    name: String!
    description: String!
    image: String!
    githubLink: String!
    webLink: String!
}
`;

export default projectType;