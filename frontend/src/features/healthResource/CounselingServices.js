import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TitleCard from "../../components/Cards/TitleCard";
import {  } from "../../mediaQuery.css";

function CounselingServices() {
    const phoneNumber = '916-278-6000';

    return (
      <div>
        <TitleCard title="Counseling Services">
            <div className="counselButtons">
                <Link className="btn btn_green" to={'/app/userList'}>Mental Health Services</Link>
                <Link className="btn btn_green" to={''}>Individual Counseling</Link>
                <Link className="btn btn_green" to={''}>Mental Health Wellness</Link>
                <Link className="btn btn_green" to={''}>Make an appointment</Link>
            </div>
            <div className="grid-flow-row justify-start gap-4">
                <div className="counselTitle">
                    <h4 className="title">Frequently Asked Questions</h4>
                </div>
                <div className="counseltPara">
                    <p>Do you have emergency services available?</p>
                    <p className="answer">
                        There are no emergency services or emergency counseling services available. The graduate-student counselors are at the center during their scheduled class time, and as students are in training, the center is not equipped to provide intensive psychiatric services. If you are experiencing an emergency please call 911.
                        <span><br/>Community: Resources<br/>Sac State Students: Student Health Services/The Well</span>
                    </p>
                </div>
                <div className="counseltPara">
                    <p>Can I receive counseling if I am a student at CSU Sacramento?</p>
                    <p className="answer">
                        Students are welcome to come to the Center for counseling services, but students have free access to the 
                        <span>Student Health & Counseling Services</span>located at the WELL. Further information about the WELL’s services can be found here
                    </p>
                </div>
                <div className="counseltContact">
                    <p>For emergency services, Call <Link to={`tel:${phoneNumber}`} className="counselLink">916-278-6000</Link></p>
                </div>
            </div>
        </TitleCard>
      </div>
    );
}
export default CounselingServices