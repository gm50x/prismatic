import { Resolver } from "@nestjs/graphql";
import { BaseResolver } from './base.resolver';
import { Comment } from '../models/comment.model';

@Resolver(of => Comment)
export class CommentsResolver extends BaseResolver(Comment) {
  constructor() {
    super();
  }
}