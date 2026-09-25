import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InventoryService, type AdjustReason } from '../services/inventory.service';

@Controller()
export class InventoryController {
    constructor(private readonly inventory: InventoryService) { }

    @MessagePattern('product.lookup')
    lookup(@Payload() q: { ids?: string[] }) {
        return this.inventory.lookup(q ?? {});
    }

    @MessagePattern('inventory.adjust')
    adjust(@Payload() d: { productId: string; mode: 'CHANGE' | 'SET'; quantity: number; reason: AdjustReason; note?: string; actor?: string }) {
        return this.inventory.adjust(d);
    }

    @MessagePattern('inventory.receive')
    receive(@Payload() d: Parameters<InventoryService['receive']>[0]) {
        return this.inventory.receive(d);
    }

    @MessagePattern('inventory.receipts')
    receipts(@Payload() q: { supplierId?: string; page?: number; limit?: number }) {
        return this.inventory.listReceipts(q ?? {});
    }

    @MessagePattern('inventory.bulk')
    bulk(@Payload() d: Parameters<InventoryService['bulk']>[0]) {
        return this.inventory.bulk(d);
    }

    @MessagePattern('inventory.movements.list')
    movements(@Payload() q: Parameters<InventoryService['movements']>[0]) {
        return this.inventory.movements(q ?? {});
    }

    @MessagePattern('inventory.levels')
    levels(@Payload() q: Parameters<InventoryService['levels']>[0]) {
        return this.inventory.levels(q ?? {});
    }

    @MessagePattern('inventory.export')
    export() {
        return this.inventory.export();
    }

    @MessagePattern('supplier.list')
    suppliers() {
        return this.inventory.listSuppliers();
    }

    @MessagePattern('supplier.save')
    saveSupplier(@Payload() d: Parameters<InventoryService['saveSupplier']>[0]) {
        return this.inventory.saveSupplier(d);
    }
}
