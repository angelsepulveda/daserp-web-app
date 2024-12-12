import { documentTypeSchema } from '@/types/documentType';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { TVoucherType, TVoucherTypeFormData } from '@/types';

type TVoucherTypeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (voucherType: Omit<TVoucherType, 'id'> & { id?: string }) => void;
  voucherType?: TVoucherType;
  loading: boolean;
};

export const VoucherTypeModal = ({
  isOpen,
  onClose,
  onSubmit,
  voucherType,
  loading,
}: TVoucherTypeModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TVoucherTypeFormData>({
    resolver: zodResolver(documentTypeSchema),
    defaultValues: {
      name: '',
      code: '',
      description: '',
    },
  });

  const onSubmitForm = (data: TVoucherTypeFormData) => {
    onSubmit(voucherType ? ({ ...data, id: voucherType.id } as TVoucherType) : data);
    reset({ name: '', code: '', description: '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {voucherType ? 'Editar tipo de comprobante' : 'Crear tipo de comprobante'}
          </DialogTitle>
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
              <Label htmlFor="description" className="font-medium">
                Descripción
              </Label>
              <div>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="description"
                      type="text"
                      {...field}
                      className={errors.description ? 'border-red-500' : ''}
                      aria-invalid={errors.description ? 'true' : 'false'}
                      aria-describedby={errors.description ? 'description-error' : undefined}
                    />
                  )}
                />
                {errors.description && (
                  <p id="description-error" className="mt-1 text-sm text-red-500">
                    {errors.description.message}
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
              <Button type="submit">{voucherType ? 'Guardar cambios' : 'Crear'}</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
