import { createEvent } from "react-event-hook";

const { useDonateListener, emitDonate } = createEvent("donate")()

export { useDonateListener, emitDonate }
