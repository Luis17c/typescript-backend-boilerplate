import { Router } from "express";
import { adaptExpressFile as fAdapter, adaptExpressMiddleware as mAdapter } from "@/main/adapters";
import { makeAuthentication } from "@/main/factories/application/middlewares";
import { makeGetMediaController } from "../factories/application/controllers/media";

export default (router: Router): void => {
    router.get('/file',  mAdapter(makeAuthentication()), fAdapter(makeGetMediaController()))
}