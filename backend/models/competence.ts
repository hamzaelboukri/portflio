import mongoose ,{Schema, Document} from "mongoose"; 

export interface ICompetence extends Document {
    name: string;
    description: string;
}

const CompetenceSchema: Schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true}
});

const Competence = mongoose.model<ICompetence>('Competence', CompetenceSchema);
export default Competence;