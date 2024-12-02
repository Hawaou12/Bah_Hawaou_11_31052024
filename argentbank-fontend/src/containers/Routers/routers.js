import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home/Home"; 
import Login from "../../pages/SignIn/SignIn"; 
import NotFound from "../NotFound/notFound"; 
import User from "../../pages/User/User"; 
import { useSelector } from "react-redux";
import { selectUser } from "../../helpers/features/userSlice";
import ProtectRoute from "../../helpers/projectRoute"; 
import Protect from "../../helpers/project"; 


const Routers = () => {
  const user = useSelector(selectUser);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/login" element={<Protect user={user}><Login /></Protect>} />
        <Route path="/profile" element={<ProtectRoute user={user}><User /></ProtectRoute>} />
      </Routes>
    </div>
  );
};

export default Routers;
