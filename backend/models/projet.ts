import mongoose,{ Schema,Document } from "mongoose";
export interface IProjet extends Document {
    title: string;
    description: string;
    image: string;
    githubLink: string;
    webLink: string;
}

const ProjetSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    githubLink: {type: String, required: true},
    webLink: {type: String, required: true}
});

const Projet = mongoose.model<IProjet>('Projet', ProjetSchema);
export default Projet;
