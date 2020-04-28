import React from "react";
import { Tooltip } from "react-bootstrap";

function UsernamePopover(props) {
  return (
    <Tooltip id="button-tooltip" {...props}>
      Enter email i.e. example@google.com
    </Tooltip>
  );
}

export default UsernamePopover;
