import React, { useEffect, useState } from 'react';

//api
import { searchCoin } from '../../services/cryptoApi';

function Search({ currency, setCurrency }) {

   const [text, setText] = useState("");
   const [coins, setCoins] = useState([]);

   useEffect(() => {
      const controller = new AbortController();

      setCoins([]);
      if (!text) return;

      const search = async () => {
         try {
            const res = await fetch(searchCoin(text, { signal: controller.signal }));
            const json = await res.json();
            if (json.coins) {
               setCoins(json.coins);
            } else {
               alert(json.status.error_message)
            }
         } catch (error) {
            if (error.name !== "AbortError") {
               alert(error.message)
            }
         }
      }

      search();
      return () => controller.abort();
   }, [text])

   return (
      <div>
         <input
            type="text"
            placeholder='Search ...'
            value={text}
            onChange={e => setText(e.target.value)} />
         <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="jpy">JPY</option>
         </select>
         <div>
            <ul>
               {coins.map(coin => (
                  <li key={coin.id}>
                     <img src={coin.thumb} alt={coin.name} />
                     <h4>{coin.name}</h4>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
}

export default Search;