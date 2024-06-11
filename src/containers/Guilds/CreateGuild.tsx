import * as React from 'react';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import CreateGuildForm from './CreateGuildForm';

const CreateGuild: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Drawer onOpenChange={(open) => setIsOpen(open)} open={isOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Create your guild</DrawerTitle>
            <DrawerDescription>
              Build a guild to share your nuts with your friends.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-12">
            <CreateGuildForm onCallback={() => setIsOpen(false)} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateGuild;
