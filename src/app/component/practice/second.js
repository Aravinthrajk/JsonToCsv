import React from "react";
import ReactDOM from "react-dom";

// ===================== //
// IMPORT THE COMPONENT  //
// ===================== //
import { JsonToTable } from "react-json-to-table";
// ===================== //

export function Appa() {
  // ===================== //
  // DUMMY DATA            //
  // ===================== //
  const myJson = [
    {
      id: "1",
      name: "Sarajane Wheatman",
      ip: "40.98.252.240",
    },
    {
      id: "2",
      name: "Linell Humpherston",
      ip: "82.225.151.150",
    },
  ];
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {/* ===================== */}
      {/* HOW TO USE IT         */}
      {/* ===================== */}
      <JsonToTable json={myJson} />
      {/* ===================== */}
    </div>
  );
}
