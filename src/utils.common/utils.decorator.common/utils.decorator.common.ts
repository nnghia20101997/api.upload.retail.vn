import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, isString, isNotEmpty } from "class-validator";
import { ExceptionResponseDetail } from "../utils.exception.common/utils.exception.common";

export function IsNotEmptyString(validationOptions?: ValidationOptions) {
    return (object: unknown, propertyName: string) => {
        registerDecorator({
            name: 'isNotEmptyString',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate: (value: any): boolean =>
                    isString(value) && isNotEmpty(value.trim()),
                defaultMessage: (validationArguments?: ValidationArguments): string => {
                    throw new HttpException(
                        new ExceptionResponseDetail(
                            HttpStatus.BAD_REQUEST,
                            `[${validationArguments.property}] không được để trống `,
                        ), HttpStatus.OK);
                },
            },
        });
    };
}

export function IsNotEmpty(validationOptions?: ValidationOptions) {


    return (object: unknown, propertyName: string) => {
        registerDecorator({
            name: 'isNotEmpty',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {

                validate: (value: any): boolean => typeof value === "string" && value.trim().length > 0,
                defaultMessage: (validationArguments?: ValidationArguments): string => {
                    throw new HttpException(
                        new ExceptionResponseDetail(
                            HttpStatus.BAD_REQUEST,
                            `[${validationArguments.property}] không được để trống `,
                        ), HttpStatus.OK);
                },
            },

        });
    };
}

export function IsInt(validationOptions?: ValidationOptions) {
    return (object: unknown, propertyName: string) => {

        registerDecorator({
            name: 'isInt',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate: (value: any): boolean => !isNaN(value) || !value,
                defaultMessage: (validationArguments?: ValidationArguments): string => {
                    throw new HttpException(
                        new ExceptionResponseDetail(
                            HttpStatus.BAD_REQUEST,
                            `[${validationArguments.property}] phải là kiêu số nguyên!`,
                        ), HttpStatus.OK);
                },
            },
        });
    };
}


export const GetTechresSalerFromToken = createParamDecorator(
    async (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        if (!request.user) {
            throw new HttpException(new ExceptionResponseDetail(HttpStatus.UNAUTHORIZED, "Token không hợp lệ!"), HttpStatus.OK);
        }

        return request.user;
    },
);