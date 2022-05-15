import { directionMapper, typeMapper } from "@/mappers";
import { Service } from "@/services/Service";

function getRouteId (route) {
  // 1-036-W-36
  // type - route - direction - label
  
  // type
  // 1 - автобус
  // 2 - троллейбус
  // 3 - трамвай
  // 8 - маршрутка
  
  // route
  
  // direction
  // W - двусторонний
  // A - вперед
  // B - назад
  
  // label
  
  const { route: routeId, label, direction, type } = route;
  
  return `${ typeMapper[type] }-${ routeId }-${ directionMapper[direction] }-${ label }`;
}

export class RouteService extends Service {
  static async getRoutesList () {
    try {
      const { data } = await this.api.get("listmarsh.php", {
        params: {
          r: true
        }
      });
      
      let result = [];
      
      for (const { type: typeIndex, ways: routes } of data) {
        result = result.concat(
          routes.map(
            ({ marsh: route, name: label, stopb: stationA, stope: stationB }) => {
              const type = typeMapper[typeIndex + 1];
      
              return {
                type,
                route,
                label,
                stationA,
                stationB
              };
            })
        );
      }
      
      return result.sort((a, b) => {
        const array = ["bus", "minibus", "trolleybus", "tram"];
        
        return array.indexOf(a.type) - array.indexOf(b.type);
      });
    } catch (e) {
      throw e;
    }
  }
  
  static async getActiveRoute (params) {
    try {
      const { data } = await this.api.get("trasses.php", {
        params: {
          r: getRouteId(params)
        }
      });
      
      const { u: points } = data?.trasses?.[0]?.r?.[0] ?? {};
      
      points.forEach(({ len, n }, index, points) => {
        if (len) {
          delete points[index].len;
        }
        
        if (n) {
          points[index].label = n;
          delete points[index].n;
        }
      });
      
      return points;
    } catch (e) {
      throw e;
    }
  }
  
  static async getActiveRouteVehicles (params) {
    try {
      const { data } = await this.api.get("markers.php", {
        params: {
          r: getRouteId(params)
        }
      });

      return data?.markers?.map(
        ({
          lat,
          lng,
          graph,
          speed,
          azimuth,
          time_nav: time,
          ramp: rampIndex,
          rasp: scheduleString,
          direction: directionIndex,
          segment_order: segmentOrder
        }) => {
          const ramp = Boolean(Number(rampIndex));
          const direction = directionMapper[directionIndex];
          const schedule = scheduleString
            .replace(/-/g, "")
            .replace(/\+/g, " ")
            .split("|")
            .filter(Boolean)
            .reduce((array, value) => {
              const match = value.match(/((?<time>\d{2}:\d{2}) )?(?<label>[\S ]+)/);
        
              array.push(match.groups);
        
              return array;
            }, []);
    
          return {
            lat,
            lng,
            ramp,
            time,
            graph,
            speed,
            azimuth,
            schedule,
            direction,
            segmentOrder
          };
        }) ?? [];
    } catch (e) {
      throw e;
    }
  }
}
