import { Module } from '@nestjs/common';

import { ProductInHouseHttpModule } from '../../infra/http/product-in-house/product-in-house.http.module';

@Module({
  imports: [ProductInHouseHttpModule],
  controllers: [],
  providers: [],
})
export class ProductInHouseModule {}
