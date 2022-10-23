import axios from "axios";

const checkAuth = async () => {
  try {
    await axios.get("/auth");
  } catch (err) {
    localStorage.clear();

    console.log("auth failed");
    console.log(err);
  }
};

export default checkAuth;
