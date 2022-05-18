import { Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { editFileName, imageFileFilter } from 'src/utils.common/utils.uploads.common/utils.upload.common';

export const storage = {
    storage: diskStorage({
        destination: './public/categories',
        filename: editFileName,
    }),
    fileFilter: imageFileFilter,
}

@Controller('/api/categories')
export class CategoriesController {

    @Post('/single')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file', storage))
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
        FilesInterceptor('image', 20, storage),
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
        return res.sendFile(image, { root: './public/categories' });
    }
}




