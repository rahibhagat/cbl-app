//to store data according to parent
export const saveDataToAsync = (parentKey, key, value) => {
    try {
        let parentData = null;
        parentData = getDataFromAsync(parentKey);
        if (parentData) {
            parentData[key] = value;
        }
        else {
            parentData = {
                [key]: value,
            };
        }
        localStorage.setItem(parentKey, JSON.stringify(parentData));
    }
    catch (e) {
        console.log('Error saving data to async storage', e);
    }
};
//to get data according to parent
export const getDataFromAsync = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
    catch (e) {
        console.log('Error getting data from async storage', e);
    }
};
//to clear data according to parent
export const clearParentDataFromAsync = (key) => {
    try {
        localStorage.removeItem(key);
    }
    catch (e) {
        console.log('Error clearing parent data from async storage', e);
    }
};
//to clear all data
export const clearDataFromAsync = () => {
    try {
        localStorage.clear();
    }
    catch (e) {
        console.log('Error clearing data from async storage', e);
    }
};
//# sourceMappingURL=storageUtils.js.map