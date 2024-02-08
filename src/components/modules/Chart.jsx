import React from 'react';
//styles
import styles from './Chart.module.css';

function Chart({ chart, setChart }) {
   return (
      <div className={styles.container}>
         <div className={styles.chart}>
            <span className={styles.cross} onClick={() => setChart(false)}>X</span>

         </div>
      </div>
   );
}

export default Chart;