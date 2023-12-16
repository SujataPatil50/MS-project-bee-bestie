import { Link } from "react-router-dom";
import TitleCard from "../../components/Cards/TitleCard"
import {  } from "../../mediaQuery.css";

function GetStarted(){
    return(
        <>
            <TitleCard title="Welcome Back, User-Name" topMargin="mt-2">
                <div className="welcomePage grid grid-rows-2  grid-flow-col gap-4">
                    <div class="welcomePro">
                        <img class="profilePhoto" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
                    </div>
                    <div className="buttons grid grid-rows-3 grid-flow-col justify-center gap-4">
                        <Link className="btn btn_green" to={'/app/userList'}>Start Chatting</Link>
                        <button className="btn btn_green" onClick="() => startChat()">Start Listening</button>
                        <button className="btn btn_green" onClick="() => startChat()">Mental Health Resource</button>
                    </div>
                </div>
            </TitleCard>
        </>
    )
}

export default GetStarted