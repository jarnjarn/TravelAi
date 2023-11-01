import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { ApiController } from '../common/decorators/apiController.decorator';
import { UserLoginDto } from './dto/user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Note } from 'src/common/decorators/note.decorator';
import { CurrUser } from 'src/common/decorators/user.decorator';
import { DataParam } from 'src/common/decorators/dataparam.decorator';
import { GetData } from 'src/common/decorators/getdata.decorator';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRegisterDto } from './dto/register.dto';

@ApiController(User.path)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @Public()
  @Note('đăngký')
  async register(@Body() userRegisterDto:UserRegisterDto)
  {
  	return await this.userService.register(userRegisterDto);
  }

  @Post("/login")
  @Public()
  @Note("Đăng nhập")
  async login(@Body() userLoginDto:UserLoginDto)
  {
  	return await this.userService.login(userLoginDto);
  }

  @Get("/me")
  @Note("Thông tin tài khoản")
  async me(@CurrUser() user:User)
  {
  	return user;
  }

  @Get(User.idParam)
  @Note("Thông tin tài khoản")
  @DataParam(User.id)
  async findById(@GetData(User.id) user:User)
  {
  	return user;
  }
}
