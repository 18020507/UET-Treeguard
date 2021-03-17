import React from "react";

import Map from "./Map"
import Nav from "./nav";

function App() {
  return (
    <>
      <Nav />
      <Map />
    </>
  );
}

export default React.memo(App);
