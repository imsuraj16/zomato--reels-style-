import MainRoutes from "./routes/MainRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFoods } from "./store/actions/foodActions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoods());
  }, [dispatch]);

  return (
    <div>
      <MainRoutes />
    </div>
  );
};

export default App;
