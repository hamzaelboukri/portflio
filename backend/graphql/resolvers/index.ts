import { competenceResolvers } from "./competence"
import { experienceResolvers } from "./experience"
import { ProjectResolvers } from "./projet"
import {profilResolvers} from "./profil"


export const resolver = {
    Query: {
        ...competenceResolvers,
        ...experienceResolvers,
        ...ProjectResolvers,
        ...profilResolvers

    },
mutation : {
     ...competenceResolvers.Mutation,
     ...ProjectResolvers,
     ...experienceResolvers,
     ...profilResolvers
},

}

export default resolver