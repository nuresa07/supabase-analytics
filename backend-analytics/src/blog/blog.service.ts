import { Injectable } from '@nestjs/common';
import { blogDetailQuery, blogListQuery } from 'src/sanity/queries/blog.queries';
import { sanityServer } from 'src/sanity/sanity.server';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService {
  async getAllPosts() {
    return await sanityServer.fetch(blogListQuery)
  }

  async getPostBySlug(slug: string) {
    return await sanityServer.fetch(blogDetailQuery, { slug })
  }

  async createPost(dto: CreateBlogDto) {
    return sanityServer.create({
      _type: 'post',
      title: dto.title,
      slug: { _type: "slug", current: dto.slug },
      author: dto.author,
      publishedAt: dto.publishedAt || new Date().toISOString(),
      excerpt: dto.excerpt,
      coverImage: dto.coverImage,
      tags: dto.tags || []
    })
  }

}
