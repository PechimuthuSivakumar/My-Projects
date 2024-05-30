import React from "react";
import PlansProvider from "./Provider/PlansProvider/PlansProvider";
import UserProvider from "./Provider/UserProvider/UserProvider";
import Routes from "./Routes";

const App = () => {
  return (
    <React.Fragment>
          <UserProvider>
              <PlansProvider>                
                              <Routes />
              </PlansProvider>
            </UserProvider>
    </React.Fragment>
  );
};

export default App;
