// apps/order-service/src/order.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { ReturnService, type CreateReturnInput } from './return.service';
import { ReportService } from './report.service';
import { PricingService } from './pricing.service';
import { PaymentService } from './payment.service';
import type { StkCallbackBody } from './mpesa.client';
import { DeliveryZoneDto, QuoteRequestDto, UpdateCheckoutSettingsDto } from './dto/pricing.dto';
import {
    CreateOrderDto,
    UpdateOrderDto,
    UpdateOrderStatusDto,
    UpdatePaymentStatusDto,
    UpdateTrackingDto,
    AddTrackingEventDto,
    CancelOrderDto,
    CreateOrderNoteDto,
    UpdateOrderNoteDto,
    OrderQueryDto,
} from './dto/order.dto';

@Controller()
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private readonly returns: ReturnService,
        private readonly reports: ReportService,
        private readonly pricing: PricingService,
        private readonly payments: PaymentService,
    ) { }

    // ── delivery zones, VAT & quotes ──────────────────────
    @MessagePattern('pricing.quote')
    quote(@Payload() dto: QuoteRequestDto) {
        return this.pricing.quote(dto);
    }

    @MessagePattern('pricing.zones.public')
    publicZones() {
        return this.pricing.publicZones();
    }

    @MessagePattern('pricing.zones.list')
    listZones() {
        return this.pricing.listZones();
    }

    @MessagePattern('pricing.zones.create')
    createZone(@Payload() dto: DeliveryZoneDto) {
        return this.pricing.createZone(dto);
    }

    @MessagePattern('pricing.zones.update')
    updateZone(@Payload() d: { id: string; dto: DeliveryZoneDto }) {
        return this.pricing.updateZone(d.id, d.dto);
    }

    @MessagePattern('pricing.zones.delete')
    deleteZone(@Payload() d: { id: string }) {
        return this.pricing.deleteZone(d.id);
    }

    @MessagePattern('pricing.settings.get')
    getSettings() {
        return this.pricing.getSettings();
    }

    @MessagePattern('pricing.settings.update')
    updateSettings(@Payload() dto: UpdateCheckoutSettingsDto) {
        return this.pricing.updateSettings(dto);
    }

    // ── M-Pesa ────────────────────────────────────────────
    @MessagePattern('payment.mpesa.start')
    startMpesa(@Payload() d: { orderId: string; customerId?: string; phone?: string }) {
        return this.payments.startMpesa(d.orderId, { customerId: d.customerId, phone: d.phone });
    }

    @MessagePattern('payment.mpesa.callback')
    mpesaCallback(@Payload() d: { secret: string; body: StkCallbackBody }) {
        return this.payments.handleCallback(d.secret, d.body);
    }

    @MessagePattern('payment.status')
    paymentStatus(@Payload() d: { orderId: string; customerId?: string }) {
        return this.payments.status(d.orderId, d.customerId);
    }

    // ── reports (read-only) ───────────────────────────────
    @MessagePattern('report.sales')
    salesReport(@Payload() d: { from?: string; to?: string }) {
        return this.reports.salesSummary(d?.from, d?.to);
    }

    @MessagePattern('report.products')
    productReport(@Payload() d: { from?: string; to?: string }) {
        return this.reports.productSales(d?.from, d?.to);
    }

    @MessagePattern('report.customers')
    customerReport(@Payload() d: { from?: string; to?: string; limit?: number }) {
        return this.reports.customers(d?.from, d?.to, d?.limit);
    }

    // ============================================
    // ORDER CRUD
    // ============================================

    @MessagePattern('order.create')
    async createOrder(@Payload() dto: CreateOrderDto) {
        return this.orderService.createOrder(dto);
    }

    /** Shopper checkout; M-Pesa orders also get their first STK prompt here. */
    @MessagePattern('order.place')
    async placeOrder(@Payload() dto: CreateOrderDto) {
        const order = await this.orderService.placeOrder(dto);
        if (order.paymentMethod !== 'mpesa') return { ...order, payment: null };
        const { payment } = await this.payments.startMpesa(order.id);
        return { ...order, payment };
    }

    @MessagePattern('order.purchase.check')
    async findDeliveredPurchase(@Payload() data: { customerId: string; productId: string }) {
        return this.orderService.findDeliveredPurchase(data.customerId, data.productId);
    }

    // ── cancellations & returns ───────────────────────────
    @MessagePattern('order.customer.cancel')
    customerCancel(@Payload() d: { orderId: string; customerId: string; reason?: string }) {
        return this.returns.customerCancel(d.orderId, d.customerId, d.reason);
    }

    @MessagePattern('return.eligibility')
    returnEligibility(@Payload() d: { orderId: string; customerId: string }) {
        return this.returns.eligibility(d.orderId, d.customerId);
    }

    @MessagePattern('return.create')
    createReturn(@Payload() d: CreateReturnInput) {
        return this.returns.create(d);
    }

    @MessagePattern('return.list.customer')
    customerReturns(@Payload() d: { customerId: string }) {
        return this.returns.listForCustomer(d.customerId);
    }

    @MessagePattern('return.list')
    listReturns(@Payload() q: { status?: string; search?: string; page?: number; limit?: number }) {
        return this.returns.list(q ?? {});
    }

    @MessagePattern('return.approve')
    approveReturn(@Payload() d: { id: string; instructions?: string; changedBy?: string; actor?: string }) {
        return this.returns.approve(d.id, d.instructions, d);
    }

    @MessagePattern('return.reject')
    rejectReturn(@Payload() d: { id: string; reason: string; changedBy?: string; actor?: string }) {
        return this.returns.reject(d.id, d.reason, d);
    }

    @MessagePattern('return.receive')
    receiveReturn(@Payload() d: { id: string; restock: boolean; note?: string; changedBy?: string; actor?: string }) {
        return this.returns.receive(d.id, !!d.restock, d.note, d);
    }

    @MessagePattern('return.refund')
    refundReturn(@Payload() d: { id: string; amount: number; note?: string; changedBy?: string; actor?: string }) {
        return this.returns.refund(d.id, d.amount, d.note, d);
    }

    @MessagePattern('order.refunds.due')
    refundsDue() {
        return this.returns.refundsDue();
    }

    @MessagePattern('order.find.all')
    async findAllOrders(@Payload() query: OrderQueryDto) {
        return this.orderService.findAllOrders(query);
    }

    @MessagePattern('order.find.one')
    async findOrderById(@Payload() data: { id: string }) {
        return this.orderService.findOrderById(data.id);
    }

    @MessagePattern('order.find.by.number')
    async findOrderByNumber(@Payload() data: { orderNumber: string }) {
        return this.orderService.findOrderByNumber(data.orderNumber);
    }

    @MessagePattern('order.find.by.customer')
    async findOrdersByCustomer(
        @Payload() data: { customerId: string; page?: number; limit?: number; status?: string },
    ) {
        return this.orderService.findOrdersByCustomer(data.customerId, data.page, data.limit, data.status);
    }

    @MessagePattern('order.update')
    async updateOrder(@Payload() data: { id: string; dto: UpdateOrderDto }) {
        return this.orderService.updateOrder(data.id, data.dto);
    }

    @MessagePattern('order.delete')
    async deleteOrder(@Payload() data: { id: string }) {
        return this.orderService.deleteOrder(data.id);
    }

    // ============================================
    // STATUS / PAYMENT / TRACKING
    // ============================================

    @MessagePattern('order.status.update')
    async updateOrderStatus(@Payload() data: { id: string; dto: UpdateOrderStatusDto }) {
        return this.orderService.updateOrderStatus(data.id, data.dto);
    }

    @MessagePattern('order.payment.update')
    async updatePaymentStatus(@Payload() data: { id: string; dto: UpdatePaymentStatusDto }) {
        return this.orderService.updatePaymentStatus(data.id, data.dto);
    }

    @MessagePattern('order.tracking.update')
    async updateTracking(@Payload() data: { id: string; dto: UpdateTrackingDto }) {
        return this.orderService.updateTracking(data.id, data.dto);
    }

    @MessagePattern('order.tracking.event')
    async addTrackingEvent(@Payload() data: { id: string; dto: AddTrackingEventDto }) {
        return this.orderService.addTrackingEvent(data.id, data.dto);
    }

    @MessagePattern('order.cancel')
    async cancelOrder(@Payload() data: { id: string; dto: CancelOrderDto }) {
        return this.orderService.cancelOrder(data.id, data.dto);
    }

    // ============================================
    // STATS
    // ============================================

    @MessagePattern('order.stats')
    async getOrderStats() {
        return this.orderService.getOrderStats();
    }

    @MessagePattern('order.stats.by.customer')
    async getOrderStatsByCustomer(@Payload() data: { customerId: string }) {
        return this.orderService.getOrderStatsByCustomer(data.customerId);
    }

    // ============================================
    // STATUS HISTORY
    // ============================================

    @MessagePattern('order.history.find')
    async getOrderHistory(@Payload() data: { orderId: string }) {
        return this.orderService.getOrderHistory(data.orderId);
    }

    // Global feed across every order, for the admin dashboard's "Logs" panel
    // — distinct from order.history.find, which is scoped to one order.
    @MessagePattern('order.activity.recent')
    async getRecentActivity(@Payload() data: { limit?: number }) {
        return this.orderService.getRecentActivity(data?.limit);
    }

    // ============================================
    // NOTES
    // ============================================

    @MessagePattern('order.note.create')
    async createNote(@Payload() data: { orderId: string; dto: CreateOrderNoteDto }) {
        return this.orderService.createNote(data.orderId, data.dto);
    }

    @MessagePattern('order.note.find.all')
    async getNotes(@Payload() data: { orderId: string }) {
        return this.orderService.getNotes(data.orderId);
    }

    @MessagePattern('order.note.update')
    async updateNote(@Payload() data: { noteId: string; dto: UpdateOrderNoteDto }) {
        return this.orderService.updateNote(data.noteId, data.dto);
    }

    @MessagePattern('order.note.delete')
    async deleteNote(@Payload() data: { noteId: string }) {
        return this.orderService.deleteNote(data.noteId);
    }

    // ============================================
    // BULK / SEARCH
    // ============================================

    @MessagePattern('order.bulk.cancel')
    async bulkCancelOrders(@Payload() data: { ids: string[]; changedBy?: string; actor?: string }) {
        return this.orderService.bulkCancelOrders(data.ids, { changedBy: data.changedBy, actor: data.actor });
    }

    @MessagePattern('order.search')
    async searchOrders(@Payload() data: { query: string; limit?: number }) {
        return this.orderService.searchOrders(data.query, data.limit);
    }
}
