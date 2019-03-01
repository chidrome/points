import React, { Component } from 'react';

class Profile extends Component {

  // componentDidMount = () => {
  //   this.props.updateUser()
  // }

  render() {
    if(this.props.user){
      return (
          <div>
            <h2>Hello again, {this.props.user.name}!</h2>
            <h4>Your email is {this.props.user.email}</h4>
            <h4>Your chosen rewards program is {this.props.mileage_program}</h4>
            <h4>Your current balance is {this.props.balance}</h4>
          </div>
        );
    }
    return(
      <div>
        <p>This is a profile page. You must be logged in to see it.</p>
        <p>Would you like to <a href="/login">Log In</a> or <a href="/signup">Sign up</a>?</p>
      </div>
      );
  }
}

export default Profile;
