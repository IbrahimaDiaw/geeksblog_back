import { MinLength } from "class-validator";

export class PasswordDTO{

    @MinLength(6)
    password : string;

    @MinLength(6)
    firstPassword : string;

    @MinLength(6)
    secondPassword : string;
}