import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";


export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsString()
    username?: string;
  
    @IsOptional()
    @IsString()
    password?: string;
  
    @IsOptional()
    @IsPhoneNumber(null)
    phoneNumber?: string;
  }