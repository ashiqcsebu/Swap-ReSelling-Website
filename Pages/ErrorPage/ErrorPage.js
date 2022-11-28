import React, { useContext } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { myContext } from "../../contextApi/Authcontext";

const ErrorPage = () => {
  const { logOut } = useContext(myContext);
  const error = useRouteError();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
  <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
    <div className="max-w-md text-center">
      <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
        <span className="sr-only">Error</span>404
      </h2>
      <p className="text-2xl font-semibold md:text-3xl">
        Sorry, we couldn't find this page.
      </p>
      <p className="text-red-400">{error.statusText || error.message}</p>
      <h4 className="text-3xl"> Please <button className="btn" onClick={handleLogOut}>Sign out</button> and log back in</h4>
    </div>
  </div>
</section>
  );
};

export default ErrorPage;


