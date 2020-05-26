import { Injectable, createParamDecorator } from '@nestjs/common';
import { PostRepo } from 'src/database/models/post.model';
import { In } from 'typeorm';

@Injectable()
export class PostService {
  constructor(private postRepo: PostRepo) {}
  async createPost(userId: number, title: string) {
    return await this.postRepo.save({ userId, title });
  }

  async findByUserIds(userIds: readonly number[]) {
    const posts = await this.postRepo.find({
      where: { userId: In([...userIds]) },
    });
    return userIds.map(id => posts.filter(post => post.userId === +id));
  }

  async findPostByUserId(userIds: readonly number[]) {
    const posts = await this.postRepo.find({
      where: { userId: In([...userIds]) },
    });
    return userIds.map(id => posts.find(post => post.userId === +id));
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
