import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../features/common/headerSlice'
import Feedback from '../features/user/Feedback'



function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Feedback"}))
      }, [])

    return(
        <Feedback />
    )
}

export default InternalPage