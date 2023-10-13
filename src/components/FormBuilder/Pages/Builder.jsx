import { Fragment, useState } from "react";
import uuid from "react-uuid";
import Nestable from "react-nestable";
//Material UI Components
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import TimeInput from "../elements/TimeInput";
import TextFieldInput from "../elements/TextField";
import TextArea from "../elements/TextArea";
import NumberInput from "../elements/NumberInput";
import RadioInput from "../elements/RadioInput";
import DateInput from "../elements/DateInput";
import {useNavigate} from "react-router-dom" 

import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { formEl } from "../constants.js";
//Components
//import Header from "../inde";

const FormBuilder = () => {

  //State
  const [title, setTitle] = useState("Untitled Form");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);

  const items = data;

  
  //Function to add new element
  const addElement = (type) => {   
    const data = {
      id: uuid(),
      value: null,
      type: type,
      required: false,
    };
    setData((prevState) => [...prevState, data]);
  };

  //Function to delete element
  const deleteEl = (id) => {
    setData((prevState) => prevState.filter((val) => val.id !== id));
  };

  //Function to add element at specific pos and return arr
  const addAfter = (elArray, index, newEl) => {
    return [...elArray.slice(0, index+1), newEl, ...elArray.slice(index+1)];
  };

  //Function to duplicate element
  const duplicateElement = (elId, elType) => {
    let elIdx = data.findIndex( (el) =>el.id === elId);
    let newEl = {
      id: uuid(),
      value: null,
      type: elType,
      required: false,
    }
    let newArr = addAfter(data,elIdx,newEl)
    setData(newArr)
  };

  //Function to Handle Input Values
  const handleValue = (id, e) => {
    let newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, value: e.target.value };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  //Function to Handle Required
  const handleRequired = (id) => {
    let newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, required: !el.required };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  //Function to Handle Element Type
  const handleElType = (id, type) => {
    let newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, type: type };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  //Function to Handle Options
  const addOption = (id, newOption) => {
    let newArr = data.map((el) => {
      if (el.id === id) {
        const objVal = "options" in el ? el?.options : [];
        return { ...el, options: [...objVal, newOption] };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  //Function to Handle Date
  const handleDate = (id, dateVal) => {
    let newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, date: dateVal };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  //Function to Handle Time
  const handleTime = (id, dateVal) => {
    let newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, time: dateVal };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  //Function to Change Option Values
  const handleOptionValues = (elId, optionId, optionVal) => {
    let newArr = data.map((el) => {
      if (el.id === elId) {
        el?.options &&
          el?.options.map((opt) => {
            if (opt.id === optionId) {
              opt.value = optionVal;
            }
          });
        return el;
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  //Function to Delete Option
  const deleteOption = (elId, optionId) => {
    let newArr = data.map((el) => {
      if (el.id === elId) {
        let newOptions =
          el?.options && el?.options.filter((opt) => opt.id !== optionId);
        return { ...el, options: newOptions };
      } else {
        return el;
      }
    });
    setData(newArr);
  };
  const preview = ({ item }) => {

  };

  //Render items
  const renderElements = ({ item }) => {
    switch (item.type) {
      case "text":
        return (
          <TextFieldInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
          />
        );
      case "textarea":
        return (
          <TextArea
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
          />
        );
      case "number":
        return (
          <NumberInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            duplicateElement={duplicateElement}
          />
        );
      case "radio":
        return (
          <RadioInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            addOption={addOption}
            handleOptionValues={handleOptionValues}
            deleteOption={deleteOption}
            duplicateElement={duplicateElement}
          />
        );
      case "date":
        return (
          <DateInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            handleDate={handleDate}
            duplicateElement={duplicateElement}
          />
        );
      case "time":
        return (
          <TimeInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
            handleElType={handleElType}
            handleTime={handleTime}
            duplicateElement={duplicateElement}
          />
        );
      default:
        return <Fragment></Fragment>;
    }
  };

  console.log(data);
  let navigate= useNavigate();

  return (
    <Fragment>
      <Grid marginTop={10} container spacing={1} direction="row" justifyContent="center">
        <Grid item md={6}>
          <Box sx={{ mb: 3 }}>
            <TextField
              defaultValue={title}
              onBlur={(e) => setTitle(e.target.value)}
              variant="standard"
              placeholder="Form Title"
              name="title"
              sx={{ mb: 3 }}
              fullWidth
            />
            <TextField
              name="description"
              defaultValue={description}
              onBlur={(e) => setDescription(e.target.value)}
              variant="standard"
              placeholder="Form Description"
              fullWidth
              sx={{ mb: 2 }}
              multiline
              rows={2}
            />
        </Box>
          <Nestable
            items={items}
            renderItem={renderElements}
            maxDepth={1}
          />
        </Grid>
        <Grid item md={1}>
          <noscript>This is different buttons to add element</noscript>
          <Card sx={{ position: "sticky", top: 30 }}>
            {formEl && formEl.map((el, key) => (
              <Button size="small" key={key} value={el.value} onClick={(e) => addElement(e.target.value)}>
                {el.label}
              </Button>
            ))}
            <Button size="small" onClick ={()=>{ navigate("/preview")}}>Preview</Button>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default FormBuilder;
