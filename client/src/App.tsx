import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { UserProvider } from "./context/user";
import Game from "./page/game";

function App() {
  return (
    <Router>
      <UserProvider user={null}>
        <Switch>
          <Route path="*" component={Game} />
        </Switch>
      </UserProvider>
    </Router>
  );
}

export default App;
