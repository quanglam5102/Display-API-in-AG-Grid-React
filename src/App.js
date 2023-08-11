import './App.css';
import { useState, useEffect, useMemo } from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function App() {

  //Define variables to hold and modify data
  const [rowData, setRowData] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
    {field: "name"},
    {field: "height"},
    {field: "mass"},
    {field: "birth_year"},
    {field: "gender"}
  ]);

  //Define default filter for all columns
  const defaultColDef = useMemo( () => ({
    sortable: true,
    filter: true
  }), []);

  //Fetch the api whenever the page first loads
  useEffect(() => {
    fetch("https://swapi.dev/api/people/?format=json")
    .then(res => res.json()) //Convert the data to JSON format
    .then(data => setRowData(data.results)) //put actual data in rowData to be displayed 
  });

  //Render the component
  return (
    <div className="ag-theme-alpine" style={{height:500}}>
      <AgGridReact
        rowData = {rowData}//Display data in grid format
        columnDefs={columnDefs}//Define columns field
        defaultColDef={defaultColDef}//Set filter engine for all columns
        animateRows={true}//Make the sorting animation smoother
        rowSelection='multiple'//Allow multiple rows to be selected
       />
    </div>
  );
}

export default App;
