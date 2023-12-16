import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AddResources from '../../features/settings/addResources'

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Add Resources" }))
    }, [])

    return (
        <AddResources />
    )
}

export default InternalPage