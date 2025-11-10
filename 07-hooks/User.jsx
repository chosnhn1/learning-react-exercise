import { useReducer, useState } from "react";

const firstUser = {
  id: "0391-3233-3210",
  firstName: "Billy",
  lastName: "Kim",
  city: "Gangbuk",
  state: "Seoul",
  email: "bkim@mtnwilsons.com",
  admin: false
};

function User() {

  // const [user, setUser] = useState(firstUser);
  const [user, setUser] = useReducer(
    (user, newDetails) => ({ ...user, ...newDetails }),
    firstUser
  );

  return (<div>
    <h1>
      {user.firstName} {user.lastName} - {user.admin ? "Admin" : "User"}
    </h1>
    <p>Email: {user.email}</p>
    <p>
      Location: {user.city}, {user.state}
    </p>
    <button
      onClick={() => {
        // without reducer and calling setstate like this is common mistake:
        // you can also fix this with spreading original user, but...
        // with reducer, you can spread out current/new state in reducer and make your life little bit easier
        setUser({ admin: true });

      }}
    >Make Admin</button>
  </div>)
}