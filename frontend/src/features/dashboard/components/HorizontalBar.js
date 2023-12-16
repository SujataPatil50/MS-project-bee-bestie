// import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function HorizontalBarChart(){

  const data = {
    labels: ['Sad', 'Content', 'Exhausted', 'Numb'],
     datasets: [
    {
      label: 'Jan-Apr',
      data: [10, 20, 30, 15, 25],
      backgroundColor: '#bbda90',
    },
    {
      label: 'May-Aug',
      data: [5, 10, 15, 20, 25],
      backgroundColor: '#a8c481',
    },
    {
      label: 'Sept-Dec',
      data: [15, 10, 5, 30, 20],
      backgroundColor: '#95ae73',
    },
     ],
  };
  
  const options = {
    indexAxis: 'y', 
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
        stacked: true,
        display:false,
        grid: {
          display: false,
        },
        color: 'transparent',
      },
      y: {
        stacked: true,
        position: 'left',
        color: 'transparent',
        grid: {
          display: false,
          borderColor: 'rgba(0, 0, 0, 0.1)',
          borderDash: [],
          borderWidth:1,
          color: '#e3f0d2',
        },
        ticks: {
          position: 'left', 
          color: '#fff',
          font:{
            size:18,
            weight:"bold"
          },
          stepSize:10,
          maxTicksLimit: 4,    // Display a maximum of 4 y-axis labels
        },
      },
    },
  }
  return(
    <TitleCard title={"Most Common Moods"} extra="chart1 text-white ">
          <Bar options={options} data={data} />     
    </TitleCard>

  )
}

export default HorizontalBarChart