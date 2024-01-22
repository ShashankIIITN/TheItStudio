import React, { useState } from 'react';
import ReactDom from "react-dom";
import "../css/Modal.css"
import { FaTimes } from "react-icons/fa";

function Form({ setFormData, open, setopen, formData, clearForm, saveData, handleChange, update, data }) {
    const [errors, setErrors] = useState({});
    if (!open) return null



    const handleClose = () => {
        clearForm();
        setopen(!open)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {


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
    }

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(formData.phoneNumber.trim())) {
            newErrors.phoneNumber = 'Phone Number must be 10 digits';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.hobbies.trim()) {
            newErrors.hobbies = 'Hobbies is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return ReactDom.createPortal(
        <>
            <div className='Modal__overlay' />
            <div className='Modal'>
                <div className='Form'>
                    <FaTimes className='form_cl_icon' onClick={handleClose} />
                    <h2 className="Form_Heading">Contacts App</h2>
                    <form className='Form_Content' onSubmit={handleSubmit}>
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange}  /><br />
                        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}

                        <label>Phone Number:</label>
                        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}  /><br />
                        {errors.phoneNumber && <span style={{ color: 'red' }}>{errors.phoneNumber}</span>}

                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange}  /><br />
                        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

                        <label>Hobbies:</label>
                        <input type="text" name="hobbies" value={formData.hobbies} onChange={handleChange} /><br />
                        {errors.hobbies && <span style={{ color: 'red' }}>{errors.hobbies}</span>}

                        <button type="submit" className='savebtn'>Save</button>
                    </form>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    );
};

export default Form