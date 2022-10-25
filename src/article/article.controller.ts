import { User } from '@app/decorators/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { UserEntity } from '@app/user/user.entity';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UpdateArticleDto } from './dto/updateArticle.dto';
import { ArticleResponseInterfce } from './types/articleResponse.interface';
import { ArticlesResponseInterfce } from './types/articlesResponse.interface';

@Controller('articles')
export class ArticleController {
	constructor(private readonly articleService: ArticleService) { }

	@Get()
	async findAll(
		@User('id') currentUserId: number,
		@Query() query: any,
	): Promise<ArticlesResponseInterfce> {
		return await this.articleService.findAll(currentUserId, query);
	}

	@Post()
	@UseGuards(AuthGuard)
	@UsePipes(new ValidationPipe())
	async create(
		@User() currentUser: UserEntity,
		@Body('article') createArticleDto: CreateArticleDto
	): Promise<ArticleResponseInterfce> {
		const article = await this.articleService.createArticle(currentUser, createArticleDto);
		return this.articleService.buildArticleResponse(article);
	}

	@Get(':slug')
	async getArticleBySlug(
		@Param('slug') slug: string
	): Promise<ArticleResponseInterfce> {
		const article = await this.articleService.getArticleSlug(slug);
		return this.articleService.buildArticleResponse(article);
	}

	@Delete(':slug')
	@UseGuards(AuthGuard)
	async deleteArticle(
		@User('id') currentUserId: number,
		@Param('slug') slug: string
	) {
		return await this.articleService.deleteArticle(slug, currentUserId);
	}

	@Put(':slug')
	@UseGuards(AuthGuard)
	async updateArticle(
		@User('id') currentUserId: number,
		@Param('slug') slug: string,
		@Body('article') updateArticleDto: UpdateArticleDto,
	): Promise<ArticleResponseInterfce> {
		const article = await this.articleService.updateArticle(slug, updateArticleDto, currentUserId)
		return this.articleService.buildArticleResponse(article);
	}

	@Post(':slug/favorite')
	@UseGuards(AuthGuard)
	async addArticleToFavorites(
		@User('id') currentUserId: number,
		@Param('slug') slug: string,
	): Promise<ArticleResponseInterfce> {
		const article = await this.articleService.addArticleToFavorites(slug, currentUserId)
		return this.articleService.buildArticleResponse(article);
	}

	@Delete(':slug/favorite')
	@UseGuards(AuthGuard)
	async deleteArticleFromFavorites(
		@User('id') currentUserId: number,
		@Param('slug') slug: string,
	): Promise<ArticleResponseInterfce> {
		const article = await this.articleService.deleteArticleFromFavorites(slug, currentUserId)
		return this.articleService.buildArticleResponse(article);
	}
}