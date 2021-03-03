import React, { Component } from "react";
//import CustomButton from '../custom-button/custom-button.component';
class authForm extends Component {
  
  clickTest = async event => {
    // console.log(testCog);
    console.log('clickText');
  };
  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form>
          <h1>Test</h1>
          <button onClick={this.clickTest} >TEST</button>
          
            
        </form>
      </div>
    );
  }
}
export default authForm;
