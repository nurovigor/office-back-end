import Developers from "../models/Developer.js";
import mongoose from "mongoose";


export const getDevelopers = async (req, res) => {
    try {
        const developers = await Developers.find();
        if (!developers) {
            return res.json({massage: "Developers not yet added"})
        }
        return res.json(developers)
    } catch (e) {
        console.log(e)
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
        console.log(e)
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

        if (!developer) {
            return res.json({massage: "This developer does not exist."})
        }

        developer.firstName = firstName
        developer.lastName = lastName
        developer.phone = phone
        developer.tableId = tableId

        await developer.save()
        return res.json(developer)
    } catch (e) {
        console.log(e)
    }
}

export const removeDeveloper = async (req, res) => {
    try {
        const developer = await Developers.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id))

        if (!developer) return res.json({message: "This developer does not exist."})

        return res.json({message: "Developer was removed"})
    } catch (e) {
        console.log(e)
    }
}