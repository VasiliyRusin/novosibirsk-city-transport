import { reverseBinding } from "@/utils";

export const directionMapper = reverseBinding({
  W: "two-way",
  A: "forward",
  B: "backward"
});
