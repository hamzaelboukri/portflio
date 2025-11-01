import Profile from "../../models/profile";

export const profilResolvers = {
  Query: {
    getProfile: async (): Promise<any[]> => {
      try {
        const profiles = await Profile.find();
        if (!profiles || profiles.length === 0) {
          throw new Error("No profiles found");
        }
        return profiles;
      } catch (error: any) {
        console.error("Error fetching profiles:", error.message, error);
        throw new Error("Failed to fetch profiles");
      }
    },
  },

  Mutation: {
    createProfile: async (_: any, { input }: any): Promise<any> => {
      try {
        console.log("Input received for createProfile:", input);

        const requiredFields = ["fullName", "email", "phone", "address", "website"];
        for (let field of requiredFields) {
          if (!input[field]) {
            throw new Error(`Missing required field: ${field}`);
          }
        }

        const newProfile = new Profile(input);
        await newProfile.save();
        return newProfile;
      } catch (error: any) {
        console.error("Error creating profile:", error.message, error);
        throw new Error(`Failed to create profile: ${error.message}`);
      }
    },

    // تحديث بروفييل موجود
    updateProfile: async (_: any, { id, input }: any): Promise<any> => {
      try {
        const updatedProfile = await Profile.findByIdAndUpdate(id, input, { new: true });
        if (!updatedProfile) throw new Error("Profile not found");
        return updatedProfile;
      } catch (error: any) {
        console.error("Error updating profile:", error.message, error);
        throw new Error(`Failed to update profile: ${error.message}`);
      }
    },

    // حذف بروفييل
    deleteProfile: async (_: any, { id }: any): Promise<string> => {
      try {
        const deleted = await Profile.findByIdAndDelete(id);
        if (!deleted) throw new Error("Profile not found");
        return "Profile deleted successfully";
      } catch (error: any) {
        console.error("Error deleting profile:", error.message, error);
        throw new Error(`Failed to delete profile: ${error.message}`);
      }
    },
  },
};

export default profilResolvers;
