import { useEffect, useState } from "react";
import {
  Timestamp,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import useFirebase from "./useFirebase";
import useMynders from "./useMynders";
import { adjustToLocalTime } from "../helpers/adjustToLocalTime";

function useLogs() {
  const { firestore } = useFirebase();
  const { user } = useMynders();
  const [logs, setLogs] = useState<CalendarWorkLog[]>([]);

  useEffect(() => {
    if (!user) return;

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
            start: adjustToLocalTime(
              (data.date_range.from as Timestamp).toDate()
            ),
            end: adjustToLocalTime((data.date_range.to as Timestamp).toDate()),
            // comments: data.comments,
          };
        });
        setLogs(docs);
      },
      (error) => {
        console.error("Error fetching documents: ", error);
      }
    );

    return () => unsubscribe();
  }, [user, firestore, setLogs]);

  return logs;
}

export default useLogs;
