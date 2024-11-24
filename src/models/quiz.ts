import mongoose, { Schema, Document, Model} from "mongoose";

interface IQuestion extends Document {
    question: string;
    options: string[];
    answer: string
}

const questionSchema: Schema = new Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

const Question: Model<IQuestion> =  mongoose.models.Question || mongoose.model<IQuestion>('Question', questionSchema);
export default Question