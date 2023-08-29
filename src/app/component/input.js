"use client";
import'../globals.css';
import React, { useState } from "react";
import BasicFormControl from "./TextFieldJson";
import { JsonToTable } from "react-json-to-table";
import Csvconvert from './Csvconvert';

const Input = () => {
  const [jsonFile, setJsonFile] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [flattenedJson, setFlatenedJson] = useState("");
  const [tableData, setTableData] = useState([]);

  function renderTableData(data) {
    return (
      <table>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>
                {typeof value === "object" ? (
                  renderTableData(value)
                ) : (
                  <span>{value}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  function handleJsonChange(event) {
    const inputValue = event.target.value;
    setJsonFile(inputValue);
    setIsValid(isValidJSON(inputValue));
  }

  function isValidJSON(input) {
    try {
      JSON.parse(input);
      return true;
    } catch (error) {
      return false;
    }
  }
  function flattenJSON(json, parentKey = "") {
    let result = {};

    for (const key in json) {
      const combinedKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof json[key] === "object" && !Array.isArray(json[key])) {
        const nestedValues = flattenJSON(json[key], combinedKey);
        result = { ...result, ...nestedValues };
      } else {
        result[combinedKey] = json[key];
      }
    }

    return result;
  }

  function handleConvertFlattenedData() {
    if (!isValid) {
      console.error("JSON is not valid");
      return;
    }
    try {
      const jsonData = JSON.parse(jsonFile);
      const flattenedJson = flattenJSON(jsonData);
      setFlatenedJson(flattenedJson);
      const tableDataArray = Object.entries(flattenedJson).map(
        ([key, value]) => ({
          key,
          value,
        }),
        []
      );
      setTableData(tableDataArray);
    } catch (error) {
      console.error("Error processing JSON:", error);
    }
  }
  
  

  return (
    <div>
      

      <BasicFormControl
        isValid={isValid}
        handleJsonChange={handleJsonChange}
        jsonFile={jsonFile}
        handleConvertFlattenedData={handleConvertFlattenedData}
        flattenedJson={flattenedJson}
        tableData={tableData}
        renderTableData={renderTableData}
      />
      {renderTableData(flattenedJson)}
     <Csvconvert
     flattenedJson={flattenedJson}/>
    </div>
  );
};

export default Input;
