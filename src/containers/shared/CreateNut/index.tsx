import * as React from 'react';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import CreateNutForm from './CreateNutForm';

const CreateNut: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Drawer onOpenChange={(open) => setIsOpen(open)} open={isOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Share your nut</DrawerTitle>
            <DrawerDescription>
              Tell the world you just nutted.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-12">
            <CreateNutForm onCallback={() => setIsOpen(false)} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateNut;
