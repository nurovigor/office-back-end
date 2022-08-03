import mongoose from "mongoose";

const TableSchema = new mongoose.Schema({

    number: {type: String, required: true},
    openSpaceNumber: {type: String, required: true},
    //developer: {type: mongoose.Schema.Types.ObjectId , default: null},
    developer: {type: mongoose.Schema.Types.ObjectId , default: null},
    pc: {type: String, default: null},
    monitor: {type: String, default: null},
    keyboard: {type: String, default: null},
    mouse: {type: String, default: null},
    microphone: {type: String, default: null},
    headphones: {type: String, default: null},
    camera: {type: String, default: null}

})

export default mongoose.model('WorkTable', TableSchema);