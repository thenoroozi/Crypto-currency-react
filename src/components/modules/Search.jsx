import React, { useEffect, useState } from 'react';

//api
import { searchCoin } from '../../services/cryptoApi';
//loading sppiner
import { RotatingLines } from 'react-loader-spinner';
//styles
import styles from './Search.module.css';

function Search({ currency, setCurrency, chartHandler }) {

   const [text, setText] = useState("");
   const [coins, setCoins] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      const controller = new AbortController();

      setCoins([]);
      if (!text) {
         setIsLoading(false);
         return;
      };

      const search = async () => {
         try {
            const res = await fetch(searchCoin(text, { signal: controller.signal }));
            const json = await res.json();
            if (json.coins) {
               setCoins(json.coins);
               setIsLoading(false);
            } else {
               alert(json.status.error_message)
            }
         } catch (error) {
            if (error.name !== "AbortError") {
               alert(error.message)
            }
         }
      }
      setIsLoading(true)
      search();
      return () => controller.abort();
   }, [text])

   return (
      <div className={styles.searchBox}>
         <input
            type="text"
            placeholder='Search coin ...'
            value={text}
            onChange={e => setText(e.target.value)} />
         <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option disabled>Choose Currency</option>
            <option value="usd">$ USD</option>
            <option value="eur">Є EUR</option>
            <option value="jpy">¥ JPY</option>
         </select>
         {(!!coins.length || isLoading) && (
            <div className={styles.searchResult}>
               {isLoading &&
                  <RotatingLines
                     width='50px'
                     height="50px"
                     strokeWidth='2'
                     strokeColor='#3874ff' />}
               <ul>
                  {coins.map(coin => (
                     <li key={coin.id} onClick={() => chartHandler(coin.id)}>
                        <img src={coin.thumb} alt={coin.name} />
                        <div>
                           <h4>{coin.name}</h4>
                        </div>
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </div>
   );
}

export default Search;