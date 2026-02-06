import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @Get("list")
  async getAllPosts() {
    return this.blogService.getAllPosts();
  }

  @Get(":slug")
  async getPostBySlug(@Param('slug') slug: string) {
    return this.blogService.getPostBySlug(slug);
  }

  @Post("create")
  async createPost(@Body() dto: CreateBlogDto) {
    return this.blogService.createPost(dto);
  }
}
