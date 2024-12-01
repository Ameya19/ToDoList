import './App.css';
import React, {useState} from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


function Header() {
  return <h1 style={{fontSize: "5em", fontFamily: "Brush Script MT"}}>To Do List</h1>
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [inputText, setInputText] = useState("");
  const [toDoList,setToDoList] = useState([]);
  const [removeList,setRemoveList] = useState([]);

  const arrayDataItems = toDoList.map((toDoListItem) => 
  <FormGroup>
    <div class="row">
      <div class="column" style={{float: "left", marginLeft:"40ch"}}>
        <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} onChange={(e) => checkBoxOnChange(e,toDoListItem)} color='secondary' />} label={toDoListItem} />
      </div>
      <div class="column" style={{float: "right", marginRight: "40ch"}}>
        <IconButton aria-label="delete" size="small" onClick={() => trashIconClick(toDoListItem)}>
          <DeleteIcon sx={{color: "#FF4545"}} fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  </FormGroup>);

  //OnChnage event for checkbox
  function checkBoxOnChange(e,toDoListItem) {
    if(e.target.checked === true){
      setRemoveList([...removeList, toDoListItem]);
    }
    else{
      setRemoveList(removeList.filter((item) => item.id === toDoListItem));
    }
  }

  //OnCLick event handler for trash icon
  function trashIconClick(toDoListItem) {
    alert("Deleting '" + toDoListItem + "' from to do list...");
    setToDoList(toDoList.filter((item) => item.id === toDoListItem));
  }

  //OnChange event for text field
  function textFieldOnChange(e) {
    setInputText(e.target.value);
  }

  //Submit button on click event handler
  function submitButtonOnClick() {
    setToDoList([...toDoList,inputText]);
    setInputText("");
  }

  //Delete button on click event handler
  function deleteButtonOnClick() {
    if(removeList.length === 0)
      {
        alert("Nothing to remove from list");
      }
      else{
        setToDoList(toDoList.filter((e) => !removeList.includes(e)));
        setRemoveList([]);

      }
  }
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Header />
        <TextField id="standard-basic" style={{width:"30%"}} value={inputText} onChange = {textFieldOnChange} label="Enter your task to do" variant="standard" />
        <Button variant="contained" style={{marginLeft:"2ch",paddingLeft:"3ch",paddingRight:"3ch", paddingTop:"1.2 ch", paddingBottom:"1.2 ch"}} onClick={submitButtonOnClick}>Submit</Button>
        <ul>{arrayDataItems}</ul>
        <Button variant="contained" color="error" style={{marginLeft:"2ch",paddingLeft:"3ch",paddingRight:"3ch", paddingTop:"1.2 ch", paddingBottom:"1.2 ch"}} onClick={deleteButtonOnClick}>Delete</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
