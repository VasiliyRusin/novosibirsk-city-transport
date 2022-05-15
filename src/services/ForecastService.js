import { directionMapper, typeMapper } from "@/mappers";
import { Service } from "@/services/Service";

export class ForecastService extends Service {
  static async getStationForecast (id) {
    try {
      const { data } = await this.api.get("forecast.php", {
        params: {
          id,
          type: "platform"
        }
      });
      
      return data.routes
        .map(({
          markers,
          marsh: route,
          title: label,
          typetr: typeIndex,
          stop_end: stationEnd,
          direction: directionIndex
        }) => {
          return {
            route,
            label,
            stationEnd,
            type: typeMapper[typeIndex],
            direction: directionMapper[directionIndex],
            forecastTime: markers.reduce((value, { time }) => (value > 0 && value <= time) ? value : time, Infinity)
          };
        });
    } catch (e) {
      throw e;
    }
  }
}
