import { Button, ButtonGroup } from '@mui/material';
import './App.css';
import DataTable from './UI/DataTable';
import { useState } from 'react';
import { Container } from '@mui/system';


export default function App() {
  const [isShown, setIsShown] = useState(false);
  const [isShown2, setIsShown2] = useState(false);

  const showQuery1 = (event) => {
    setIsShown(current => !current);
  };
  const showQuery2 = (event) => {
    setIsShown2(current => !current);
  };
  return (
    <>
      <div>
          <DataTable pop='/api/populate' add='/api/add_entry' edit='/api/:id' delete='/api/:id' />
          
          <ButtonGroup fullWidth={true}>
            <Button onClick={showQuery1}>Query 1</Button>
            <Button onClick={showQuery2}>Query 2</Button>
          </ButtonGroup>

          {/* QUIRKY JAVASCRIP THINGZZZ HAPPEN BELOW */}
          {isShown ? (
            (<DataTable pop='/api/query1' add='/api/add_entry' edit='/api/' delete='/api/:id'  />)
          ) : ((null))}
          {isShown2 ? (
            (<DataTable apicall='/api/query2' add='/api/add_entry' edit='/api/' delete='/api/:id' />)
          ) : ((null))}
      </div>
    </>
  );
}
