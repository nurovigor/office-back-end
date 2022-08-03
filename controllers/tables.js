import mongoose from "mongoose";
import Tables from '../models/WorkTable.js';


export const createTable = async (req, res) => {
    try {
        const {
            number,
            openSpaceNumber
        } = req.body;


        const newTable = new Tables({
            number,
            openSpaceNumber,
        })
        await newTable.save();

        return res.json(newTable)
    } catch (e) {
        console.log(e)
    }
}

export const updateTable = async (req, res) => {
    try {
        let {
            developerId,
            pc,
            monitor,
            keyboard,
            mouse,
            microphone,
            headphones,
            camera
        } = req.body;


        const table = await Tables.findById(mongoose.Types.ObjectId(req.params.id));


        table.developer = developerId ? mongoose.Types.ObjectId(developerId) : null;
        table.pc = pc
        table.monitor = monitor
        table.keyboard = keyboard
        table.mouse = mouse
        table.microphone = microphone
        table.headphones = headphones
        table.camera = camera

        await table.save();

        return res.json(table)
    } catch (e) {
        console.log(e)
    }
}

export const getTables = async (req, res) => {

    try {
        const tables = await Tables.aggregate([
            {
                $lookup: {
                    from: 'developers',
                    localField: 'developer',
                    foreignField: '_id',
                    as: 'developer'
                }
            },
            {
                $unwind: {path: '$developer'}
            },
        ])
        if (!tables) {
            return res.json({massage: "Tables is not exist"})
        }
        return res.json(tables)
    } catch (e) {
        console.log(e)
    }
}

export const removeTable = async (req, res) => {
    try {
        const table = await Tables.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id));

        if (!table) return res.json({message: "This table does not exist."})

        return res.json({message: "Table was removed"})
    } catch (e) {
        console.log(e)
    }
}