import { SetMetadata } from "@nestjs/common";

export const AuthSkip = () => SetMetadata('authSkip', true)