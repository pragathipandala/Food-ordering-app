import { CDN_URL } from "../utils/constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faCircle} from '@fortawesome/free-solid-svg-icons';



const RestaurantCard = (props) => {
  const { resData } = props;

  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    costForTwo } = resData?.info;

  return <div className="card p-1 m-6 bg-white shadow-md w-56 h-72 rounded-lg">
      <img className=" rounded-lg object-cover w-full h-36" src={CDN_URL + cloudinaryImageId} />
    <div className="details  px-2 text-wrap">
      <h3 className="font-bold font-sans pt-1 text-sm text-gray-800">{name}</h3>
      <p className="text-sm py-1 text-pretty">{cuisines.join(' ')}</p>
      <p className="font-semibold text-sm  text-gray-700"> <FontAwesomeIcon className="text-yellow-400" icon={faStar} /> {avgRating} - <span>{costForTwo}</span></p>
    </div>
  </div>

}

export default RestaurantCard;