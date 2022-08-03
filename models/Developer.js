import mongoose from "mongoose";

const DeveloperSchema = new mongoose.Schema({

    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String, required: true},

})

export default mongoose.model('Developer', DeveloperSchema);

