import Profile from "../../models/profile";

export const profilResolvers = {
  Query: {
    getProfile: async (): Promise<any> => {
      try {
        const profiles = await Profile.find();
        if (!profiles || profiles.length === 0) {
          throw new Error("Profiles not found");
        }
        return profiles;
      } catch (error) {
        throw new Error("Failed to fetch profiles");
      }
    },
  },

  Mutation: {
    createProfile: async (_: any, { input }: any): Promise<any> => {
      try {
        const newProfile = new Profile(input);
        await newProfile.save();
        return newProfile;
      } catch (error) {
        throw new Error("Failed to create profile");
      }
    },

    updateProfile: async (_: any, { id, input }: any): Promise<any> => {
      try {
        const updatedProfile = await Profile.findByIdAndUpdate(id, input, {
          new: true,
        });
        if (!updatedProfile) {
          throw new Error("Profile not found");
        }
        return updatedProfile;
      } catch (error) {
        throw new Error("Failed to update profile");
      }
    },

    deleteProfile: async (_: any, { id }: any): Promise<string> => {
      try {
        const deleted = await Profile.findByIdAndDelete(id);
        if (!deleted) {
          throw new Error("Profile not found");
        }
        return "Profile deleted successfully";
      } catch (error) {
        throw new Error("Failed to delete profile");
      }
    },
  },
};

export default profilResolvers;
