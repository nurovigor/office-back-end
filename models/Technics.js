import mongoose from "mongoose";

const TechnicSchema = new mongoose.Schema({

    name: {type: String, required: true},
    type: {type: String, required: true},
    bind: {type: Boolean, default: false},
    serial: {type: String, default: null}

})

export default mongoose.model('Technics', TechnicSchema);
