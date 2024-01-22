import React, { useState } from 'react'
import "../css/Table.css";

const url = process.env.REACT_APP_URL || "http://localhost:5000/"

function Table({ data, selectedRows, setSelectedRows, setData, formData, setFormData, setopen, setId }) {

    const deleteData = async (id) => {
        try {

            const res = await fetch(`${url}delete/${id}`, {
                method: 'DELETE',
            });

        } catch (err) {
            throw Error(err);
        }
    }


    const updateRow = (e) => {
        let getData = data.filter(el => {
            return e.target.name == el.id
        })

        // getData[0].hobbies = getData[0].hobbies.join(",");
        setFormData(getData[0]);
        setopen(true);
    };

    const deleteRow = (e) => {
        let newData = data.filter(el => {
            return el.id != e.target.name;
        })

        // console.log(newData)

        deleteData(e.target.name).then(el => {
            console.log("deleted")
            setData(newData);
        }).catch(err => {
            console.log(err)
        })

    };

    const handleCheckboxChange = (id) => {
        const isSelected = selectedRows.includes(id);

        if (isSelected) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };
    return (
        <div className='table'>
            <table >
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Hobbies</th>
                        <th>Update/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td><input type="checkbox" onChange={() => handleCheckboxChange(item.id)} checked={selectedRows.includes(item.id)} /></td>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.email}</td>
                            <td>{item.hobbies}</td>
                            <td>
                                <button onClick={updateRow} name={item.id}>Update</button>
                                <button onClick={deleteRow} name={item.id}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table