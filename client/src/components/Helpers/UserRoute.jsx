import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import checkAuth from "../../helpers/checkAuth";

const UserRoute = (props) => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (!auth.user) {
        navigate("/signin");
      }

      checkAuth();
    } catch (err) {
      navigate("/signin");
    }
  }, [auth.user, navigate]);

  return <>{props.children}</>;
};

export default UserRoute;
