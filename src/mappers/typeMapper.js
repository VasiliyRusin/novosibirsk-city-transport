import { reverseBinding } from "@/utils";

export const typeMapper = reverseBinding({
  1: "bus",
  8: "minibus",
  2: "trolleybus",
  3: "tram"
});
