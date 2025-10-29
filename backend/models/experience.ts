import mongoose ,{Schema,Document} from "mongoose";

export interface IExperience extends Document {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
}

const ExperienceSchema: Schema = new Schema({
    title: {type: String, required: true},
    company: {type: String, required: true},
    startDate: {type: String, required: true},
    endDate: {type: String, required: true},
    description: {type: String, required: true}
});
const Experience = mongoose.model<IExperience>('Experience', ExperienceSchema);
export default Experience;
