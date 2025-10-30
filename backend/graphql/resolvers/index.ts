import { competenceResolvers } from "./competence"
import { experienceReslvers } from "./experience"
import { ProjectResolvers } from "./projet"
// import {competenceResolvers} from "./profil"


export const resolver = {
    Query: {
        ...competenceResolvers,
        ...experienceReslvers,
        ...ProjectResolvers,

    },
mutation : {
     ...competenceResolvers.Mutation,
     ...ProjectResolvers,
     ...experienceReslvers,
},

}

export default resolver