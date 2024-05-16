import { useEffect, useLayoutEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { LoaderCircle, Minus, Plus } from "lucide-react";

import handleError from "../helpers/handleError";
import useFirebase from "./useFirebase";
import useMynders from "./useMynders";
import DateTimePicker from "@/components/ui/date-time-picker";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useCalendar from "./useCalendar";
import { calculateHourGap } from "../helpers/calculateHourGap";

function useNewLogForm(handleClose: () => void) {
  const { firestore } = useFirebase();
  const { selectedLog } = useCalendar();

  const { user } = useMynders();

  const [dateRange, setDateRange] = useState<{
    from: Date | null;
    to: Date | null;
  }>({ from: null, to: null });

  const [dayLengthNumber, setDayLengthNumber] = useState<number>(9);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async () => {
    try {
      if (!user || !dateRange.from || !dateRange.to || isSubmitting) return;
      setIsSubmitting(true);

      const newEventRef = doc(
        collection(
          firestore!,
          import.meta.env.VITE_PUBLIC_DATABASE_PATH + "/logs"
        )
      );

      await setDoc(newEventRef, {
        user_id: user._id,
        date_range: dateRange,
      });

      setDateRange({ from: null, to: null });
      handleClose();
    } catch (err) {
      handleError(err, "Failed to create a new task");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this log?"
      );

      if (confirm) {
        setIsSubmitting(true);
        const logDocRef = doc(
          firestore!,
          import.meta.env.VITE_PUBLIC_DATABASE_PATH + "/logs",
          selectedLog!._id
        );
        await deleteDoc(logDocRef);
        handleClose();
      }
    } catch (err) {
      handleError(err, "Failed ot delete log");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setIsSubmitting(true);
      const logDocRef = doc(
        firestore!,
        import.meta.env.VITE_PUBLIC_DATABASE_PATH + "/logs",
        selectedLog!._id
      );
      await updateDoc(logDocRef, { date_range: dateRange });
      handleClose();
    } catch (err) {
      handleError(err, "Failed ot update log");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSetDuration = (hours: number, newFromDate?: Date) => {
    setDateRange((prev) => {
      // Determine the base "from" date to use, either the new provided one or the existing one.
      const from = newFromDate || prev.from;
      if (from) {
        const toDate = new Date(from);
        toDate.setHours(toDate.getHours() + hours);
        return { from, to: toDate };
      }
      return prev;
    });
  };

  useEffect(() => {
    handleSetDuration(dayLengthNumber);
  }, [dayLengthNumber]);

  useLayoutEffect(() => {
    if (selectedLog) {
      setDateRange({ from: selectedLog.start, to: selectedLog.end });
      setDayLengthNumber(
        calculateHourGap(selectedLog.start, selectedLog.end).hours
      );
    } else {
      setDateRange({ from: null, to: null });
    }
  }, [selectedLog]);

  const LogForm = () => (
    <div className="grid gap-4 w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center w-full">
        <Label htmlFor="log-start" className="text-left">
          Start Time
        </Label>
        <div className="col-span-3">
          <DateTimePicker
            id="log-start"
            date={dateRange.from}
            setDate={(newFromDate) => {
              newFromDate && handleSetDuration(9, newFromDate);
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center w-full">
        <Label className="text-left">Hours</Label>
        <div className="col-span-3 flex gap-4 items-center">
          <Button
            size="icon"
            variant="outline"
            onClick={() => {
              if (dayLengthNumber <= 1) return;
              setDayLengthNumber((time) => time - 1);
            }}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <p className="text-lg w-6 text-center">{dayLengthNumber}</p>
          <Button
            size="icon"
            variant="outline"
            onClick={() => {
              if (dayLengthNumber >= 24) return;
              setDayLengthNumber((time) => time + 1);
            }}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  const SubmitButton = () => {
    if (selectedLog) {
      return (
        <div className="flex gap-2">
          <Button
            onClick={handleDelete}
            type="submit"
            disabled={isSubmitting}
            variant="destructive"
          >
            Delete Log
          </Button>
          <Button onClick={handleUpdate} type="submit" disabled={isSubmitting}>
            {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Save Log
          </Button>
        </div>
      );
    }

    return (
      <Button onClick={handleCreate} type="submit" disabled={isSubmitting}>
        {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
        Create Log
      </Button>
    );
  };
  return { LogForm, SubmitButton };
}

export default useNewLogForm;
