import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart(){

    const options = {
        responsive: true,
        plugins: {
          legend:{
            align: 'end',
            labels: {
                font: {
                  size:14,
                },
              color:'#fff',
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false, // Hide x-axis grid lines
            },
            title: {
              display: true,
              text: 'Year', // Set the title text
              color: '#e6eaea', // Set the title text color
              font: {
                size:20, // Set the text size for x-axis title
                weight:'', // Set the font weight for x-axis title (bold)
              },  
            }, 
            ticks: {
              color: '#FFF',
              font:{
                size:20,
                weight:"bold"
              },
              maxTicksLimit: 6,
            },
            color: 'transparent',
          },
          y: {
            color: 'transparent',
            grid: {
              display: true, // Show y-axis grid lines
              borderColor: 'rgba(0, 0, 0, 0.1)', // Set grid line color
              borderDash: [], // No dashed grid lines
              borderWidth:1, // Set grid line width
              color: '#e3f0d2',
            },
            axis: {
              display: false, // Remove y-axis line
            },
            title: {
              display: true,
              text: 'Population', // Set the title text
              color: '#e6eaea', // Set the title text color
              font: {
                size:20, // Set the text size for x-axis title
                weight: '', // Set the font weight for x-axis title (bold)
              },
            },
            ticks: {
              color: '#fff',
              font:{
                size:20,
                weight:"bold"
              },
              stepSize:10,
              maxTicksLimit: 4,    // Display a maximum of 4 y-axis labels
            },
          },
        },
      };
      
      const labels = ['Anxiety', 'Mood', 'ADHD', 'PTSD', 'General'];
      
      const data = {
        labels,
        datasets: [
          {
            fill:true,
            label: 'My Report',
            data: [200, 59, 80, 81, 56,],
            borderColor: '#BBDA90',
            borderRadius:14,
            categoryPercentage: 0.5,
            barPercentage:.5,
            barThickness: 9,
            maxBarThickness:10,
            minBarLength: 2,
            backgroundColor:'#bbda90'
          },
        ],
      };
      
    return(
      <TitleCard title={"Distribution of Disorder"} extra="chart1 text-white  ">
            <Bar options={options} data={data} />
      </TitleCard>

    )
}


export default BarChart