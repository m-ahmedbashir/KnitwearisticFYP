import React from 'react'

import {getAuth} from 'firebase/auth';
import { myapp,db} from "../../Config/firebase";

function ProtectedNavBar() {
 

 

const auth=getAuth(myapp);
const logout=()=>{
  auth.signOut();
  
}
  return (
    <div>
       
    </div>
  )
}

export default ProtectedNavBar