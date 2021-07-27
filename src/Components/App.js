import React, { Component } from "react";
import Routers from "Components/Routers";
import GlobalStyles from "Components/GlobalStyles";

class App extends Component {
  render() {
    return (
      <>
        <Routers />
        <GlobalStyles />
      </>
    );
  }
}

export default App;