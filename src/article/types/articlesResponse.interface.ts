import { ArticleType } from './article.type';

export interface ArticlesResponseInterfce {
	articles: ArticleType[],
	articlesCount: number
}