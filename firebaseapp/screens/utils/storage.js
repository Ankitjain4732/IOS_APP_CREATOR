import AsyncStorage from '@react-native-async-storage/async-storage';
import {Json} from 'app/apiManager';

const keys = {
  hexColor: 'hexColor',
  rgbColor: 'rgbColor',
  gradientColor: 'gradientColor',
};

const getItem = async (key: string): Promise<any> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.log('[Storage] Error in [getItem]: ', error);
  }

  return null;
};

const setItem = async (key: string, obj: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(obj));
  } catch (error) {
    console.log('[Storage] Error in [setItem]: ', error);
  }
};

const removeItem = async (key: string): Promise<any> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('[Storage] Error in [removeItem]: ', error);
  }
};

const clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log('[Storage] Error in [clear]: ', error);
  }
};

const setRedirectToScreenData = async (data: {screen: string, data: Json}) => {
  await setItem(keys.redirectToScreenWithData, data);
};

const getRedirectToScreenData = async (): Promise<{
  screen: string,
  data: Json,
}> => {
  const data = await getItem(keys.redirectToScreenWithData);
  await removeItem(keys.redirectToScreenWithData);
  return data;
};

export default {
  keys,
  clear,
  removeItem,
  getItem,
  setItem,
  setRedirectToScreenData,
  getRedirectToScreenData,
};
