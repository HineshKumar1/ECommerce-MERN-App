import { useState,useEffect } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";

export default  function privateRoute(){
    const [ok, setOk] = useState(false)
    const [auth,setAuth] = useAuth()

    const authCheck = async()=>{
        const res = await axios.get(`${process.env.REACT_APP_API}/user/user-auth`,{
            headers:{
                'Authorization': auth?.token
            }
        })
    }

    useEffect(()=>{
        
    },[])
}

