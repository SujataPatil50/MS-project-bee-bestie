import axios from 'axios';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { } from '../../mediaQuery.css';
import TitleCard from '../../components/Cards/TitleCard';
import HealthDetailPage from './HealthDetailPage';

function MentalHealthResource() {
    const [data, setData] = useState([]);
    const [show, setshow] = useState(false);

    const fetchDataByTitle = (title) => {
        axios.get(`http://localhost:3001/resources/title-wise-list?type=${title}`)
            .then(response => {
                setData(response.data.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleClick = (title) => {
        setshow(true)
        fetchDataByTitle(title);
    };

    return (
        <>
            {!show && <div>
                <TitleCard title='Mental Health Resource'>
                    <div className='flex justify-center'>
                        <main class="hexagon-container">
                            <div class="hexagon hiddenHexagon color-green"></div>
                            <div class="hexagon color-green" onClick={() => handleClick('mentalHealth')}>
                                <Link className='linkContent'>Mental Health</Link>
                            </div>
                            <div class="hexagon color-green" onClick={() => handleClick('wellnessEducation')}>
                                <Link className='linkContent' >Wellness Education</Link>
                            </div>
                            <div class="hexagon hiddenHexagon color-green"></div>
                            <div class="hexagon color-green" onClick={() => handleClick('discussionFormus')}>
                                <Link className='linkContent' >Discussion Forums</Link>
                            </div>
                            <div class="hexagon color-green" onClick={() => handleClick('counsellingServices')}>
                                <Link className='linkContent' >Counselling Services</Link>
                            </div>
                            <div class="hexagon color-green" onClick={() => handleClick('healthAlerts')}>
                                <Link className='linkContent' >Health Alerts</Link>
                            </div>
                            <div class="hexagon hiddenHexagon color-green"></div>
                            <div class="hexagon hiddenHexagon color-green"></div>
                            <div class="hexagon color-green" onClick={() => handleClick('communicationResources')}>
                                <Link className='linkContent' >Community Resources</Link>
                            </div>
                            <div class="hexagon color-green" onClick={() => handleClick('meetUs')}>
                                <Link className='linkContent' >Meet us</Link>
                            </div>
                        </main>
                    </div>
                </TitleCard>
            </div>}
            {show && <HealthDetailPage data={data} />}
        </>

    )
}

export default MentalHealthResource