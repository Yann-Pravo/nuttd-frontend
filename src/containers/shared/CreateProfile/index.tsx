import * as React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import CreateProfileForm from './CreateProfileForm';

const CreateProfile = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Sheet defaultOpen open={isOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create your profile</SheetTitle>
          <SheetDescription>It‘s time to become a nutter</SheetDescription>
        </SheetHeader>
        <CreateProfileForm onCallback={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};

export default CreateProfile;
