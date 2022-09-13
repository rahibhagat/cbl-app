"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDataFromAsync = exports.clearParentDataFromAsync = exports.getDataFromAsync = exports.saveDataToAsync = void 0;
//to store data according to parent
const saveDataToAsync = (parentKey, key, value) => {
    try {
        let parentData = null;
        parentData = (0, exports.getDataFromAsync)(parentKey);
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
exports.saveDataToAsync = saveDataToAsync;
//to get data according to parent
const getDataFromAsync = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
    catch (e) {
        console.log('Error getting data from async storage', e);
    }
};
exports.getDataFromAsync = getDataFromAsync;
//to clear data according to parent
const clearParentDataFromAsync = (key) => {
    try {
        localStorage.removeItem(key);
    }
    catch (e) {
        console.log('Error clearing parent data from async storage', e);
    }
};
exports.clearParentDataFromAsync = clearParentDataFromAsync;
//to clear all data
const clearDataFromAsync = () => {
    try {
        localStorage.clear();
    }
    catch (e) {
        console.log('Error clearing data from async storage', e);
    }
};
exports.clearDataFromAsync = clearDataFromAsync;
//# sourceMappingURL=storageUtils.js.map