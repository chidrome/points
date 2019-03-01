import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import SERVER_URL from './constants/server';
import './App.css';
import Footer from './layout/Footer';
import Home from './Home';
import Login from './auth/Login';
import Nav from './layout/Nav';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import Signup from './auth/Signup';
import Recommend from './Recommend';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      mileage_program: '',
      balance: 0
    }
  }

  componentDidMount = () => {
    // GET USER INFO
    this.getUser();
  }


  getUser = () => {
    // SEE IF THERE'S A TOKEN
    let token = localStorage.getItem('serverToken')
    // IF THERE IS, TRY TO GET USER INFO
    if(token){
      axios.post(`${SERVER_URL}/auth/current/user`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          user: response.data.user,
          mileage_program: response.data.mileage_program,
          balance: response.data.balance
        });
      })
      .catch(error => {
        console.log('ERROR looking up user by token', error, error.response)
        this.setState({ user: null })
      })
    }
    else {
      this.setState({ user: null })
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div className="container">
            <Nav user={this.state.user} updateUser={this.getUser} />
            <Route exact path="/" component={Home} updateUser={this.getUser} />
            <Route path="/login" component={
              () => (<Login user={this.state.user} updateUser={this.getUser} />)
            } />
            <Route path="/signup" component={
              () => (<Signup user={this.state.user} updateUser={this.getUser} />)
            } />
            <Route path="/profile" component={
              () => (<Profile user={this.state.user} updateUser={this.getUser} mileage_program={this.state.mileage_program} balance={this.state.balance} />)
            } />
            <Route path="/points/add" component={
              () => (<ProfileEdit user={this.state.user} updateUser={this.getUser} mileage_program={this.state.mileage_program} balance={this.state.balance} updateBalance={this.updateBalance} />)
            } />
            <Route path="/recommend" component={
              () => (<Recommend user={this.state.user} updateUser={this.getUser} mileage_program={this.state.mileage_program} balance={this.state.balance} />)
            } />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
