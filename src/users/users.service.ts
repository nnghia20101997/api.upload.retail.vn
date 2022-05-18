import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExceptionResponseDetail } from "src/utils.common/utils.exception.common/utils.exception.common";
import { Repository } from "typeorm";
import { Users } from "./users.entity/users.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private users: Repository<Users>,
    ) { }



    async findOneUser(phone: string): Promise<Users> {
        let user: Users = await this.users.findOne({
            phone: phone,
        });

        if (!user) {
            throw new HttpException(
                new ExceptionResponseDetail(
                    HttpStatus.UNAUTHORIZED,
                    "token không hợp lệ !!!"
                ),
                HttpStatus.OK
            );
        }
        return user;
    }


}
