import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log(err);
  return (
    <div>
      <h1>OOPS!!!!!!! Something went wrong</h1>
      <h3>{err.status}</h3>
    </div>
  )
}
export default Error;