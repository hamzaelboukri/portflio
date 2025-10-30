export const profileType=`
type Profile{
    id: ID!
    fullName: String!
    email: String!
    phone: String!
    address: String!
    website: String!


}
type Query {
    getProfile: [project!]!
    getProfile(id: ID!): Profile
}
type Mutation {
    createProjet(input: ProfileInput!): Profile!
    updateProfile(id: ID!, input: ProfileInput!): Profile!
    deleteProfile(id: ID!): String!
}

input ProfileInput {
name:String!
description:String!
image:String!
githubLink:String!
webLink:String!
}


`
export default profileType;