import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service'; // Import AuthService
import { RequestCreateAuthDto } from './dto/request-create-auth.dto';
import { RequestLoginAuthDto } from './dto/request-login-auth.dto';
import { HttpStatus, UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService; // Declare service variable

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService, // Provide AuthService
        {
          provide: AuthService, // Mock AuthService (Important!)
          useValue: {
            register: jest.fn(), // Mock the register method
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService); // Initialize service

    jest.spyOn(service, 'login'); // <--- ส่วนที่เพิ่มเข้ามา
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const createUserDto: RequestCreateAuthDto = {
        username: 'testuser',
        displayName: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };
      const createdUser = {
        id: 1,
        username: 'testuser',
        displayName: 'Test User',
        email: 'test@example.com',
      };

      (service.register as jest.Mock).mockResolvedValue(createdUser); // Mock the service call

      const response = await controller.register(createUserDto);

      expect(service.register).toHaveBeenCalledWith(createUserDto); // Verify the service method is called
      expect(response).toEqual(createdUser); // Verify the controller returns the expected value
    });

    it('should handle other errors during registration', async () => {
      const createUserDto: RequestCreateAuthDto = {
        username: 'testuser',
        displayName: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      const errorMessage = 'Database error';
      (service.register as jest.Mock).mockRejectedValue(new Error(errorMessage)); // Mock a generic error

      await expect(controller.register(createUserDto)).rejects.toThrowError(errorMessage);
    });
  });



  describe('login', () => {
    it('should login a user', async () => {
      const loginDto: RequestLoginAuthDto = {
        username: 'testuser',
        password: 'password123',
      };
      const user = { id: 1, username: 'testuser', displayName: 'Test User' };
      const accessToken = 'mocked_access_token';

      (service.login as jest.Mock).mockResolvedValue({ access_token: accessToken, user: { displayName: user.displayName } });

      const req = { user }; // Mock request object

      const response = await controller.login(req);

      expect(service.login).toHaveBeenCalledWith(user);
      expect(response).toEqual({ access_token: accessToken, user: { displayName: user.displayName } });
    });

  });
});