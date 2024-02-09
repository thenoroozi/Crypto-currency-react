import React, { useState } from 'react';
//styles
import styles from './Chart.module.css';
//sort data func
import { convertData } from '../../helpers/convertData';
//recharts package
import { CartesianGrid, LineChart, ResponsiveContainer, Line, XAxis, YAxis, Legend, Tooltip } from 'recharts';

function Chart({ chart, setChart }) {
   const [type, setType] = useState("prices");

   return (
      <div className={styles.container}>
         <div className={styles.chart}>
            <div className={styles.chartHead}>
               <h1>Coin</h1>
               <span className={styles.cross} onClick={() => setChart(false)}>X</span>
            </div>
            <div className={styles.graph}>
               <ChartComponent data={convertData(chart, type)} type={type} />
            </div>

         </div>
      </div>
   );
}

export default Chart;

const ChartComponent = ({ data, type }) => {
   return (
      <>
         <ResponsiveContainer width="100%" height="100%">
            <LineChart width={400} height={400} data={data}>
               <XAxis dataKey="date" />
               <YAxis dataKey={type} domain={["auto", "auto"]} />
               <Legend />
               <Line type="monotone" dataKey={type} stroke="#3874ff" strokeWidth="2px" />
               <CartesianGrid stroke='#404042' />
               <Tooltip />
            </LineChart>
         </ResponsiveContainer>
      </>
   );
};
