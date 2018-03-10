import React from "react";

export const Card = ({ children }) =>
  <div className={window.location.pathname === "/login" && "/signup" ? "card login" : "card default"}>
    {children}
  </div>;