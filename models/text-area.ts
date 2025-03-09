import mongoose from "mongoose";


const textAreaSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    emailRef: {
        type: String,
        required: true,
    }
}, {timestamps: true});


export default mongoose.models.TextArea || mongoose.model("TextArea", textAreaSchema);