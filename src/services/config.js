import { Axios } from "axios";

export const api = new Axios({
  baseURL: "https://map.nskgortrans.ru",
  transformResponse: [
    data => {
      try {
        return JSON.parse(data);
      } catch (e) {
        return data;
      }
    }
  ]
});
