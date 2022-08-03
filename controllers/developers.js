import Developers from "../models/Developer.js";
import mongoose from "mongoose";


export const getDevelopers = async (req, res) => {
    try {
        const developers = await Developers.find();

        if (!developers) return res.sendStatus(404);

        return res.json(developers)
    } catch (e) {
        return res.status(400).send(e)
    }
}

export const createDeveloper = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            phone,
        } = req.body;

        const newDeveloper = new Developers({
            firstName,
            lastName,
            phone,
        })

        await newDeveloper.save();

        return res.json(newDeveloper)
    } catch (e) {
        return res.status(400).send(e)
    }
}

export const updateDeveloper = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            phone,
            tableId,
        } = req.body;

        const developer = await Developers.findById(mongoose.Types.ObjectId(req.params.id));

        if (!developer) return res.sendStatus(404);

        developer.firstName = firstName
        developer.lastName = lastName
        developer.phone = phone
        developer.tableId = tableId

        await developer.save()
        return res.json(developer)
    } catch (e) {
        return res.status(400).send(e)
    }
}

export const removeDeveloper = async (req, res) => {
    try {
        const developer = await Developers.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id))

        if (!developer) return res.sendStatus(404);

        return res.json(developer)
    } catch (e) {
        return res.status(400).send(e)
    }
}