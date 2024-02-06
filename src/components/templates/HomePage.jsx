import { useState } from "react";
import { useEffect } from "react";

//Api
import getCoinList from '../../services/cryptoApi.js'

//components
import TableCoin from '../modules/TableCoin'
import Pagination from "../modules/Pagination.jsx";


const HomePage = () => {
   const [coins, setCoins] = useState([])
   const [isLoading, setIsLoading] = useState(true);
   const [page, setPage] = useState(1)

   useEffect(() => {
      setIsLoading(true);
      const getData = async () => {
         const res = await fetch(getCoinList(page));
         const json = await res.json();
         setCoins(json);
         setIsLoading(false);
      }

      getData();
   }, [page])


   return (
      <>
         <Pagination page={page} setPage={setPage} />
         <TableCoin coins={coins} isLoading={isLoading} />
      </>
   );
};

export default HomePage;