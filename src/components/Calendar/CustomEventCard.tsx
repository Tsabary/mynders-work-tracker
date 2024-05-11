import useCalendar from "../../hooks/useCalendar";
import { EventProps } from "react-big-calendar";
import LogDetailsPopover from "./LogDetailsPopover";
import { calculateHourGap } from "../../helpers/calculateHourGap";

function CustomEventCard({ event }: EventProps<any>) {
  const { setSelectedLog } = useCalendar();
  const { _id, start, end } = event;


  return (
    <>
      <LogDetailsPopover
        onOpen={() =>
          setSelectedLog!({
            _id,
            start,
            end,
          })
        }
        onClose={()=>setSelectedLog!(null)}
      >
        <div className="text-white bg-blue-600 h-full text-sm py-1.5 px-2 border-none overflow-hidden text-ellipsis whitespace-nowrap w-full">
          {`${calculateHourGap(start, end).hours} hours`}
        </div>
      </LogDetailsPopover>
    </>
  );
}

export default CustomEventCard;
