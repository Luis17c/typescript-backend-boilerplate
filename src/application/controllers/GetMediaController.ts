import { HttpRequest, HttpResponse, notFound, ok } from "@/application/helpers";
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { BaseController } from "./BaseController";
import { env } from "@/main/config/env";
import { existsSync, createReadStream } from 'fs'
import path from 'path'
import mime from 'mime'

interface SignInRequest extends HttpRequest {
    fileName: string
}

export class GetMediaController extends BaseController {
    constructor ( ) { super() }

    async perform(httpRequest: SignInRequest): Promise<HttpResponse> {
        const { fileName } = httpRequest
    
        const bucket = path.resolve(__dirname + "/../../../" + `${env.bucketName}`)
        const filePath = path.resolve(bucket, fileName.replace('%20', ' '))
        if (!existsSync(filePath)) {
            return notFound('media')
        }
        const fileStream = createReadStream(filePath)
        return ok({
            fileStream,
            fileName
        })
    }

    override buildValidators ({ fileName }: SignInRequest): Validator[] {
        return [
            ...Builder.of({ value: fileName, fieldName: 'fileName' }).required().string().build()
        ]
    }
}