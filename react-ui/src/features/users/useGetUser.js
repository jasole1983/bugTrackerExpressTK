import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useGetUser(id) {
    const users = useSelector((state)=>state.users.entities)
    const [targetUser, setTargetUser] = useState({})
    const user = users[Number(id)]
    useEffect(()=>{
        setTargetUser({...user})
    }, [user])
    return targetUser
}