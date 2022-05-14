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
      // const { data } = await this.api.get("listmarsh.php", {
      //   params: {
      //     r: true
      //   }
      // });
      
      const data = await new Promise(resolve => resolve([
        {
          type: 0,
          ways: [
            {
              marsh: "1",
              name: "1",
              stopb: "Центральный корпус",
              stope: "с/х Левобережный"
            },
            {
              marsh: "3",
              name: "3",
              stopb: "Вокзал \"Новосибирск-Главный\"",
              stope: "пос. Северный"
            },
            {
              marsh: "4",
              name: "4",
              stopb: "Затулинский ж/м",
              stope: "Криводановский карьер"
            },
            {
              marsh: "5",
              name: "5",
              stopb: "ул. Дюканова",
              stope: "пос. Северный"
            },
            {
              marsh: "6",
              name: "6",
              stopb: "ул. Амбулаторная",
              stope: "Затулинский ж/м"
            },
            {
              marsh: "007",
              name: "7",
              stopb: "Микрорайон \"Щ\"",
              stope: "ул. Белоусова"
            },
            {
              marsh: "8",
              name: "8",
              stopb: "Цветной проезд",
              stope: "Вокзал \"Новосибирск-Главный\""
            },
            {
              marsh: "9",
              name: "9",
              stopb: "ул. Колыванская",
              stope: "Юго-Западный ж/м"
            },
            {
              marsh: "10",
              name: "10",
              stopb: "ул. Чукотская",
              stope: "ул. Планировочная"
            },
            {
              marsh: "11",
              name: "11",
              stopb: "Общественный торговый центр",
              stope: "СТЦ «Мега»"
            },
            {
              marsh: "12",
              name: "12",
              stopb: "ул. Александра Чистякова",
              stope: "ул. Дюканова"
            },
            {
              marsh: "13",
              name: "13",
              stopb: "ул. Тюленина",
              stope: "Ключ-Камышенское плато"
            },
            {
              marsh: "14",
              name: "14",
              stopb: "Затулинский ж/м",
              stope: "пос. Северный"
            },
            {
              marsh: "15",
              name: "15",
              stopb: "Вокзал \"Новосибирск-Главный\"",
              stope: "микрорайон \"Стрижи\""
            },
            {
              marsh: "16",
              name: "16",
              stopb: "Центральный корпус",
              stope: "Затон"
            },
            {
              marsh: "18",
              name: "18",
              stopb: "ул. Тюленина",
              stope: "Ключ-Камышенское плато"
            },
            {
              marsh: "19",
              name: "19",
              stopb: "М \"Площадь К.Маркса\"",
              stope: "ЖК «Новомарусино»"
            },
            {
              marsh: "021",
              name: "21",
              stopb: "УМ-3",
              stope: "Вокзал \"Новосибирск-Главный\""
            },
            {
              marsh: "023",
              name: "23",
              stopb: "Общ. торговый центр",
              stope: "ОРМЗ"
            },
            {
              marsh: "24",
              name: "24",
              stopb: "Радиостанция №5",
              stope: "ЖК «Новомарусино»"
            },
            {
              marsh: "25",
              name: "25",
              stopb: "Белые росы",
              stope: "Затулинский ж/м"
            },
            {
              marsh: "27",
              name: "27",
              stopb: "пл. им. Калинина",
              stope: "Отделение связи №13 (Северное кладбище - лето)"
            },
            {
              marsh: "28",
              name: "28",
              stopb: "Пригородный простор",
              stope: "ул. Тюленина"
            },
            {
              marsh: "29",
              name: "29",
              stopb: "Юго-Западный ж/м",
              stope: "ул. Александра Чистякова"
            },
            {
              marsh: "30",
              name: "30",
              stopb: "Цветущая Плющиха",
              stope: "Ботанический ж/м"
            },
            {
              marsh: "31",
              name: "31",
              stopb: "Вокзал \"Новосибирск-Главный\"",
              stope: "Ключ-Камышенское плато"
            },
            {
              marsh: "34",
              name: "34",
              stopb: "Вокзал \"Новосибирск-Главный\"",
              stope: "ул. Тюленина"
            },
            {
              marsh: "036",
              name: "36",
              stopb: "Микрорайон \"Щ\"",
              stope: "ул. Колыванская"
            },
            {
              marsh: "038",
              name: "38",
              stopb: "УМ-3 (Инская)",
              stope: "Цветной проезд"
            },
            {
              marsh: "39",
              name: "39",
              stopb: "ул. Тюленина",
              stope: "Микрорайон \"Чистая Слобода\""
            },
            {
              marsh: "42",
              name: "42",
              stopb: "пл. им. Калинина",
              stope: "ул. Флотская"
            },
            {
              marsh: "43",
              name: "43",
              stopb: "Белые росы",
              stope: "Микрорайон \"Чистая Слобода\""
            },
            {
              marsh: "44",
              name: "44",
              stopb: "Диагностический центр",
              stope: "Затулинский ж/м"
            },
            {
              marsh: "045",
              name: "45",
              stopb: "Чемской бор",
              stope: "Центральный корпус"
            },
            {
              marsh: "045К",
              name: "45К",
              stopb: "Центральный корпус",
              stope: "Чемской бор"
            },
            {
              marsh: "46",
              name: "46",
              stopb: "Отделение связи №13 (Северное кладбище - лето)",
              stope: "Автопорт \"Калининский\""
            },
            {
              marsh: "48",
              name: "48",
              stopb: "Чемской бор",
              stope: "Общ. торговый центр"
            },
            {
              marsh: "49",
              name: "49",
              stopb: "Северо-Чемской ж/м",
              stope: "ЗАО \"Левобережный\""
            },
            {
              marsh: "050",
              name: "50",
              stopb: "ул. Твардовского",
              stope: "УМ-3"
            },
            {
              marsh: "051",
              name: "51л",
              stopb: "Нижняя Ельцовка",
              stope: "с.о. «Отдых-2»"
            },
            {
              marsh: "52",
              name: "52",
              stopb: "Цветной проезд",
              stope: "ИКЭМ"
            },
            {
              marsh: "52К",
              name: "52K",
              stopb: "Цветной проезд",
              stope: "ул. Экваторная"
            },
            {
              marsh: "53",
              name: "53",
              stopb: "пл. им. Калинина",
              stope: "ЖК \"Крылья\""
            },
            {
              marsh: "054",
              name: "54",
              stopb: "ул. Твардовского",
              stope: "Вокзал \"Новосибирск-Главный\""
            },
            {
              marsh: "054К",
              name: "54К",
              stopb: "Ст. Матвеевка",
              stope: "СНТ \"Кедр\""
            },
            {
              marsh: "55",
              name: "55",
              stopb: "ул Спортивная",
              stope: "Вокзал \"Новосибирск-Главный\""
            },
            {
              marsh: "57",
              name: "57",
              stopb: "Микрорайон \"Чистая Слобода\"",
              stope: "ул. Александра Чистякова"
            },
            {
              marsh: "60",
              name: "60",
              stopb: "ул. Дюканова",
              stope: "Затулинский ж/м"
            },
            {
              marsh: "61",
              name: "61",
              stopb: "Молкомбинат",
              stope: "УМ-3"
            },
            {
              marsh: "64",
              name: "64",
              stopb: "ул. Тюленина",
              stope: "ТЦ \"Мегаполис\""
            },
            {
              marsh: "065",
              name: "65",
              stopb: "ул. Белоусова – Нижняя Ельцовка",
              stope: "ул. Белоусова (кольцевой)"
            },
            {
              marsh: "065А",
              name: "65А",
              stopb: "ул. Белоусова – Цветной проезд",
              stope: "ул. Белоусова (кольцевой)"
            },
            {
              marsh: "068",
              name: "68",
              stopb: "Ст. Матвеевка",
              stope: "М. \"Студенческая\""
            },
            {
              marsh: "072",
              name: "72",
              stopb: "Общ. торговый центр",
              stope: "пос. Геологов"
            },
            {
              marsh: "73",
              name: "73",
              stopb: "ул.Флотская",
              stope: "Отделение связи №13 (Северное кладбище – лето)"
            },
            {
              marsh: "75",
              name: "75",
              stopb: "Ключ-Камышенское плато",
              stope: "пос. Северный"
            },
            {
              marsh: "077",
              name: "77л",
              stopb: "ул. Ветлужская",
              stope: "Сады"
            },
            {
              marsh: "79",
              name: "79",
              stopb: "Юго-Западный ж/м",
              stope: "НГАУ"
            },
            {
              marsh: "088",
              name: "88",
              stopb: "ОРМЗ",
              stope: "Центральный корпус"
            },
            {
              marsh: "89",
              name: "89",
              stopb: "Магазин \"Кристалл\"",
              stope: "Криводановский карьер"
            },
            {
              marsh: "91",
              name: "91",
              stopb: "Затулинский ж/м",
              stope: "ЗАО \"Левобережный \""
            },
            {
              marsh: "94",
              name: "94",
              stopb: "М. \"Площадь Маркса\"",
              stope: "ЖК \"Радуга Сибири\""
            },
            {
              marsh: "95",
              name: "95",
              stopb: "Цветущая Плющиха",
              stope: "ПКиО \"Заельцовский\""
            },
            {
              marsh: "96",
              name: "96",
              stopb: "Цветущая Плющиха",
              stope: "ул. Саввы Кожевникова"
            },
            {
              marsh: "97",
              name: "97",
              stopb: "Цветущая Плющиха",
              stope: "Автопорт \"Калининский\""
            },
            {
              marsh: "98",
              name: "98",
              stopb: "Цветущая Плющиха",
              stope: "Ботанический ж/м"
            }
          ]
        },
        {
          type: 1,
          ways: [
            {
              marsh: "2",
              name: "2",
              stopb: "Городской Аэропорт",
              stope: "Вокзал \"Новосибирск-Главный\""
            },
            {
              marsh: "4",
              name: "4",
              stopb: "Затулинский ж/м",
              stope: "завод Медпрепаратов"
            },
            {
              marsh: "5",
              name: "5",
              stopb: "Городской Аэропорт",
              stope: "ул. Ленинградская"
            },
            {
              marsh: "7",
              name: "7",
              stopb: "Станиславский ж/м",
              stope: "ул. Лазурная"
            },
            {
              marsh: "8",
              name: "8",
              stopb: "Затулинский ж/м",
              stope: "ул. Ленинградская"
            },
            {
              marsh: "10",
              name: "10",
              stopb: "Сад им. Дзержинского",
              stope: "Институт горного дела"
            },
            {
              marsh: "13",
              name: "13",
              stopb: "ул. Учительская",
              stope: "М. \"Речной вокзал\""
            },
            {
              marsh: "22",
              name: "22",
              stopb: "ул. Лазурная",
              stope: "ул. Учительская"
            },
            {
              marsh: "23",
              name: "23",
              stopb: "Сад им. Дзержинского",
              stope: "Вокзал \"Новосибирск-Главный\""
            },
            {
              marsh: "24",
              name: "24",
              stopb: "Станиславский ж/м",
              stope: "ул. Учительская"
            },
            {
              marsh: "26",
              name: "26",
              stopb: "Затулинский ж/м",
              stope: "Молкомбинат"
            },
            {
              marsh: "29",
              name: "29",
              stopb: "Северо-Чемской ж/м",
              stope: "М. «Площадь Маркса»"
            },
            {
              marsh: "36",
              name: "36",
              stopb: "ул. Лазурная",
              stope: "М. «Речной вокзал»"
            }
          ]
        },
        {
          type: 2,
          ways: [
            {
              marsh: "0002",
              name: "2",
              stopb: "Микрорайон \"Чистая Слобода\"",
              stope: "М. «Площадь Маркса»"
            },
            {
              marsh: "0003",
              name: "3",
              stopb: "Молкомбинат",
              stope: "М. «Площадь Маркса»"
            },
            {
              marsh: "0008",
              name: "8",
              stopb: "Микрорайон \"Чистая Слобода\"",
              stope: "ул. Титова"
            },
            {
              marsh: "0010",
              name: "10",
              stopb: "Бугринская роща",
              stope: "Хлебозавод"
            },
            {
              marsh: "0011",
              name: "11",
              stopb: "ПКиО \"Сосновый бор\" ",
              stope: "Золотая горка"
            },
            {
              marsh: "0013",
              name: "13",
              stopb: "Гусинобродское шоссе",
              stope: "ул. Писарева"
            },
            {
              marsh: "0014",
              name: "14",
              stopb: "Площадь Калинина",
              stope: "Сад Мичуринцев"
            },
            {
              marsh: "0015",
              name: "15",
              stopb: "Бугринская роща",
              stope: "Юго-Западный ж/м"
            },
            {
              marsh: "0016",
              name: "16",
              stopb: "Юго-Западный ж/м",
              stope: "М. «Площадь Маркса»"
            },
            {
              marsh: "0018",
              name: "18",
              stopb: "Юго-Западный ж/м",
              stope: "пос. Чемской"
            },
            {
              marsh: "0033",
              name: "33",
              stopb: "пл. им. Калинина (т)",
              stope: "Золотая горка"
            }
          ]
        },
        {
          type: 7,
          ways: [
            {
              marsh: "2",
              name: "2",
              stopb: "Затон",
              stope: "Вокзал \"Новосибирск-Главный\""
            },
            {
              marsh: "6",
              name: "6",
              stopb: "М. «Речной вокзал»",
              stope: "ул. Белоусова"
            },
            {
              marsh: "7",
              name: "7",
              stopb: "ул. Белоусова ",
              stope: "Микрорайон \"Щ\""
            },
            {
              marsh: "8",
              name: "8",
              stopb: "Автопорт \"Калининский\"",
              stope: "Магазин «Золотая Нива»"
            },
            {
              marsh: "9",
              name: "9",
              stopb: "пос. Северный",
              stope: "ДК им. Кирова"
            },
            {
              marsh: "10",
              name: "10",
              stopb: "с/х Левобережный",
              stope: "Акатуйский ж/м"
            },
            {
              marsh: "11",
              name: "11",
              stopb: "пос. Северный",
              stope: "Планетарий"
            },
            {
              marsh: "12",
              name: "12",
              stopb: "Вокзал \"Новосибирск-Главный\"",
              stope: "ЖК \"Радуга Сибири\""
            },
            {
              marsh: "13",
              name: "13",
              stopb: "Вокзал \"Новосибирск-Главный\"",
              stope: "ул. Учительская"
            },
            {
              marsh: "5014",
              name: "14",
              stopb: "Цветущая Плющиха",
              stope: "ТЭЦ-5"
            },
            {
              marsh: "15",
              name: "15",
              stopb: "Цветной проезд",
              stope: "М. «Площадь Маркса»"
            },
            {
              marsh: "17",
              name: "17",
              stopb: "М. «Заельцовская»",
              stope: "в/с «Ельцовка»"
            },
            {
              marsh: "18",
              name: "18",
              stopb: "Биатлонный комплекс",
              stope: "Микрорайон \"Чистая Слобода\""
            },
            {
              marsh: "19",
              name: "19",
              stopb: "ПАТП-9",
              stope: "ПКиО \"Заельцовский\""
            },
            {
              marsh: "21",
              name: "21",
              stopb: "М. «Речной вокзал»",
              stope: "УМ-3"
            },
            {
              marsh: "23",
              name: "23",
              stopb: "М. «Речной вокзал»",
              stope: "ул. Экваторная"
            },
            {
              marsh: "24",
              name: "24",
              stopb: "микрорайон \"Стрижи\"",
              stope: "Цветущая Плющиха"
            },
            {
              marsh: "25",
              name: "25",
              stopb: "ПКиО \"Заельцовский\"",
              stope: "микрорайон \"Стрижи\""
            },
            {
              marsh: "28",
              name: "28",
              stopb: "ПКиО \"Заельцовский\"",
              stope: "Диагностический центр"
            },
            {
              marsh: "5029",
              name: "29",
              stopb: "ул. Александра Чистякова",
              stope: "М. «Площадь Маркса» – ул. Александра Чистякова (кольцевой) "
            },
            {
              marsh: "6029",
              name: "29a",
              stopb: "ул. Александра Чистякова",
              stope: "М. «Площадь Маркса» – ул. Александра Чистякова  (кольцевой) "
            },
            {
              marsh: "30А",
              name: "30А",
              stopb: "ул. Амбулаторная ",
              stope: "Новосибирский автовокзал-Главный (Гусинобр. ш) - ул. Амбулаторная "
            },
            {
              marsh: "30",
              name: "30",
              stopb: "ул. Амбулаторная",
              stope: "Сад им. Дзержинского - ул. Амбулаторная (кольцевой)"
            },
            {
              marsh: "32",
              name: "32",
              stopb: "ул. Водозабор",
              stope: "Вокзал \"Новосибирск-Главный\""
            },
            {
              marsh: "34",
              name: "34",
              stopb: "Автопорт \"Калининский\"",
              stope: "Вокзал \"Новосибирск-Главный\""
            },
            {
              marsh: "35",
              name: "35",
              stopb: "Цветной проезд",
              stope: "М. \"Речной вокзал\" (Парк \"Городское начало\")"
            },
            {
              marsh: "38",
              name: "38",
              stopb: "Вокзал \"Новосибирск-Главный\"",
              stope: "Магазин «Золотая Нива»"
            },
            {
              marsh: "42",
              name: "42",
              stopb: "ул. Амбулаторная",
              stope: "ТЭЦ-5"
            },
            {
              marsh: "43",
              name: "43",
              stopb: "Общ. торговый центр",
              stope: "ОРМЗ"
            },
            {
              marsh: "5044",
              name: "44",
              stopb: "Цветущая Плющиха",
              stope: "М. «Березовая роща» – Цветущая Плющиха (кольцевой)"
            },
            {
              marsh: "6044",
              name: "44a",
              stopb: "Цветущая Плющиха",
              stope: "Дом Ленина – Цветущая Плющиха (кольцевой)"
            },
            {
              marsh: "5045",
              name: "45",
              stopb: "Ключ-Камышенское плато",
              stope: "ТВК \"Большая Медведица\""
            },
            {
              marsh: "48",
              name: "48",
              stopb: "Цветущая Плющиха",
              stope: "ул. Железнодорожная"
            },
            {
              marsh: "50",
              name: "50",
              stopb: "ул. Твардовского",
              stope: "УМ-3"
            },
            {
              marsh: "51",
              name: "51",
              stopb: "Автопорт \"Калининский\"",
              stope: "Вокзал \"Новосибирск-Главный\""
            },
            {
              marsh: "52",
              name: "52",
              stopb: "Цветной проезд",
              stope: "ИКЭМ"
            },
            {
              marsh: "53",
              name: "53",
              stopb: "Колледж им. Н.А. Лунина",
              stope: "ЖК \"Крылья\""
            },
            {
              marsh: "54",
              name: "54",
              stopb: "Затулинский ж/м",
              stope: "ул. Спортивная"
            },
            {
              marsh: "5054",
              name: "54",
              stopb: "Затулинский ж/м",
              stope: "ул. Спортивная"
            },
            {
              marsh: "55",
              name: "55",
              stopb: "ОРМЗ",
              stope: "Центральный корпус"
            },
            {
              marsh: "62",
              name: "62",
              stopb: "Общ. торговый центр",
              stope: "Цветной проезд – Общ. торговый центр (кольцевой)"
            },
            {
              marsh: "5063",
              name: "63",
              stopb: "Ключ-Камышенское плато",
              stope: "ул. Дюканова"
            },
            {
              marsh: "5064",
              name: "64",
              stopb: "ЖК \"Радуга Сибири\"",
              stope: "М. \"Площадь Маркса\""
            },
            {
              marsh: "65",
              name: "65",
              stopb: "ул. Лобачевского",
              stope: "пл. им. Калинина"
            },
            {
              marsh: "68",
              name: "68",
              stopb: "М. \"Речной вокзал\"",
              stope: "ул. Твардовского"
            },
            {
              marsh: "72",
              name: "72",
              stopb: "Биатлонный комплекс",
              stope: "ЖК \"Лесное\""
            },
            {
              marsh: "73",
              name: "73",
              stopb: "Отделение связи №13 (Северное кладбище - лето)",
              stope: "ДК им. Кирова"
            },
            {
              marsh: "74",
              name: "74",
              stopb: "ул. Твардовского",
              stope: "Цветной проезд"
            },
            {
              marsh: "86",
              name: "86",
              stopb: "Общ. торговый центр",
              stope: "ул. Экваторная"
            },
            {
              marsh: "87",
              name: "87",
              stopb: "пос. Клюквенный",
              stope: "Ботанический ж/м"
            },
            {
              marsh: "90",
              name: "90",
              stopb: "Цветущая Плющиха",
              stope: "Волейбольный центр"
            },
            {
              marsh: "91",
              name: "91",
              stopb: "Общ. торговый центр",
              stope: "М. «Речной вокзал» "
            }
          ]
        }
      ]));
      
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
