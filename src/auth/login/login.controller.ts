import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Role } from '../role.decorator';
import { RoleGuard } from '../role.guard';
import { JwtGuard } from './jwt.guard';
import { LoginService } from './login.service';

@Controller()
export class LoginController {

    constructor(private loginService: LoginService) { }

    @Post('login')
    login(@Body() body) {
        console.log(body.username);
        return { token: this.loginService.login(body.username, body.password) };
    }



    @Role(['Admin', 'User'])
    @UseGuards(JwtGuard, RoleGuard)
    @Get('test-auth')
    test(@Req() req) {
        console.log(req.user)
        return  {
            name: 'Rafael Leitao',
        };
    }
}
