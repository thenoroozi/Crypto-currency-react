import { useEffect, useState } from 'react';
//charts
import chartUp from '../../assets/chart-up.svg'
import chartDown from '../../assets/chart-down.svg'
//Loader
import { RotatingLines } from 'react-loader-spinner';
//styles
import styles from "./TableCoin.module.css";

const TableCoin = ({ coins, isLoading, currency, chartHandler }) => {

   return (
      <div className={styles.container}>
         {isLoading ? <RotatingLines
            width='50'
            height='50'
            strokeWidth="3"
            strokeColor='#3874ff' /> :
            <table className={styles.table}>
               <thead>
                  <tr>
                     <th>Coin</th>
                     <th>Name</th>
                     <th>Price</th>
                     <th>24h</th>
                     <th>Total Volume</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {coins.map(coin =>
                     <TableRow coin={coin} key={coin.id} currency={currency} chartHandler={chartHandler} />
                  )}
               </tbody>
            </table>}
      </div>
   );
};

export default TableCoin;


const TableRow = ({ coin, currency, chartHandler }) => {
   const {
      image,
      symbol,
      name,
      current_price,
      total_volume,
      price_change_percentage_24h: price_change,
   } = coin;

   const [sign, setSign] = useState("$");

   useEffect(() => {
      switch (currency) {
         case "eur":
            setSign("Є")
            break;
         case "jpy":
            setSign("¥")
            break;
         default:
            setSign("$")
            break;
      }
   }, [sign])


   return (
      <tr>
         <td>
            <div className={styles.symbol} onClick={() => chartHandler(coin.id)}>
               <img src={image} />
               <span>{symbol.toUpperCase()}</span>
            </div>
         </td>
         <td>{name}</td>
         <td>{sign} {current_price.toLocaleString()}</td>
         <td className={price_change > 0 ? styles.success : styles.error}
         >{price_change.toFixed(2)}%</td>
         <td>{sign} {total_volume.toLocaleString()}</td>
         <td>
            <img src={price_change > 0 ? chartUp : chartDown} />
         </td>
      </tr>
   )
}