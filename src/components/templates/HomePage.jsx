import { useState } from "react";
import { useEffect } from "react";

//Api
import { getCoinList } from '../../services/cryptoApi.js'

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


   return (
      <>
         <Search currency={currency} setCurrency={setCurrency} />
         <TableCoin coins={coins} isLoading={isLoading} currency={currency} setChart={setChart} />
         <Pagination page={page} setPage={setPage} />
         {!!chart && <Chart chart={chart} setChart={setChart} />}
      </>
   );
};

export default HomePage;