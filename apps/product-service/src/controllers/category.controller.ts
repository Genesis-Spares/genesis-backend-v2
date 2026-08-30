import { Controller, Get } from "@nestjs/common";
import { CategoryService } from "../services/category.service";
import { CategoryQueryDto, CreateCategoryDto, ReorderCategoryDto, UpdateCategoryDto } from "../dto/category.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @MessagePattern('category.create')
    async createCategory(@Payload() data: CreateCategoryDto) {
        return await this.categoryService.createCategory(data);
    }

    @MessagePattern('category.find.all')
    async findAllCategories(@Payload() query?: CategoryQueryDto) {
        return await this.categoryService.findAllCategories(query);
    }

    @MessagePattern('category.tree')
    async getCategoryTree() {
        return await this.categoryService.getCategoryTree();
    }

    @MessagePattern('category.find.one')
    async findCategoryById(@Payload() data: { id: string }) {
        return await this.categoryService.findCategoryById(data.id);
    }

    @MessagePattern('category.find.by.slug')
    async findCategoryBySlug(@Payload() data: { slug: string }) {
        return await this.categoryService.findCategoryBySlug(data.slug);
    }

    @MessagePattern('category.update')
    async updateCategory(@Payload() data: { id: string, dto: UpdateCategoryDto }) {
        return await this.categoryService.updateCategory(data.id, data.dto);
    }

    async reorderCategory(@Payload() dto: ReorderCategoryDto) {
        return await this.categoryService.reorderCategory(dto);
    }

    // async bulkCreateCategories(@Payload() data: { categories: CreateCategoryDto[] }) {
    //     return await this.categoryService.bulkCreateCategories(data.categories);
    // }



    async validateCategory(@Payload() data: { name: string; parentId?: string }) {
        return await this.categoryService.validateCategory(data);
    }
}
