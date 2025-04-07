import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailDomainValidator(domain: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && !value.toLowerCase().endsWith(`@${domain.toLocaleLowerCase()}`)) {
      return { invalidDomain: { value: control.value } }; // Error personalizado
    }
    return null; // Válido
  };
}

export function invalidCharactersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    // Expresión regular para caracteres permitidos en un correo electrónico
    const validCharactersRegex = /^[a-zA-Z0-9@._-]+$/;

    if (value && !validCharactersRegex.test(value)) {
      return { invalidCharacters: true }; // Error personalizado
    }
    return null; // Válido
  };
}

export function noSpacesValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value && value.includes(' ')) {
        return { noSpaces: true }; // Error personalizado
      }
      return null; // Válido
    };
  }