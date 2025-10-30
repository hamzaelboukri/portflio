export const competenceType = `
type Competence {
	id: ID!
	name: String!	
	description: String!
}

type Query {
    getCompetences: [Competence!]!
    getCompetence(id: ID!): Competence
}

type Mutation {
    createCompetence(input: CompetenceInput!): Competence!
    updateCompetence(id: ID!, input: CompetenceInput!): Competence!
    deleteCompetence(id: ID!): String!
}

input CompetenceInput {
    name: String!
    description: String!
}

`;

export default competenceType;