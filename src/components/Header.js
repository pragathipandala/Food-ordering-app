import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import logo from "../../public/images/logo.png"
const Header = () => {
  const [btnName, setBtnName] = useState("login");
  const onlineStatus = useOnlineStatus();
  return (
    <div className="header bg-yellow-300 sticky top-0">
      <ul className="list flex justify-between ">
        <li><img className="logo ml-4 w-20" src={logo} /> </li>
        <li>
          <ul className="flex gap-[4vh]">
            <li className="nav-item active:"><Link to="/"> Home</Link></li>
            <li className="nav-item"><Link to="/about">About</Link></li>
            <li className="nav-item"><Link to="/contact">Contact</Link></li>
            <li className="nav-item">Cart</li>
          </ul>
        </li>
        <li>
          <ul className="flex ">
            <li className="p-6">Status: {onlineStatus ? "online" : "Offline"} </li>
            <button type="button" className="pr-4 my-3 px-4 mx-2 bg-slate-50 hover:bg-slate-100 rounded-2xl" onClick={() => {
              btnName === 'login' ? setBtnName("logout") : setBtnName('login')
            }}>
              {btnName}
            </button>
          </ul>
        </li>

      </ul>
    </div>
  )
}
export default Header;