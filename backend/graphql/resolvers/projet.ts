import Project from "../../models/projet";

export const ProjectResolvers = {
  Query: {
    getProjects: async (): Promise<any[]> => {
      try {
        return await Project.find();
      } catch (error) {
        throw new Error(`Error fetching projects: ${error}`);
      }
    },

    getProject: async (_: any, { id }: { id: string }): Promise<any> => {
      try {
        const projet = await Project.findById(id);
        if (!projet) throw new Error('Project not found');
        return projet;
      } catch (error) {
        throw new Error(`Error fetching project: ${error}`);
      }
    }
  },

  Mutation: {
    createProject: async (_: any, { input }: { input: any }): Promise<any> => {
      try {
        const project = new Project(input);
        await project.save();
        return project;
      } catch (error) {
        throw new Error(`Error creating project: ${error}`);
      }
    },

    updateProject: async (_: any, { id, input }: { id: string; input: any }): Promise<any> => {
      try {
        const updatedProject = await Project.findByIdAndUpdate(id, { $set: input }, { new: true });
        if (!updatedProject) throw new Error('Project not found');
        return updatedProject;
      } catch (error) {
        throw new Error(`Error updating project: ${error}`);
      }
    },

    deleteProject: async (_: any, { id }: { id: string }): Promise<string> => {
      try {
        const deleted = await Project.findByIdAndDelete(id);
        if (!deleted) throw new Error('Project not found');
        return 'Project deleted successfully';
      } catch (error) {
        throw new Error(`Error deleting project: ${error}`);
      }
    }
  }
};

export default ProjectResolvers;
