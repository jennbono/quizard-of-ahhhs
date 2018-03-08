import React from "react";

export const CardHeader = props =>
  <div className={window.location.pathname === "/winner" ? "card-header winner" : "card-header default"}>
    {props.children}
  </div>;