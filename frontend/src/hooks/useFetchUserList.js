import { useEffect, useState } from "react"
import axios from 'axios';

const useFetchUserList = (chat, user) => {

    // const [recipientUser, setRecipientUser] = useState(null);
    // const [error, setError] = useState(null)

    const recipientId = chat.member.find((id) => id !== user)
    console.log(chat);

    const [userData, setUserData] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/users/get-user-by-id?userId=${recipientId }`)
            .then(response => {
                const { userName } = response.data.data;
                setUserData({ userName });
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [recipientId]);
    return (
        <div>useFetchUserList</div>
    )
}
export default useFetchUserList