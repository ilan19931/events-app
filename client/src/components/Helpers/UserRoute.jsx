import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserRoute = (props) => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user) {
      navigate("/signin");
    }
  }, [auth.user, navigate]);

  return <>{props.children}</>;
};

export default UserRoute;
