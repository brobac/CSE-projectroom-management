export const chunkArray = <T>(myArray: T[], chunkSize: number) => {
  const newArray = [];

  for (let index = 0; index < myArray.length; index += chunkSize) {
    newArray.push(myArray.slice(index, index + chunkSize));
  }

  return newArray;
};
