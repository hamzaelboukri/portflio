
import Experience from "../../models/experience";


export const experienceReslvers ={

Query :{
    getexperiences:async ():Promise<any[]> =>{
    try {
        const experiences = await Experience.find();
        return experiences


    } catch (error) {
         throw new Error("Failed to fetch experience");
        
    } },

    getExprience:async(_:any,{id}:{id:string}):Promise<any>=>{

        try {
            const experience = await Experience.findById(id);

            if (!experience) {

               throw new Error("experience not found");
            }
            return experience;
        } catch (error) {
            throw new Error(`Error fetching experience: ${error}`);
            
        }
    }
},

Mutation:{
    createExperience:async(_:any,{input}:{input:any}):Promise<any> => {
      try {
        const experience = new Experience(input);
       await  experience.save();
       return experience
    } catch (error) {
        throw new Error(`Error creating experience: ${error}`);
      }

    }

},

updateExperience: async (_: any,{id,input}:{id:string,input: any}): Promise<any> =>{
    try {
         const experienceUpdate = await Experience.findByIdAndUpdate(id,{set:input},{new :true});
         if (!experienceUpdate){
            throw new Error('Experience not found');
         }

         return experienceUpdate
         
    } catch (error) {
        throw new Error(`Error updating experience: ${error}`);
    }

},

deleteExprience : async (_: any,{id}:{id:string}): Promise<any> =>{
    try {
        const ExperienceDelete= await Experience.findByIdAndDelete(id);
     if (!ExperienceDelete){
         throw new Error('Experience not found');
     }
      return 'Experience deleted successfully';

    } catch (error) {
         throw new Error(`Error deleting experience: ${error}`);
    }

}

}


export default experienceReslvers