import React , {lazy, Suspense}from "react"
import ReactDOM from "react-dom/client"
import Header from "./src/components/Header"
import Body from "./src/components/Body"
import About from "./src/components/About"
import Contact from "./src/components/Contact"
import Error from "./src/components/Error"
import RestaurantMenu from "./src/components/RestaurantMenu"
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"

//lazy loading
const Grocery = lazy(() => import("./src/components/Grocery"))


const AppLayout = () => {
  return (
    <div>
      <Header />
      <Outlet/>
    </div>

  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    children: [
        {
          path: "/about",
          element: <About/>,
        },
        {
          path: "/",
          element: <Body/>
        },
        {
          path: "/contact",
          element: <Contact/>,
        },
        {
          path: "/grocery",
          element:<Suspense> <Grocery/></Suspense>,
        },
        {
          path: "/restaurants/:resId",
          element: <RestaurantMenu/>
        }
    ],
    errorElement: <Error/>,
  },
 

])
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<RouterProvider router = {appRouter}/>);
