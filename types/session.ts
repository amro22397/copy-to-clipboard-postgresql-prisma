export type Session = {
    "id": string,
    "name": string | null,
    "email": string,
    "isVerified": boolean | null,
    "createdAt": Date,
    "updatedAt": Date,
    "resetPasswordExpires": Date | null,
    "resetPasswordToken": string | null,
    verifyToken: string | null,
    "hashedPassword": string | null,
    verifyTokenExpires: Date | null,
    image: string | null,
}