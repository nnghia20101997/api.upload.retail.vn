import { Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { editFileName, imageFileFilter } from 'src/utils.common/utils.uploads.common/utils.upload.common';

export const storage = (des: string) => {
    return {
        storage: diskStorage({
            destination: des,
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }
}

@Controller('/api/materials')
export class MaterialsController {

    @Post('/single')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file', storage(`./public/materials/${Date.now()}`)))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }

    @Post('/multiple')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FilesInterceptor('image', 20, storage(`./public/materials/${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`)),
    )
    async uploadMultipleFiles(@UploadedFiles() files) {
        const response = [];
        files.forEach(file => {
            const fileReponse = {
                originalname: file.originalname,
                filename: file.filename,
            };
            response.push(fileReponse);
        });
        return response;
    }

    @Get(':imgpath')
    @UseGuards(JwtAuthGuard)
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
        return res.sendFile(image, { root: `./public/materials/${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}` });
    }
}
