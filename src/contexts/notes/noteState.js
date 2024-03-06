import {useState} from "react";
import NoteContext from "./noteContext"; // importing created NoteContext to use it.


const NoteState = (props) =>{
const host = 'http://localhost:3000'; // USE  BACKEND PORT - 3000 , NOT FRONT END REACT PORT -5000
const [userDetails,SetuserDetails] = useState("unknown user");
const getuserdetails = async () => {
  // API CALLS
  console.log("TOKEN IN LOCAL STORAGE AT GETUSER DETAILS FUNCTION : - " +localStorage.getItem('token'))
  const response = await fetch(`${host}/api/auth/getuser`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "given-auth-token" : localStorage.getItem('token'),
    },
  });
  const json = await response.json();
  console.log("IN GET USER DETAILS NOTE STATE"+json);
   SetuserDetails(json);

}

    return (

        <NoteContext.Provider value={{getuserdetails,userDetails}}>
            {props.children}
        </NoteContext.Provider>



    )
}

export default NoteState;