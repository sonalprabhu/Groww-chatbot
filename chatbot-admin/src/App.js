/**
 * This is the Root Component of the Frontend.
 */
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import routes from "./Config/routes";
import { AuthProvider } from "./Context/context";
import "./App.css";
import SecuredRoute from "./components/SecuredRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          {routes.map((route) => {
            return (
              <SecuredRoute
                key={route.path}
                exact={true}
                from="/"
                path={route.path}
                component={route.component}
                isPrivate={route.isPrivate}
              />
            );
          })}
          <Redirect from="/" to="/admin_login"/>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;