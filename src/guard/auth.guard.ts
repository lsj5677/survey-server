import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CustomRequest } from "src/type/http.type";


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private reflector: Reflector
  ) { }


  async canActivate(
    // 통신 param
    context: ExecutionContext
  ): Promise<boolean> {

    // 중간에서 가로챔
    const request: CustomRequest = context.switchToHttp().getRequest();

    // root.guard 에서 userInfo 넣어줌
    // auth 검사를 안하는 metaData가 있으면 검사 안함
    // reflector => 특정한 데이터가 api에 있으면 통과
    const authSkip = this.reflector.get<boolean>('authSkip', context.getHandler())

    // 사용자 정보 있으면 통과
    const res = authSkip || !!request?.userInfo?.id;
    // console.log(`SUJIN:: ~ res`, res)

    return res;
  }
}