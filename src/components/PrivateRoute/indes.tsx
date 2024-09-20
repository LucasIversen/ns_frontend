import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import Props from "./interfaces";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props: Props) => {
  const [user] = useAuthState(auth);

  console.log(user);

  return user ? props.children : <Navigate to="/login" />;
};

export default PrivateRoute;
