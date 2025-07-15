import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected(@Request() req) {
    return { message: 'This is protected!', user: req.user };
  }
}
