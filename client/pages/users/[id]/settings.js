import React from "react";
import Header from "../../../components/Header";

function settings() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <div>
        <h2 className="text-2xl font-light">Settings</h2>
      </div>
    </div>
  );
}

export default settings;
