import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
  

export default function ResponsiveNav() {
  return (
    <div className="md:hidden lg:hidden">
        <Drawer direction="right">
        <DrawerTrigger>
            <img src="./assets/responsive-nav.svg" alt="Responsive navigation icon" />
        </DrawerTrigger>
        <DrawerContent>
            <DrawerHeader className="flex flex-col items-center gap-10">
            <DrawerTitle className="text-xl hover:underline">Home</DrawerTitle>
            <DrawerTitle className="text-xl hover:underline">Projects</DrawerTitle>
            <DrawerTitle className="text-xl hover:underline">Open Ideas</DrawerTitle>
            </DrawerHeader>
            <DrawerFooter>
            <DrawerClose>
            </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
        </Drawer>
    </div>
  )
}
