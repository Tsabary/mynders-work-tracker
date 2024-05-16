import { PropsWithChildren, useState } from "react";
import { isDesktop } from "react-device-detect";
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
import useNewLogForm from "../hooks/useNewLogForm";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

const NewLogPopover: React.FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { LogForm, SubmitButton } = useNewLogForm(() => setOpen(false));

  const title = "Add a Log";
  const description = "Log a day or hours of work";

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <LogForm />
          <DialogFooter>
            <DialogClose asChild>
              <SubmitButton />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left pb-0">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pt-0">
          <LogForm />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <SubmitButton />
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NewLogPopover;
