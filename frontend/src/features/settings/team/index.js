
import TitleCard from "../../../components/Cards/TitleCard"
import InputText from '../../../components/Input/InputText'

function Team(){
    return(
        <>        
            <div className="col-span-2">
                <TitleCard title="About You" topMargin="mt-0">
                    <div className="welcomePage grid grid-rows-3  grid-flow-col">
                        <div class="welcomePro flex-col">
                            <img class="profilePhoto" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
                           <div>
                                <span className="profileName" >Username</span>
                            </div> 
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2  gap-2">
                            <InputText labelTitle="Bio" placeholder="Tell us about you..." />
                            <InputText labelTitle="Goals" placeholder="Enter your goals here"/>
                            <InputText labelTitle="Personal Interest" placeholder="Enter Interest here" />
                            <InputText labelTitle="Music" placeholder="Type of music you like..." />
                            <InputText labelTitle="Academic Year" placeholder="Enter Academic Year"/>
                        </div>
                        <div className="float-left mt-4">
                            <button className="btn btn_green">Save</button>
                        </div>
                    </div>
                </TitleCard>
            </div>
        </>
    )
}


export default Team