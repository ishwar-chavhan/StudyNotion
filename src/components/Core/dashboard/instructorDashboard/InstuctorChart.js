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
    <div className='w-[70%] flex flex-col gap-3 bg-richblack-800 px-5 py-6'>
        <p className='font-semibold text-[18px]'>Visualise</p>
        <div className='flex gap-3'>
            <button
            onClick={()=> setCurrChart("students")}
        className={`${currChart === "students" ? "bg-richblack-500 text-yellow-50 font-semibold" : "text-[16px] text-yellow-200" } px-3 py-1 rounded-lg `}
            >
                Studens
            </button>
            <button
            className={`${currChart === "income" ? "bg-richblack-500 text-yellow-50 font-semibold" : "text-[16px] text-yellow-200" } px-3 py-1 rounded-lg `}
            onClick={()=> setCurrChart("income")}
            >
                Incomes
            </button>
        </div>
        <div>
            <Pie className='h-[300px]'
            data={currChart === "students" ? chartDataForStudent : chartDataForIncome }
            options={options}
            />

        </div>

    </div>
  )
}

export default InstuctorChart
