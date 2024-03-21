import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_URL } from "../utils/constants";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const {resId} = useParams();
  
  useEffect(() => {
    fetchMenu()
  }, [])
  const fetchMenu = async () => {
    const data = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4485835&lng=78.39080349999999&restaurantId="+resId+"&catalog_qa=undefined&submitAction=ENTER");
    const json = await data.json();
    setResInfo(json.data);
  };
  if (resInfo === null) return <Shimmer />

  const { name, cuisines, costForTwoMessage } = resInfo?.cards[2]?.card?.card?.info;
  const { itemCards } = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;
  return (
    <div className="res-title">
      <h2>{name}</h2>
      <p>{cuisines} - {costForTwoMessage}</p>
      <div className="menu">
      <h3>Menu</h3>
        <ul>
          {itemCards?.map( (item) => (
            <li key={item?.card?.info?.id}>
              {item?.card?.info?.name}
            </li>
          ))}
        </ul>     
      </div>
    </div>
  )
}

export default RestaurantMenu;