import { createEvent } from "react-event-hook";

const { useDonateListener, emitDonate } = createEvent("donate")<{
  data: string;
}>();

export { emitDonate, useDonateListener };
