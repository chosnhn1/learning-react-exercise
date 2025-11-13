import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

function App({ name, using, firstName, lastName, something, status }) {
  return (
    <div>{name}</div>
  );
}

App.propTypes = {
  name: PropTypes.string.isRequired,
  using: PropTypes.bool,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  something: PropTypes.any.isRequired,
  status: PropTypes.oneOf(["Open", "Closed"])
};

ReactDOM.render(
  <App name="React" />,
  document.getElementById("root")
);

