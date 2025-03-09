import mongoose from "mongoose";


const textSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    emailRef: {
        type: String,
        required: true,
    }
}, {timestamps: true});


export default mongoose.models.Text || mongoose.model("Text", textSchema);