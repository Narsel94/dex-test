import { FC,   ReactNode,   useState } from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../../helpers/cookies";


type TProtectedRoute = {
  enabledAuth: boolean;
  element: ReactNode;
};

const ProtectedRoute: FC<TProtectedRoute> = ({ enabledAuth, element }) => {
  const isAuth = () => {
    const token = getCookie("token");
    return !!token;
  };
  const [auth2] = useState<boolean>(isAuth());

  

  if (enabledAuth) {
    if (auth2) {
      return <>{element}</>;
    } else {
      return <Navigate to="/sign-in" replace={true} />;
    }
  }

  if (!enabledAuth) {
    if (!auth2) {
      return <>{element}</>;
    } else {
      return <Navigate to="/teams" replace={true} />;
    }
  }

  return <>{element}</>;
};

export const PublicRoutes: FC<Pick<TProtectedRoute, "element">> = ({
  element,
}) => {
  return <ProtectedRoute enabledAuth={false} element={element} />;
};

export const PrivateRoutes: FC<Pick<TProtectedRoute, "element">> = ({
  element,
}) => {
  return <ProtectedRoute enabledAuth={true} element={element} />;
};
