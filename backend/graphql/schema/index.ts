import competenceType from "./competence";
import projectType from "./projet";
import experienceType from "./experience";
import ProfileType from "./profil";
import { portfolioType } from "./Portfolio";
import { authType } from "./authschema";

export const typeDefs = [
  competenceType,
  projectType,
  experienceType,
  ProfileType,
  portfolioType,
  authType
];

export default typeDefs;