import Competence from '../../models/competence';

export const competenceResolvers = {
  Query: {
    getCompetences: async (): Promise<any[]> => {
      try {
        const competences = await Competence.find();
        return competences;
      } catch (error) {
        console.error("Error fetching competences:", error);
        throw new Error("Failed to fetch competences");
      }
    },
    getCompetence: async (_: any, {id}: {id: string}): Promise<any> => {
      try {
        const foundCompetence = await Competence.findById(id);
        if (!foundCompetence) throw new Error('Competence not found');
        return foundCompetence;
      } catch (error) {
        console.error("Error fetching competence:", error);
        throw new Error("Failed to fetch competence");
      }
    }
  },
  Mutation: {
    createCompetence: async (_: any, {input}: {input: any}): Promise<any> => {
      try {
        const competence = new Competence(input);
        await competence.save();
        return competence;
      } catch (error) {
        console.error("Error creating competence:", error);
        throw new Error("Failed to create competence");
      }
    },
    updateCompetence: async (_: any, {id, input}: {id: string, input: any}): Promise<any> => {
      try {
        const competenceUpdate = await Competence.findByIdAndUpdate(id, {$set: input}, {new: true});
        if (!competenceUpdate) throw new Error("Competence not found");
        return competenceUpdate;
      } catch (error) {
        throw new Error(`Error updating competence: ${error}`);
      }
    },
    deleteCompetence: async (_: any, {id}: {id: string}): Promise<any> => {
      try {
        const competenceDelete = await Competence.findByIdAndDelete(id);
        if (!competenceDelete) throw new Error("Competence not found");
        return "Competence deleted successfully";
      } catch (error) {
        throw new Error(`Error deleting competence: ${error}`);
      }
    }
  }
};

export default competenceResolvers;
