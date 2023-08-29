import * as React from "react";
import { TextField, Typography, Button, Box } from "@mui/material";
import DataTable from "./DataTable";

export default function BasicFormControl({
  isValid,
  handleJsonChange,
  jsonFile,
  handleConvertFlattenedData,
  flattenedJson,
  tableData,
  renderTableData,
}) {
  // async function writeCsv() {
  //   try {
  //     let result = await csv.buffered(flattenedJson)
  //     console.log(result)
  //   }catch(err){
  //     console.error(err)
  //   }
  //   }
  return (
    <>
      <Box
        sx={{
          width: 1200,
          height: 600,
        }}
      >
        <Typography>JSON</Typography>
        <TextField
          type=".json"
          label="Input Json"
          multiline
          rows={20}
          fullWidth
          sx={{ width: 1000, height: 120 }}
          value={jsonFile}
          onChange={handleJsonChange}
          error={!isValid}
          helperText={isValid ? "" : "Invalid JSON format"}
          variant="outlined"
        />
      </Box>
      <Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isValid}
          onClick={handleConvertFlattenedData}
        >
          To Convert Flatning Format
        </Button>
        {flattenedJson && (
          <div>
            <h2>Flattened Data:</h2>
            <pre>{JSON.stringify(flattenedJson, null, 20)}</pre>
          </div>
        )}

        <DataTable
          isValid={isValid}
          tableData={tableData}
          flattenedJson={flattenedJson}
          renderTableData={renderTableData}
        />
      </Box>
      {/* {writeCsv()} */}
    </>
  );
}
