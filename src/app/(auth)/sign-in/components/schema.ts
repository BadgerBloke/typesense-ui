import z from 'zod';

export const SignInFormSchema = z.object({
    email: z.string({ required_error: 'Email is required!' }).email('Please enter a valid email!'),
    password: z
        .string({ required_error: 'Password is required!' })
        .min(8, 'Password should at least 8 characters long.')
        .max(14, 'Password cannot exceed 14 characters.'),
});

export type SignInFormType = z.infer<typeof SignInFormSchema>;
