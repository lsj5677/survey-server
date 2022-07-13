import { Injectable } from "@nestjs/common";
import { IPaginationOptions, paginate, PaginationTypeEnum } from "nestjs-typeorm-paginate";
import { SelectQueryBuilder } from "typeorm";

@Injectable()
export class PaginationUtil {
  constructor() { }

  // pagination lib에 버그가 있어서 proxy로 대체
  async proxyPagination<T>(qb: SelectQueryBuilder<T>, options: IPaginationOptions) {
    const paginationOptions: IPaginationOptions = {
      ...options,
      // 매번 옵션 넣지 않고 여기서 한 번 설정
      paginationType: PaginationTypeEnum.TAKE_AND_SKIP
    }

    // paginate 함수 가져와서 받은 거 넣어주기
    const { items, meta } = await paginate(qb, paginationOptions);

    return {
      items,
      meta
    }
  }
}