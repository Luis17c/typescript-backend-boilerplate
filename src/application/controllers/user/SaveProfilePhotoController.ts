import { BaseController } from "../BaseController";
import { HttpRequest, HttpResponse, ok } from "@/application/helpers";
import { IUserRepository } from '@/domain/repos';
import { ValidationBuilder as Builder, Validator } from '@/application/validation'

interface Request extends HttpRequest {
    file?: { buffer: Buffer, mimeType: string, fileName: string, filePath: string } 
}

export class SaveProfilePhotoController extends BaseController {
    constructor (
        private userRepository: IUserRepository,
    ) { super() }

    async perform(httpRequest: Request): Promise<HttpResponse> {
        const { file, user } = httpRequest
    
        const updatedUser = await this.userRepository.update(user.id, {
            photo: file?.fileName
        })

        return ok({
            user: updatedUser
        })
    }

    override buildValidators ({ file }: Request): Validator[] {
        return [
            ...Builder.of({ value: file, fieldName: 'photo' }).required().image({ allowed: ['png', 'jpg'], maxSizeInMb: 5 }).build()
        ]
    }
}