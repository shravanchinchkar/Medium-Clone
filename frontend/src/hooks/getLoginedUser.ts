import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { getInitialLetters } from "../utils/getinitialLetters";

export const useLognedInUserData = () => {
  console.log("in useLognedInUserData() hook")
  const [initialLetters,setInitialLetters]=useState("");
  const [loading,setIsLoading]=useState(true);


  async function getLognedInUserDetails(){
    try{
      const response= await axios.get(`${BACKEND_URL}/api/v1/user/lognedinuser`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("mediumToken")}`
        }
      })
      const lognedInUserName=response.data.name;
      console.log("Data of LognedIn user:",lognedInUserName);
      const initials=getInitialLetters(lognedInUserName);
      setInitialLetters(initials);
      setIsLoading(false);
    }catch(err){
      console.log("error occured while getting lognedIn user data in useLognedInUserData() hook")
      return console.log(err);
    }
  }

  useEffect(()=>{
    getLognedInUserDetails();
  },[])


  return {
    initialLetters,
    loading
  }
};
