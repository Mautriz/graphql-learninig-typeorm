import { Injectable } from '@nestjs/common';
import { PostRepo } from 'src/database/models/post.model';

@Injectable()
export class PostService {
  constructor(private postRepo: PostRepo) {}
  async createPost(userId: number, title: string) {
    return await this.postRepo.save({ userId, title });
  }

  async findAllPosts(limit?: number) {
    return await this.postRepo.find({
      take: limit || null,
    });
  }

  async findPostById(postId: number) {
    return await this.postRepo.findOne(postId);
  }

  async findPostsByUserId(userId: number) {
    return await this.postRepo.find({ where: { userId } });
  }
}
