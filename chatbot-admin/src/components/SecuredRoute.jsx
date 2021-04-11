/**
 * This is a private route component used to protect the routes
 */
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "../Context/context";

export default function SecuredRoute({
  component: Component,
  path,
  isPrivate,
  ...rest
}) {
  const user = useAuthState();

  return (
    <Route
      path={path}
      render={(props) =>
        isPrivate && !Boolean(user.userDetails) ? (
          <Redirect to={{ pathname: "/admin_login" }} />
        ) : (
          <Component {...props} />
        )
      }
      {...rest}
    />
  );
}
