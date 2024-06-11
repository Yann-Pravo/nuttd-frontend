import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from 'contexts/auth';
import { toast } from 'sonner';
import useCreateNut from 'api/nut/createNut';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import useGetNutsCount from 'api/nut/getNutsCount';
import useGetNutsRank from 'api/nut/getNutsRank';

const schema = z.object({
  date: z.date({
    message: 'A date is required.',
  }),
  hours: z.string({
    message: 'A time is required.',
  }),
  minutes: z.string({
    message: 'A time is required.',
  }),
});

type FormData = {
  date: Date;
  hours: string;
  minutes: string;
};

interface CreateNutFormProps {
  onCallback: () => void;
}

const CreateNutForm: React.FC<CreateNutFormProps> = ({ onCallback }) => {
  const { reloadUser } = useAuth();
  const { refetch: getNutsCount } = useGetNutsCount();
  const { refetch: getNutsRank } = useGetNutsRank('getNutsRank', {
    enabled: false,
  });
  const { mutate: createNut, isPending } = useCreateNut();
  const isLoading = isPending;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: new Date(),
      hours: new Date().getHours().toString(),
      minutes: new Date().getMinutes().toString(),
    },
  });

  const onSubmit = (data: FormData) => {
    const nutDate = new Date(
      data.date.setHours(Number(data.hours), Number(data.minutes)),
    );
    createNut(
      { date: nutDate },
      {
        onSuccess: async () => {
          reloadUser();
          getNutsCount();
          location && getNutsRank();
          onCallback();
          toast.success('Duly nuttd!');
        },
      },
    );
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="flex items-center justify-between">
          <Label className="flex items-center">Date of nut</Label>
          <div className="text-xs text-red-600">{errors.date?.message}</div>
        </div>
        <div>
          <Controller
            name="date"
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
        <div className="flex space-x-4">
          <div className="grow">
            <div className="flex items-center justify-between">
              <Label>Hours</Label>
              <div className="text-xs text-red-600">
                {errors.hours?.message}
              </div>
            </div>
            <Controller
              name="hours"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <div>{field.value}</div>
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(Array(24).keys()).map((hour) => (
                      <SelectItem value={hour.toString()} key={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="grow">
            <div className="flex items-center justify-between">
              <Label>Minutes</Label>
              <div className="text-xs text-red-600">
                {errors.minutes?.message}
              </div>
            </div>
            <Controller
              name="minutes"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <div>{field.value}</div>
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(Array(60).keys()).map((minute) => (
                      <SelectItem value={minute.toString()} key={minute}>
                        {minute}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      </div>

      <div>
        <Button disabled={isLoading} type="submit" width="full">
          {isLoading ? (
            <span className="relative flex size-6 items-center justify-center">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-pink-500"></span>
            </span>
          ) : (
            'Crack a nut!'
          )}
        </Button>
      </div>
    </form>
  );
};

export default CreateNutForm;
