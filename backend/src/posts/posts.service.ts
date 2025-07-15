import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        title: dto.title,
        slug: dto.slug,
        content: dto.content,
        coverImage: dto.coverImage,
        published: dto.published,
        user: {
          connect: { id: dto.userId },
        },
        category: dto.categoryId
          ? { connect: { id: dto.categoryId } }
          : undefined,
        tags: dto.tagIds
          ? {
              connect: dto.tagIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        category: true,
        tags: true,
        user: true,
      },
    });
  }

  findAllAdmin() {
    return this.prisma.post.findMany({
      include: {
        category: true,
        tags: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findAllPublished() {
    return this.prisma.post.findMany({
      where: { published: true },
      include: {
        category: true,
        tags: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        category: true,
        tags: true,
        user: true,
      },
    });
  }

  findOneBySlug(slug: string) {
    return this.prisma.post.findUnique({
      where: { slug },
      include: {
        category: true,
        tags: true,
        user: true,
      },
    });
  }

  async update(id: string, dto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(dto.slug && { slug: dto.slug }),
        ...(dto.content && { content: dto.content }),
        ...(dto.coverImage !== undefined && { coverImage: dto.coverImage }),
        ...(dto.published !== undefined && { published: dto.published }),
        ...(dto.userId && { user: { connect: { id: dto.userId } } }),
        ...(dto.categoryId && {
          category: { connect: { id: dto.categoryId } },
        }),
        ...(dto.categoryId === null && { category: { disconnect: true } }),
        ...(dto.tagIds && { tags: { set: dto.tagIds.map((id) => ({ id })) } }),
      },
      include: {
        category: true,
        tags: true,
        user: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
