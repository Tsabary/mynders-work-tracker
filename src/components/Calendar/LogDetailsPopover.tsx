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
import useNewLogForm from "../../hooks/useNewLogForm";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

const LogDetailsPopover: React.FC<
  PropsWithChildren<{ onOpen: () => void; onClose: () => void }>
> = ({ children, onOpen, onClose }) => {
  const handleClose = () => {
    onClose();
    setOpen(false);
  };
  const { LogForm, SubmitButton } = useNewLogForm(handleClose);

  const [open, setOpen] = useState(false);

  const title = "Log Details";
  const description = "View or modify log";

  if (isDesktop) {
    return (
      <Dialog
        open={open}
        onOpenChange={(state) => {
          setOpen(state);
          if (state) {
            onOpen();
          } else {
            handleClose();
          }
        }}
      >
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
    <Drawer
      open={open}
      onOpenChange={(state) => {
        setOpen(state);
        if (state) {
          onOpen();
        } else {
          onClose();
        }
      }}
    >
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
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

export default LogDetailsPopover;
