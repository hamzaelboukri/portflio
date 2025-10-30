export const competenceType=`
type Competence{
id:ID!
name:String!
description:String!
image:String!
githubLink:String!
webLink:String!    
}

 type Query {
    getprojects: [project!]!
    getproject(id: ID!): project
}

type Mutation {
    createProjet(input: projectInput!): project!
    updateProject(id: ID!, input: projectInput!): project!
    deleteProject(id: ID!): String!
}

input projectInput {
name:String!
description:String!
image:String!
githubLink:String!
webLink:String!
}

`

export default competenceType;