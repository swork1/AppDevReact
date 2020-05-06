import React from "react";
import TextField from "@material-ui/core/TextField";
import "./PaddedTextField.css";

const PaddedTextField = (props) => {
  const { textFieldProps, disableIsBlock } = props;
  const displayClassName = disableIsBlock ? "inlineDiv" : "blockDiv";
  return (
    <div className={`paddedTextFieldDiv ${displayClassName}`}>
      <TextField {...textFieldProps} />
    </div>
  );
};

export default PaddedTextField;
