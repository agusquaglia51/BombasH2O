import { Transform } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsPhoneNumber,
  Equals,
  IsBoolean,
  Matches,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MinLength(2, { message: 'Mínimo 2 caracteres para el nombre' })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido es requerido' })
  @MinLength(2, { message: 'Mínimo 2 caracteres para el apellido' })
  lastName!: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email!: string;

  @IsString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsPhoneNumber('AR', {
    message: 'El teléfono debe ser un número válido de Argentina',
  })
  phone!: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(8, { message: 'Debe tener al menos 8 caracteres' })
  @Matches(/[A-Z]/, {
    message: 'Debe contener al menos una letra mayúscula',
  })
  @Matches(/[a-z]/, {
    message: 'Debe contener al menos una letra minúscula',
  })
  @Matches(/[!@#$%^&*(),.?":{}|<>]/, {
    message: 'Debe contener al menos un carácter especial',
  })
  password!: string;

  @IsBoolean({ message: 'Debe ser un valor booleano' })
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
  @Equals(true, {
    message: 'Debes aceptar la declaración jurada para continuar',
  })
  acceptStatement!: boolean;
}
