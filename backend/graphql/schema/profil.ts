
export const profileType = `
type Profile {
    id: ID!
    fullName: String!
    email: String!
    phone: String!
    address: String!
    website: String!
}

type Query {
    getProfile: [Profile]!
}

type Mutation {
    createProfile(input: ProfileInput!): Profile!
    updateProfile(id: ID!, input: ProfileInput!): Profile!
    deleteProfile(id: ID!): String!
}

input ProfileInput {
    fullName: String!
    email: String!
    phone: String!
    address: String!
    website: String!
}
`;

export default profileType;