import User from "./User";
import UserClass from "./UserClass";
import React from "react";

class About extends React.Component {
 constructor(props){
  super(props);
 }

 componentDidMount(){

 }
  render(){
    console.log("parent render")
    return (
      <div>
      <h1>About Us</h1>
      <UserClass name = {"Pragathi class"} info={"this is a class component"}/>
    </div>

    )
}
}
export default About;