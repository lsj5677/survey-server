import { Request, Response } from "express";
import { UserEntity } from "src/entity/user.entity";

// request가 express랑 node에서 제공해주는게 있는데 express import
export interface CustomRequest extends Request {
  userInfo?: UserEntity
}

export interface CustomResponse extends Response {

}