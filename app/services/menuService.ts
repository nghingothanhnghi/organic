// app/services/menuService.ts
import { axiosPrivate } from "~/api/axios";

export const getMainMenuAPI = async () => {
  const response = await axiosPrivate.get('/main-menu?populate=deep');
  return response.data;
};
