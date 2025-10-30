import Competence from '../../models/competence';
// import {IResolvers} from '@apollo/server';


export const competenceResolvers  = {
  Query: {
    getcompetences: async (): Promise<any[]> => {
      try {
        const competences = await Competence.find();
        return competences;
      } catch (error) {
        console.error("Error fetching competences:", error);
        throw new Error("Failed to fetch competences");
      }
    }
  },
  getcompetencesById:async(_: any,{id}:{id:string}):Promise<any>=>{
    try {
        const foundCompetence = await Competence.findById(id)
        if(!foundCompetence){
             throw new Error('Competence not found');
        }
        return foundCompetence
    } catch (error) {
        console.error("Error fetching competences:", error);
        throw new Error("Failed to fetch competences");
        }
  },

  Mutation :{
    createCompetence: async (_:any,{input}:{input:any}):Promise<any> =>{
        try {
            
            const competence =new Competence(input);
             await competence.save();
             return competence   
        } catch (error) {
           console.error("Error fetching competences:", error);
            throw new Error("Failed to fetch competences");
        }
    } ,

    updateCompetence:async (_:any,{id,input}:{id:string ,input:any}):Promise <any>=>{
        try {
            const competenceUpdate= await Competence.findByIdAndUpdate(
           id,
            {$set:input},
            {new:true},

            );
            if (!competenceUpdate) {
                throw new Error("Competence not found");
                
            }
            return competenceUpdate;

        } catch (error) {
           throw new Error(`Error updating competence: ${error}`)
        }

    },

    deleteCompetence : async (_:any,{id}:{id:string}):Promise <any>=>{
        try {
            const competenceDelete= await Competence.findByIdAndDelete;
            if (!competenceDelete){
                throw new Error (" not fonde")
            }
            return " competence delet susccsefl "
            
        } catch (error) {
             throw new Error(`Error deleting competence: ${error}`);
        }
    }


  }



}; 

export default competenceResolvers
