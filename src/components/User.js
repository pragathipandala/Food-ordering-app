import { useState } from "react";
const User = (props) =>{
  const [count1] = useState(0);
  const [count2] = useState(1);

  return (
    <div className="user-card">
      <h2>count1 : {count1}</h2>
      <h2>count2 : {count2}</h2>

      <h4>Name: {props.name} </h4>
      <p>About {props.info}</p>

    </div>
  )
}
export default User;