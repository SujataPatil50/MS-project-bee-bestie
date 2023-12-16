import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import CounselingServices from "../../features/healthResource/CounselingServices"


function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Counseling Services"}))
      }, [])


    return(
        <CounselingServices />
    )
}

export default InternalPage