import Data from "../models/data.js"

export const saveData = async (req, res) => {
    try {
        const { name, phoneNumber, email, hobbies, id } = req.body;
        // Validation - Add more validation as needed
        if (!name || !phoneNumber || !email || !hobbies) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newData = new Data({
            name,
            phoneNumber,
            email,
            hobbies,
            id
        });

        const savedData = await newData.save();
        res.status(201).json(saveData);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
export const getData = async (req, res) => {
    try {
        const gotData = await Data.find({});

        res.status(201).json(gotData);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
export const deleteData = async (req, res) => {
    try {
        const id = req.params.id;
        const gotData = await Data.findOneAndRemove({ id: id });

        res.status(201).json(gotData);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
export const updateData = async (req, res) => {
    try {

        const { name, phoneNumber, email, hobbies, id } = req.body;

        // Validation - Add more validation as needed
        if (!name || !phoneNumber || !email || !hobbies) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const updatedUser = await Data.findOneAndUpdate(
            { id: id },
            { $set: { name, phoneNumber, email, hobbies } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};