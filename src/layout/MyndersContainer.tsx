import { useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";

function MyndersContainer({ children }: { children: React.ReactNode }) {
  const [isLeftColumnDrawerOpen, setIsLeftColumnDrawerOpen] = useState(false);

  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-full max-h-screen">
      <Drawer
        open={isLeftColumnDrawerOpen}
        onClose={() => {
          setIsLeftColumnDrawerOpen(false);
        }}
        direction="left"
        size="340px"
      >
        <div className="relative flex items-stretch bg-[#202022] h-full w-full overflow-hidden">
          <LeftColumn
            viewportHeight={viewportHeight}
            isForceOpen={isLeftColumnDrawerOpen}
          />
        </div>
      </Drawer>

      <div className="relative flex items-stretch bg-[#202022] h-full max-h-screen w-full md:p-0.5 border overflow-hidden z-50">
        <LeftColumn viewportHeight={viewportHeight} />
        <RightColumn >{children}</RightColumn>
      </div>
    </div>
  );
}

export default MyndersContainer;
