import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ModelDefinition, MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>("MONGODB_URI_PRODUCT")
            }),
            inject: [ConfigService]
        })
    ]
})
export class DatabaseModule {
    public static forFeature(models: ModelDefinition[]) {
        return MongooseModule.forFeature(models);
    }
}