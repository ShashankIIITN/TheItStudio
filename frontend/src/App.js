import Form from "./components/Form";
import { useState, useEffect } from "react";
import Table from "./components/Table";
import "./css/app.css";


const url = process.env.REACT_APP_URL || "http://localhost:5000/"

function App() {
  const [selectedRows, setSelectedRows] = useState([]);

  const [open, setopen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    hobbies: ''
  });

  const [data, setData] = useState([{
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
    phoneNumber: "9685954145",
    hobbies: "games, cricket, reading"
  }]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const saveData = (update, reData, toUpdate) => {
    if (formData.name && formData.phoneNumber && formData.email) {

      let id = 1;
      let ids = [];
      for (let i = 0; i < data.length; i++) {
        ids.push(data[i].id);
      }
      ids.sort().forEach(el => {
        if (id == el) id++;
        else {
          return false;
        }
      })
      const newData = {
        id: id,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        hobbies: formData.hobbies
      };
      if (update) {
        updateData(toUpdate).then(el => {
          setData(reData);
          clearForm();
          setopen(!open);
        }).catch(err => {
          console.log(err)
        })
      } else {

        saveDatafunc(newData).then(ndata => {
          setData([...data, newData]);
          document.querySelector(".addBtn").scrollIntoView(1)
          clearForm();
          setopen(!open);
        }).catch(err => {
          console.log(err)
        })

      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleSendData = async () => {

    let sendingData = []
    selectedRows.sort();

    try {
      const res = await fetch(`${url}send-mail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({selectedRows:selectedRows})
      })

      const da = await res.json();
      alert(da.message)
    } catch (err) {
      console.log(err)
    }
  }

  const clearForm = () => {

    setFormData({
      name: '',
      phoneNumber: '',
      email: '',
      hobbies: ''
    });
  };

  const saveDatafunc = async (data) => {
    try {

      const res = await fetch(`${url}save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    } catch (err) {
      throw Error(err);
    }
  }

  const updateData = async (data) => {
    try {

      const res = await fetch(`${url}update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    } catch (err) {
      throw Error(err);
    }
  }

  const fetchData = async () => {

    try {

      const res = await fetch(`${url}getData`);

      const data = await res.json();

      setData(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <div className="App">
      <div className="App_mainbody">
        <Form setFormData={setFormData} data={data} open={open} setopen={setopen} formData={formData} clearForm={clearForm} saveData={saveData} handleChange={handleChange} />
        <Table setopen={setopen} data={data} selectedRows={selectedRows} setSelectedRows={setSelectedRows} setData={setData} formData={formData} setFormData={setFormData} />
        <div className="btngroup">
          <button type="button" className="addBtn" onClick={() => { setopen(!open) }}>Add Data</button>
          <button type="button" className="sendBtn" onClick={handleSendData}>Send Data</button>
        </div>
      </div>
    </div>
  );
}

export default App;
