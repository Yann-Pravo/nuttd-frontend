import * as React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import CreateProfileForm from './CreateProfileForm';

const CreateProfile = () => (
  <Sheet defaultOpen open={true}>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create your profile</SheetTitle>
        <SheetDescription>It‘s time to become a nutter</SheetDescription>
      </SheetHeader>
      <CreateProfileForm />
    </SheetContent>
  </Sheet>
);

export default CreateProfile;
