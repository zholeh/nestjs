import { ConfigService } from '../shared/config/config.service';
import { ConfigModule } from '../shared/config/config.module';
import { MONGODB_URI } from '../shared/const';
import { MongooseModule } from '@nestjs/mongoose';

export const databaseProviders = [
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      uri: config.get(MONGODB_URI),
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }),
  }),
];
