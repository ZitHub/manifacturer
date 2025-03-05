import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ManifacturerModule } from './manifacturer/manifacturer.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    ManifacturerModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
