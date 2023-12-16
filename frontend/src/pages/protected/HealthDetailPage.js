import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import HealthDetailPage from '../../features/healthResource/HealthDetailPage'


function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Health Assesment"}))
      }, [])


    return(
        <HealthDetailPage />
    )
}

export default InternalPage