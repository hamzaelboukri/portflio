import mongoose,{Schema,Document} from "mongoose";

export interface IProfile extends Document {
    fullname: string;
    email: string;
    phone: string;
    address: string;
    website: string;

}

const ProfileSchema: Schema = new Schema({
    fullname: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    website: {type: String, required: true},    
});
const Profile = mongoose.model<IProfile>('Profile', ProfileSchema);
export default Profile;


