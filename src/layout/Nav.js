import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  handleLogout = (e) => {
    e.preventDefault();
    // REMOVE LS TOKEN; UPDATE PARENT STATE
    localStorage.removeItem('serverToken');
    this.props.updateUser();
  }

  render() {
    let links = '';
    if(this.props.user){
      links = (
          <span>
            <Link to="/profile">Profile</Link>
            <Link to="/points/add">Add Mileage Program</Link>
            <Link to="/recommend">Recommend</Link>
            <a onClick={this.handleLogout}>Logout</a>
          </span>
        );
    }
    else {
      links = (
          <span>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </span>
        );
    }
    return(
        <div>
          <nav className="nav">
            <Link to="/">Home</Link>
            {links}
          </nav>
        </div>
      );
  }
}

export default Nav;
