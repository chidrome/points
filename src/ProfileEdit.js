import React, { Component } from 'react'
import SERVER_URL from './constants/server';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';


export default class ProfileEdit extends Component {
  constructor(){
    super();
    this.state = {
      mileage_program: '',
      balance: 0,
      programs: [],
      redirectToProfile: false
    }
  }

  storeInput = (e) => {
    // update state to reflect user input
    let newState = e.target.value
    this.setState({
        [e.target.name]: newState
    })
  }

  componentDidMount = () => {
    this.getProgramsList()
  }

  getProgramsList = (e) => {
    let token = localStorage.getItem('serverToken');
    Axios.post(`${SERVER_URL}/points/programs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    .then(json => {
        this.setState({
            programs: json.data
        })
    })
    .catch(error => {
        console.log('ERROR retreiving programs DATA', error)
    })
  }

  addProgram = (e) => {
    e.preventDefault()
    let token = localStorage.getItem('serverToken');
    Axios.put(SERVER_URL+'/points/edit/', {
        // data to send to the server
        mileage_program: this.state.mileage_program,
        balance: this.state.balance,
      headers: { 
        'Authorization': `Bearer ${token}` // let the server know what data is coming 
      }
    })
    .then(json => {
        console.log(json)
        this.setState({
           redirectToProfile: true
        })
      
    })
    .catch(error => {
        console.log('ERROR POSTING DATA', error)
    })
  }

  firstCapitalization = (firstName) => {
    return firstName.charAt(0).toUpperCase() + firstName.slice(1)
  }

  render() {
    const programOptions = this.state.programs.map((r, i) => {
        return <option value={r.id} key={i}>{r.program}</option>
    });
    if(this.state.redirectToProfile){
      return (
        <Redirect to={'/profile'} />
      )
    }
    return (
      <div>
        <form onSubmit={this.addProgram}>
          <div className="form-control">
          <label name="mileage_program">Add Mileage Program:</label>
            <select className="drop-down" required onChange={this.storeInput} name="mileage_program">
                <option  value="" disabled selected hidden>Select One</option>
                {programOptions}
            </select>
          </div>
          <div className="form-control">
            <label name="balance">Add Balance:</label>
            <input type="number" name="balance" onChange={this.storeInput} value={this.state.balance} />
          </div>
          <div className="form-control">
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    )
  }
}