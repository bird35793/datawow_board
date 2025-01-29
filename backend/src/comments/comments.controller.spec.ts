import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { RequestCreateCommentDto } from './dto/request-create-comment.dto'; // Import DTO
import { HttpStatus } from '@nestjs/common';

describe('CommentsController', () => {
  let controller: CommentsController;
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        CommentsService,
        {
          provide: CommentsService,
          useValue: {
            create: jest.fn(), // Mock the create method
          },
        },
      ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new comment', async () => {
      const createCommentDto: RequestCreateCommentDto = {
        content: 'This is a test comment',
        postId: 1, // Example postId
      };

      const createdComment = {
        id: 1, // Example id
        content: 'This is a test comment',
        postId: 1,
        userId: 1, // Example userId (you might need to adjust this)
        createdAt: new Date(), // Adjust as needed
        updatedAt: new Date(), // Adjust as needed
      };

      (service.create as jest.Mock).mockResolvedValue(createdComment);

      const req = { user: { id: 1 } }; // Mock the request object with user info

      const response = await controller.create(createCommentDto, req);

      expect(service.create).toHaveBeenCalledWith(createCommentDto, req.user.id);
      expect(response).toEqual(createdComment);
    });

    it('should handle errors during comment creation', async () => {
      const createCommentDto: RequestCreateCommentDto = {
        content: 'This is a test comment',
        postId: 1,
      };

      const errorMessage = 'Failed to create comment';
      (service.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const req = { user: { id: 1 } };

      await expect(controller.create(createCommentDto, req)).rejects.toThrowError(errorMessage);
    });
  });

});