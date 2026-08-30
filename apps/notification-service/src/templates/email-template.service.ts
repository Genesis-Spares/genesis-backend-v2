import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';
import Handlebars from 'handlebars';

@Injectable()
export class EmailTemplateService {
    private readonly templatesPath = join(
        __dirname,
        'templates',
    );

    async render(
        templateName: string,
        data: Record<string, any>,
    ): Promise<string> {
        const templatePath = join(
            this.templatesPath,
            `${templateName}.html`,
        );

        const template = await readFile(templatePath, 'utf-8');

        return Handlebars.compile(template)(data);
    }
}