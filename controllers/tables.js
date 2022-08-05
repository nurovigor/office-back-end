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
        return res.status(400).send(e)
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


        if (!table) return res.sendStatus(404);

        let oldTable = null;
        if(developerId !== 'null'){
            oldTable = await Tables.findOne({'developer': {_id: developerId}});
        }


        if (oldTable && table.number !== oldTable.number) {
            oldTable.developer = null;
            await oldTable.save();
        }

        table.developer = developerId !== 'null' ? mongoose.Types.ObjectId(developerId) : null;
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
        return res.status(400).send(e)
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
                $set: {
                    developer: {
                        $cond: {
                            if: {
                                $arrayElemAt: ["$developer", 0]
                            },
                            then: {$arrayElemAt: ["$developer", 0]},
                            else: null,
                        }
                    }
                }
            },
        ])
        if (!tables) {
            return res.sendStatus(404);
        }
        return res.json(tables)
    } catch (e) {
        return res.status(400).send(e)
    }
}

export const removeTable = async (req, res) => {
    try {
        const table = await Tables.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id));

        if (!table) return res.sendStatus(404);

        return res.json(table)
    } catch (e) {
        return res.status(400).send(e)
    }
}