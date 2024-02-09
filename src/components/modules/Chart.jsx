import React, { useState } from 'react';
//styles
import styles from './Chart.module.css';
//sort data func
import { convertData } from '../../helpers/convertData';

function Chart({ chart, setChart }) {
   const [type, setType] = useState("prices");
   console.log(convertData(chart, type));;
   return (
      <div className={styles.container}>
         <div className={styles.chart}>
            <span className={styles.cross} onClick={() => setChart(false)}>X</span>

         </div>
      </div>
   );
}

export default Chart;