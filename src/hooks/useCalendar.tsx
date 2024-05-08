import { useContext } from "react";
import { CalendarContext } from "../context/calendar-context";

export default function useCalendar() {
  return useContext(CalendarContext);
}
