import { useState } from "react";
import { useEffect } from "react";

//Api
import { getCoinList } from '../../services/cryptoApi.js'
import { marketChart } from '../../services/cryptoApi.js'

//components
import TableCoin from '../modules/TableCoin'
import Pagination from "../modules/Pagination.jsx";
import Search from "../modules/Search.jsx";
import Chart from "../modules/Chart.jsx";


const HomePage = () => {
   const [coins, setCoins] = useState([])
   const [isLoading, setIsLoading] = useState(true);
   const [page, setPage] = useState(1);
   const [currency, setCurrency] = useState("usd");
   const [chart, setChart] = useState(null);

   useEffect(() => {
      setIsLoading(true);
      const getData = async () => {
         try {
            const res = await fetch(getCoinList(page, currency));
            const json = await res.json();
            setCoins(json);
            setIsLoading(false);
         } catch (error) {
            console.log(error);
         }
      }

      getData();
   }, [page, currency])
   
   const chartHandler = async (id) => {
      const coin = coins.find(coin => coin.id ===id);
      try {
         const res = await fetch(marketChart(id));
         const json = await res.json();
         setChart({ ...json, coin });
      } catch (error) {
         setChart(null);
      }
   }

   return (
      <>
         <Search 
         currency={currency} 
         setCurrency={setCurrency} 
         chartHandler={chartHandler}/>
         <TableCoin 
         coins={coins} 
         isLoading={isLoading} 
         currency={currency} 
         setChart={setChart}
         chartHandler={chartHandler} />
         <Pagination page={page} setPage={setPage} />
         {!!chart && <Chart chart={chart} setChart={setChart} />}
      </>
   );
};

export default HomePage;