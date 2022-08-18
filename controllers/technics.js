import Technics from "../models/Technics.js";
import mongoose from "mongoose";


const toArrayString = (arr, field) => {
    return {
        name: field,
        selectedOption: '',
        options: [...new Set(arr.map((item) => {
            if (typeof item[field] === 'boolean') {
                if (item[field]) {
                    return 'Yes';
                } else {
                    return 'No';
                }
            }
            return item[field];
        }))]
    };
}

export const getTechnics = async (req, res) => {
    const {
        page = 1,
        count = 10,
    } = req.query;

    const query = {};

    if (req.query.name) query.name = req.query.name;
    if (req.query.type) query.type = req.query.type;
    if (req.query.bind) query.bind = req.query.bind.toLowerCase() === 'yes';

    const sort = {};
    let querySort = [];

    if (req.query.sort) {
        querySort = JSON.parse(req.query.sort ? req.query.sort : []);
    }


    if (querySort.length) {
        if (querySort[1] === "asc") {
            sort[querySort[0]] = 1;
        }

        if (querySort[1] === "desc") {
            sort[querySort[0]] = -1;
        }
    }

    try {
        const technics = await Technics.find(query)
            .limit(count)
            .skip((page - 1) * count)
            .sort(sort)
            .exec();

        if (!technics) {
            return res.sendStatus(404)
        }

        const totalCountItems = await Technics.find(query);

        return res.json({
            technics,
            totalCountItems: totalCountItems.length,
            currentPage: Number(page)
        })
    } catch (e) {
        return res.status(400).send(e)
    }
}

export const getFilters = async (req, res) => {

    try {
        const technics = await Technics.find();

        if (!technics) return res.sendStatus(404);

        return res.json([toArrayString(technics, 'name'), toArrayString(technics, 'type'), toArrayString(technics, 'bind')]);
    } catch (e) {
        return res.status(400).send(e);
    }
}


export const createTechnic = async (req, res) => {
    try {
        const {
            name,
            type,
            serial
        } = req.body;


        const newTechnic = new Technics({
            name,
            type,
            serial
        })

        await newTechnic.save();

        return res.json(newTechnic)
    } catch (e) {
        return res.status(400).send(e)
    }
}


export const updateTechnic = async (req, res) => {
    try {
        const {
            name,
            type,
            serial,
            bind
        } = req.body;

        const technic = await Technics.findById(mongoose.Types.ObjectId(req.params.id));

        if (!technic) return res.sendStatus(404);

        technic.name = name
        technic.type = type
        technic.serial = serial
        technic.bind = bind

        await technic.save()
        return res.json(technic)
    } catch (e) {
        return res.status(400).send(e)
    }
}


export const removeTechnic = async (req, res) => {
    try {
        let technic = await Technics.findById(mongoose.Types.ObjectId(req.params.id));

        if (technic.bind) {
            return res.status(405).send({error: 'Unable to remove the attached device'})
        }
        technic = await Technics.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id))

        if (!technic) return res.sendStatus(404);

        return res.json(technic)
    } catch (e) {
        return res.status(400).send(e)
    }
}