import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LandingIntro from "./LandingIntro";
function LangingPage() {


    return (
        <div className="min-h-screen flex items-center  yellowBg">
            <div className="card mx-auto w-full w-96 shadow-xl">
                <div className="grid md:grid-row-1 grid-cols-1 authBg rounded-xl">
                    <div className="py-5 px-5">
                        <LandingIntro />
                        {/* <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2> */}
                        <div className="mb-4">
                            <div className="text-center mb-5">
                                Welcome to Bee Bestie!! A secure and private environment where you can express your feelings, solicit guidance, or communicate with a compassionate & empathetic listener. 
                            </div>
                            <div className="flex flex-col gap-2">
                                <Link to='/register' className="btn btn_green" >Join Now</Link>
                                <Link to='/login' className="btn btn_green" >Log In</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LangingPage;
