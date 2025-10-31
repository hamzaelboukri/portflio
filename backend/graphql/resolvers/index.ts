import { competenceResolvers } from "./competence"
import { experienceResolvers } from "./experience"
import { ProjectResolvers } from "./projet"
// import {competenceResolvers} from "./profil"


export const resolver = {
    Query: {
        ...competenceResolvers,
        ...experienceResolvers,
        ...ProjectResolvers,

    },
mutation : {
     ...competenceResolvers.Mutation,
     ...ProjectResolvers,
     ...experienceResolvers,
},

}

export default resolver