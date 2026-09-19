import React , {useState} from 'react'
import { Chart , registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';


Chart.register(...registerables);

const InstuctorChart = ({coursesData}) => {
    const [currChart , setCurrChart] = useState("students");
    const getRandomCharts = (numColors)=>{
        let color = [];
        for(let i = 0; i < numColors; i++){
            const colorData = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`
            color.push(colorData);
        }
        return color;
    }

    // create data for char displaying  student info
    const chartDataForStudent =  {
        labels : coursesData.map((course) => course.courseName),
        datasets : [
            {
                data : coursesData.map((course)=>course.totalStudentEnrolled),
                backgroundColor : getRandomCharts(coursesData.length),
            }
        ]
    }

    // create data for chart displaying income info
    const chartDataForIncome = {
        labels : coursesData.map((course) => course.courseName),
          datasets : [
            {
                data : coursesData.map((course)=>course.totalAmountGenerated),
                backgroundColor : getRandomCharts(coursesData.length),
            }
        ]
    }

    // options 
    const options = {
      maintainAspectRatio: false,
    }

  return (
    <div>
        <p>Visualise</p>
        <div>
            <button
            onClick={()=> setCurrChart("students")}
            >
                Studens
            </button>
            <button
            onClick={()=> setCurrChart("income")}
            >
                Incomes
            </button>
        </div>
        <div>
            <Pie
            data={currChart === "students" ? chartDataForStudent : chartDataForIncome }
            options={options}
            />

        </div>

    </div>
  )
}

export default InstuctorChart
