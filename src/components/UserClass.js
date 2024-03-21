import React from "react";
class UserClass extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: "dummy",
        location: "xyz"
      }
      
    }
  }
  async componentDidMount(){
    const data = await fetch("https://api.github.com/users/pragathipandala")
    const json = await data.json();
    console.log(json)
    this.setState({
      userInfo: json
    })
    
   }
  
  render(){
    const { name, location} = this.state.userInfo;
    return (
      <div className="user-card">
        <h4>Name: {name} </h4>
        <p>Location:{location} </p>

      </div>
    )
  }
}
export default UserClass;