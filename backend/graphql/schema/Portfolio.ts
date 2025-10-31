export const portfolioType = `
type Portfolio {
  profiles: [Profile]!
  projects: [Project]!
  competences: [Competence]!
  experiences: [Experience]!
}

extend type Query {
  getPortfolio: Portfolio!
}
`;