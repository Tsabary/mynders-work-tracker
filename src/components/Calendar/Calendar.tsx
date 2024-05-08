import "./schedule.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  Calendar as BigCalender,
  momentLocalizer,
  Components,
} from "react-big-calendar";

import moment from "moment";
import CustomToolbar from "./CustomToolbar";
import { useEffect, useState } from "react";
import {
  Timestamp,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import useFirebase from "../../hooks/useFirebase";
import useMynders from "../../hooks/useMynders";
import useCalendar from "../../hooks/useCalendar";
import { HoverCard } from "../ui/hover-card";
import CustomEventCard from "./CustomEventCard";
import EventHoverCard from "./EventHoverCard";
import CustomMonthHeader from "./CustomMonthHeader";
import CustomMonthTableHeader from "./CustomMonthTableHeader";

const localizer = momentLocalizer(moment);

function Calendar() {
  const { firestore } = useFirebase();
  const { user } = useMynders();
  const { selectedLog } = useCalendar();
  const [logs, setLogs] = useState<CalendarWorkLog[]>([]);

  const components = {
    toolbar: CustomToolbar,
    event: CustomEventCard,
    month: {
      header: CustomMonthTableHeader,
      dateHeader: CustomMonthHeader,
    },
  };

  useEffect(() => {
    if (!user) return;
    // Adjust the query as needed, for example using `where` for filtering
    const q = query(
      collection(
        firestore!,
        import.meta.env.VITE_PUBLIC_DATABASE_PATH + "/logs"
      ),
      where("user_id", "==", user._id)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs: CalendarWorkLog[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            _id: doc.id,
            start: (data.date_range.from as Timestamp).toDate(),
            end: (data.date_range.to as Timestamp).toDate(),
            comments: data.comments,
          };
        });
        setLogs(docs);
      },
      (error) => {
        console.error("Error fetching documents: ", error);
      }
    );

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="h-full w-full no-scrollbar">
      <HoverCard open={!!selectedLog}>
        <BigCalender
          localizer={localizer}
          events={logs}
          defaultView="month"
          views={["month", "week", "day"]}
          timeslots={4}
          step={15}
          components={components}
          tooltipAccessor={null}
        />
        {selectedLog && <EventHoverCard />}
      </HoverCard>
    </div>
  );
}

export default Calendar;
