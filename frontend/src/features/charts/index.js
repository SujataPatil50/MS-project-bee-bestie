import TitleCard from '../../components/Cards/TitleCard'
import LineChart from '../dashboard/components/LineChart'
import BarChart from '../dashboard/components/BarChart'
import HorizontalBar from '../dashboard/components/HorizontalBar'
import LandingIntro from "../user/LandingIntro";

function Charts() {

    return(
        <TitleCard title="Welcome back, Victoria!!">
            {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6"> */}
            <LandingIntro />
            <br></br>
                   <div style= {{textAlign: 'center'}}>
                    <h1 style={{fontSize: '30px'}}><b>Welcome to Bee Bestie!</b></h1><br/>
                    A secure and private environment where you can express your feelings, solicit guidance, or communicate with a compassionate & empathetic listener.
                   </div>
            {/* </div> */}
        </TitleCard>
    )
}
export default Charts