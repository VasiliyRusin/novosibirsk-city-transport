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
      
      // const data = await new Promise(resolve => resolve({
      //   routes: [
      //     {
      //       id_marsh: "39",
      //       title: "23",
      //       marsh: "23",
      //       typetr: "2",
      //       direction: "A",
      //       markers: [
      //         {
      //           id: "39",
      //           time: 0
      //         },
      //         {
      //           id: "39",
      //           time: 14
      //         },
      //         {
      //           id: "39",
      //           time: 28
      //         }
      //       ],
      //       stop_end: "Вокзал \"Новосибирск-Главный\""
      //     },
      //     {
      //       id_marsh: "128",
      //       title: "34",
      //       marsh: "34",
      //       typetr: "8",
      //       direction: "A",
      //       markers: [
      //         {
      //           id: "128",
      //           time: 29
      //         }
      //       ],
      //       stop_end: "Вокзал \"Новосибирск-Главный\""
      //     },
      //     {
      //       id_marsh: "290",
      //       title: "3",
      //       marsh: "3",
      //       typetr: "1",
      //       direction: "B",
      //       markers: [
      //         {
      //           id: "290",
      //           time: 43
      //         },
      //         {
      //           id: "290",
      //           time: 64
      //         }
      //       ],
      //       stop_end: "Вокзал \"Новосибирск-Главный\""
      //     },
      //     {
      //       id_marsh: "360",
      //       title: "15",
      //       marsh: "15",
      //       typetr: "1",
      //       direction: "B",
      //       markers: [
      //         {
      //           id: "360",
      //           time: 20
      //         }
      //       ],
      //       stop_end: "Вокзал \"Новосибирск-Главный\""
      //     },
      //     {
      //       id_marsh: "37",
      //       title: "2",
      //       marsh: "2",
      //       typetr: "2",
      //       direction: "A",
      //       markers: [
      //         {
      //           id: "37",
      //           time: 0
      //         },
      //         {
      //           id: "37",
      //           time: 24
      //         },
      //         {
      //           id: "37",
      //           time: 43
      //         }
      //       ],
      //       stop_end: "Вокзал \"Новосибирск-Главный\""
      //     },
      //     {
      //       id_marsh: "394",
      //       title: "8",
      //       marsh: "8",
      //       typetr: "1",
      //       direction: "A",
      //       markers: [
      //         {
      //           id: "394",
      //           time: 0
      //         },
      //         {
      //           id: "394",
      //           time: 31
      //         },
      //         {
      //           id: "394",
      //           time: 85
      //         }
      //       ],
      //       stop_end: "Вокзал \"Новосибирск-Главный\""
      //     },
      //     {
      //       id_marsh: "130",
      //       title: "51",
      //       marsh: "51",
      //       typetr: "8",
      //       direction: "A",
      //       markers: [
      //         {
      //           id: "130",
      //           time: 0
      //         }
      //       ],
      //       stop_end: "Вокзал \"Новосибирск-Главный\""
      //     },
      //     {
      //       id_marsh: "406",
      //       title: "54",
      //       marsh: "054",
      //       typetr: "1",
      //       direction: "A",
      //       markers: [
      //         {
      //           id: "406",
      //           time: 0
      //         },
      //         {
      //           id: "406",
      //           time: 13
      //         },
      //         {
      //           id: "406",
      //           time: 27
      //         }
      //       ],
      //       stop_end: "Вокзал \"Новосибирск-Главный\""
      //     },
      //     {
      //       id_marsh: "8",
      //       title: "21",
      //       marsh: "021",
      //       typetr: "1",
      //       direction: "A",
      //       markers: [
      //         {
      //           id: "8",
      //           time: 0
      //         },
      //         {
      //           id: "8",
      //           time: 47
      //         },
      //         {
      //           id: "8",
      //           time: 56
      //         }
      //       ],
      //       stop_end: "Вокзал \"Новосибирск-Главный\""
      //     }
      //   ]
      // }));
      
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
