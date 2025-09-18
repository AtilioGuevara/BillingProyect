import { AbstractControl, ValidatorFn } from "@angular/forms";

export const loginUserImage = 'assets/images/avatar/user-17.png';
export const loginUserName = 'Sophia Mia';
export const emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

export const generateRandomId = (prefix: string = 'PEP-'): string => {
    const randomPart = Math.random().toString(36).substr(2, 9);
    return `${prefix}${randomPart.toUpperCase()}`;
};

export const emailValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const email = control.value;
    if (email && !email.includes('@')) {
        return { 'emailNotValid': true };
    }
    return null;
};
