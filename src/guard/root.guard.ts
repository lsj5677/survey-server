import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthUtil } from "src/util/auth.util";
import { FirebaseUtil } from "src/util/firebase.util";

// guard -> 중간에서 동작

@Injectable()
// CanActivate : guard 만들 때 사용되는 기능
// - boolean type : true 면 req, false면 guard
export class RootGuard implements CanActivate {

  constructor(
    private firebaseUtil: FirebaseUtil,
    private authUtil: AuthUtil
  ) { }


  async canActivate(
    // 통신 param
    context: ExecutionContext
  ): Promise<boolean> {

    // 중간에서 가로챔
    const request = context.switchToHttp().getRequest();

    let Authorization: string = request.get('Authorization');
    console.log(`SUJIN:: ~ Authorization`, Authorization)

    // 토큰이 있으면 사용자 정보 조회
    if (Authorization) {
      let token = Authorization.split(' ')[1];
      // firebaseUser get
      const firebaseUser = await this.firebaseUtil.verifyIdToken(token);

      // dbUser get
      const userInfo = await this.authUtil.getUserInfo(firebaseUser.email);

      // 조회한 사용자 정보 req에 넣어줌
      // customRequest에 정의
      request.userInfo = userInfo;
    }


    return true;
  }

}