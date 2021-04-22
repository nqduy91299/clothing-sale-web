import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

export function timeFormatValidator(control: FormControl) {
  const phoneHead = phoneRight;
  const value = control.value;
  if (value && value?.length == 10) {
    let validatePhone = value.toString().slice(0, 3);
    if (phoneHead.includes(validatePhone)) {
      return null;
    }
    return { phone: true };
  }
}

export function minPhoneValidator(min: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value?.length) {
      const length = control.value?.length;
      return length < min ? { minPhone: true } : null;
    }
    return null;
  };
}

export const phoneRight = [
  '083',
  '084',
  '085',
  '081',
  '082',
  '076',
  '077',
  '078',
  '079',
  '070',
  '032',
  '033',
  '034',
  '035',
  '036',
  '037',
  '038',
  '039',
  '056',
  '058',
  '059',
];
