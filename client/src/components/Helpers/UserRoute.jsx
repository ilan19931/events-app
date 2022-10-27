import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import checkAuth from "../../helpers/checkAuth";

const UserRoute = (props) => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user) {
      navigate("/signin");
    }
  }, [navigate]);

  return <>{props.children}</>;
};

export default UserRoute;
