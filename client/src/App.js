// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  // initialize our state
  state = {
    data: [],
    message: null,
    idToDelete: null,
    idToUpdate: null,
    updateToApply: null
  };

  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  putDataToDB = (message) => {
    const data = this.state.data;
    let idToBeAdded = 1;
    if (data.length) {
      const lastId = data[data.length - 1].id;
      idToBeAdded = lastId + 1;
    }

    axios.post('http://localhost:3001/api/putData', {
      id: idToBeAdded,
      message: message,
    }).then(() => this.getDataFromDb());
  };

  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteData', {
      data: { id: objIdToDelete },
    }).then(() => this.getDataFromDb());
  };

  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    }).then(() => this.getDataFromDb());
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ message: e.target.value })}
            placeholder="add something in the database"
            style={{ width: '200px' }} />
          <button onClick={() => this.putDataToDB(this.state.message)}>
            ADD
          </button>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here" />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here" />
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here" />
          <button
            onClick={() => this.updateDB(this.state.idToUpdate, this.state.updateToApply)}>
            UPDATE
          </button>
        </div>
        <ul>
          {data.length <= 0
            ? 'NO DB ENTRIES YET'
            : data.map((dat) => (
              <li key={dat.id} style={{ padding: '10px' }}>
                <span style={{ color: 'gray' }}> id: </span> {dat.id} <br />
                <span style={{ color: 'gray' }}> data: </span>
                {dat.message}
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default App;