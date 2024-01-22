import React, { useState } from 'react';
import ReactDom from "react-dom";
import "../css/Modal.css"
import { FaTimes } from "react-icons/fa";

function Form({ setFormData, open, setopen, formData, clearForm, saveData, handleChange, update, data }) {
    if (!open) return null


    const handleClose = () => {
        clearForm();
        setopen(!open)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.id) {
            let newData = [];
            data.forEach(element => {
                if (element.id == formData.id) {
                    newData.push(formData);
                } else {
                    newData.push(element);
                }


            });

            // console.log(newData)
            saveData(true, newData, formData);
        } else
            saveData(false);
    }

    return ReactDom.createPortal(
        <>
            <div className='Modal__overlay' />
            <div className='Modal'>
                <div className='Form'>
                    <FaTimes className='form_cl_icon' onClick={handleClose} />
                    <h2 className="Form_Heading">Contacts App</h2>
                    <form className='Form_Content' onSubmit={handleSubmit}>
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required /><br />

                        <label>Phone Number:</label>
                        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required /><br />

                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required /><br />

                        <label>Hobbies:</label>
                        <input type="text" name="hobbies" value={formData.hobbies} onChange={handleChange} /><br />

                        <button type="submit" className='savebtn'>Save</button>
                    </form>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    );
};

export default Form