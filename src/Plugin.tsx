import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import "./styles.css";

import React from "react";
import moment from "moment";
import { Calendar as BigCalender, momentLocalizer } from "react-big-calendar";
import { NativePluginProps, PluginProps } from "mynders";

import { MyndersProvider } from "./context/mynders-context";
import { FirebaseProvider } from "./context/firebase-context";
import { CalendarProvider } from "./context/calendar-context";
import customComponents from "./components/Calendar/customComponents";
import useLogs from "./hooks/useLogs";

const localizer = momentLocalizer(moment);

function Plugin() {
  const logs = useLogs();

  return (
    <div className="absolute inset-0 p-2 md:!p-6 bg-white z-20">
      <div className="h-full w-full">
        <BigCalender
          localizer={localizer}
          events={logs}
          defaultView="month"
          views={["month"]}
          components={customComponents}
          tooltipAccessor={null}
        />
      </div>
    </div>
  );
}
const PluginContainer = React.memo((props: PluginProps & NativePluginProps) => (
  <MyndersProvider {...props}>
    <FirebaseProvider firebaseConfig={props.firebaseConfig}>
      <CalendarProvider>
        <Plugin />
      </CalendarProvider>
    </FirebaseProvider>
  </MyndersProvider>
));
export default PluginContainer;
