import { UserEntity } from '@app/user/user.entity';
import { ArticleEntity } from './article.entity';
import { FollowEntity } from '@app/profile/follow.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
	controllers: [ArticleController],
	providers: [ArticleService],
	imports: [TypeOrmModule.forFeature([ArticleEntity, UserEntity, FollowEntity])]
})
export class ArticleModule { }