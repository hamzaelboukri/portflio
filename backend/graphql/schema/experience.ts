export const experienceType = `
type Experience {
    id: ID!
    title: String!
    company: String!
    startDate: String!
    endDate: String!
    description: String!
}

type Query {
    getExperiences: [Experience!]!
    getExperience(id: ID!): Experience
}

type Mutation {
    createExperience(input: ExperienceInput!): Experience!
    updateExperience(id: ID!, input: ExperienceInput!): Experience!
    deleteExperience(id: ID!): String!
}

input ExperienceInput {
    title: String!
    company: String!
    startDate: String!
    endDate: String!
    description: String!
}
`;

export default experienceType;