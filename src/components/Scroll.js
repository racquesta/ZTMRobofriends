import React from "react";

const Scroll = ({ children }) => (
  <div
    style={{ overflowY: "scroll", border: "1px solid black", height: "500px" }}
  >
    {children}
  </div>
);

export default Scroll;
