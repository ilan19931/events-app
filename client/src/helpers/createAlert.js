import { v4 as uuid } from "uuid";

import { addAlert, removeAlert } from "../redux/slices/alert.slice";

const createAlert = (alert, dispatch) => {
  const _id = uuid();

  const newAlert = { _id, ...alert };

  dispatch(addAlert(newAlert));

  const timeOut = setTimeout(() => {
    dispatch(removeAlert(_id));

    clearTimeout(timeOut);
  }, 5000);
};

export default createAlert;
