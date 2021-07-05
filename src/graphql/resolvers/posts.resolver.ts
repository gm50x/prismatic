import { Resolver } from "@nestjs/graphql";
import { Post } from "../models/post.model";
import { User } from "../models/user.model";

@Resolver(of => Post)
export class PostsResolver {

}