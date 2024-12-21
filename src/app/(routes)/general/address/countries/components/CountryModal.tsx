import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from '@/components';
import { Loader2 } from 'lucide-react';
import { countrySchema, TCountry, TCountryFormData } from '@/types/general/Address/country';

type TCountryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (country: Omit<TCountry, 'id'> & { id?: string }) => void;
  country?: TCountry;
  loading: boolean;
};

export const CountryModal = ({
  isOpen,
  onClose,
  onSubmit,
  country,
  loading,
}: TCountryModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCountryFormData>({
    resolver: zodResolver(countrySchema),
    defaultValues: {
      name: '',
      code: '',
      demonym: '',
    },
  });

  const onSubmitForm = (data: TCountryFormData) => {
    onSubmit(country ? ({ ...data, id: country.id } as TCountry) : data);
    reset({ name: '', code: '', demonym: '' });
  };

  useEffect(() => {
    if (country) {
      reset(country);
    } else {
      reset({ name: '', code: '', demonym: 'r' });
    }
  }, [country, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{country ? 'Editar país' : 'Crear país'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="name" className="font-medium">
                Nombre
              </Label>
              <div>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="name"
                      {...field}
                      className={errors.name ? 'border-red-500' : ''}
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                  )}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="name" className="font-medium">
                Código
              </Label>
              <div>
                <Controller
                  name="code"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="code"
                      {...field}
                      className={errors.code ? 'border-red-500' : ''}
                      aria-invalid={errors.code ? 'true' : 'false'}
                      aria-describedby={errors.code ? 'name-error' : undefined}
                    />
                  )}
                />
                {errors.code && (
                  <p id="name-error" className="mt-1 text-sm text-red-500">
                    {errors.code.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="demonym" className="font-medium">
                Gentilicio
              </Label>
              <div>
                <Controller
                  name="demonym"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="description"
                      type="text"
                      {...field}
                      className={errors.demonym ? 'border-red-500' : ''}
                      aria-invalid={errors.demonym ? 'true' : 'false'}
                      aria-describedby={errors.demonym ? 'description-error' : undefined}
                    />
                  )}
                />
                {errors.demonym && (
                  <p id="description-error" className="mt-1 text-sm text-red-500">
                    {errors.demonym.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            {loading ? (
              <Button disabled>
                <Loader2 className="animate-spin" />
                Cargando
              </Button>
            ) : (
              <Button type="submit">{country ? 'Guardar cambios' : 'Crear'}</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
