"use client";
import React, { useState } from "react";
import csvDownload from "json-to-csv-export";
import { JsonToTable } from "react-json-to-table";
import { TextField, Button, Box } from "@mui/material";
import BasicFormControl from "../TextFieldJson";
import Appa from "./second";

const Inputs = () => {
  const [jsonFile, setJsonFile] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [flattenedJson, setFlatenedJson] = useState("");
  const [tableData, setTableData] = useState([]);

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
  const dataToConvert = {
    data: jsonFile,
    delimiter: ",",
    headers: [""],
  };

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

      // Convert flattened JSON to an array for table rendering
      const tableDataArray = Object.entries(flattenedJson).map(
        ([key, value]) => ({
          key,
          value,
        })
      );
      setTableData(tableDataArray);
    } catch (error) {
      console.error("Error processing JSON:", error);
    }
  }

  return (
    <div>
      
      {/* <BasicFormControl
      isValid={isValid}
      jsonFile={jsonFile}
      handleJsonChange={handleJsonChange}
      handleConvertFlattenedData={handleConvertFlattenedData}
      flattenedJson={flattenedJson}
      /> */}

      <TextField
        label="Input Json"
        multiline
        rows={20}
        fullWidth
        value={jsonFile}
        onChange={handleJsonChange}
        error={!isValid}
        helperText={isValid ? "" : "Invalid JSON format"}
        variant="outlined"
      />

      <Button
        variant="contained"
        color="primary"
        disabled={!isValid}
        onClick={handleConvertFlattenedData}
      >
        To Convert Flattening Format
      </Button>
      {flattenedJson && (
        <div>
          <h2>Flattened Data:</h2>
          <pre>{JSON.stringify(flattenedJson, null, 20)}</pre>
        </div>
      )}

      {/* {tableData.length > 0 && (
        <div>
          <DataTable 
          tableData={tableData}
          isValid={isValid}/>
        </div>
      )}  */}
      <JsonToTable json={setTableData} />
      <button onClick={() => csvDownload(dataToConvert)}>Download Data</button>
    </div>
  );
};

export default Inputs;
