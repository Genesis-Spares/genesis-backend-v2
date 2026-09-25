// apps/customer-service/src/message.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessageService } from './message.service';
import { CreateMessageDto, MessageQueryDto, ReplyMessageDto, UpdateMessageDto, UpdateMessageStatusDto } from './dto/message.dto';

@Controller()
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @MessagePattern('message.create')
    async createMessage(@Payload() dto: CreateMessageDto) {
        return this.messageService.createMessage(dto);
    }

    @MessagePattern('message.find.all')
    async findAllMessages(@Payload() query: MessageQueryDto) {
        return this.messageService.findAllMessages(query || {});
    }

    @MessagePattern('message.find.one')
    async findOneMessage(@Payload() data: { id: string }) {
        return this.messageService.findOneMessage(data.id);
    }

    @MessagePattern('message.reply')
    async replyToMessage(@Payload() data: { id: string; dto: ReplyMessageDto }) {
        return this.messageService.replyToMessage(data.id, data.dto);
    }

    @MessagePattern('message.status.update')
    async updateStatus(@Payload() data: { id: string; dto: UpdateMessageStatusDto }) {
        return this.messageService.updateStatus(data.id, data.dto);
    }

    @MessagePattern('message.update')
    async updateMessage(@Payload() data: { id: string; dto: UpdateMessageDto }) {
        return this.messageService.updateMessage(data.id, data.dto);
    }

    @MessagePattern('message.stats')
    async getStats() {
        return this.messageService.getStats();
    }
}
