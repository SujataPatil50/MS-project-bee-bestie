import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import MentalHealthResource from '../../features/healthResource/MentalHealthResource'


function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Mental Health Resources"}))
      }, [])


    return(
        <MentalHealthResource />
    )
}

export default InternalPage