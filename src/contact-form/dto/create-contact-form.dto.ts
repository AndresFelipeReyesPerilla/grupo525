import { IsEmail, IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateContactFormDto {

    @IsNotEmpty()
    @IsString()
    sex: string;

    @IsNotEmpty()
    @IsString()
    date: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    typeHome: string;

    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsString()
    departament: string;
}
