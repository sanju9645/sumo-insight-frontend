import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from "../LoginButton";
import UsernameMenu from "./UsernameMenu";
import ConfigureButton from "../ConfigureButton";

const MainNav = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <span className="flex space-x-2 items-center">
      <ConfigureButton />

      {isAuthenticated ? (
        <>
          <UsernameMenu />
        </>
      ) : (
        <LoginButton />
      )}
    </span>
  );
};

export default MainNav;