import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    console.log("storing:", key, ":", value);
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        // saving error
        console.error(e);
    }
};

const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // value previously stored
            return value;
        }
    } catch (e) {
        // error reading value
        console.error(e);
    }
};

export { storeData, getData };