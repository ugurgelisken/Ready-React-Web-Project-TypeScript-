import { useDispatch } from "react-redux";
import { setActivePage } from "../../store/application.store";

const Help = () => {
  const dispatch = useDispatch();
  dispatch(setActivePage("help"));
  return <h1>Help</h1>;
};
export default Help;
