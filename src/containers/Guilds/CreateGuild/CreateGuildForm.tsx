import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from 'contexts/auth';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import useCreateGuild from 'api/guild/createGuild';
import { toast } from 'sonner';

const schema = z.object({
  name: z.string().min(3, {
    message: '3 characters minimum.',
  }),
  isPrivate: z.boolean(),
});

type FormData = {
  name: string;
  isPrivate: boolean;
};

interface CreateGuildFormProps {
  onCallback: () => void;
}

const CreateGuildForm: React.FC<CreateGuildFormProps> = ({ onCallback }) => {
  const { reloadUser } = useAuth();
  const { mutate: createGuild, isPending } = useCreateGuild();
  const isLoading = isPending;

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      isPrivate: false,
    },
  });

  const onSubmit = (data: FormData) => {
    createGuild(data, {
      onSuccess: async () => {
        reloadUser();
        onCallback();
        toast.success('Guild created');
      },
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <Label className="flex items-center">Name of the guild</Label>
            <div className="text-xs text-red-600">{errors.name?.message}</div>
          </div>
          <Input {...register('name')} />
        </div>
        <Controller
          name="isPrivate"
          control={control}
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                id={field.name}
                name={field.name}
              />
              <Label htmlFor="isPrivate">Private guild</Label>
            </div>
          )}
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
            'Create a guild'
          )}
        </Button>
      </div>
    </form>
  );
};

export default CreateGuildForm;
