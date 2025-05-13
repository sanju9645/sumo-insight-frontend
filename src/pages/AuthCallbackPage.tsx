import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateUser } from "../apis/UserApi";
import { siteContents } from "../lib/siteContents";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const hasCreatedUser = useRef(false);
  const { createUser } = useCreateUser();

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ 
        auth0Id: user.sub, 
        email: user.email, 
        profilePic: user?.picture, 
        name: user.name 
      });

      hasCreatedUser.current = true;
    }
    navigate(siteContents.pages.apiInsight);
  }, [createUser, navigate, user]);

  return <>Loading...</>;
};

export default AuthCallbackPage;