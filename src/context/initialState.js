import { getUserInfo } from "../utils/fetchLocalStorageData";

export const initialState = {
  user: getUserInfo(),
};
