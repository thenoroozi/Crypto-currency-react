import { useState } from "react";
import { useEffect } from "react";

//components
import TableCoin from '../modules/TableCoin'

//Api
import getCoinList from '../../services/cryptoApi.js'

const HomePage = () => {
   const [coins,setCoins]=useState([])

   useEffect(()=>{
    const getData= async ()=>{
    const res= await fetch(getCoinList());
    const json=await res.json();
    setCoins(json);
    }

    getData();
   },[])


   return (
      <>
         <TableCoin coins={coins} />
      </>
   );
};

export default HomePage;