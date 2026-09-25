import { HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';

/** Call a microservice and turn its RpcException into the matching HTTP error. */
export function rpc<T = unknown>(client: ClientProxy, pattern: string, payload: unknown): Promise<T> {
    return firstValueFrom(
        client.send<T>(pattern, payload).pipe(
            catchError((error) => {
                const status =
                    typeof error?.statusCode === 'number'
                        ? error.statusCode
                        : typeof error?.status === 'number'
                            ? error.status
                            : HttpStatus.INTERNAL_SERVER_ERROR;
                throw new HttpException(
                    {
                        statusCode: status,
                        message: error?.message || 'Service error',
                        error: error?.error || HttpStatus[status] || 'Error',
                        timestamp: new Date().toISOString(),
                        path: pattern,
                    },
                    status,
                );
            }),
        ),
    );
}

interface ProductSnapshot {
    id: string;
    sku: string;
    name: string;
    price: string | number;
    costPrice?: string | number | null;
    weight?: string | number | null;
    isActive: boolean;
    isInStock: boolean;
    images?: { url: string }[];
}

export interface PricedLine {
    productId: string;
    sku: string;
    name: string;
    image?: string;
    unitPrice: number;
    unitCost?: number;
    weightKg?: number;
    quantity: number;
}

/**
 * Merge duplicate lines and price each from the catalogue. The client never
 * supplies prices, so checkout and quotes always agree with the product service.
 */
export async function priceCartItems(productClient: ClientProxy, lines: { productId: string; quantity: number }[]): Promise<PricedLine[]> {
    const qty = new Map<string, number>();
    for (const i of lines) qty.set(i.productId, (qty.get(i.productId) ?? 0) + i.quantity);

    return Promise.all(
        [...qty].map(async ([productId, quantity]) => {
            const p = await rpc<ProductSnapshot>(productClient, 'product.find.one', { id: productId }).catch((e: HttpException) => {
                if (e.getStatus?.() === HttpStatus.NOT_FOUND) return null;
                throw e;
            });
            if (!p || !p.isActive) {
                throw new HttpException('One of the items in your cart is no longer available', HttpStatus.CONFLICT);
            }
            if (!p.isInStock) {
                throw new HttpException(`${p.name} is out of stock`, HttpStatus.CONFLICT);
            }
            return {
                productId: p.id,
                sku: p.sku,
                name: p.name,
                image: p.images?.[0]?.url,
                unitPrice: Number(p.price),
                // snapshot the cost so profit reports stay right after cost prices change
                ...(p.costPrice != null ? { unitCost: Number(p.costPrice) } : {}),
                ...(p.weight != null ? { weightKg: Number(p.weight) } : {}),
                quantity,
            };
        }),
    );
}
