const convertData = (data, type) => {
   const convertedData = data[type].map((item) => {
      const date = new Date(item[0]);
      const Month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const fullDate =`${Month[date.getMonth()]}/${date.getDate()}`;

      return {
         date: fullDate ,
         [type]: item[1]
      };
   });

   return convertedData;
};

export { convertData };