import React from "react";
import "./App.css";
import Router from "./Router";
import Header from "./Components/Header";

// Font imports (For MUI)
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { FamilyTreeProvider } from "./Contexts/FamilyTreeContext";

const App = () => {
  return (
    <FamilyTreeProvider>
      <Header />
      <Router />
    </FamilyTreeProvider>
  );
};

export default App;
