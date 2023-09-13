import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useRouteError } from "react-router";
import HomePage from "./pages";
import MovieDetails from "./pages/movie";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/movie/:id",
      element: <MovieDetails />,
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
