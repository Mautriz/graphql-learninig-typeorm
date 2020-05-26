import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { Post } from 'src/database/models/post.model';
import { PostService } from './post.service';

@Injectable({ scope: Scope.REQUEST })
export class PostLoader {
  public generateDataLoader: DataLoader<number, Post[]>;

  constructor(private postService: PostService) {
    console.log('DATALOADER CREATO');
    this.generateDataLoader = new DataLoader<number, Post[]>(keys =>
      this.postService.findByUserIds(keys),
    );
  }
}
