import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import UserListChat from '../../features/chatModule/UserListChat'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Lets Chat"}))
      }, [])


    return(
        <UserListChat />
    )
}

export default InternalPage