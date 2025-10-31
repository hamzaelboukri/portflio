import { competenceResolvers } from "./competence"
import { experienceResolvers } from "./experience"
import { ProjectResolvers } from "./projet"
import {profilResolvers} from "./profil"
import {authResolvers} from "./auth"


export const resolver = {
  Query: {
    ...competenceResolvers.Query,
    ...experienceResolvers.Query,
    ...ProjectResolvers.Query,
    ...profilResolvers.Query
  },
  Mutation: {
    ...competenceResolvers.Mutation,
    ...experienceResolvers.Mutation,
    ...ProjectResolvers.Mutation,
    ...profilResolvers.Mutation,
    ...authResolvers.Mutation,
  },
};


export default resolver