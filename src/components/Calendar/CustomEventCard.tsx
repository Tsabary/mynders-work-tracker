import useCalendar from "../../hooks/useCalendar";
import { EventProps } from "react-big-calendar";
import { HoverCardTrigger } from "../ui/hover-card";

function CustomEventCard({ event }: EventProps<any>) {
  const { setSelectedLog } = useCalendar();
  const { _id, comments, start, end } = event;

  function calculateTimeGap(start: Date, end: Date): string {
    const msDiff = end.getTime() - start.getTime(); // difference in milliseconds
    const hours = Math.floor((msDiff / (1000 * 60 * 60)) % 24);

    // const days = Math.floor(msDiff / (1000 * 60 * 60 * 24));
    // const minutes = Math.floor((msDiff / (1000 * 60)) % 60);
    // const seconds = Math.floor((msDiff / 1000) % 60);

    return `${hours} hours`;
  }

  return (
    <>
      <HoverCardTrigger
        asChild
        onClick={() =>
          setSelectedLog!({
            _id,
            comments,
            start,
            end,
          })
        }
        className="h-full"
      >
        <div className="text-white bg-blue-600 h-full text-sm py-1.5 px-2 border-none overflow-hidden text-ellipsis whitespace-nowrap w-full">
          {calculateTimeGap(start, end)}
        </div>
      </HoverCardTrigger>
      {/* <HoverCardContent
        className="w-80 bg-green-600 relative !z-50"
        style={{ zIndex: 100000000000 }}
      >
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{title}</h4>
            <p className="text-sm">{description}</p>
            {assigned_members.length > 0 && (
              <div className="text-sm text-gray-400">
                Assigned to:{" "}
                {assigned_members.map((m: PopulatedTeamMember) => {
                  return (
                    <Badge
                      variant="outline"
                      key={m._id}
                    >{`${m.first_name} ${m.last_name}`}</Badge>
                  );
                })}
              </div>
            )}
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                {format(start, "p")} - {format(end, "p")}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent> */}
    </>
  );
}

export default CustomEventCard;
