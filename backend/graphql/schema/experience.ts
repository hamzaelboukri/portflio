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
    getexperiences: [expriences!]!
    getExprience(id: ID!): expriences
}

type Mutation {
    createExperience(input: expriencesInput!): expriences!
    updateExpriences(id: ID!, input: expriencesInput!): expriences!
    deleteExpriences(id: ID!): String!
}

input expriencesInput {
     id: ID!
    title: String!
    company: String!
    startDate: String!
    endDate: String!
    description: String!
}
`
export default experienceType;
