import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
const users = [{
    id: 1,
    username: 'rleitao@leucotron.com.br',
    password: '$2b$10$DRBKeCnv100zLZtf2ibBBezW.lCLVhA8FkyKX.zCSlVXKDHqDaE.G',
    role: 'Admin'
},
{
    id: 2,
    username: 'rleitao2@leucotron.com.br',
    password: '$2b$10$DRBKeCnv100zLZtf2ibBBezW.lCLVhA8FkyKX.zCSlVXKDHqDaE.G',
    role: 'User'
},
{
    id: 3,
    username: 'rleitao3@leucotron.com.br',
    password: '$2b$10$DRBKeCnv100zLZtf2ibBBezW.lCLVhA8FkyKX.zCSlVXKDHqDaE.G',
    role: 'Guest'
}];

@Injectable()
export class LoginService {

    constructor(private jwtService: JwtService) { };

    login(username, password) {
        console.log(username | password)

        const user = this.validateCredentials(username, password);

        const payload = {
            sub: user.id,
            username: user.username,
            role: user.role
        }

        return this.jwtService.sign(payload);

    }

    validateCredentials(username: string, password: string) {
        const user = users.find((u) => u.username === username && bcrypt.compareSync(password, u.password))

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    };

}
