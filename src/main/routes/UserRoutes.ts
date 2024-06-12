import { Router } from "express";
import { adaptExpressRoute as rAdapter, adaptExpressMiddleware as mAdapter, adaptMulter } from "@/main/adapters";
import { makeUserDetailController } from "@/main/factories/application/controllers";
import { makeAuthentication } from "@/main/factories/application/middlewares";
import { makeSaveProfilePhotoController } from "../factories/application/controllers/user";

export default (router: Router): void => {
    router.get('/users/:userId',  mAdapter(makeAuthentication()), rAdapter(makeUserDetailController()))
    router.put('/users/changePhoto', mAdapter(makeAuthentication()), adaptMulter, rAdapter(makeSaveProfilePhotoController()))
}