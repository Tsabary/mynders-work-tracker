import { PropsWithChildren, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { collection, doc, setDoc } from "firebase/firestore";
import { LoaderCircle } from "lucide-react";

import handleError from "../../helpers/handleError";
import useFirebase from "../../hooks/useFirebase";
import { Textarea } from "../ui/textarea";
import useMynders from "../../hooks/useMynders";
import DateTimePicker from "../ui/date-time-picker";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Input } from "../ui/input";

const NewLogPopover: React.FC<PropsWithChildren> = ({ children }) => {
  const { firestore } = useFirebase();
  const { user } = useMynders();

  const [comments, setComments] = useState("");
  const [dateRange, setDateRange] = useState<{
    from: Date | null;
    to: Date | null;
  }>({ from: null, to: null });
  const [dayLength, setDayLength] = useState("full-day");
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
        comments,
        date_range: dateRange,
      });

      setDateRange({ from: null, to: null });
      setComments("");
    } catch (err) {
      handleError(err, "Failed to create a new task");
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

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add a Log</DialogTitle>
          <DialogDescription>Log a day or hours of work</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 w-full">
          <div className="grid grid-cols-4 items-center gap-4 w-full">
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
          <div className="grid grid-cols-4 items-center gap-4 w-full">
            <Label className="text-left">Hours</Label>
            <div className="col-span-3 flex gap-2">
              <RadioGroup
                defaultValue="full-day"
                className="flex"
                onValueChange={(v) => {
                  setDayLength(v);
                  if (v === "full-day") {
                    handleSetDuration(9);
                    setDayLengthNumber(9);
                  }
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full-day" id="r1" />
                  <Label htmlFor="r1">Full day (9 hours)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="r2" />
                  <Label htmlFor="r2">Custom</Label>
                </div>
              </RadioGroup>
              <Input
                type="number"
                disabled={dayLength === "full-day"}
                value={dayLengthNumber}
                onChange={(e) => {
                  const time = Number(e.target.value);
                  if (time < 0 || time > 24) return;
                  setDayLengthNumber(time);
                  handleSetDuration(time);
                }}
                className="w-20"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4 w-full">
            <Label htmlFor="comments" className="text-left whitespace-nowrap">
              Comments
            </Label>
            <Textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={handleCreate}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              )}
              Create Log
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewLogPopover;
