import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components';
import { Edit, Trash2 } from 'lucide-react';
import { TCountry } from '@/types/general/Address/country';
import { MobileSkeletonCountry } from '@/app/(routes)/general/address/countries/components/MobileSkeletonCountry';

type TDataTableModileCountryProps = {
  countries: TCountry[];
  onEdit: (country: TCountry) => void;
  onDelete: (country: TCountry) => void;
  isLoading: boolean;
};

export const DataTableModileCountry = ({
  countries,
  onEdit,
  onDelete,
  isLoading,
}: TDataTableModileCountryProps) => {
  if (isLoading) {
    return <MobileSkeletonCountry />;
  } else {
    return (
      <div className="grid grid-cols-1 gap-4">
        {countries.map((country) => (
          <Card key={country.id}>
            <CardHeader>
              <CardTitle>{country.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Código:</strong> {country.code}
              </p>
              <p>
                <strong>Gentilicio:</strong> {country.demonym}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(country)}
                aria-label={`Editar ${country.name}`}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(country)}
                aria-label={`Eliminar ${country.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
};
