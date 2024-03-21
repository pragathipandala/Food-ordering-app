import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockdata";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch("https://corsproxy.org/?" +
        encodeURIComponent("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4485835&lng=78.39080349999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"));
      const json = await data.json();
      // console.log(json);
      setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsFetching(false);
    }
  };

  const handleSearch = (searchText) => {
    setSearchText(searchText);
    if (!searchText) {
      // If search box is empty, show all restaurants
      setFilteredRestaurant(listOfRestaurants);
    } else {
      // Filter restaurants based on search text
      const filteredRestaurant = listOfRestaurants.filter(
        (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredRestaurant(filteredRestaurant);
    }
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return (
      <h1>You are offline!!</h1>
    );
  }

  return (
    <div className="bg-slate-50">
      <div className="flex justify-center p-4">
        <div className="search  px-4 ">
          <input
            type="text"
            className="filter py-1 px-2 border border-neutral-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button className=" bg-yellow-400 py-1 px-2 border border-yellow-400" onClick={() => handleSearch(searchText)}>Search</button>
        </div>
        <div>
          <button
            className="rate-btn py-1 px-4 hover:border  hover:border-yellow-600 bg-white rounded-lg border border-neutral-400"
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4
              );
              setFilteredRestaurant(filteredList);
            }}
          >
           <FontAwesomeIcon className="text-yellow-400 " icon={faStar} /> Top Rated Restaurants
          </button>
        </div>
      </div>
      {isFetching ? (
        <Shimmer />
      ) : (
        <div className="cards flex flex-wrap justify-center">
          {filteredRestaurant.map((restaurant) => (
            <Link key={restaurant.info.id} to={"/restaurants/" + restaurant.info.id}> <RestaurantCard resData ={restaurant} /></Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Body;
