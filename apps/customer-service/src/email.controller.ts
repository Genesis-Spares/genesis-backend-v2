import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmailService } from './email.service';
import { SaveEmailDto } from './dto/email.dto';

type Actor = { userId?: string; email?: string };

/** Staff-composed emails to customers (dashboard → Emails). */
@Controller()
export class EmailController {
    constructor(private readonly emails: EmailService) { }

    @MessagePattern('email.list')
    list(@Payload() q: { folder?: string; search?: string; page?: number; limit?: number }) {
        return this.emails.list(q ?? {});
    }

    @MessagePattern('email.get')
    get(@Payload() d: { id: string }) {
        return this.emails.get(d.id);
    }

    @MessagePattern('email.create')
    create(@Payload() d: { dto: SaveEmailDto; actor: Actor }) {
        return this.emails.create(d.dto, d.actor);
    }

    @MessagePattern('email.update')
    update(@Payload() d: { id: string; dto: SaveEmailDto }) {
        return this.emails.update(d.id, d.dto);
    }

    @MessagePattern('email.delete')
    remove(@Payload() d: { id: string }) {
        return this.emails.remove(d.id);
    }

    @MessagePattern('email.duplicate')
    duplicate(@Payload() d: { id: string; actor: Actor }) {
        return this.emails.duplicate(d.id, d.actor);
    }

    @MessagePattern('email.send')
    send(@Payload() d: { id: string }) {
        return this.emails.send(d.id);
    }

    @MessagePattern('email.test')
    test(@Payload() d: { dto: SaveEmailDto; to: string }) {
        return this.emails.sendTest(d.dto, d.to);
    }

    @MessagePattern('email.for.customer')
    forCustomer(@Payload() d: { customerId: string }) {
        return this.emails.forCustomer(d.customerId);
    }
}
