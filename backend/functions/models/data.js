import { Schema, model } from 'mongoose';

const dataSchema = new Schema({
    id: { type: Number, required: true, unique:true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    hobbies: { type: String, required: true },
});

const Data = model('Data', dataSchema);

export default Data;