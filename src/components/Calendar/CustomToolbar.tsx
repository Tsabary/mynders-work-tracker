import moment from "moment";
import { Navigate, ToolbarProps } from "react-big-calendar";
import { Separator } from "@/components/ui/separator";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import NewLogPopover from "./NewLogPopover";

function CustomToolbar(props: ToolbarProps) {
  // const goToDayView = () => {
  //   props.onView("day");
  // };
  // const goToWeekView = () => {
  //   props.onView("week");
  // };
  // const goToMonthView = () => {
  //   props.onView("month");
  // };

  const goToBack = () => {
    props.onNavigate(Navigate.PREVIOUS);
  };

  const goToNext = () => {
    props.onNavigate(Navigate.NEXT);
  };

  const goToToday = () => {
    props.onNavigate(Navigate.TODAY);
  };

  const TimeNavigator = () => {
    return (
      <div className="flex border rounded-md overflow-hidden">
        <button onClick={goToBack} className={className}>
          Back
        </button>
        <Separator orientation="vertical" />
        <button onClick={goToToday} className={className}>
          Today
        </button>
        <Separator orientation="vertical" />
        <button onClick={goToNext} className={className}>
          Next
        </button>
      </div>
    );
  };

  const CurrentTime = () => {
    return (
      <div className="border rounded-md px-3 py-1.5">
      <label className="font-medium text-sm">
        {moment(props.date).format("DD/MM/YYYY")}
      </label></div>
    );
  };
  const LogHoursTrigger = () => {
    return (
      <NewLogPopover>
        <Button size="sm">Log Hours</Button>
      </NewLogPopover>
    );
  };

  // const ViewNavigator = () => {
  //   return (
  //     <Tabs defaultChecked defaultValue="month">
  //       <TabsList>
  //         <TabsTrigger value="month" onClick={goToMonthView}>
  //           Month
  //         </TabsTrigger>
  //         <TabsTrigger value="week" onClick={goToWeekView}>
  //           Week
  //         </TabsTrigger>
  //         <TabsTrigger value="day" onClick={goToDayView}>
  //           Day
  //         </TabsTrigger>
  //       </TabsList>
  //     </Tabs>
  //   );
  // };

  const className =
    "px-3 py-2 hover:bg-muted active:bg-blue-50 text-sm font-medium";

  return (
    <>
      <div className="hidden md:!flex justify-center items-center h-12 relative w-full md:!mb-6">
        <div className="absolute left-0 bottom-1.5">
          <TimeNavigator />
        </div>


        <CurrentTime />

        <div className="absolute right-0 bottom-1.5 flex gap-2 items-center">
          <LogHoursTrigger />
        </div>
      </div>
      <div className="grid gap-4 md:!hidden mb-4">
        <LogHoursTrigger />
        <div className="flex justify-between items-center">
          <TimeNavigator />
          <CurrentTime />
        </div>
      </div>
    </>
  );
}

export default CustomToolbar;
