import { promises } from "dns";
import Project from "../../models/projet";

export const ProjectResolvers = {
    Query: {

        getprojects: async (): Promise<any[]> => {

            try {

                const projects = await Project.find()
                return projects;
            } catch (error) {
                throw new Error(`Error fetching projects: ${error}`);
            }

        },

        getproject: async (_: any, { id }: { id: string }): Promise<any> => {
            try {
                const projet = await Project.findById(id);
                if (!projet) {

                    throw new Error('Project not found');
                }
                return projet;

            }
            catch (error) {
throw new Error(`Error fetching project: ${error}`);
            }



        }
    },


Mutation: {

    createProjet: async(_:any,{input}:{input:any}):Promise<any> =>{
try{
        const project = new Project(input);
        project.save();
        return project;

   }

   catch(error){
    throw new Error(`Error creating project: ${error}`);
   }
},

updateProject: async(_:any,{id,input}:{id:string; input:any}):Promise<any> => {
try{
    const ProjectUpdate  = await Project.findByIdAndUpdate(id,{set:input},{new:true});

 if (!ProjectUpdate) {
          throw new Error('Project not found');
        }
        return ProjectUpdate;
      } catch (error) {
        throw new Error(`Error updating project: ${error}`);
      }
    },

    
    deleteProject:async(_:any,{id}:{id:string} ):Promise<any> => {
        try {
            const deletProject = await Project.findByIdAndDelete(id);
            if (!deletProject){
                 throw new Error('Project not found');
            }
            
   return 'Project deleted successfully'
            
        } catch (error) {
             throw new Error(`Error deleting project: ${error}`);
        }

    }

},

}

export default ProjectResolvers


