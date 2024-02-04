
const TableCoin = ({ coins }) => {

   return (
      <div>
         {coins.map(coin => (
            <div key={coin.id}>
               <h4>{coin.name}</h4>
            </div>
         ))}
      </div>
   );
};

export default TableCoin;