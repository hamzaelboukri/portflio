export const authType = `
  type Admin {
    id: ID!
    username: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    admin: Admin!
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!
  }
`;
