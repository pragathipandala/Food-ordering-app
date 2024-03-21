import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockdata";
import { useState, useEffect } from "react";
// import { swiggy_api_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
const Body = () => {

  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isFetching, setIsFetching] = useState(true);


  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
   let  data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4485835&lng=78.39080349999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

    const json = await data.json();

    console.log(json);

    setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    setIsFetching(false);
    console.log(filteredRestaurant);
  };

  return  < div className="body" >

        <div className="search">

      <input type="text" className="filter"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);

        }}
      />
      <button onClick={() => {
        console.log(searchText)
        const filteredRestaurant = listOfRestaurants.filter(
          (res) => res.info.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
        console.log(filteredRestaurant)
        setFilteredRestaurant(filteredRestaurant);
      }}>Search</button>


      <button className="rate-btn"
        onClick={() => {
          const filteredList = listOfRestaurants.filter(
            (res) => res.info.avgRating > 4);
          setFilteredRestaurant(filteredList);
        }}
      >Top Rated Restaurants</button>
    </div>

    <div className="cards">
    {isFetching ? (
        <Shimmer /> // Show shimmer while data is being fetched
      ) : (
        <div className="cards">
          {filteredRestaurant.map((restaurant) => (
            <RestaurantCard key={restaurant.id} resData={restaurant} />
          ))}
        </div>
      )}
    </div>
  </ div>
}

export default Body;