import CustomToolbar from "./CustomToolbar";

import CustomEventCard from "./CustomEventCard";
import CustomMonthHeader from "./CustomMonthHeader";
import CustomMonthTableHeader from "./CustomMonthTableHeader";

export default {
  toolbar: CustomToolbar,
  event: CustomEventCard,
  month: {
    header: CustomMonthTableHeader,
    dateHeader: CustomMonthHeader,
  },
};
