export interface UserData {
    fullName: string;
    email: string;
    phone: string;
    watchModel?: string;   // Specific to Watch Donation
    message?: string;
    photo?: string;        // Donor photo
}

export enum Step {
    Hero = 'hero',
    Form = 'form',
    Preview = 'preview',
    Success = 'success'
}
