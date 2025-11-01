import Profile from "../../models/profile";
import Project from "../../models/projet";
import Competence from "../../models/competence";
import Experience from "../../models/experience";

export const portfolioResolvers = {
  Query: {
    getPortfolio  : async (): Promise<any> => {
      try {
        const profiles = await Profile.find();
        const projects = await Project.find();
        const competences = await Competence.find();
        const experiences = await Experience.find();

        return {
          profiles,
          projects,
          competences,
          experiences,
        };
      } catch (error) {
        throw new Error("Failed to fetch portfolio data");
      }
    },
  },
};

export default portfolioResolvers;
