import { HoverCardContent } from "../ui/hover-card";
import useCalendar from "../../hooks/useCalendar";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import handleError from "../../helpers/handleError";
import useFirebase from "../../hooks/useFirebase";
import { deleteDoc, doc } from "firebase/firestore";

function EventHoverCard() {
  const { firestore } = useFirebase();
  const { selectedLog, setSelectedLog } = useCalendar();

  const handleDelete = async () => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this log?"
      );

      if (confirm) {
        const logDocRef = doc(
          firestore!,
          import.meta.env.VITE_PUBLIC_DATABASE_PATH + "/logs",
          selectedLog!._id
        );
        await deleteDoc(logDocRef);
      }
    } catch (err) {
      handleError(err, "Failed ot delete log");
    }
  };

  return (
    <HoverCardContent
      onMouseLeave={() => setSelectedLog!(null)}
      className="w-80 bg-white relative !z-50"
    >
      <div className="flex justify-between gap-4">
        {selectedLog?.comments || (
          <p className="text-sm mt-2.5">You didn't add any comments</p>
        )}
        <Button onClick={handleDelete} size="icon" variant="ghost">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </HoverCardContent>
  );
}

export default EventHoverCard;
