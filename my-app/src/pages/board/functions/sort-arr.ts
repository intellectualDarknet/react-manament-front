function sortArr(arrToSort: IColumnResponse[]): IColumnResponse[] {
  const sortedArr = [...arrToSort];
  if (sortedArr) {
    sortedArr.sort((item1, item2) => {
      return item1.order - item2.order;
    });
  }
  return sortedArr;
}

export default sortArr;
