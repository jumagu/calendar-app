import { dateFnsLocalizer } from "react-big-calendar";

import enUS from "date-fns/locale/en-US";
import { format, parse, startOfWeek, getDay } from "date-fns";

const locales = {
  "en-US": enUS,
};

export const calendarLocalizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
