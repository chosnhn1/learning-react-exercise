import { useReducer, useState } from "react";

function Checkbox() {
  // 1:
  // const [checked, setChecked] = useState(false);


  // 2: 
  // opting out direct state setting
  // also, function passed to setState will be called "reducer" from now on
  // function toggle() {
    //   setChecked(checked => !checked);
    // }
    
  // 3:
  // use Reducer hook instead of state
  const [checked, toggle] = useReducer(checked => !checked, false);

  return (<>
    <input
      type="checkbox"
      value={checked}
      // 2 (& 3):
      // onChange={() => setChecked(checked => !checked)}
      onChange={toggle}
    />
      {checked ? "checked" : "not checked"}
  </>);
}