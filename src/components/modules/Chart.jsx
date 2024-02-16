import React, { useState } from 'react';
//styles
import styles from './Chart.module.css';
//sort data func
import { convertData } from '../../helpers/convertData';
//recharts package
import { CartesianGrid, LineChart, ResponsiveContainer, Line, XAxis, YAxis, Legend, Tooltip } from 'recharts';

function Chart({ chart, setChart }) {

   const [type, setType] = useState("prices");

   const typeHandler = (event) => {
      if (event.target.tagName === "BUTTON") {
         const type = event.target.innerText.toLowerCase().replace(" ", "_")
         setType(type);
      }
   }

   return (
      <div className={styles.container}>
         <div className={styles.chart}>
            <div className={styles.chartHead}>
               <div className={styles.chartTitle}>
                  <img src={chart.coin.image} width={40} />
                  <h2>{chart.coin.name}</h2>
               </div>
               <span className={styles.cross} onClick={() => setChart(false)}>X</span>
            </div>
            <div className={styles.graph}>
               <ChartComponent data={convertData(chart, type)} type={type} />
            </div>
            <div className={styles.types} onClick={typeHandler}>
               <button className={type === "prices" ? styles.selected : null}>Prices</button>
               <button className={type === "market_caps" ? styles.selected : null}>Market Caps</button>
               <button className={type === "total_volumes" ? styles.selected : null}>Total Volumes</button>
            </div>
            <div className={styles.details}>
               <div>
                  <p>Prices: </p>
                  <span>$ {chart.coin.current_price.toLocaleString()}</span>
               </div>
               <div>
                  <p>ATH: </p>
                  <span>$ {chart.coin.ath.toLocaleString()}</span>
               </div>
               <div>
                  <p>Market Cap: </p>
                  <span>{chart.coin.market_cap.toLocaleString()}</span>
               </div>
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
            <LineChart width="fit-content" height={400} data={data}>
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
