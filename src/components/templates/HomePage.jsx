import { useState } from "react";
import { useEffect } from "react";

//components
import TableCoin from '../modules/TableCoin'

//Api
import getCoinList from '../../services/cryptoApi.js'

const HomePage = () => {
   const [coins, setCoins] = useState([])
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const getData = async () => {
         const res = await fetch(getCoinList());
         const json = await res.json();
         setCoins(json);
         setIsLoading(false);
      }

      getData();
   }, [])


   return (
      <>
         <TableCoin coins={coins} isLoading={isLoading} />
      </>
   );
};

export default HomePage;