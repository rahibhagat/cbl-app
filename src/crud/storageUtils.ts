
//to store data according to parent
export const saveDataToAsync = (parentKey: string, key: string, value: any) => {
  try {
    let parentData: any = null;
    parentData = getDataFromAsync(parentKey);
    if (parentData) {
      parentData[key] = value;
    } else {
      parentData = {
        [key]: value,
      };
    }
    localStorage.setItem(parentKey, JSON.stringify(parentData));
  } catch (e) {
    console.log('Error saving data to async storage', e);
  }
};

//to get data according to parent
export const getDataFromAsync = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.log('Error getting data from async storage', e);
  }
};

//to clear data according to parent
export const clearParentDataFromAsync = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.log('Error clearing parent data from async storage', e);
  }
};

//to clear all data
export const clearDataFromAsync = () => {
  try {
    localStorage.clear();
  } catch (e) {
    console.log('Error clearing data from async storage', e);
  }
};
