import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Filler,Legend,} from 'chart.js';
import { Line } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Filler,Legend);

function LineChart(){

  const options = {
    responsive: true,
    plugins: {
      legend:{
        position:'top',
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
          color: '#00573db5',
          font:{
            size:20,
            weight:"bold"
          },
          maxTicksLimit: 4,
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
          color: '#00573db5',
          font:{
            size:20,
            weight:"bold"
          },
          stepSize:3,
          maxTicksLimit: 4,    // Display a maximum of 4 y-axis labels
        },
      },
    },
  };

  
  const labels = ['2018', '2019', '2020', '2023'];

  const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'MAU',
      data: [12,20,26,85],
      fill: false,
      borderColor: '#00573db5',  
      borderWidth:6,
    },
  ],
};
  

    return(
      <TitleCard extra="chart2 text-white " cardWidth="w-full " title={"Year-wise Stress"}>
          <Line data={data} options={options}/>
      </TitleCard>
    )
}


export default LineChart