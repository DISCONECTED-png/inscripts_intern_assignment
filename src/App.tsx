import React from "react";
import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import SpreadsheetTable from "./components/SpreadsheetTable";
import TabBar from "./components/TabBar";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Toolbar />
     
      <main className="flex-1 overflow-auto">
        <SpreadsheetTable />
      </main>
      <TabBar />
    </div>
  );
};

export default App;
