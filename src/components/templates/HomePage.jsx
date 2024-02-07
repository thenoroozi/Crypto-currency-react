import { useState } from "react";
import { useEffect } from "react";

//Api
import getCoinList from '../../services/cryptoApi.js'

//components
import TableCoin from '../modules/TableCoin'
import Pagination from "../modules/Pagination.jsx";
import Search from "../modules/Search.jsx";


const HomePage = () => {
   const [coins, setCoins] = useState([])
   const [isLoading, setIsLoading] = useState(true);
   const [page, setPage] = useState(1);
   const [currency, setCurrency] = useState("usd");

   useEffect(() => {
      setIsLoading(true);
      const getData = async () => {
         const res = await fetch(getCoinList(page, currency));
         const json = await res.json();
         setCoins(json);
         setIsLoading(false);
      }

      getData();
   }, [page, currency])


   return (
      <>
         <Search currency={currency} setCurrency={setCurrency} />
         <TableCoin coins={coins} isLoading={isLoading} />
         <Pagination page={page} setPage={setPage} />
      </>
   );
};

export default HomePage;