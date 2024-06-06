import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Controller, useForm } from 'react-hook-form';
import { Gender, genders } from 'constants/models';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const schema = z.object({
  name: z.string().min(1, { message: 'Name has to be filled' }),
  birthday: z.date({
    message: 'A date of birth is required.',
  }),
  gender: z.string().min(1, { message: 'Gender has to be filled' }),
});

type FormData = {
  name?: string;
  birthday?: Date;
  gender?: string;
};

const CreateProfileForm = () => {
  const isLoading = false;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    // defaultValues: {
    //   name: '',
    //   birthday: null,
    //   gender: null,
    // },
  });

  const onSubmit = (data: FormData) => {
    console.log({ data });
  };

  // console.log({ errors });

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="flex items-center justify-between">
          <Label>Name</Label>
          <div className="text-xs text-red-600">{errors.name?.message}</div>
        </div>
        <Input {...register('name')} />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <Label className="flex items-center">
            Date of birth
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoCircledIcon className="ml-2 opacity-50" />
                </TooltipTrigger>
                <TooltipContent className="max-w-56 border">
                  <p>
                    Your date of birth enables us to enhance safety and privacy
                    for our younger users. We also use this info to place you on
                    age-group leaderboards and provide more accurate performance
                    analysis. We don‘t share your date of birth or display it on
                    your profile.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <div className="text-xs text-red-600">{errors.birthday?.message}</div>
        </div>
        <div>
          <Controller
            name="birthday"
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    width="full"
                    className={cn(
                      'border-gray-100 pl-3 text-left font-normal shadow-none',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    {field.value ? (
                      format(field.value, 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto size-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    captionLayout="dropdown"
                    fromYear={1900}
                    toYear={2024}
                    mode="single"
                    selected={field.value || undefined}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <Label className="flex items-center">
            Gender
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoCircledIcon className="ml-2 opacity-50" />
                </TooltipTrigger>
                <TooltipContent className="max-w-56">
                  <p>
                    We‘re all about fun, friendly competition on Nuttd, and we
                    have leaderboards that you can choose to participate in –
                    men‘s, women‘s and overall (for everyone). Gender is used to
                    make leaderboard competition more relevant to how you
                    identify. If you select &quot;Non-binary&quot; or
                    &quot;Prefer not to say&quot;, you‘ll compete with everyone
                    in the overall category.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <div className="text-xs text-red-600">{errors.gender?.message}</div>
        </div>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => {
            console.log(
              { field },
              field.value && genders[field.value as Gender],
            );
            return (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <div>{field.value && genders[field.value as Gender]}</div>
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(genders).map((genderId) => (
                    <SelectItem value={genderId} key={genderId}>
                      {genders[genderId as Gender]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }}
        />
      </div>

      <div>
        <Button disabled={isLoading} type="submit" width="full">
          {isLoading ? (
            <span className="relative flex size-6 items-center justify-center">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-pink-500"></span>
            </span>
          ) : (
            'Create profile'
          )}
        </Button>
      </div>
    </form>
  );
};

export default CreateProfileForm;
