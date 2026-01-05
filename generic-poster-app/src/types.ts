export interface UserData {
    fullName: string;
    email: string;
    phone: string;
    // Generic additional fields can be added here
    message?: string;
    photo?: string;        // User photo
}

export enum Step {
    Hero = 'hero',
    Form = 'form',
    Preview = 'preview',
    Success = 'success'
}
