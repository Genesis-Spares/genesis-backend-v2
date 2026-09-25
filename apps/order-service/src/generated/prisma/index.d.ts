
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model OrderItem
 * 
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>
/**
 * Model OrderStatusHistory
 * 
 */
export type OrderStatusHistory = $Result.DefaultSelection<Prisma.$OrderStatusHistoryPayload>
/**
 * Model OrderNote
 * 
 */
export type OrderNote = $Result.DefaultSelection<Prisma.$OrderNotePayload>
/**
 * Model ReturnRequest
 * Customer return (RMA). Lifecycle: REQUESTED → APPROVED | REJECTED → RECEIVED → REFUNDED.
 * Exchanges are handled as a refund + a new order for now.
 */
export type ReturnRequest = $Result.DefaultSelection<Prisma.$ReturnRequestPayload>
/**
 * Model ReturnItem
 * 
 */
export type ReturnItem = $Result.DefaultSelection<Prisma.$ReturnItemPayload>
/**
 * Model Payment
 * One M-Pesa STK push attempt. An order can have several (failed / cancelled
 * prompts followed by a retry); at most one ends up SUCCESS.
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model DeliveryZone
 * Delivery pricing. A shopper's town picks the zone; towns no zone lists
 * fall back to the zone marked isDefault.
 */
export type DeliveryZone = $Result.DefaultSelection<Prisma.$DeliveryZonePayload>
/**
 * Model CheckoutSettings
 * Single-row store-wide checkout settings (id is always 1).
 */
export type CheckoutSettings = $Result.DefaultSelection<Prisma.$CheckoutSettingsPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Orders
 * const orders = await prisma.order.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Orders
   * const orders = await prisma.order.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderItems
    * const orderItems = await prisma.orderItem.findMany()
    * ```
    */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderStatusHistory`: Exposes CRUD operations for the **OrderStatusHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderStatusHistories
    * const orderStatusHistories = await prisma.orderStatusHistory.findMany()
    * ```
    */
  get orderStatusHistory(): Prisma.OrderStatusHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderNote`: Exposes CRUD operations for the **OrderNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderNotes
    * const orderNotes = await prisma.orderNote.findMany()
    * ```
    */
  get orderNote(): Prisma.OrderNoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.returnRequest`: Exposes CRUD operations for the **ReturnRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReturnRequests
    * const returnRequests = await prisma.returnRequest.findMany()
    * ```
    */
  get returnRequest(): Prisma.ReturnRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.returnItem`: Exposes CRUD operations for the **ReturnItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReturnItems
    * const returnItems = await prisma.returnItem.findMany()
    * ```
    */
  get returnItem(): Prisma.ReturnItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.deliveryZone`: Exposes CRUD operations for the **DeliveryZone** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DeliveryZones
    * const deliveryZones = await prisma.deliveryZone.findMany()
    * ```
    */
  get deliveryZone(): Prisma.DeliveryZoneDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.checkoutSettings`: Exposes CRUD operations for the **CheckoutSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CheckoutSettings
    * const checkoutSettings = await prisma.checkoutSettings.findMany()
    * ```
    */
  get checkoutSettings(): Prisma.CheckoutSettingsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Order: 'Order',
    OrderItem: 'OrderItem',
    OrderStatusHistory: 'OrderStatusHistory',
    OrderNote: 'OrderNote',
    ReturnRequest: 'ReturnRequest',
    ReturnItem: 'ReturnItem',
    Payment: 'Payment',
    DeliveryZone: 'DeliveryZone',
    CheckoutSettings: 'CheckoutSettings'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "order" | "orderItem" | "orderStatusHistory" | "orderNote" | "returnRequest" | "returnItem" | "payment" | "deliveryZone" | "checkoutSettings"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>
        fields: Prisma.OrderItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderItem>
          }
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number
          }
        }
      }
      OrderStatusHistory: {
        payload: Prisma.$OrderStatusHistoryPayload<ExtArgs>
        fields: Prisma.OrderStatusHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderStatusHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderStatusHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>
          }
          findFirst: {
            args: Prisma.OrderStatusHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderStatusHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>
          }
          findMany: {
            args: Prisma.OrderStatusHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>[]
          }
          create: {
            args: Prisma.OrderStatusHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>
          }
          createMany: {
            args: Prisma.OrderStatusHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderStatusHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>[]
          }
          delete: {
            args: Prisma.OrderStatusHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>
          }
          update: {
            args: Prisma.OrderStatusHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>
          }
          deleteMany: {
            args: Prisma.OrderStatusHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderStatusHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderStatusHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>[]
          }
          upsert: {
            args: Prisma.OrderStatusHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>
          }
          aggregate: {
            args: Prisma.OrderStatusHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderStatusHistory>
          }
          groupBy: {
            args: Prisma.OrderStatusHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderStatusHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderStatusHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<OrderStatusHistoryCountAggregateOutputType> | number
          }
        }
      }
      OrderNote: {
        payload: Prisma.$OrderNotePayload<ExtArgs>
        fields: Prisma.OrderNoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderNoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderNotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderNoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderNotePayload>
          }
          findFirst: {
            args: Prisma.OrderNoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderNotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderNoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderNotePayload>
          }
          findMany: {
            args: Prisma.OrderNoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderNotePayload>[]
          }
          create: {
            args: Prisma.OrderNoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderNotePayload>
          }
          createMany: {
            args: Prisma.OrderNoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderNoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderNotePayload>[]
          }
          delete: {
            args: Prisma.OrderNoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderNotePayload>
          }
          update: {
            args: Prisma.OrderNoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderNotePayload>
          }
          deleteMany: {
            args: Prisma.OrderNoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderNoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderNoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderNotePayload>[]
          }
          upsert: {
            args: Prisma.OrderNoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderNotePayload>
          }
          aggregate: {
            args: Prisma.OrderNoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderNote>
          }
          groupBy: {
            args: Prisma.OrderNoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderNoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderNoteCountArgs<ExtArgs>
            result: $Utils.Optional<OrderNoteCountAggregateOutputType> | number
          }
        }
      }
      ReturnRequest: {
        payload: Prisma.$ReturnRequestPayload<ExtArgs>
        fields: Prisma.ReturnRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReturnRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReturnRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnRequestPayload>
          }
          findFirst: {
            args: Prisma.ReturnRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReturnRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnRequestPayload>
          }
          findMany: {
            args: Prisma.ReturnRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnRequestPayload>[]
          }
          create: {
            args: Prisma.ReturnRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnRequestPayload>
          }
          createMany: {
            args: Prisma.ReturnRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReturnRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnRequestPayload>[]
          }
          delete: {
            args: Prisma.ReturnRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnRequestPayload>
          }
          update: {
            args: Prisma.ReturnRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnRequestPayload>
          }
          deleteMany: {
            args: Prisma.ReturnRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReturnRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReturnRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnRequestPayload>[]
          }
          upsert: {
            args: Prisma.ReturnRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnRequestPayload>
          }
          aggregate: {
            args: Prisma.ReturnRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReturnRequest>
          }
          groupBy: {
            args: Prisma.ReturnRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReturnRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReturnRequestCountArgs<ExtArgs>
            result: $Utils.Optional<ReturnRequestCountAggregateOutputType> | number
          }
        }
      }
      ReturnItem: {
        payload: Prisma.$ReturnItemPayload<ExtArgs>
        fields: Prisma.ReturnItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReturnItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReturnItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnItemPayload>
          }
          findFirst: {
            args: Prisma.ReturnItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReturnItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnItemPayload>
          }
          findMany: {
            args: Prisma.ReturnItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnItemPayload>[]
          }
          create: {
            args: Prisma.ReturnItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnItemPayload>
          }
          createMany: {
            args: Prisma.ReturnItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReturnItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnItemPayload>[]
          }
          delete: {
            args: Prisma.ReturnItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnItemPayload>
          }
          update: {
            args: Prisma.ReturnItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnItemPayload>
          }
          deleteMany: {
            args: Prisma.ReturnItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReturnItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReturnItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnItemPayload>[]
          }
          upsert: {
            args: Prisma.ReturnItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReturnItemPayload>
          }
          aggregate: {
            args: Prisma.ReturnItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReturnItem>
          }
          groupBy: {
            args: Prisma.ReturnItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReturnItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReturnItemCountArgs<ExtArgs>
            result: $Utils.Optional<ReturnItemCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      DeliveryZone: {
        payload: Prisma.$DeliveryZonePayload<ExtArgs>
        fields: Prisma.DeliveryZoneFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeliveryZoneFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryZonePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeliveryZoneFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryZonePayload>
          }
          findFirst: {
            args: Prisma.DeliveryZoneFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryZonePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeliveryZoneFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryZonePayload>
          }
          findMany: {
            args: Prisma.DeliveryZoneFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryZonePayload>[]
          }
          create: {
            args: Prisma.DeliveryZoneCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryZonePayload>
          }
          createMany: {
            args: Prisma.DeliveryZoneCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeliveryZoneCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryZonePayload>[]
          }
          delete: {
            args: Prisma.DeliveryZoneDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryZonePayload>
          }
          update: {
            args: Prisma.DeliveryZoneUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryZonePayload>
          }
          deleteMany: {
            args: Prisma.DeliveryZoneDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeliveryZoneUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeliveryZoneUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryZonePayload>[]
          }
          upsert: {
            args: Prisma.DeliveryZoneUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryZonePayload>
          }
          aggregate: {
            args: Prisma.DeliveryZoneAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeliveryZone>
          }
          groupBy: {
            args: Prisma.DeliveryZoneGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeliveryZoneGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeliveryZoneCountArgs<ExtArgs>
            result: $Utils.Optional<DeliveryZoneCountAggregateOutputType> | number
          }
        }
      }
      CheckoutSettings: {
        payload: Prisma.$CheckoutSettingsPayload<ExtArgs>
        fields: Prisma.CheckoutSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CheckoutSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CheckoutSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSettingsPayload>
          }
          findFirst: {
            args: Prisma.CheckoutSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CheckoutSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSettingsPayload>
          }
          findMany: {
            args: Prisma.CheckoutSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSettingsPayload>[]
          }
          create: {
            args: Prisma.CheckoutSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSettingsPayload>
          }
          createMany: {
            args: Prisma.CheckoutSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CheckoutSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSettingsPayload>[]
          }
          delete: {
            args: Prisma.CheckoutSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSettingsPayload>
          }
          update: {
            args: Prisma.CheckoutSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSettingsPayload>
          }
          deleteMany: {
            args: Prisma.CheckoutSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CheckoutSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CheckoutSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSettingsPayload>[]
          }
          upsert: {
            args: Prisma.CheckoutSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSettingsPayload>
          }
          aggregate: {
            args: Prisma.CheckoutSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCheckoutSettings>
          }
          groupBy: {
            args: Prisma.CheckoutSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<CheckoutSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.CheckoutSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<CheckoutSettingsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    order?: OrderOmit
    orderItem?: OrderItemOmit
    orderStatusHistory?: OrderStatusHistoryOmit
    orderNote?: OrderNoteOmit
    returnRequest?: ReturnRequestOmit
    returnItem?: ReturnItemOmit
    payment?: PaymentOmit
    deliveryZone?: DeliveryZoneOmit
    checkoutSettings?: CheckoutSettingsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    items: number
    statusHistory: number
    notes: number
    returns: number
    payments: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | OrderCountOutputTypeCountItemsArgs
    statusHistory?: boolean | OrderCountOutputTypeCountStatusHistoryArgs
    notes?: boolean | OrderCountOutputTypeCountNotesArgs
    returns?: boolean | OrderCountOutputTypeCountReturnsArgs
    payments?: boolean | OrderCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountStatusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderStatusHistoryWhereInput
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderNoteWhereInput
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountReturnsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReturnRequestWhereInput
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Count Type ReturnRequestCountOutputType
   */

  export type ReturnRequestCountOutputType = {
    items: number
  }

  export type ReturnRequestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | ReturnRequestCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * ReturnRequestCountOutputType without action
   */
  export type ReturnRequestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnRequestCountOutputType
     */
    select?: ReturnRequestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReturnRequestCountOutputType without action
   */
  export type ReturnRequestCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReturnItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    subtotal: Decimal | null
    taxAmount: Decimal | null
    shippingAmount: Decimal | null
    discountAmount: Decimal | null
    total: Decimal | null
    taxRate: Decimal | null
  }

  export type OrderSumAggregateOutputType = {
    subtotal: Decimal | null
    taxAmount: Decimal | null
    shippingAmount: Decimal | null
    discountAmount: Decimal | null
    total: Decimal | null
    taxRate: Decimal | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    orderNumber: string | null
    customerId: string | null
    customerEmail: string | null
    customerName: string | null
    customerPhone: string | null
    status: string | null
    paymentStatus: string | null
    paymentMethod: string | null
    currency: string | null
    subtotal: Decimal | null
    taxAmount: Decimal | null
    shippingAmount: Decimal | null
    discountAmount: Decimal | null
    total: Decimal | null
    taxRate: Decimal | null
    deliveryZoneName: string | null
    paymentDueAt: Date | null
    couponCode: string | null
    customerNote: string | null
    trackingNumber: string | null
    trackingCarrier: string | null
    estimatedDeliveryAt: Date | null
    shippedAt: Date | null
    deliveredAt: Date | null
    cancelledAt: Date | null
    cancelReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    orderNumber: string | null
    customerId: string | null
    customerEmail: string | null
    customerName: string | null
    customerPhone: string | null
    status: string | null
    paymentStatus: string | null
    paymentMethod: string | null
    currency: string | null
    subtotal: Decimal | null
    taxAmount: Decimal | null
    shippingAmount: Decimal | null
    discountAmount: Decimal | null
    total: Decimal | null
    taxRate: Decimal | null
    deliveryZoneName: string | null
    paymentDueAt: Date | null
    couponCode: string | null
    customerNote: string | null
    trackingNumber: string | null
    trackingCarrier: string | null
    estimatedDeliveryAt: Date | null
    shippedAt: Date | null
    deliveredAt: Date | null
    cancelledAt: Date | null
    cancelReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    orderNumber: number
    customerId: number
    customerEmail: number
    customerName: number
    customerPhone: number
    status: number
    paymentStatus: number
    paymentMethod: number
    currency: number
    subtotal: number
    taxAmount: number
    shippingAmount: number
    discountAmount: number
    total: number
    taxRate: number
    deliveryZoneName: number
    paymentDueAt: number
    couponCode: number
    customerNote: number
    shippingAddress: number
    billingAddress: number
    trackingNumber: number
    trackingCarrier: number
    estimatedDeliveryAt: number
    shippedAt: number
    deliveredAt: number
    cancelledAt: number
    cancelReason: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    subtotal?: true
    taxAmount?: true
    shippingAmount?: true
    discountAmount?: true
    total?: true
    taxRate?: true
  }

  export type OrderSumAggregateInputType = {
    subtotal?: true
    taxAmount?: true
    shippingAmount?: true
    discountAmount?: true
    total?: true
    taxRate?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    orderNumber?: true
    customerId?: true
    customerEmail?: true
    customerName?: true
    customerPhone?: true
    status?: true
    paymentStatus?: true
    paymentMethod?: true
    currency?: true
    subtotal?: true
    taxAmount?: true
    shippingAmount?: true
    discountAmount?: true
    total?: true
    taxRate?: true
    deliveryZoneName?: true
    paymentDueAt?: true
    couponCode?: true
    customerNote?: true
    trackingNumber?: true
    trackingCarrier?: true
    estimatedDeliveryAt?: true
    shippedAt?: true
    deliveredAt?: true
    cancelledAt?: true
    cancelReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    orderNumber?: true
    customerId?: true
    customerEmail?: true
    customerName?: true
    customerPhone?: true
    status?: true
    paymentStatus?: true
    paymentMethod?: true
    currency?: true
    subtotal?: true
    taxAmount?: true
    shippingAmount?: true
    discountAmount?: true
    total?: true
    taxRate?: true
    deliveryZoneName?: true
    paymentDueAt?: true
    couponCode?: true
    customerNote?: true
    trackingNumber?: true
    trackingCarrier?: true
    estimatedDeliveryAt?: true
    shippedAt?: true
    deliveredAt?: true
    cancelledAt?: true
    cancelReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    orderNumber?: true
    customerId?: true
    customerEmail?: true
    customerName?: true
    customerPhone?: true
    status?: true
    paymentStatus?: true
    paymentMethod?: true
    currency?: true
    subtotal?: true
    taxAmount?: true
    shippingAmount?: true
    discountAmount?: true
    total?: true
    taxRate?: true
    deliveryZoneName?: true
    paymentDueAt?: true
    couponCode?: true
    customerNote?: true
    shippingAddress?: true
    billingAddress?: true
    trackingNumber?: true
    trackingCarrier?: true
    estimatedDeliveryAt?: true
    shippedAt?: true
    deliveredAt?: true
    cancelledAt?: true
    cancelReason?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    orderNumber: string
    customerId: string
    customerEmail: string
    customerName: string
    customerPhone: string | null
    status: string
    paymentStatus: string
    paymentMethod: string | null
    currency: string
    subtotal: Decimal
    taxAmount: Decimal
    shippingAmount: Decimal
    discountAmount: Decimal
    total: Decimal
    taxRate: Decimal | null
    deliveryZoneName: string | null
    paymentDueAt: Date | null
    couponCode: string | null
    customerNote: string | null
    shippingAddress: JsonValue
    billingAddress: JsonValue | null
    trackingNumber: string | null
    trackingCarrier: string | null
    estimatedDeliveryAt: Date | null
    shippedAt: Date | null
    deliveredAt: Date | null
    cancelledAt: Date | null
    cancelReason: string | null
    createdAt: Date
    updatedAt: Date
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderNumber?: boolean
    customerId?: boolean
    customerEmail?: boolean
    customerName?: boolean
    customerPhone?: boolean
    status?: boolean
    paymentStatus?: boolean
    paymentMethod?: boolean
    currency?: boolean
    subtotal?: boolean
    taxAmount?: boolean
    shippingAmount?: boolean
    discountAmount?: boolean
    total?: boolean
    taxRate?: boolean
    deliveryZoneName?: boolean
    paymentDueAt?: boolean
    couponCode?: boolean
    customerNote?: boolean
    shippingAddress?: boolean
    billingAddress?: boolean
    trackingNumber?: boolean
    trackingCarrier?: boolean
    estimatedDeliveryAt?: boolean
    shippedAt?: boolean
    deliveredAt?: boolean
    cancelledAt?: boolean
    cancelReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    items?: boolean | Order$itemsArgs<ExtArgs>
    statusHistory?: boolean | Order$statusHistoryArgs<ExtArgs>
    notes?: boolean | Order$notesArgs<ExtArgs>
    returns?: boolean | Order$returnsArgs<ExtArgs>
    payments?: boolean | Order$paymentsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderNumber?: boolean
    customerId?: boolean
    customerEmail?: boolean
    customerName?: boolean
    customerPhone?: boolean
    status?: boolean
    paymentStatus?: boolean
    paymentMethod?: boolean
    currency?: boolean
    subtotal?: boolean
    taxAmount?: boolean
    shippingAmount?: boolean
    discountAmount?: boolean
    total?: boolean
    taxRate?: boolean
    deliveryZoneName?: boolean
    paymentDueAt?: boolean
    couponCode?: boolean
    customerNote?: boolean
    shippingAddress?: boolean
    billingAddress?: boolean
    trackingNumber?: boolean
    trackingCarrier?: boolean
    estimatedDeliveryAt?: boolean
    shippedAt?: boolean
    deliveredAt?: boolean
    cancelledAt?: boolean
    cancelReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderNumber?: boolean
    customerId?: boolean
    customerEmail?: boolean
    customerName?: boolean
    customerPhone?: boolean
    status?: boolean
    paymentStatus?: boolean
    paymentMethod?: boolean
    currency?: boolean
    subtotal?: boolean
    taxAmount?: boolean
    shippingAmount?: boolean
    discountAmount?: boolean
    total?: boolean
    taxRate?: boolean
    deliveryZoneName?: boolean
    paymentDueAt?: boolean
    couponCode?: boolean
    customerNote?: boolean
    shippingAddress?: boolean
    billingAddress?: boolean
    trackingNumber?: boolean
    trackingCarrier?: boolean
    estimatedDeliveryAt?: boolean
    shippedAt?: boolean
    deliveredAt?: boolean
    cancelledAt?: boolean
    cancelReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    orderNumber?: boolean
    customerId?: boolean
    customerEmail?: boolean
    customerName?: boolean
    customerPhone?: boolean
    status?: boolean
    paymentStatus?: boolean
    paymentMethod?: boolean
    currency?: boolean
    subtotal?: boolean
    taxAmount?: boolean
    shippingAmount?: boolean
    discountAmount?: boolean
    total?: boolean
    taxRate?: boolean
    deliveryZoneName?: boolean
    paymentDueAt?: boolean
    couponCode?: boolean
    customerNote?: boolean
    shippingAddress?: boolean
    billingAddress?: boolean
    trackingNumber?: boolean
    trackingCarrier?: boolean
    estimatedDeliveryAt?: boolean
    shippedAt?: boolean
    deliveredAt?: boolean
    cancelledAt?: boolean
    cancelReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderNumber" | "customerId" | "customerEmail" | "customerName" | "customerPhone" | "status" | "paymentStatus" | "paymentMethod" | "currency" | "subtotal" | "taxAmount" | "shippingAmount" | "discountAmount" | "total" | "taxRate" | "deliveryZoneName" | "paymentDueAt" | "couponCode" | "customerNote" | "shippingAddress" | "billingAddress" | "trackingNumber" | "trackingCarrier" | "estimatedDeliveryAt" | "shippedAt" | "deliveredAt" | "cancelledAt" | "cancelReason" | "createdAt" | "updatedAt", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | Order$itemsArgs<ExtArgs>
    statusHistory?: boolean | Order$statusHistoryArgs<ExtArgs>
    notes?: boolean | Order$notesArgs<ExtArgs>
    returns?: boolean | Order$returnsArgs<ExtArgs>
    payments?: boolean | Order$paymentsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      items: Prisma.$OrderItemPayload<ExtArgs>[]
      statusHistory: Prisma.$OrderStatusHistoryPayload<ExtArgs>[]
      notes: Prisma.$OrderNotePayload<ExtArgs>[]
      returns: Prisma.$ReturnRequestPayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderNumber: string
      customerId: string
      customerEmail: string
      customerName: string
      customerPhone: string | null
      status: string
      paymentStatus: string
      paymentMethod: string | null
      currency: string
      subtotal: Prisma.Decimal
      taxAmount: Prisma.Decimal
      shippingAmount: Prisma.Decimal
      discountAmount: Prisma.Decimal
      total: Prisma.Decimal
      taxRate: Prisma.Decimal | null
      deliveryZoneName: string | null
      paymentDueAt: Date | null
      couponCode: string | null
      customerNote: string | null
      shippingAddress: Prisma.JsonValue
      billingAddress: Prisma.JsonValue | null
      trackingNumber: string | null
      trackingCarrier: string | null
      estimatedDeliveryAt: Date | null
      shippedAt: Date | null
      deliveredAt: Date | null
      cancelledAt: Date | null
      cancelReason: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    items<T extends Order$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Order$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    statusHistory<T extends Order$statusHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Order$statusHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notes<T extends Order$notesArgs<ExtArgs> = {}>(args?: Subset<T, Order$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    returns<T extends Order$returnsArgs<ExtArgs> = {}>(args?: Subset<T, Order$returnsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReturnRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends Order$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Order$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly orderNumber: FieldRef<"Order", 'String'>
    readonly customerId: FieldRef<"Order", 'String'>
    readonly customerEmail: FieldRef<"Order", 'String'>
    readonly customerName: FieldRef<"Order", 'String'>
    readonly customerPhone: FieldRef<"Order", 'String'>
    readonly status: FieldRef<"Order", 'String'>
    readonly paymentStatus: FieldRef<"Order", 'String'>
    readonly paymentMethod: FieldRef<"Order", 'String'>
    readonly currency: FieldRef<"Order", 'String'>
    readonly subtotal: FieldRef<"Order", 'Decimal'>
    readonly taxAmount: FieldRef<"Order", 'Decimal'>
    readonly shippingAmount: FieldRef<"Order", 'Decimal'>
    readonly discountAmount: FieldRef<"Order", 'Decimal'>
    readonly total: FieldRef<"Order", 'Decimal'>
    readonly taxRate: FieldRef<"Order", 'Decimal'>
    readonly deliveryZoneName: FieldRef<"Order", 'String'>
    readonly paymentDueAt: FieldRef<"Order", 'DateTime'>
    readonly couponCode: FieldRef<"Order", 'String'>
    readonly customerNote: FieldRef<"Order", 'String'>
    readonly shippingAddress: FieldRef<"Order", 'Json'>
    readonly billingAddress: FieldRef<"Order", 'Json'>
    readonly trackingNumber: FieldRef<"Order", 'String'>
    readonly trackingCarrier: FieldRef<"Order", 'String'>
    readonly estimatedDeliveryAt: FieldRef<"Order", 'DateTime'>
    readonly shippedAt: FieldRef<"Order", 'DateTime'>
    readonly deliveredAt: FieldRef<"Order", 'DateTime'>
    readonly cancelledAt: FieldRef<"Order", 'DateTime'>
    readonly cancelReason: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.items
   */
  export type Order$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Order.statusHistory
   */
  export type Order$statusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryInclude<ExtArgs> | null
    where?: OrderStatusHistoryWhereInput
    orderBy?: OrderStatusHistoryOrderByWithRelationInput | OrderStatusHistoryOrderByWithRelationInput[]
    cursor?: OrderStatusHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderStatusHistoryScalarFieldEnum | OrderStatusHistoryScalarFieldEnum[]
  }

  /**
   * Order.notes
   */
  export type Order$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteInclude<ExtArgs> | null
    where?: OrderNoteWhereInput
    orderBy?: OrderNoteOrderByWithRelationInput | OrderNoteOrderByWithRelationInput[]
    cursor?: OrderNoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderNoteScalarFieldEnum | OrderNoteScalarFieldEnum[]
  }

  /**
   * Order.returns
   */
  export type Order$returnsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnRequest
     */
    select?: ReturnRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnRequest
     */
    omit?: ReturnRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnRequestInclude<ExtArgs> | null
    where?: ReturnRequestWhereInput
    orderBy?: ReturnRequestOrderByWithRelationInput | ReturnRequestOrderByWithRelationInput[]
    cursor?: ReturnRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReturnRequestScalarFieldEnum | ReturnRequestScalarFieldEnum[]
  }

  /**
   * Order.payments
   */
  export type Order$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  export type OrderItemAvgAggregateOutputType = {
    unitPrice: Decimal | null
    unitCost: Decimal | null
    quantity: number | null
    subtotal: Decimal | null
  }

  export type OrderItemSumAggregateOutputType = {
    unitPrice: Decimal | null
    unitCost: Decimal | null
    quantity: number | null
    subtotal: Decimal | null
  }

  export type OrderItemMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    productId: string | null
    variantId: string | null
    sku: string | null
    name: string | null
    image: string | null
    unitPrice: Decimal | null
    unitCost: Decimal | null
    quantity: number | null
    subtotal: Decimal | null
    createdAt: Date | null
  }

  export type OrderItemMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    productId: string | null
    variantId: string | null
    sku: string | null
    name: string | null
    image: string | null
    unitPrice: Decimal | null
    unitCost: Decimal | null
    quantity: number | null
    subtotal: Decimal | null
    createdAt: Date | null
  }

  export type OrderItemCountAggregateOutputType = {
    id: number
    orderId: number
    productId: number
    variantId: number
    sku: number
    name: number
    image: number
    unitPrice: number
    unitCost: number
    quantity: number
    subtotal: number
    attributes: number
    createdAt: number
    _all: number
  }


  export type OrderItemAvgAggregateInputType = {
    unitPrice?: true
    unitCost?: true
    quantity?: true
    subtotal?: true
  }

  export type OrderItemSumAggregateInputType = {
    unitPrice?: true
    unitCost?: true
    quantity?: true
    subtotal?: true
  }

  export type OrderItemMinAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    variantId?: true
    sku?: true
    name?: true
    image?: true
    unitPrice?: true
    unitCost?: true
    quantity?: true
    subtotal?: true
    createdAt?: true
  }

  export type OrderItemMaxAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    variantId?: true
    sku?: true
    name?: true
    image?: true
    unitPrice?: true
    unitCost?: true
    quantity?: true
    subtotal?: true
    createdAt?: true
  }

  export type OrderItemCountAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    variantId?: true
    sku?: true
    name?: true
    image?: true
    unitPrice?: true
    unitCost?: true
    quantity?: true
    subtotal?: true
    attributes?: true
    createdAt?: true
    _all?: true
  }

  export type OrderItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderItems
    **/
    _count?: true | OrderItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderItemMaxAggregateInputType
  }

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>
  }




  export type OrderItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithAggregationInput | OrderItemOrderByWithAggregationInput[]
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum
    having?: OrderItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderItemCountAggregateInputType | true
    _avg?: OrderItemAvgAggregateInputType
    _sum?: OrderItemSumAggregateInputType
    _min?: OrderItemMinAggregateInputType
    _max?: OrderItemMaxAggregateInputType
  }

  export type OrderItemGroupByOutputType = {
    id: string
    orderId: string
    productId: string
    variantId: string | null
    sku: string
    name: string
    image: string | null
    unitPrice: Decimal
    unitCost: Decimal | null
    quantity: number
    subtotal: Decimal
    attributes: JsonValue | null
    createdAt: Date
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
        }
      >
    >


  export type OrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    variantId?: boolean
    sku?: boolean
    name?: boolean
    image?: boolean
    unitPrice?: boolean
    unitCost?: boolean
    quantity?: boolean
    subtotal?: boolean
    attributes?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    variantId?: boolean
    sku?: boolean
    name?: boolean
    image?: boolean
    unitPrice?: boolean
    unitCost?: boolean
    quantity?: boolean
    subtotal?: boolean
    attributes?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    variantId?: boolean
    sku?: boolean
    name?: boolean
    image?: boolean
    unitPrice?: boolean
    unitCost?: boolean
    quantity?: boolean
    subtotal?: boolean
    attributes?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectScalar = {
    id?: boolean
    orderId?: boolean
    productId?: boolean
    variantId?: boolean
    sku?: boolean
    name?: boolean
    image?: boolean
    unitPrice?: boolean
    unitCost?: boolean
    quantity?: boolean
    subtotal?: boolean
    attributes?: boolean
    createdAt?: boolean
  }

  export type OrderItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "productId" | "variantId" | "sku" | "name" | "image" | "unitPrice" | "unitCost" | "quantity" | "subtotal" | "attributes" | "createdAt", ExtArgs["result"]["orderItem"]>
  export type OrderItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $OrderItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderItem"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      productId: string
      variantId: string | null
      sku: string
      name: string
      image: string | null
      unitPrice: Prisma.Decimal
      unitCost: Prisma.Decimal | null
      quantity: number
      subtotal: Prisma.Decimal
      attributes: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["orderItem"]>
    composites: {}
  }

  type OrderItemGetPayload<S extends boolean | null | undefined | OrderItemDefaultArgs> = $Result.GetResult<Prisma.$OrderItemPayload, S>

  type OrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderItemCountAggregateInputType | true
    }

  export interface OrderItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'], meta: { name: 'OrderItem' } }
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     * 
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderItemFindManyArgs>(args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     * 
     */
    create<T extends OrderItemCreateArgs>(args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderItemCreateManyArgs>(args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderItems and returns the data saved in the database.
     * @param {OrderItemCreateManyAndReturnArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderItemCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     * 
     */
    delete<T extends OrderItemDeleteArgs>(args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderItemUpdateArgs>(args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderItemUpdateManyArgs>(args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems and returns the data updated in the database.
     * @param {OrderItemUpdateManyAndReturnArgs} args - Arguments to update many OrderItems.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderItemUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
    **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderItemAggregateArgs>(args: Subset<T, OrderItemAggregateArgs>): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderItem model
   */
  readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderItem model
   */
  interface OrderItemFieldRefs {
    readonly id: FieldRef<"OrderItem", 'String'>
    readonly orderId: FieldRef<"OrderItem", 'String'>
    readonly productId: FieldRef<"OrderItem", 'String'>
    readonly variantId: FieldRef<"OrderItem", 'String'>
    readonly sku: FieldRef<"OrderItem", 'String'>
    readonly name: FieldRef<"OrderItem", 'String'>
    readonly image: FieldRef<"OrderItem", 'String'>
    readonly unitPrice: FieldRef<"OrderItem", 'Decimal'>
    readonly unitCost: FieldRef<"OrderItem", 'Decimal'>
    readonly quantity: FieldRef<"OrderItem", 'Int'>
    readonly subtotal: FieldRef<"OrderItem", 'Decimal'>
    readonly attributes: FieldRef<"OrderItem", 'Json'>
    readonly createdAt: FieldRef<"OrderItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
  }

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderItem createManyAndReturn
   */
  export type OrderItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
  }

  /**
   * OrderItem updateManyAndReturn
   */
  export type OrderItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
  }

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to delete.
     */
    limit?: number
  }

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
  }


  /**
   * Model OrderStatusHistory
   */

  export type AggregateOrderStatusHistory = {
    _count: OrderStatusHistoryCountAggregateOutputType | null
    _min: OrderStatusHistoryMinAggregateOutputType | null
    _max: OrderStatusHistoryMaxAggregateOutputType | null
  }

  export type OrderStatusHistoryMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    type: string | null
    status: string | null
    note: string | null
    location: string | null
    isPublic: boolean | null
    changedBy: string | null
    actor: string | null
    createdAt: Date | null
  }

  export type OrderStatusHistoryMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    type: string | null
    status: string | null
    note: string | null
    location: string | null
    isPublic: boolean | null
    changedBy: string | null
    actor: string | null
    createdAt: Date | null
  }

  export type OrderStatusHistoryCountAggregateOutputType = {
    id: number
    orderId: number
    type: number
    status: number
    note: number
    location: number
    isPublic: number
    changedBy: number
    actor: number
    createdAt: number
    _all: number
  }


  export type OrderStatusHistoryMinAggregateInputType = {
    id?: true
    orderId?: true
    type?: true
    status?: true
    note?: true
    location?: true
    isPublic?: true
    changedBy?: true
    actor?: true
    createdAt?: true
  }

  export type OrderStatusHistoryMaxAggregateInputType = {
    id?: true
    orderId?: true
    type?: true
    status?: true
    note?: true
    location?: true
    isPublic?: true
    changedBy?: true
    actor?: true
    createdAt?: true
  }

  export type OrderStatusHistoryCountAggregateInputType = {
    id?: true
    orderId?: true
    type?: true
    status?: true
    note?: true
    location?: true
    isPublic?: true
    changedBy?: true
    actor?: true
    createdAt?: true
    _all?: true
  }

  export type OrderStatusHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderStatusHistory to aggregate.
     */
    where?: OrderStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderStatusHistories to fetch.
     */
    orderBy?: OrderStatusHistoryOrderByWithRelationInput | OrderStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderStatusHistories
    **/
    _count?: true | OrderStatusHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderStatusHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderStatusHistoryMaxAggregateInputType
  }

  export type GetOrderStatusHistoryAggregateType<T extends OrderStatusHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderStatusHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderStatusHistory[P]>
      : GetScalarType<T[P], AggregateOrderStatusHistory[P]>
  }




  export type OrderStatusHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderStatusHistoryWhereInput
    orderBy?: OrderStatusHistoryOrderByWithAggregationInput | OrderStatusHistoryOrderByWithAggregationInput[]
    by: OrderStatusHistoryScalarFieldEnum[] | OrderStatusHistoryScalarFieldEnum
    having?: OrderStatusHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderStatusHistoryCountAggregateInputType | true
    _min?: OrderStatusHistoryMinAggregateInputType
    _max?: OrderStatusHistoryMaxAggregateInputType
  }

  export type OrderStatusHistoryGroupByOutputType = {
    id: string
    orderId: string
    type: string
    status: string
    note: string | null
    location: string | null
    isPublic: boolean
    changedBy: string | null
    actor: string | null
    createdAt: Date
    _count: OrderStatusHistoryCountAggregateOutputType | null
    _min: OrderStatusHistoryMinAggregateOutputType | null
    _max: OrderStatusHistoryMaxAggregateOutputType | null
  }

  type GetOrderStatusHistoryGroupByPayload<T extends OrderStatusHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderStatusHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderStatusHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderStatusHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], OrderStatusHistoryGroupByOutputType[P]>
        }
      >
    >


  export type OrderStatusHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    type?: boolean
    status?: boolean
    note?: boolean
    location?: boolean
    isPublic?: boolean
    changedBy?: boolean
    actor?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderStatusHistory"]>

  export type OrderStatusHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    type?: boolean
    status?: boolean
    note?: boolean
    location?: boolean
    isPublic?: boolean
    changedBy?: boolean
    actor?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderStatusHistory"]>

  export type OrderStatusHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    type?: boolean
    status?: boolean
    note?: boolean
    location?: boolean
    isPublic?: boolean
    changedBy?: boolean
    actor?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderStatusHistory"]>

  export type OrderStatusHistorySelectScalar = {
    id?: boolean
    orderId?: boolean
    type?: boolean
    status?: boolean
    note?: boolean
    location?: boolean
    isPublic?: boolean
    changedBy?: boolean
    actor?: boolean
    createdAt?: boolean
  }

  export type OrderStatusHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "type" | "status" | "note" | "location" | "isPublic" | "changedBy" | "actor" | "createdAt", ExtArgs["result"]["orderStatusHistory"]>
  export type OrderStatusHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type OrderStatusHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type OrderStatusHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $OrderStatusHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderStatusHistory"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      type: string
      status: string
      note: string | null
      location: string | null
      isPublic: boolean
      changedBy: string | null
      actor: string | null
      createdAt: Date
    }, ExtArgs["result"]["orderStatusHistory"]>
    composites: {}
  }

  type OrderStatusHistoryGetPayload<S extends boolean | null | undefined | OrderStatusHistoryDefaultArgs> = $Result.GetResult<Prisma.$OrderStatusHistoryPayload, S>

  type OrderStatusHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderStatusHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderStatusHistoryCountAggregateInputType | true
    }

  export interface OrderStatusHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderStatusHistory'], meta: { name: 'OrderStatusHistory' } }
    /**
     * Find zero or one OrderStatusHistory that matches the filter.
     * @param {OrderStatusHistoryFindUniqueArgs} args - Arguments to find a OrderStatusHistory
     * @example
     * // Get one OrderStatusHistory
     * const orderStatusHistory = await prisma.orderStatusHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderStatusHistoryFindUniqueArgs>(args: SelectSubset<T, OrderStatusHistoryFindUniqueArgs<ExtArgs>>): Prisma__OrderStatusHistoryClient<$Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderStatusHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderStatusHistoryFindUniqueOrThrowArgs} args - Arguments to find a OrderStatusHistory
     * @example
     * // Get one OrderStatusHistory
     * const orderStatusHistory = await prisma.orderStatusHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderStatusHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderStatusHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderStatusHistoryClient<$Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderStatusHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderStatusHistoryFindFirstArgs} args - Arguments to find a OrderStatusHistory
     * @example
     * // Get one OrderStatusHistory
     * const orderStatusHistory = await prisma.orderStatusHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderStatusHistoryFindFirstArgs>(args?: SelectSubset<T, OrderStatusHistoryFindFirstArgs<ExtArgs>>): Prisma__OrderStatusHistoryClient<$Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderStatusHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderStatusHistoryFindFirstOrThrowArgs} args - Arguments to find a OrderStatusHistory
     * @example
     * // Get one OrderStatusHistory
     * const orderStatusHistory = await prisma.orderStatusHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderStatusHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderStatusHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderStatusHistoryClient<$Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderStatusHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderStatusHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderStatusHistories
     * const orderStatusHistories = await prisma.orderStatusHistory.findMany()
     * 
     * // Get first 10 OrderStatusHistories
     * const orderStatusHistories = await prisma.orderStatusHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderStatusHistoryWithIdOnly = await prisma.orderStatusHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderStatusHistoryFindManyArgs>(args?: SelectSubset<T, OrderStatusHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderStatusHistory.
     * @param {OrderStatusHistoryCreateArgs} args - Arguments to create a OrderStatusHistory.
     * @example
     * // Create one OrderStatusHistory
     * const OrderStatusHistory = await prisma.orderStatusHistory.create({
     *   data: {
     *     // ... data to create a OrderStatusHistory
     *   }
     * })
     * 
     */
    create<T extends OrderStatusHistoryCreateArgs>(args: SelectSubset<T, OrderStatusHistoryCreateArgs<ExtArgs>>): Prisma__OrderStatusHistoryClient<$Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderStatusHistories.
     * @param {OrderStatusHistoryCreateManyArgs} args - Arguments to create many OrderStatusHistories.
     * @example
     * // Create many OrderStatusHistories
     * const orderStatusHistory = await prisma.orderStatusHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderStatusHistoryCreateManyArgs>(args?: SelectSubset<T, OrderStatusHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderStatusHistories and returns the data saved in the database.
     * @param {OrderStatusHistoryCreateManyAndReturnArgs} args - Arguments to create many OrderStatusHistories.
     * @example
     * // Create many OrderStatusHistories
     * const orderStatusHistory = await prisma.orderStatusHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderStatusHistories and only return the `id`
     * const orderStatusHistoryWithIdOnly = await prisma.orderStatusHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderStatusHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderStatusHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderStatusHistory.
     * @param {OrderStatusHistoryDeleteArgs} args - Arguments to delete one OrderStatusHistory.
     * @example
     * // Delete one OrderStatusHistory
     * const OrderStatusHistory = await prisma.orderStatusHistory.delete({
     *   where: {
     *     // ... filter to delete one OrderStatusHistory
     *   }
     * })
     * 
     */
    delete<T extends OrderStatusHistoryDeleteArgs>(args: SelectSubset<T, OrderStatusHistoryDeleteArgs<ExtArgs>>): Prisma__OrderStatusHistoryClient<$Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderStatusHistory.
     * @param {OrderStatusHistoryUpdateArgs} args - Arguments to update one OrderStatusHistory.
     * @example
     * // Update one OrderStatusHistory
     * const orderStatusHistory = await prisma.orderStatusHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderStatusHistoryUpdateArgs>(args: SelectSubset<T, OrderStatusHistoryUpdateArgs<ExtArgs>>): Prisma__OrderStatusHistoryClient<$Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderStatusHistories.
     * @param {OrderStatusHistoryDeleteManyArgs} args - Arguments to filter OrderStatusHistories to delete.
     * @example
     * // Delete a few OrderStatusHistories
     * const { count } = await prisma.orderStatusHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderStatusHistoryDeleteManyArgs>(args?: SelectSubset<T, OrderStatusHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderStatusHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderStatusHistories
     * const orderStatusHistory = await prisma.orderStatusHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderStatusHistoryUpdateManyArgs>(args: SelectSubset<T, OrderStatusHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderStatusHistories and returns the data updated in the database.
     * @param {OrderStatusHistoryUpdateManyAndReturnArgs} args - Arguments to update many OrderStatusHistories.
     * @example
     * // Update many OrderStatusHistories
     * const orderStatusHistory = await prisma.orderStatusHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderStatusHistories and only return the `id`
     * const orderStatusHistoryWithIdOnly = await prisma.orderStatusHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderStatusHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderStatusHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderStatusHistory.
     * @param {OrderStatusHistoryUpsertArgs} args - Arguments to update or create a OrderStatusHistory.
     * @example
     * // Update or create a OrderStatusHistory
     * const orderStatusHistory = await prisma.orderStatusHistory.upsert({
     *   create: {
     *     // ... data to create a OrderStatusHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderStatusHistory we want to update
     *   }
     * })
     */
    upsert<T extends OrderStatusHistoryUpsertArgs>(args: SelectSubset<T, OrderStatusHistoryUpsertArgs<ExtArgs>>): Prisma__OrderStatusHistoryClient<$Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderStatusHistoryCountArgs} args - Arguments to filter OrderStatusHistories to count.
     * @example
     * // Count the number of OrderStatusHistories
     * const count = await prisma.orderStatusHistory.count({
     *   where: {
     *     // ... the filter for the OrderStatusHistories we want to count
     *   }
     * })
    **/
    count<T extends OrderStatusHistoryCountArgs>(
      args?: Subset<T, OrderStatusHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderStatusHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderStatusHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderStatusHistoryAggregateArgs>(args: Subset<T, OrderStatusHistoryAggregateArgs>): Prisma.PrismaPromise<GetOrderStatusHistoryAggregateType<T>>

    /**
     * Group by OrderStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderStatusHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderStatusHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderStatusHistoryGroupByArgs['orderBy'] }
        : { orderBy?: OrderStatusHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderStatusHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderStatusHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderStatusHistory model
   */
  readonly fields: OrderStatusHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderStatusHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderStatusHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderStatusHistory model
   */
  interface OrderStatusHistoryFieldRefs {
    readonly id: FieldRef<"OrderStatusHistory", 'String'>
    readonly orderId: FieldRef<"OrderStatusHistory", 'String'>
    readonly type: FieldRef<"OrderStatusHistory", 'String'>
    readonly status: FieldRef<"OrderStatusHistory", 'String'>
    readonly note: FieldRef<"OrderStatusHistory", 'String'>
    readonly location: FieldRef<"OrderStatusHistory", 'String'>
    readonly isPublic: FieldRef<"OrderStatusHistory", 'Boolean'>
    readonly changedBy: FieldRef<"OrderStatusHistory", 'String'>
    readonly actor: FieldRef<"OrderStatusHistory", 'String'>
    readonly createdAt: FieldRef<"OrderStatusHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrderStatusHistory findUnique
   */
  export type OrderStatusHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OrderStatusHistory to fetch.
     */
    where: OrderStatusHistoryWhereUniqueInput
  }

  /**
   * OrderStatusHistory findUniqueOrThrow
   */
  export type OrderStatusHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OrderStatusHistory to fetch.
     */
    where: OrderStatusHistoryWhereUniqueInput
  }

  /**
   * OrderStatusHistory findFirst
   */
  export type OrderStatusHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OrderStatusHistory to fetch.
     */
    where?: OrderStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderStatusHistories to fetch.
     */
    orderBy?: OrderStatusHistoryOrderByWithRelationInput | OrderStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderStatusHistories.
     */
    cursor?: OrderStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderStatusHistories.
     */
    distinct?: OrderStatusHistoryScalarFieldEnum | OrderStatusHistoryScalarFieldEnum[]
  }

  /**
   * OrderStatusHistory findFirstOrThrow
   */
  export type OrderStatusHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OrderStatusHistory to fetch.
     */
    where?: OrderStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderStatusHistories to fetch.
     */
    orderBy?: OrderStatusHistoryOrderByWithRelationInput | OrderStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderStatusHistories.
     */
    cursor?: OrderStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderStatusHistories.
     */
    distinct?: OrderStatusHistoryScalarFieldEnum | OrderStatusHistoryScalarFieldEnum[]
  }

  /**
   * OrderStatusHistory findMany
   */
  export type OrderStatusHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OrderStatusHistories to fetch.
     */
    where?: OrderStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderStatusHistories to fetch.
     */
    orderBy?: OrderStatusHistoryOrderByWithRelationInput | OrderStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderStatusHistories.
     */
    cursor?: OrderStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderStatusHistories.
     */
    distinct?: OrderStatusHistoryScalarFieldEnum | OrderStatusHistoryScalarFieldEnum[]
  }

  /**
   * OrderStatusHistory create
   */
  export type OrderStatusHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderStatusHistory.
     */
    data: XOR<OrderStatusHistoryCreateInput, OrderStatusHistoryUncheckedCreateInput>
  }

  /**
   * OrderStatusHistory createMany
   */
  export type OrderStatusHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderStatusHistories.
     */
    data: OrderStatusHistoryCreateManyInput | OrderStatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderStatusHistory createManyAndReturn
   */
  export type OrderStatusHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many OrderStatusHistories.
     */
    data: OrderStatusHistoryCreateManyInput | OrderStatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderStatusHistory update
   */
  export type OrderStatusHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderStatusHistory.
     */
    data: XOR<OrderStatusHistoryUpdateInput, OrderStatusHistoryUncheckedUpdateInput>
    /**
     * Choose, which OrderStatusHistory to update.
     */
    where: OrderStatusHistoryWhereUniqueInput
  }

  /**
   * OrderStatusHistory updateMany
   */
  export type OrderStatusHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderStatusHistories.
     */
    data: XOR<OrderStatusHistoryUpdateManyMutationInput, OrderStatusHistoryUncheckedUpdateManyInput>
    /**
     * Filter which OrderStatusHistories to update
     */
    where?: OrderStatusHistoryWhereInput
    /**
     * Limit how many OrderStatusHistories to update.
     */
    limit?: number
  }

  /**
   * OrderStatusHistory updateManyAndReturn
   */
  export type OrderStatusHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * The data used to update OrderStatusHistories.
     */
    data: XOR<OrderStatusHistoryUpdateManyMutationInput, OrderStatusHistoryUncheckedUpdateManyInput>
    /**
     * Filter which OrderStatusHistories to update
     */
    where?: OrderStatusHistoryWhereInput
    /**
     * Limit how many OrderStatusHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderStatusHistory upsert
   */
  export type OrderStatusHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderStatusHistory to update in case it exists.
     */
    where: OrderStatusHistoryWhereUniqueInput
    /**
     * In case the OrderStatusHistory found by the `where` argument doesn't exist, create a new OrderStatusHistory with this data.
     */
    create: XOR<OrderStatusHistoryCreateInput, OrderStatusHistoryUncheckedCreateInput>
    /**
     * In case the OrderStatusHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderStatusHistoryUpdateInput, OrderStatusHistoryUncheckedUpdateInput>
  }

  /**
   * OrderStatusHistory delete
   */
  export type OrderStatusHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter which OrderStatusHistory to delete.
     */
    where: OrderStatusHistoryWhereUniqueInput
  }

  /**
   * OrderStatusHistory deleteMany
   */
  export type OrderStatusHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderStatusHistories to delete
     */
    where?: OrderStatusHistoryWhereInput
    /**
     * Limit how many OrderStatusHistories to delete.
     */
    limit?: number
  }

  /**
   * OrderStatusHistory without action
   */
  export type OrderStatusHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryInclude<ExtArgs> | null
  }


  /**
   * Model OrderNote
   */

  export type AggregateOrderNote = {
    _count: OrderNoteCountAggregateOutputType | null
    _min: OrderNoteMinAggregateOutputType | null
    _max: OrderNoteMaxAggregateOutputType | null
  }

  export type OrderNoteMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    content: string | null
    authorId: string | null
    isInternal: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderNoteMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    content: string | null
    authorId: string | null
    isInternal: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderNoteCountAggregateOutputType = {
    id: number
    orderId: number
    content: number
    authorId: number
    isInternal: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderNoteMinAggregateInputType = {
    id?: true
    orderId?: true
    content?: true
    authorId?: true
    isInternal?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderNoteMaxAggregateInputType = {
    id?: true
    orderId?: true
    content?: true
    authorId?: true
    isInternal?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderNoteCountAggregateInputType = {
    id?: true
    orderId?: true
    content?: true
    authorId?: true
    isInternal?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrderNoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderNote to aggregate.
     */
    where?: OrderNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderNotes to fetch.
     */
    orderBy?: OrderNoteOrderByWithRelationInput | OrderNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderNotes
    **/
    _count?: true | OrderNoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderNoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderNoteMaxAggregateInputType
  }

  export type GetOrderNoteAggregateType<T extends OrderNoteAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderNote[P]>
      : GetScalarType<T[P], AggregateOrderNote[P]>
  }




  export type OrderNoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderNoteWhereInput
    orderBy?: OrderNoteOrderByWithAggregationInput | OrderNoteOrderByWithAggregationInput[]
    by: OrderNoteScalarFieldEnum[] | OrderNoteScalarFieldEnum
    having?: OrderNoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderNoteCountAggregateInputType | true
    _min?: OrderNoteMinAggregateInputType
    _max?: OrderNoteMaxAggregateInputType
  }

  export type OrderNoteGroupByOutputType = {
    id: string
    orderId: string
    content: string
    authorId: string
    isInternal: boolean
    createdAt: Date
    updatedAt: Date
    _count: OrderNoteCountAggregateOutputType | null
    _min: OrderNoteMinAggregateOutputType | null
    _max: OrderNoteMaxAggregateOutputType | null
  }

  type GetOrderNoteGroupByPayload<T extends OrderNoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderNoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderNoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderNoteGroupByOutputType[P]>
            : GetScalarType<T[P], OrderNoteGroupByOutputType[P]>
        }
      >
    >


  export type OrderNoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    content?: boolean
    authorId?: boolean
    isInternal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderNote"]>

  export type OrderNoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    content?: boolean
    authorId?: boolean
    isInternal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderNote"]>

  export type OrderNoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    content?: boolean
    authorId?: boolean
    isInternal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderNote"]>

  export type OrderNoteSelectScalar = {
    id?: boolean
    orderId?: boolean
    content?: boolean
    authorId?: boolean
    isInternal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderNoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "content" | "authorId" | "isInternal" | "createdAt" | "updatedAt", ExtArgs["result"]["orderNote"]>
  export type OrderNoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type OrderNoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type OrderNoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $OrderNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderNote"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      content: string
      authorId: string
      isInternal: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["orderNote"]>
    composites: {}
  }

  type OrderNoteGetPayload<S extends boolean | null | undefined | OrderNoteDefaultArgs> = $Result.GetResult<Prisma.$OrderNotePayload, S>

  type OrderNoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderNoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderNoteCountAggregateInputType | true
    }

  export interface OrderNoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderNote'], meta: { name: 'OrderNote' } }
    /**
     * Find zero or one OrderNote that matches the filter.
     * @param {OrderNoteFindUniqueArgs} args - Arguments to find a OrderNote
     * @example
     * // Get one OrderNote
     * const orderNote = await prisma.orderNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderNoteFindUniqueArgs>(args: SelectSubset<T, OrderNoteFindUniqueArgs<ExtArgs>>): Prisma__OrderNoteClient<$Result.GetResult<Prisma.$OrderNotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderNote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderNoteFindUniqueOrThrowArgs} args - Arguments to find a OrderNote
     * @example
     * // Get one OrderNote
     * const orderNote = await prisma.orderNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderNoteFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderNoteClient<$Result.GetResult<Prisma.$OrderNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderNoteFindFirstArgs} args - Arguments to find a OrderNote
     * @example
     * // Get one OrderNote
     * const orderNote = await prisma.orderNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderNoteFindFirstArgs>(args?: SelectSubset<T, OrderNoteFindFirstArgs<ExtArgs>>): Prisma__OrderNoteClient<$Result.GetResult<Prisma.$OrderNotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderNoteFindFirstOrThrowArgs} args - Arguments to find a OrderNote
     * @example
     * // Get one OrderNote
     * const orderNote = await prisma.orderNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderNoteFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderNoteClient<$Result.GetResult<Prisma.$OrderNotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderNotes
     * const orderNotes = await prisma.orderNote.findMany()
     * 
     * // Get first 10 OrderNotes
     * const orderNotes = await prisma.orderNote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderNoteWithIdOnly = await prisma.orderNote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderNoteFindManyArgs>(args?: SelectSubset<T, OrderNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderNote.
     * @param {OrderNoteCreateArgs} args - Arguments to create a OrderNote.
     * @example
     * // Create one OrderNote
     * const OrderNote = await prisma.orderNote.create({
     *   data: {
     *     // ... data to create a OrderNote
     *   }
     * })
     * 
     */
    create<T extends OrderNoteCreateArgs>(args: SelectSubset<T, OrderNoteCreateArgs<ExtArgs>>): Prisma__OrderNoteClient<$Result.GetResult<Prisma.$OrderNotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderNotes.
     * @param {OrderNoteCreateManyArgs} args - Arguments to create many OrderNotes.
     * @example
     * // Create many OrderNotes
     * const orderNote = await prisma.orderNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderNoteCreateManyArgs>(args?: SelectSubset<T, OrderNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderNotes and returns the data saved in the database.
     * @param {OrderNoteCreateManyAndReturnArgs} args - Arguments to create many OrderNotes.
     * @example
     * // Create many OrderNotes
     * const orderNote = await prisma.orderNote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderNotes and only return the `id`
     * const orderNoteWithIdOnly = await prisma.orderNote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderNoteCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderNoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderNotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderNote.
     * @param {OrderNoteDeleteArgs} args - Arguments to delete one OrderNote.
     * @example
     * // Delete one OrderNote
     * const OrderNote = await prisma.orderNote.delete({
     *   where: {
     *     // ... filter to delete one OrderNote
     *   }
     * })
     * 
     */
    delete<T extends OrderNoteDeleteArgs>(args: SelectSubset<T, OrderNoteDeleteArgs<ExtArgs>>): Prisma__OrderNoteClient<$Result.GetResult<Prisma.$OrderNotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderNote.
     * @param {OrderNoteUpdateArgs} args - Arguments to update one OrderNote.
     * @example
     * // Update one OrderNote
     * const orderNote = await prisma.orderNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderNoteUpdateArgs>(args: SelectSubset<T, OrderNoteUpdateArgs<ExtArgs>>): Prisma__OrderNoteClient<$Result.GetResult<Prisma.$OrderNotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderNotes.
     * @param {OrderNoteDeleteManyArgs} args - Arguments to filter OrderNotes to delete.
     * @example
     * // Delete a few OrderNotes
     * const { count } = await prisma.orderNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderNoteDeleteManyArgs>(args?: SelectSubset<T, OrderNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderNotes
     * const orderNote = await prisma.orderNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderNoteUpdateManyArgs>(args: SelectSubset<T, OrderNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderNotes and returns the data updated in the database.
     * @param {OrderNoteUpdateManyAndReturnArgs} args - Arguments to update many OrderNotes.
     * @example
     * // Update many OrderNotes
     * const orderNote = await prisma.orderNote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderNotes and only return the `id`
     * const orderNoteWithIdOnly = await prisma.orderNote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderNoteUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderNoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderNotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderNote.
     * @param {OrderNoteUpsertArgs} args - Arguments to update or create a OrderNote.
     * @example
     * // Update or create a OrderNote
     * const orderNote = await prisma.orderNote.upsert({
     *   create: {
     *     // ... data to create a OrderNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderNote we want to update
     *   }
     * })
     */
    upsert<T extends OrderNoteUpsertArgs>(args: SelectSubset<T, OrderNoteUpsertArgs<ExtArgs>>): Prisma__OrderNoteClient<$Result.GetResult<Prisma.$OrderNotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderNoteCountArgs} args - Arguments to filter OrderNotes to count.
     * @example
     * // Count the number of OrderNotes
     * const count = await prisma.orderNote.count({
     *   where: {
     *     // ... the filter for the OrderNotes we want to count
     *   }
     * })
    **/
    count<T extends OrderNoteCountArgs>(
      args?: Subset<T, OrderNoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderNoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderNoteAggregateArgs>(args: Subset<T, OrderNoteAggregateArgs>): Prisma.PrismaPromise<GetOrderNoteAggregateType<T>>

    /**
     * Group by OrderNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderNoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderNoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderNoteGroupByArgs['orderBy'] }
        : { orderBy?: OrderNoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderNote model
   */
  readonly fields: OrderNoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderNote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderNoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderNote model
   */
  interface OrderNoteFieldRefs {
    readonly id: FieldRef<"OrderNote", 'String'>
    readonly orderId: FieldRef<"OrderNote", 'String'>
    readonly content: FieldRef<"OrderNote", 'String'>
    readonly authorId: FieldRef<"OrderNote", 'String'>
    readonly isInternal: FieldRef<"OrderNote", 'Boolean'>
    readonly createdAt: FieldRef<"OrderNote", 'DateTime'>
    readonly updatedAt: FieldRef<"OrderNote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrderNote findUnique
   */
  export type OrderNoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteInclude<ExtArgs> | null
    /**
     * Filter, which OrderNote to fetch.
     */
    where: OrderNoteWhereUniqueInput
  }

  /**
   * OrderNote findUniqueOrThrow
   */
  export type OrderNoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteInclude<ExtArgs> | null
    /**
     * Filter, which OrderNote to fetch.
     */
    where: OrderNoteWhereUniqueInput
  }

  /**
   * OrderNote findFirst
   */
  export type OrderNoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteInclude<ExtArgs> | null
    /**
     * Filter, which OrderNote to fetch.
     */
    where?: OrderNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderNotes to fetch.
     */
    orderBy?: OrderNoteOrderByWithRelationInput | OrderNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderNotes.
     */
    cursor?: OrderNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderNotes.
     */
    distinct?: OrderNoteScalarFieldEnum | OrderNoteScalarFieldEnum[]
  }

  /**
   * OrderNote findFirstOrThrow
   */
  export type OrderNoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteInclude<ExtArgs> | null
    /**
     * Filter, which OrderNote to fetch.
     */
    where?: OrderNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderNotes to fetch.
     */
    orderBy?: OrderNoteOrderByWithRelationInput | OrderNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderNotes.
     */
    cursor?: OrderNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderNotes.
     */
    distinct?: OrderNoteScalarFieldEnum | OrderNoteScalarFieldEnum[]
  }

  /**
   * OrderNote findMany
   */
  export type OrderNoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteInclude<ExtArgs> | null
    /**
     * Filter, which OrderNotes to fetch.
     */
    where?: OrderNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderNotes to fetch.
     */
    orderBy?: OrderNoteOrderByWithRelationInput | OrderNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderNotes.
     */
    cursor?: OrderNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderNotes.
     */
    distinct?: OrderNoteScalarFieldEnum | OrderNoteScalarFieldEnum[]
  }

  /**
   * OrderNote create
   */
  export type OrderNoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderNote.
     */
    data: XOR<OrderNoteCreateInput, OrderNoteUncheckedCreateInput>
  }

  /**
   * OrderNote createMany
   */
  export type OrderNoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderNotes.
     */
    data: OrderNoteCreateManyInput | OrderNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderNote createManyAndReturn
   */
  export type OrderNoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * The data used to create many OrderNotes.
     */
    data: OrderNoteCreateManyInput | OrderNoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderNote update
   */
  export type OrderNoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderNote.
     */
    data: XOR<OrderNoteUpdateInput, OrderNoteUncheckedUpdateInput>
    /**
     * Choose, which OrderNote to update.
     */
    where: OrderNoteWhereUniqueInput
  }

  /**
   * OrderNote updateMany
   */
  export type OrderNoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderNotes.
     */
    data: XOR<OrderNoteUpdateManyMutationInput, OrderNoteUncheckedUpdateManyInput>
    /**
     * Filter which OrderNotes to update
     */
    where?: OrderNoteWhereInput
    /**
     * Limit how many OrderNotes to update.
     */
    limit?: number
  }

  /**
   * OrderNote updateManyAndReturn
   */
  export type OrderNoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * The data used to update OrderNotes.
     */
    data: XOR<OrderNoteUpdateManyMutationInput, OrderNoteUncheckedUpdateManyInput>
    /**
     * Filter which OrderNotes to update
     */
    where?: OrderNoteWhereInput
    /**
     * Limit how many OrderNotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderNote upsert
   */
  export type OrderNoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderNote to update in case it exists.
     */
    where: OrderNoteWhereUniqueInput
    /**
     * In case the OrderNote found by the `where` argument doesn't exist, create a new OrderNote with this data.
     */
    create: XOR<OrderNoteCreateInput, OrderNoteUncheckedCreateInput>
    /**
     * In case the OrderNote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderNoteUpdateInput, OrderNoteUncheckedUpdateInput>
  }

  /**
   * OrderNote delete
   */
  export type OrderNoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteInclude<ExtArgs> | null
    /**
     * Filter which OrderNote to delete.
     */
    where: OrderNoteWhereUniqueInput
  }

  /**
   * OrderNote deleteMany
   */
  export type OrderNoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderNotes to delete
     */
    where?: OrderNoteWhereInput
    /**
     * Limit how many OrderNotes to delete.
     */
    limit?: number
  }

  /**
   * OrderNote without action
   */
  export type OrderNoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteInclude<ExtArgs> | null
  }


  /**
   * Model ReturnRequest
   */

  export type AggregateReturnRequest = {
    _count: ReturnRequestCountAggregateOutputType | null
    _avg: ReturnRequestAvgAggregateOutputType | null
    _sum: ReturnRequestSumAggregateOutputType | null
    _min: ReturnRequestMinAggregateOutputType | null
    _max: ReturnRequestMaxAggregateOutputType | null
  }

  export type ReturnRequestAvgAggregateOutputType = {
    refundAmount: Decimal | null
  }

  export type ReturnRequestSumAggregateOutputType = {
    refundAmount: Decimal | null
  }

  export type ReturnRequestMinAggregateOutputType = {
    id: string | null
    rmaNumber: string | null
    orderId: string | null
    customerId: string | null
    status: string | null
    reason: string | null
    details: string | null
    resolution: string | null
    instructions: string | null
    rejectReason: string | null
    restocked: boolean | null
    refundAmount: Decimal | null
    adminNote: string | null
    approvedAt: Date | null
    rejectedAt: Date | null
    receivedAt: Date | null
    refundedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReturnRequestMaxAggregateOutputType = {
    id: string | null
    rmaNumber: string | null
    orderId: string | null
    customerId: string | null
    status: string | null
    reason: string | null
    details: string | null
    resolution: string | null
    instructions: string | null
    rejectReason: string | null
    restocked: boolean | null
    refundAmount: Decimal | null
    adminNote: string | null
    approvedAt: Date | null
    rejectedAt: Date | null
    receivedAt: Date | null
    refundedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReturnRequestCountAggregateOutputType = {
    id: number
    rmaNumber: number
    orderId: number
    customerId: number
    status: number
    reason: number
    details: number
    photos: number
    resolution: number
    instructions: number
    rejectReason: number
    restocked: number
    refundAmount: number
    adminNote: number
    approvedAt: number
    rejectedAt: number
    receivedAt: number
    refundedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReturnRequestAvgAggregateInputType = {
    refundAmount?: true
  }

  export type ReturnRequestSumAggregateInputType = {
    refundAmount?: true
  }

  export type ReturnRequestMinAggregateInputType = {
    id?: true
    rmaNumber?: true
    orderId?: true
    customerId?: true
    status?: true
    reason?: true
    details?: true
    resolution?: true
    instructions?: true
    rejectReason?: true
    restocked?: true
    refundAmount?: true
    adminNote?: true
    approvedAt?: true
    rejectedAt?: true
    receivedAt?: true
    refundedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReturnRequestMaxAggregateInputType = {
    id?: true
    rmaNumber?: true
    orderId?: true
    customerId?: true
    status?: true
    reason?: true
    details?: true
    resolution?: true
    instructions?: true
    rejectReason?: true
    restocked?: true
    refundAmount?: true
    adminNote?: true
    approvedAt?: true
    rejectedAt?: true
    receivedAt?: true
    refundedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReturnRequestCountAggregateInputType = {
    id?: true
    rmaNumber?: true
    orderId?: true
    customerId?: true
    status?: true
    reason?: true
    details?: true
    photos?: true
    resolution?: true
    instructions?: true
    rejectReason?: true
    restocked?: true
    refundAmount?: true
    adminNote?: true
    approvedAt?: true
    rejectedAt?: true
    receivedAt?: true
    refundedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReturnRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReturnRequest to aggregate.
     */
    where?: ReturnRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReturnRequests to fetch.
     */
    orderBy?: ReturnRequestOrderByWithRelationInput | ReturnRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReturnRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReturnRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReturnRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReturnRequests
    **/
    _count?: true | ReturnRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReturnRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReturnRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReturnRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReturnRequestMaxAggregateInputType
  }

  export type GetReturnRequestAggregateType<T extends ReturnRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateReturnRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReturnRequest[P]>
      : GetScalarType<T[P], AggregateReturnRequest[P]>
  }




  export type ReturnRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReturnRequestWhereInput
    orderBy?: ReturnRequestOrderByWithAggregationInput | ReturnRequestOrderByWithAggregationInput[]
    by: ReturnRequestScalarFieldEnum[] | ReturnRequestScalarFieldEnum
    having?: ReturnRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReturnRequestCountAggregateInputType | true
    _avg?: ReturnRequestAvgAggregateInputType
    _sum?: ReturnRequestSumAggregateInputType
    _min?: ReturnRequestMinAggregateInputType
    _max?: ReturnRequestMaxAggregateInputType
  }

  export type ReturnRequestGroupByOutputType = {
    id: string
    rmaNumber: string
    orderId: string
    customerId: string
    status: string
    reason: string
    details: string | null
    photos: string[]
    resolution: string
    instructions: string | null
    rejectReason: string | null
    restocked: boolean
    refundAmount: Decimal | null
    adminNote: string | null
    approvedAt: Date | null
    rejectedAt: Date | null
    receivedAt: Date | null
    refundedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ReturnRequestCountAggregateOutputType | null
    _avg: ReturnRequestAvgAggregateOutputType | null
    _sum: ReturnRequestSumAggregateOutputType | null
    _min: ReturnRequestMinAggregateOutputType | null
    _max: ReturnRequestMaxAggregateOutputType | null
  }

  type GetReturnRequestGroupByPayload<T extends ReturnRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReturnRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReturnRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReturnRequestGroupByOutputType[P]>
            : GetScalarType<T[P], ReturnRequestGroupByOutputType[P]>
        }
      >
    >


  export type ReturnRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rmaNumber?: boolean
    orderId?: boolean
    customerId?: boolean
    status?: boolean
    reason?: boolean
    details?: boolean
    photos?: boolean
    resolution?: boolean
    instructions?: boolean
    rejectReason?: boolean
    restocked?: boolean
    refundAmount?: boolean
    adminNote?: boolean
    approvedAt?: boolean
    rejectedAt?: boolean
    receivedAt?: boolean
    refundedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    items?: boolean | ReturnRequest$itemsArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
    _count?: boolean | ReturnRequestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["returnRequest"]>

  export type ReturnRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rmaNumber?: boolean
    orderId?: boolean
    customerId?: boolean
    status?: boolean
    reason?: boolean
    details?: boolean
    photos?: boolean
    resolution?: boolean
    instructions?: boolean
    rejectReason?: boolean
    restocked?: boolean
    refundAmount?: boolean
    adminNote?: boolean
    approvedAt?: boolean
    rejectedAt?: boolean
    receivedAt?: boolean
    refundedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["returnRequest"]>

  export type ReturnRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rmaNumber?: boolean
    orderId?: boolean
    customerId?: boolean
    status?: boolean
    reason?: boolean
    details?: boolean
    photos?: boolean
    resolution?: boolean
    instructions?: boolean
    rejectReason?: boolean
    restocked?: boolean
    refundAmount?: boolean
    adminNote?: boolean
    approvedAt?: boolean
    rejectedAt?: boolean
    receivedAt?: boolean
    refundedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["returnRequest"]>

  export type ReturnRequestSelectScalar = {
    id?: boolean
    rmaNumber?: boolean
    orderId?: boolean
    customerId?: boolean
    status?: boolean
    reason?: boolean
    details?: boolean
    photos?: boolean
    resolution?: boolean
    instructions?: boolean
    rejectReason?: boolean
    restocked?: boolean
    refundAmount?: boolean
    adminNote?: boolean
    approvedAt?: boolean
    rejectedAt?: boolean
    receivedAt?: boolean
    refundedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReturnRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "rmaNumber" | "orderId" | "customerId" | "status" | "reason" | "details" | "photos" | "resolution" | "instructions" | "rejectReason" | "restocked" | "refundAmount" | "adminNote" | "approvedAt" | "rejectedAt" | "receivedAt" | "refundedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["returnRequest"]>
  export type ReturnRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | ReturnRequest$itemsArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
    _count?: boolean | ReturnRequestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ReturnRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type ReturnRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $ReturnRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReturnRequest"
    objects: {
      items: Prisma.$ReturnItemPayload<ExtArgs>[]
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      rmaNumber: string
      orderId: string
      customerId: string
      status: string
      reason: string
      details: string | null
      photos: string[]
      resolution: string
      instructions: string | null
      rejectReason: string | null
      restocked: boolean
      refundAmount: Prisma.Decimal | null
      adminNote: string | null
      approvedAt: Date | null
      rejectedAt: Date | null
      receivedAt: Date | null
      refundedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["returnRequest"]>
    composites: {}
  }

  type ReturnRequestGetPayload<S extends boolean | null | undefined | ReturnRequestDefaultArgs> = $Result.GetResult<Prisma.$ReturnRequestPayload, S>

  type ReturnRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReturnRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReturnRequestCountAggregateInputType | true
    }

  export interface ReturnRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReturnRequest'], meta: { name: 'ReturnRequest' } }
    /**
     * Find zero or one ReturnRequest that matches the filter.
     * @param {ReturnRequestFindUniqueArgs} args - Arguments to find a ReturnRequest
     * @example
     * // Get one ReturnRequest
     * const returnRequest = await prisma.returnRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReturnRequestFindUniqueArgs>(args: SelectSubset<T, ReturnRequestFindUniqueArgs<ExtArgs>>): Prisma__ReturnRequestClient<$Result.GetResult<Prisma.$ReturnRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReturnRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReturnRequestFindUniqueOrThrowArgs} args - Arguments to find a ReturnRequest
     * @example
     * // Get one ReturnRequest
     * const returnRequest = await prisma.returnRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReturnRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, ReturnRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReturnRequestClient<$Result.GetResult<Prisma.$ReturnRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReturnRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReturnRequestFindFirstArgs} args - Arguments to find a ReturnRequest
     * @example
     * // Get one ReturnRequest
     * const returnRequest = await prisma.returnRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReturnRequestFindFirstArgs>(args?: SelectSubset<T, ReturnRequestFindFirstArgs<ExtArgs>>): Prisma__ReturnRequestClient<$Result.GetResult<Prisma.$ReturnRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReturnRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReturnRequestFindFirstOrThrowArgs} args - Arguments to find a ReturnRequest
     * @example
     * // Get one ReturnRequest
     * const returnRequest = await prisma.returnRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReturnRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, ReturnRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReturnRequestClient<$Result.GetResult<Prisma.$ReturnRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReturnRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReturnRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReturnRequests
     * const returnRequests = await prisma.returnRequest.findMany()
     * 
     * // Get first 10 ReturnRequests
     * const returnRequests = await prisma.returnRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const returnRequestWithIdOnly = await prisma.returnRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReturnRequestFindManyArgs>(args?: SelectSubset<T, ReturnRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReturnRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReturnRequest.
     * @param {ReturnRequestCreateArgs} args - Arguments to create a ReturnRequest.
     * @example
     * // Create one ReturnRequest
     * const ReturnRequest = await prisma.returnRequest.create({
     *   data: {
     *     // ... data to create a ReturnRequest
     *   }
     * })
     * 
     */
    create<T extends ReturnRequestCreateArgs>(args: SelectSubset<T, ReturnRequestCreateArgs<ExtArgs>>): Prisma__ReturnRequestClient<$Result.GetResult<Prisma.$ReturnRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReturnRequests.
     * @param {ReturnRequestCreateManyArgs} args - Arguments to create many ReturnRequests.
     * @example
     * // Create many ReturnRequests
     * const returnRequest = await prisma.returnRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReturnRequestCreateManyArgs>(args?: SelectSubset<T, ReturnRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReturnRequests and returns the data saved in the database.
     * @param {ReturnRequestCreateManyAndReturnArgs} args - Arguments to create many ReturnRequests.
     * @example
     * // Create many ReturnRequests
     * const returnRequest = await prisma.returnRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReturnRequests and only return the `id`
     * const returnRequestWithIdOnly = await prisma.returnRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReturnRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, ReturnRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReturnRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ReturnRequest.
     * @param {ReturnRequestDeleteArgs} args - Arguments to delete one ReturnRequest.
     * @example
     * // Delete one ReturnRequest
     * const ReturnRequest = await prisma.returnRequest.delete({
     *   where: {
     *     // ... filter to delete one ReturnRequest
     *   }
     * })
     * 
     */
    delete<T extends ReturnRequestDeleteArgs>(args: SelectSubset<T, ReturnRequestDeleteArgs<ExtArgs>>): Prisma__ReturnRequestClient<$Result.GetResult<Prisma.$ReturnRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReturnRequest.
     * @param {ReturnRequestUpdateArgs} args - Arguments to update one ReturnRequest.
     * @example
     * // Update one ReturnRequest
     * const returnRequest = await prisma.returnRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReturnRequestUpdateArgs>(args: SelectSubset<T, ReturnRequestUpdateArgs<ExtArgs>>): Prisma__ReturnRequestClient<$Result.GetResult<Prisma.$ReturnRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReturnRequests.
     * @param {ReturnRequestDeleteManyArgs} args - Arguments to filter ReturnRequests to delete.
     * @example
     * // Delete a few ReturnRequests
     * const { count } = await prisma.returnRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReturnRequestDeleteManyArgs>(args?: SelectSubset<T, ReturnRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReturnRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReturnRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReturnRequests
     * const returnRequest = await prisma.returnRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReturnRequestUpdateManyArgs>(args: SelectSubset<T, ReturnRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReturnRequests and returns the data updated in the database.
     * @param {ReturnRequestUpdateManyAndReturnArgs} args - Arguments to update many ReturnRequests.
     * @example
     * // Update many ReturnRequests
     * const returnRequest = await prisma.returnRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ReturnRequests and only return the `id`
     * const returnRequestWithIdOnly = await prisma.returnRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReturnRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, ReturnRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReturnRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ReturnRequest.
     * @param {ReturnRequestUpsertArgs} args - Arguments to update or create a ReturnRequest.
     * @example
     * // Update or create a ReturnRequest
     * const returnRequest = await prisma.returnRequest.upsert({
     *   create: {
     *     // ... data to create a ReturnRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReturnRequest we want to update
     *   }
     * })
     */
    upsert<T extends ReturnRequestUpsertArgs>(args: SelectSubset<T, ReturnRequestUpsertArgs<ExtArgs>>): Prisma__ReturnRequestClient<$Result.GetResult<Prisma.$ReturnRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReturnRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReturnRequestCountArgs} args - Arguments to filter ReturnRequests to count.
     * @example
     * // Count the number of ReturnRequests
     * const count = await prisma.returnRequest.count({
     *   where: {
     *     // ... the filter for the ReturnRequests we want to count
     *   }
     * })
    **/
    count<T extends ReturnRequestCountArgs>(
      args?: Subset<T, ReturnRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReturnRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReturnRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReturnRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReturnRequestAggregateArgs>(args: Subset<T, ReturnRequestAggregateArgs>): Prisma.PrismaPromise<GetReturnRequestAggregateType<T>>

    /**
     * Group by ReturnRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReturnRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReturnRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReturnRequestGroupByArgs['orderBy'] }
        : { orderBy?: ReturnRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReturnRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReturnRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReturnRequest model
   */
  readonly fields: ReturnRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReturnRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReturnRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    items<T extends ReturnRequest$itemsArgs<ExtArgs> = {}>(args?: Subset<T, ReturnRequest$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReturnRequest model
   */
  interface ReturnRequestFieldRefs {
    readonly id: FieldRef<"ReturnRequest", 'String'>
    readonly rmaNumber: FieldRef<"ReturnRequest", 'String'>
    readonly orderId: FieldRef<"ReturnRequest", 'String'>
    readonly customerId: FieldRef<"ReturnRequest", 'String'>
    readonly status: FieldRef<"ReturnRequest", 'String'>
    readonly reason: FieldRef<"ReturnRequest", 'String'>
    readonly details: FieldRef<"ReturnRequest", 'String'>
    readonly photos: FieldRef<"ReturnRequest", 'String[]'>
    readonly resolution: FieldRef<"ReturnRequest", 'String'>
    readonly instructions: FieldRef<"ReturnRequest", 'String'>
    readonly rejectReason: FieldRef<"ReturnRequest", 'String'>
    readonly restocked: FieldRef<"ReturnRequest", 'Boolean'>
    readonly refundAmount: FieldRef<"ReturnRequest", 'Decimal'>
    readonly adminNote: FieldRef<"ReturnRequest", 'String'>
    readonly approvedAt: FieldRef<"ReturnRequest", 'DateTime'>
    readonly rejectedAt: FieldRef<"ReturnRequest", 'DateTime'>
    readonly receivedAt: FieldRef<"ReturnRequest", 'DateTime'>
    readonly refundedAt: FieldRef<"ReturnRequest", 'DateTime'>
    readonly createdAt: FieldRef<"ReturnRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"ReturnRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReturnRequest findUnique
   */
  export type ReturnRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnRequest
     */
    select?: ReturnRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnRequest
     */
    omit?: ReturnRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnRequestInclude<ExtArgs> | null
    /**
     * Filter, which ReturnRequest to fetch.
     */
    where: ReturnRequestWhereUniqueInput
  }

  /**
   * ReturnRequest findUniqueOrThrow
   */
  export type ReturnRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnRequest
     */
    select?: ReturnRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnRequest
     */
    omit?: ReturnRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnRequestInclude<ExtArgs> | null
    /**
     * Filter, which ReturnRequest to fetch.
     */
    where: ReturnRequestWhereUniqueInput
  }

  /**
   * ReturnRequest findFirst
   */
  export type ReturnRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnRequest
     */
    select?: ReturnRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnRequest
     */
    omit?: ReturnRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnRequestInclude<ExtArgs> | null
    /**
     * Filter, which ReturnRequest to fetch.
     */
    where?: ReturnRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReturnRequests to fetch.
     */
    orderBy?: ReturnRequestOrderByWithRelationInput | ReturnRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReturnRequests.
     */
    cursor?: ReturnRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReturnRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReturnRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReturnRequests.
     */
    distinct?: ReturnRequestScalarFieldEnum | ReturnRequestScalarFieldEnum[]
  }

  /**
   * ReturnRequest findFirstOrThrow
   */
  export type ReturnRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnRequest
     */
    select?: ReturnRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnRequest
     */
    omit?: ReturnRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnRequestInclude<ExtArgs> | null
    /**
     * Filter, which ReturnRequest to fetch.
     */
    where?: ReturnRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReturnRequests to fetch.
     */
    orderBy?: ReturnRequestOrderByWithRelationInput | ReturnRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReturnRequests.
     */
    cursor?: ReturnRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReturnRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReturnRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReturnRequests.
     */
    distinct?: ReturnRequestScalarFieldEnum | ReturnRequestScalarFieldEnum[]
  }

  /**
   * ReturnRequest findMany
   */
  export type ReturnRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnRequest
     */
    select?: ReturnRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnRequest
     */
    omit?: ReturnRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnRequestInclude<ExtArgs> | null
    /**
     * Filter, which ReturnRequests to fetch.
     */
    where?: ReturnRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReturnRequests to fetch.
     */
    orderBy?: ReturnRequestOrderByWithRelationInput | ReturnRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReturnRequests.
     */
    cursor?: ReturnRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReturnRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReturnRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReturnRequests.
     */
    distinct?: ReturnRequestScalarFieldEnum | ReturnRequestScalarFieldEnum[]
  }

  /**
   * ReturnRequest create
   */
  export type ReturnRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnRequest
     */
    select?: ReturnRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnRequest
     */
    omit?: ReturnRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a ReturnRequest.
     */
    data: XOR<ReturnRequestCreateInput, ReturnRequestUncheckedCreateInput>
  }

  /**
   * ReturnRequest createMany
   */
  export type ReturnRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReturnRequests.
     */
    data: ReturnRequestCreateManyInput | ReturnRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReturnRequest createManyAndReturn
   */
  export type ReturnRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnRequest
     */
    select?: ReturnRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnRequest
     */
    omit?: ReturnRequestOmit<ExtArgs> | null
    /**
     * The data used to create many ReturnRequests.
     */
    data: ReturnRequestCreateManyInput | ReturnRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReturnRequest update
   */
  export type ReturnRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnRequest
     */
    select?: ReturnRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnRequest
     */
    omit?: ReturnRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a ReturnRequest.
     */
    data: XOR<ReturnRequestUpdateInput, ReturnRequestUncheckedUpdateInput>
    /**
     * Choose, which ReturnRequest to update.
     */
    where: ReturnRequestWhereUniqueInput
  }

  /**
   * ReturnRequest updateMany
   */
  export type ReturnRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReturnRequests.
     */
    data: XOR<ReturnRequestUpdateManyMutationInput, ReturnRequestUncheckedUpdateManyInput>
    /**
     * Filter which ReturnRequests to update
     */
    where?: ReturnRequestWhereInput
    /**
     * Limit how many ReturnRequests to update.
     */
    limit?: number
  }

  /**
   * ReturnRequest updateManyAndReturn
   */
  export type ReturnRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnRequest
     */
    select?: ReturnRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnRequest
     */
    omit?: ReturnRequestOmit<ExtArgs> | null
    /**
     * The data used to update ReturnRequests.
     */
    data: XOR<ReturnRequestUpdateManyMutationInput, ReturnRequestUncheckedUpdateManyInput>
    /**
     * Filter which ReturnRequests to update
     */
    where?: ReturnRequestWhereInput
    /**
     * Limit how many ReturnRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReturnRequest upsert
   */
  export type ReturnRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnRequest
     */
    select?: ReturnRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnRequest
     */
    omit?: ReturnRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the ReturnRequest to update in case it exists.
     */
    where: ReturnRequestWhereUniqueInput
    /**
     * In case the ReturnRequest found by the `where` argument doesn't exist, create a new ReturnRequest with this data.
     */
    create: XOR<ReturnRequestCreateInput, ReturnRequestUncheckedCreateInput>
    /**
     * In case the ReturnRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReturnRequestUpdateInput, ReturnRequestUncheckedUpdateInput>
  }

  /**
   * ReturnRequest delete
   */
  export type ReturnRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnRequest
     */
    select?: ReturnRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnRequest
     */
    omit?: ReturnRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnRequestInclude<ExtArgs> | null
    /**
     * Filter which ReturnRequest to delete.
     */
    where: ReturnRequestWhereUniqueInput
  }

  /**
   * ReturnRequest deleteMany
   */
  export type ReturnRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReturnRequests to delete
     */
    where?: ReturnRequestWhereInput
    /**
     * Limit how many ReturnRequests to delete.
     */
    limit?: number
  }

  /**
   * ReturnRequest.items
   */
  export type ReturnRequest$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemInclude<ExtArgs> | null
    where?: ReturnItemWhereInput
    orderBy?: ReturnItemOrderByWithRelationInput | ReturnItemOrderByWithRelationInput[]
    cursor?: ReturnItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReturnItemScalarFieldEnum | ReturnItemScalarFieldEnum[]
  }

  /**
   * ReturnRequest without action
   */
  export type ReturnRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnRequest
     */
    select?: ReturnRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnRequest
     */
    omit?: ReturnRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnRequestInclude<ExtArgs> | null
  }


  /**
   * Model ReturnItem
   */

  export type AggregateReturnItem = {
    _count: ReturnItemCountAggregateOutputType | null
    _avg: ReturnItemAvgAggregateOutputType | null
    _sum: ReturnItemSumAggregateOutputType | null
    _min: ReturnItemMinAggregateOutputType | null
    _max: ReturnItemMaxAggregateOutputType | null
  }

  export type ReturnItemAvgAggregateOutputType = {
    quantity: number | null
    unitPrice: Decimal | null
  }

  export type ReturnItemSumAggregateOutputType = {
    quantity: number | null
    unitPrice: Decimal | null
  }

  export type ReturnItemMinAggregateOutputType = {
    id: string | null
    returnId: string | null
    orderItemId: string | null
    productId: string | null
    sku: string | null
    name: string | null
    quantity: number | null
    unitPrice: Decimal | null
  }

  export type ReturnItemMaxAggregateOutputType = {
    id: string | null
    returnId: string | null
    orderItemId: string | null
    productId: string | null
    sku: string | null
    name: string | null
    quantity: number | null
    unitPrice: Decimal | null
  }

  export type ReturnItemCountAggregateOutputType = {
    id: number
    returnId: number
    orderItemId: number
    productId: number
    sku: number
    name: number
    quantity: number
    unitPrice: number
    _all: number
  }


  export type ReturnItemAvgAggregateInputType = {
    quantity?: true
    unitPrice?: true
  }

  export type ReturnItemSumAggregateInputType = {
    quantity?: true
    unitPrice?: true
  }

  export type ReturnItemMinAggregateInputType = {
    id?: true
    returnId?: true
    orderItemId?: true
    productId?: true
    sku?: true
    name?: true
    quantity?: true
    unitPrice?: true
  }

  export type ReturnItemMaxAggregateInputType = {
    id?: true
    returnId?: true
    orderItemId?: true
    productId?: true
    sku?: true
    name?: true
    quantity?: true
    unitPrice?: true
  }

  export type ReturnItemCountAggregateInputType = {
    id?: true
    returnId?: true
    orderItemId?: true
    productId?: true
    sku?: true
    name?: true
    quantity?: true
    unitPrice?: true
    _all?: true
  }

  export type ReturnItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReturnItem to aggregate.
     */
    where?: ReturnItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReturnItems to fetch.
     */
    orderBy?: ReturnItemOrderByWithRelationInput | ReturnItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReturnItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReturnItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReturnItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReturnItems
    **/
    _count?: true | ReturnItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReturnItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReturnItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReturnItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReturnItemMaxAggregateInputType
  }

  export type GetReturnItemAggregateType<T extends ReturnItemAggregateArgs> = {
        [P in keyof T & keyof AggregateReturnItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReturnItem[P]>
      : GetScalarType<T[P], AggregateReturnItem[P]>
  }




  export type ReturnItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReturnItemWhereInput
    orderBy?: ReturnItemOrderByWithAggregationInput | ReturnItemOrderByWithAggregationInput[]
    by: ReturnItemScalarFieldEnum[] | ReturnItemScalarFieldEnum
    having?: ReturnItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReturnItemCountAggregateInputType | true
    _avg?: ReturnItemAvgAggregateInputType
    _sum?: ReturnItemSumAggregateInputType
    _min?: ReturnItemMinAggregateInputType
    _max?: ReturnItemMaxAggregateInputType
  }

  export type ReturnItemGroupByOutputType = {
    id: string
    returnId: string
    orderItemId: string
    productId: string
    sku: string
    name: string
    quantity: number
    unitPrice: Decimal
    _count: ReturnItemCountAggregateOutputType | null
    _avg: ReturnItemAvgAggregateOutputType | null
    _sum: ReturnItemSumAggregateOutputType | null
    _min: ReturnItemMinAggregateOutputType | null
    _max: ReturnItemMaxAggregateOutputType | null
  }

  type GetReturnItemGroupByPayload<T extends ReturnItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReturnItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReturnItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReturnItemGroupByOutputType[P]>
            : GetScalarType<T[P], ReturnItemGroupByOutputType[P]>
        }
      >
    >


  export type ReturnItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    returnId?: boolean
    orderItemId?: boolean
    productId?: boolean
    sku?: boolean
    name?: boolean
    quantity?: boolean
    unitPrice?: boolean
    returnRequest?: boolean | ReturnRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["returnItem"]>

  export type ReturnItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    returnId?: boolean
    orderItemId?: boolean
    productId?: boolean
    sku?: boolean
    name?: boolean
    quantity?: boolean
    unitPrice?: boolean
    returnRequest?: boolean | ReturnRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["returnItem"]>

  export type ReturnItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    returnId?: boolean
    orderItemId?: boolean
    productId?: boolean
    sku?: boolean
    name?: boolean
    quantity?: boolean
    unitPrice?: boolean
    returnRequest?: boolean | ReturnRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["returnItem"]>

  export type ReturnItemSelectScalar = {
    id?: boolean
    returnId?: boolean
    orderItemId?: boolean
    productId?: boolean
    sku?: boolean
    name?: boolean
    quantity?: boolean
    unitPrice?: boolean
  }

  export type ReturnItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "returnId" | "orderItemId" | "productId" | "sku" | "name" | "quantity" | "unitPrice", ExtArgs["result"]["returnItem"]>
  export type ReturnItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    returnRequest?: boolean | ReturnRequestDefaultArgs<ExtArgs>
  }
  export type ReturnItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    returnRequest?: boolean | ReturnRequestDefaultArgs<ExtArgs>
  }
  export type ReturnItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    returnRequest?: boolean | ReturnRequestDefaultArgs<ExtArgs>
  }

  export type $ReturnItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReturnItem"
    objects: {
      returnRequest: Prisma.$ReturnRequestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      returnId: string
      orderItemId: string
      productId: string
      sku: string
      name: string
      quantity: number
      unitPrice: Prisma.Decimal
    }, ExtArgs["result"]["returnItem"]>
    composites: {}
  }

  type ReturnItemGetPayload<S extends boolean | null | undefined | ReturnItemDefaultArgs> = $Result.GetResult<Prisma.$ReturnItemPayload, S>

  type ReturnItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReturnItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReturnItemCountAggregateInputType | true
    }

  export interface ReturnItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReturnItem'], meta: { name: 'ReturnItem' } }
    /**
     * Find zero or one ReturnItem that matches the filter.
     * @param {ReturnItemFindUniqueArgs} args - Arguments to find a ReturnItem
     * @example
     * // Get one ReturnItem
     * const returnItem = await prisma.returnItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReturnItemFindUniqueArgs>(args: SelectSubset<T, ReturnItemFindUniqueArgs<ExtArgs>>): Prisma__ReturnItemClient<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReturnItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReturnItemFindUniqueOrThrowArgs} args - Arguments to find a ReturnItem
     * @example
     * // Get one ReturnItem
     * const returnItem = await prisma.returnItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReturnItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ReturnItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReturnItemClient<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReturnItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReturnItemFindFirstArgs} args - Arguments to find a ReturnItem
     * @example
     * // Get one ReturnItem
     * const returnItem = await prisma.returnItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReturnItemFindFirstArgs>(args?: SelectSubset<T, ReturnItemFindFirstArgs<ExtArgs>>): Prisma__ReturnItemClient<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReturnItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReturnItemFindFirstOrThrowArgs} args - Arguments to find a ReturnItem
     * @example
     * // Get one ReturnItem
     * const returnItem = await prisma.returnItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReturnItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ReturnItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReturnItemClient<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReturnItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReturnItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReturnItems
     * const returnItems = await prisma.returnItem.findMany()
     * 
     * // Get first 10 ReturnItems
     * const returnItems = await prisma.returnItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const returnItemWithIdOnly = await prisma.returnItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReturnItemFindManyArgs>(args?: SelectSubset<T, ReturnItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReturnItem.
     * @param {ReturnItemCreateArgs} args - Arguments to create a ReturnItem.
     * @example
     * // Create one ReturnItem
     * const ReturnItem = await prisma.returnItem.create({
     *   data: {
     *     // ... data to create a ReturnItem
     *   }
     * })
     * 
     */
    create<T extends ReturnItemCreateArgs>(args: SelectSubset<T, ReturnItemCreateArgs<ExtArgs>>): Prisma__ReturnItemClient<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReturnItems.
     * @param {ReturnItemCreateManyArgs} args - Arguments to create many ReturnItems.
     * @example
     * // Create many ReturnItems
     * const returnItem = await prisma.returnItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReturnItemCreateManyArgs>(args?: SelectSubset<T, ReturnItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReturnItems and returns the data saved in the database.
     * @param {ReturnItemCreateManyAndReturnArgs} args - Arguments to create many ReturnItems.
     * @example
     * // Create many ReturnItems
     * const returnItem = await prisma.returnItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReturnItems and only return the `id`
     * const returnItemWithIdOnly = await prisma.returnItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReturnItemCreateManyAndReturnArgs>(args?: SelectSubset<T, ReturnItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ReturnItem.
     * @param {ReturnItemDeleteArgs} args - Arguments to delete one ReturnItem.
     * @example
     * // Delete one ReturnItem
     * const ReturnItem = await prisma.returnItem.delete({
     *   where: {
     *     // ... filter to delete one ReturnItem
     *   }
     * })
     * 
     */
    delete<T extends ReturnItemDeleteArgs>(args: SelectSubset<T, ReturnItemDeleteArgs<ExtArgs>>): Prisma__ReturnItemClient<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReturnItem.
     * @param {ReturnItemUpdateArgs} args - Arguments to update one ReturnItem.
     * @example
     * // Update one ReturnItem
     * const returnItem = await prisma.returnItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReturnItemUpdateArgs>(args: SelectSubset<T, ReturnItemUpdateArgs<ExtArgs>>): Prisma__ReturnItemClient<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReturnItems.
     * @param {ReturnItemDeleteManyArgs} args - Arguments to filter ReturnItems to delete.
     * @example
     * // Delete a few ReturnItems
     * const { count } = await prisma.returnItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReturnItemDeleteManyArgs>(args?: SelectSubset<T, ReturnItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReturnItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReturnItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReturnItems
     * const returnItem = await prisma.returnItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReturnItemUpdateManyArgs>(args: SelectSubset<T, ReturnItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReturnItems and returns the data updated in the database.
     * @param {ReturnItemUpdateManyAndReturnArgs} args - Arguments to update many ReturnItems.
     * @example
     * // Update many ReturnItems
     * const returnItem = await prisma.returnItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ReturnItems and only return the `id`
     * const returnItemWithIdOnly = await prisma.returnItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReturnItemUpdateManyAndReturnArgs>(args: SelectSubset<T, ReturnItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ReturnItem.
     * @param {ReturnItemUpsertArgs} args - Arguments to update or create a ReturnItem.
     * @example
     * // Update or create a ReturnItem
     * const returnItem = await prisma.returnItem.upsert({
     *   create: {
     *     // ... data to create a ReturnItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReturnItem we want to update
     *   }
     * })
     */
    upsert<T extends ReturnItemUpsertArgs>(args: SelectSubset<T, ReturnItemUpsertArgs<ExtArgs>>): Prisma__ReturnItemClient<$Result.GetResult<Prisma.$ReturnItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReturnItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReturnItemCountArgs} args - Arguments to filter ReturnItems to count.
     * @example
     * // Count the number of ReturnItems
     * const count = await prisma.returnItem.count({
     *   where: {
     *     // ... the filter for the ReturnItems we want to count
     *   }
     * })
    **/
    count<T extends ReturnItemCountArgs>(
      args?: Subset<T, ReturnItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReturnItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReturnItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReturnItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReturnItemAggregateArgs>(args: Subset<T, ReturnItemAggregateArgs>): Prisma.PrismaPromise<GetReturnItemAggregateType<T>>

    /**
     * Group by ReturnItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReturnItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReturnItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReturnItemGroupByArgs['orderBy'] }
        : { orderBy?: ReturnItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReturnItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReturnItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReturnItem model
   */
  readonly fields: ReturnItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReturnItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReturnItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    returnRequest<T extends ReturnRequestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReturnRequestDefaultArgs<ExtArgs>>): Prisma__ReturnRequestClient<$Result.GetResult<Prisma.$ReturnRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReturnItem model
   */
  interface ReturnItemFieldRefs {
    readonly id: FieldRef<"ReturnItem", 'String'>
    readonly returnId: FieldRef<"ReturnItem", 'String'>
    readonly orderItemId: FieldRef<"ReturnItem", 'String'>
    readonly productId: FieldRef<"ReturnItem", 'String'>
    readonly sku: FieldRef<"ReturnItem", 'String'>
    readonly name: FieldRef<"ReturnItem", 'String'>
    readonly quantity: FieldRef<"ReturnItem", 'Int'>
    readonly unitPrice: FieldRef<"ReturnItem", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * ReturnItem findUnique
   */
  export type ReturnItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemInclude<ExtArgs> | null
    /**
     * Filter, which ReturnItem to fetch.
     */
    where: ReturnItemWhereUniqueInput
  }

  /**
   * ReturnItem findUniqueOrThrow
   */
  export type ReturnItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemInclude<ExtArgs> | null
    /**
     * Filter, which ReturnItem to fetch.
     */
    where: ReturnItemWhereUniqueInput
  }

  /**
   * ReturnItem findFirst
   */
  export type ReturnItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemInclude<ExtArgs> | null
    /**
     * Filter, which ReturnItem to fetch.
     */
    where?: ReturnItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReturnItems to fetch.
     */
    orderBy?: ReturnItemOrderByWithRelationInput | ReturnItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReturnItems.
     */
    cursor?: ReturnItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReturnItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReturnItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReturnItems.
     */
    distinct?: ReturnItemScalarFieldEnum | ReturnItemScalarFieldEnum[]
  }

  /**
   * ReturnItem findFirstOrThrow
   */
  export type ReturnItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemInclude<ExtArgs> | null
    /**
     * Filter, which ReturnItem to fetch.
     */
    where?: ReturnItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReturnItems to fetch.
     */
    orderBy?: ReturnItemOrderByWithRelationInput | ReturnItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReturnItems.
     */
    cursor?: ReturnItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReturnItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReturnItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReturnItems.
     */
    distinct?: ReturnItemScalarFieldEnum | ReturnItemScalarFieldEnum[]
  }

  /**
   * ReturnItem findMany
   */
  export type ReturnItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemInclude<ExtArgs> | null
    /**
     * Filter, which ReturnItems to fetch.
     */
    where?: ReturnItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReturnItems to fetch.
     */
    orderBy?: ReturnItemOrderByWithRelationInput | ReturnItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReturnItems.
     */
    cursor?: ReturnItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReturnItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReturnItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReturnItems.
     */
    distinct?: ReturnItemScalarFieldEnum | ReturnItemScalarFieldEnum[]
  }

  /**
   * ReturnItem create
   */
  export type ReturnItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemInclude<ExtArgs> | null
    /**
     * The data needed to create a ReturnItem.
     */
    data: XOR<ReturnItemCreateInput, ReturnItemUncheckedCreateInput>
  }

  /**
   * ReturnItem createMany
   */
  export type ReturnItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReturnItems.
     */
    data: ReturnItemCreateManyInput | ReturnItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReturnItem createManyAndReturn
   */
  export type ReturnItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * The data used to create many ReturnItems.
     */
    data: ReturnItemCreateManyInput | ReturnItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReturnItem update
   */
  export type ReturnItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemInclude<ExtArgs> | null
    /**
     * The data needed to update a ReturnItem.
     */
    data: XOR<ReturnItemUpdateInput, ReturnItemUncheckedUpdateInput>
    /**
     * Choose, which ReturnItem to update.
     */
    where: ReturnItemWhereUniqueInput
  }

  /**
   * ReturnItem updateMany
   */
  export type ReturnItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReturnItems.
     */
    data: XOR<ReturnItemUpdateManyMutationInput, ReturnItemUncheckedUpdateManyInput>
    /**
     * Filter which ReturnItems to update
     */
    where?: ReturnItemWhereInput
    /**
     * Limit how many ReturnItems to update.
     */
    limit?: number
  }

  /**
   * ReturnItem updateManyAndReturn
   */
  export type ReturnItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * The data used to update ReturnItems.
     */
    data: XOR<ReturnItemUpdateManyMutationInput, ReturnItemUncheckedUpdateManyInput>
    /**
     * Filter which ReturnItems to update
     */
    where?: ReturnItemWhereInput
    /**
     * Limit how many ReturnItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReturnItem upsert
   */
  export type ReturnItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemInclude<ExtArgs> | null
    /**
     * The filter to search for the ReturnItem to update in case it exists.
     */
    where: ReturnItemWhereUniqueInput
    /**
     * In case the ReturnItem found by the `where` argument doesn't exist, create a new ReturnItem with this data.
     */
    create: XOR<ReturnItemCreateInput, ReturnItemUncheckedCreateInput>
    /**
     * In case the ReturnItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReturnItemUpdateInput, ReturnItemUncheckedUpdateInput>
  }

  /**
   * ReturnItem delete
   */
  export type ReturnItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemInclude<ExtArgs> | null
    /**
     * Filter which ReturnItem to delete.
     */
    where: ReturnItemWhereUniqueInput
  }

  /**
   * ReturnItem deleteMany
   */
  export type ReturnItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReturnItems to delete
     */
    where?: ReturnItemWhereInput
    /**
     * Limit how many ReturnItems to delete.
     */
    limit?: number
  }

  /**
   * ReturnItem without action
   */
  export type ReturnItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReturnItem
     */
    select?: ReturnItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReturnItem
     */
    omit?: ReturnItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReturnItemInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    amount: Decimal | null
    resultCode: number | null
  }

  export type PaymentSumAggregateOutputType = {
    amount: Decimal | null
    resultCode: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    provider: string | null
    status: string | null
    amount: Decimal | null
    currency: string | null
    phone: string | null
    merchantRequestId: string | null
    checkoutRequestId: string | null
    receiptNumber: string | null
    resultCode: number | null
    resultDesc: string | null
    paidAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    provider: string | null
    status: string | null
    amount: Decimal | null
    currency: string | null
    phone: string | null
    merchantRequestId: string | null
    checkoutRequestId: string | null
    receiptNumber: string | null
    resultCode: number | null
    resultDesc: string | null
    paidAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    orderId: number
    provider: number
    status: number
    amount: number
    currency: number
    phone: number
    merchantRequestId: number
    checkoutRequestId: number
    receiptNumber: number
    resultCode: number
    resultDesc: number
    paidAt: number
    raw: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amount?: true
    resultCode?: true
  }

  export type PaymentSumAggregateInputType = {
    amount?: true
    resultCode?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    orderId?: true
    provider?: true
    status?: true
    amount?: true
    currency?: true
    phone?: true
    merchantRequestId?: true
    checkoutRequestId?: true
    receiptNumber?: true
    resultCode?: true
    resultDesc?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    orderId?: true
    provider?: true
    status?: true
    amount?: true
    currency?: true
    phone?: true
    merchantRequestId?: true
    checkoutRequestId?: true
    receiptNumber?: true
    resultCode?: true
    resultDesc?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    orderId?: true
    provider?: true
    status?: true
    amount?: true
    currency?: true
    phone?: true
    merchantRequestId?: true
    checkoutRequestId?: true
    receiptNumber?: true
    resultCode?: true
    resultDesc?: true
    paidAt?: true
    raw?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    orderId: string
    provider: string
    status: string
    amount: Decimal
    currency: string
    phone: string
    merchantRequestId: string | null
    checkoutRequestId: string | null
    receiptNumber: string | null
    resultCode: number | null
    resultDesc: string | null
    paidAt: Date | null
    raw: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    provider?: boolean
    status?: boolean
    amount?: boolean
    currency?: boolean
    phone?: boolean
    merchantRequestId?: boolean
    checkoutRequestId?: boolean
    receiptNumber?: boolean
    resultCode?: boolean
    resultDesc?: boolean
    paidAt?: boolean
    raw?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    provider?: boolean
    status?: boolean
    amount?: boolean
    currency?: boolean
    phone?: boolean
    merchantRequestId?: boolean
    checkoutRequestId?: boolean
    receiptNumber?: boolean
    resultCode?: boolean
    resultDesc?: boolean
    paidAt?: boolean
    raw?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    provider?: boolean
    status?: boolean
    amount?: boolean
    currency?: boolean
    phone?: boolean
    merchantRequestId?: boolean
    checkoutRequestId?: boolean
    receiptNumber?: boolean
    resultCode?: boolean
    resultDesc?: boolean
    paidAt?: boolean
    raw?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    orderId?: boolean
    provider?: boolean
    status?: boolean
    amount?: boolean
    currency?: boolean
    phone?: boolean
    merchantRequestId?: boolean
    checkoutRequestId?: boolean
    receiptNumber?: boolean
    resultCode?: boolean
    resultDesc?: boolean
    paidAt?: boolean
    raw?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "provider" | "status" | "amount" | "currency" | "phone" | "merchantRequestId" | "checkoutRequestId" | "receiptNumber" | "resultCode" | "resultDesc" | "paidAt" | "raw" | "createdAt" | "updatedAt", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      provider: string
      status: string
      amount: Prisma.Decimal
      currency: string
      phone: string
      merchantRequestId: string | null
      checkoutRequestId: string | null
      receiptNumber: string | null
      resultCode: number | null
      resultDesc: string | null
      paidAt: Date | null
      raw: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly orderId: FieldRef<"Payment", 'String'>
    readonly provider: FieldRef<"Payment", 'String'>
    readonly status: FieldRef<"Payment", 'String'>
    readonly amount: FieldRef<"Payment", 'Decimal'>
    readonly currency: FieldRef<"Payment", 'String'>
    readonly phone: FieldRef<"Payment", 'String'>
    readonly merchantRequestId: FieldRef<"Payment", 'String'>
    readonly checkoutRequestId: FieldRef<"Payment", 'String'>
    readonly receiptNumber: FieldRef<"Payment", 'String'>
    readonly resultCode: FieldRef<"Payment", 'Int'>
    readonly resultDesc: FieldRef<"Payment", 'String'>
    readonly paidAt: FieldRef<"Payment", 'DateTime'>
    readonly raw: FieldRef<"Payment", 'Json'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model DeliveryZone
   */

  export type AggregateDeliveryZone = {
    _count: DeliveryZoneCountAggregateOutputType | null
    _avg: DeliveryZoneAvgAggregateOutputType | null
    _sum: DeliveryZoneSumAggregateOutputType | null
    _min: DeliveryZoneMinAggregateOutputType | null
    _max: DeliveryZoneMaxAggregateOutputType | null
  }

  export type DeliveryZoneAvgAggregateOutputType = {
    fee: Decimal | null
    perKgFee: Decimal | null
    includedKg: Decimal | null
    freeAbove: Decimal | null
    minDays: number | null
    maxDays: number | null
    sortOrder: number | null
  }

  export type DeliveryZoneSumAggregateOutputType = {
    fee: Decimal | null
    perKgFee: Decimal | null
    includedKg: Decimal | null
    freeAbove: Decimal | null
    minDays: number | null
    maxDays: number | null
    sortOrder: number | null
  }

  export type DeliveryZoneMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isDefault: boolean | null
    fee: Decimal | null
    perKgFee: Decimal | null
    includedKg: Decimal | null
    freeAbove: Decimal | null
    minDays: number | null
    maxDays: number | null
    allowsCod: boolean | null
    isActive: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeliveryZoneMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isDefault: boolean | null
    fee: Decimal | null
    perKgFee: Decimal | null
    includedKg: Decimal | null
    freeAbove: Decimal | null
    minDays: number | null
    maxDays: number | null
    allowsCod: boolean | null
    isActive: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeliveryZoneCountAggregateOutputType = {
    id: number
    name: number
    description: number
    cities: number
    isDefault: number
    fee: number
    perKgFee: number
    includedKg: number
    freeAbove: number
    minDays: number
    maxDays: number
    allowsCod: number
    isActive: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DeliveryZoneAvgAggregateInputType = {
    fee?: true
    perKgFee?: true
    includedKg?: true
    freeAbove?: true
    minDays?: true
    maxDays?: true
    sortOrder?: true
  }

  export type DeliveryZoneSumAggregateInputType = {
    fee?: true
    perKgFee?: true
    includedKg?: true
    freeAbove?: true
    minDays?: true
    maxDays?: true
    sortOrder?: true
  }

  export type DeliveryZoneMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isDefault?: true
    fee?: true
    perKgFee?: true
    includedKg?: true
    freeAbove?: true
    minDays?: true
    maxDays?: true
    allowsCod?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeliveryZoneMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isDefault?: true
    fee?: true
    perKgFee?: true
    includedKg?: true
    freeAbove?: true
    minDays?: true
    maxDays?: true
    allowsCod?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeliveryZoneCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    cities?: true
    isDefault?: true
    fee?: true
    perKgFee?: true
    includedKg?: true
    freeAbove?: true
    minDays?: true
    maxDays?: true
    allowsCod?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DeliveryZoneAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeliveryZone to aggregate.
     */
    where?: DeliveryZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryZones to fetch.
     */
    orderBy?: DeliveryZoneOrderByWithRelationInput | DeliveryZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeliveryZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryZones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryZones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DeliveryZones
    **/
    _count?: true | DeliveryZoneCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeliveryZoneAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeliveryZoneSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeliveryZoneMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeliveryZoneMaxAggregateInputType
  }

  export type GetDeliveryZoneAggregateType<T extends DeliveryZoneAggregateArgs> = {
        [P in keyof T & keyof AggregateDeliveryZone]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeliveryZone[P]>
      : GetScalarType<T[P], AggregateDeliveryZone[P]>
  }




  export type DeliveryZoneGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeliveryZoneWhereInput
    orderBy?: DeliveryZoneOrderByWithAggregationInput | DeliveryZoneOrderByWithAggregationInput[]
    by: DeliveryZoneScalarFieldEnum[] | DeliveryZoneScalarFieldEnum
    having?: DeliveryZoneScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeliveryZoneCountAggregateInputType | true
    _avg?: DeliveryZoneAvgAggregateInputType
    _sum?: DeliveryZoneSumAggregateInputType
    _min?: DeliveryZoneMinAggregateInputType
    _max?: DeliveryZoneMaxAggregateInputType
  }

  export type DeliveryZoneGroupByOutputType = {
    id: string
    name: string
    description: string | null
    cities: string[]
    isDefault: boolean
    fee: Decimal
    perKgFee: Decimal
    includedKg: Decimal
    freeAbove: Decimal | null
    minDays: number
    maxDays: number
    allowsCod: boolean
    isActive: boolean
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    _count: DeliveryZoneCountAggregateOutputType | null
    _avg: DeliveryZoneAvgAggregateOutputType | null
    _sum: DeliveryZoneSumAggregateOutputType | null
    _min: DeliveryZoneMinAggregateOutputType | null
    _max: DeliveryZoneMaxAggregateOutputType | null
  }

  type GetDeliveryZoneGroupByPayload<T extends DeliveryZoneGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeliveryZoneGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeliveryZoneGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeliveryZoneGroupByOutputType[P]>
            : GetScalarType<T[P], DeliveryZoneGroupByOutputType[P]>
        }
      >
    >


  export type DeliveryZoneSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    cities?: boolean
    isDefault?: boolean
    fee?: boolean
    perKgFee?: boolean
    includedKg?: boolean
    freeAbove?: boolean
    minDays?: boolean
    maxDays?: boolean
    allowsCod?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["deliveryZone"]>

  export type DeliveryZoneSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    cities?: boolean
    isDefault?: boolean
    fee?: boolean
    perKgFee?: boolean
    includedKg?: boolean
    freeAbove?: boolean
    minDays?: boolean
    maxDays?: boolean
    allowsCod?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["deliveryZone"]>

  export type DeliveryZoneSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    cities?: boolean
    isDefault?: boolean
    fee?: boolean
    perKgFee?: boolean
    includedKg?: boolean
    freeAbove?: boolean
    minDays?: boolean
    maxDays?: boolean
    allowsCod?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["deliveryZone"]>

  export type DeliveryZoneSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    cities?: boolean
    isDefault?: boolean
    fee?: boolean
    perKgFee?: boolean
    includedKg?: boolean
    freeAbove?: boolean
    minDays?: boolean
    maxDays?: boolean
    allowsCod?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DeliveryZoneOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "cities" | "isDefault" | "fee" | "perKgFee" | "includedKg" | "freeAbove" | "minDays" | "maxDays" | "allowsCod" | "isActive" | "sortOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["deliveryZone"]>

  export type $DeliveryZonePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DeliveryZone"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      cities: string[]
      isDefault: boolean
      fee: Prisma.Decimal
      perKgFee: Prisma.Decimal
      includedKg: Prisma.Decimal
      freeAbove: Prisma.Decimal | null
      minDays: number
      maxDays: number
      allowsCod: boolean
      isActive: boolean
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["deliveryZone"]>
    composites: {}
  }

  type DeliveryZoneGetPayload<S extends boolean | null | undefined | DeliveryZoneDefaultArgs> = $Result.GetResult<Prisma.$DeliveryZonePayload, S>

  type DeliveryZoneCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeliveryZoneFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeliveryZoneCountAggregateInputType | true
    }

  export interface DeliveryZoneDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DeliveryZone'], meta: { name: 'DeliveryZone' } }
    /**
     * Find zero or one DeliveryZone that matches the filter.
     * @param {DeliveryZoneFindUniqueArgs} args - Arguments to find a DeliveryZone
     * @example
     * // Get one DeliveryZone
     * const deliveryZone = await prisma.deliveryZone.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeliveryZoneFindUniqueArgs>(args: SelectSubset<T, DeliveryZoneFindUniqueArgs<ExtArgs>>): Prisma__DeliveryZoneClient<$Result.GetResult<Prisma.$DeliveryZonePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DeliveryZone that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeliveryZoneFindUniqueOrThrowArgs} args - Arguments to find a DeliveryZone
     * @example
     * // Get one DeliveryZone
     * const deliveryZone = await prisma.deliveryZone.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeliveryZoneFindUniqueOrThrowArgs>(args: SelectSubset<T, DeliveryZoneFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeliveryZoneClient<$Result.GetResult<Prisma.$DeliveryZonePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeliveryZone that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryZoneFindFirstArgs} args - Arguments to find a DeliveryZone
     * @example
     * // Get one DeliveryZone
     * const deliveryZone = await prisma.deliveryZone.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeliveryZoneFindFirstArgs>(args?: SelectSubset<T, DeliveryZoneFindFirstArgs<ExtArgs>>): Prisma__DeliveryZoneClient<$Result.GetResult<Prisma.$DeliveryZonePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeliveryZone that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryZoneFindFirstOrThrowArgs} args - Arguments to find a DeliveryZone
     * @example
     * // Get one DeliveryZone
     * const deliveryZone = await prisma.deliveryZone.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeliveryZoneFindFirstOrThrowArgs>(args?: SelectSubset<T, DeliveryZoneFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeliveryZoneClient<$Result.GetResult<Prisma.$DeliveryZonePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DeliveryZones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryZoneFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeliveryZones
     * const deliveryZones = await prisma.deliveryZone.findMany()
     * 
     * // Get first 10 DeliveryZones
     * const deliveryZones = await prisma.deliveryZone.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deliveryZoneWithIdOnly = await prisma.deliveryZone.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeliveryZoneFindManyArgs>(args?: SelectSubset<T, DeliveryZoneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryZonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DeliveryZone.
     * @param {DeliveryZoneCreateArgs} args - Arguments to create a DeliveryZone.
     * @example
     * // Create one DeliveryZone
     * const DeliveryZone = await prisma.deliveryZone.create({
     *   data: {
     *     // ... data to create a DeliveryZone
     *   }
     * })
     * 
     */
    create<T extends DeliveryZoneCreateArgs>(args: SelectSubset<T, DeliveryZoneCreateArgs<ExtArgs>>): Prisma__DeliveryZoneClient<$Result.GetResult<Prisma.$DeliveryZonePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DeliveryZones.
     * @param {DeliveryZoneCreateManyArgs} args - Arguments to create many DeliveryZones.
     * @example
     * // Create many DeliveryZones
     * const deliveryZone = await prisma.deliveryZone.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeliveryZoneCreateManyArgs>(args?: SelectSubset<T, DeliveryZoneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DeliveryZones and returns the data saved in the database.
     * @param {DeliveryZoneCreateManyAndReturnArgs} args - Arguments to create many DeliveryZones.
     * @example
     * // Create many DeliveryZones
     * const deliveryZone = await prisma.deliveryZone.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DeliveryZones and only return the `id`
     * const deliveryZoneWithIdOnly = await prisma.deliveryZone.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeliveryZoneCreateManyAndReturnArgs>(args?: SelectSubset<T, DeliveryZoneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryZonePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DeliveryZone.
     * @param {DeliveryZoneDeleteArgs} args - Arguments to delete one DeliveryZone.
     * @example
     * // Delete one DeliveryZone
     * const DeliveryZone = await prisma.deliveryZone.delete({
     *   where: {
     *     // ... filter to delete one DeliveryZone
     *   }
     * })
     * 
     */
    delete<T extends DeliveryZoneDeleteArgs>(args: SelectSubset<T, DeliveryZoneDeleteArgs<ExtArgs>>): Prisma__DeliveryZoneClient<$Result.GetResult<Prisma.$DeliveryZonePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DeliveryZone.
     * @param {DeliveryZoneUpdateArgs} args - Arguments to update one DeliveryZone.
     * @example
     * // Update one DeliveryZone
     * const deliveryZone = await prisma.deliveryZone.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeliveryZoneUpdateArgs>(args: SelectSubset<T, DeliveryZoneUpdateArgs<ExtArgs>>): Prisma__DeliveryZoneClient<$Result.GetResult<Prisma.$DeliveryZonePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DeliveryZones.
     * @param {DeliveryZoneDeleteManyArgs} args - Arguments to filter DeliveryZones to delete.
     * @example
     * // Delete a few DeliveryZones
     * const { count } = await prisma.deliveryZone.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeliveryZoneDeleteManyArgs>(args?: SelectSubset<T, DeliveryZoneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeliveryZones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryZoneUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeliveryZones
     * const deliveryZone = await prisma.deliveryZone.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeliveryZoneUpdateManyArgs>(args: SelectSubset<T, DeliveryZoneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeliveryZones and returns the data updated in the database.
     * @param {DeliveryZoneUpdateManyAndReturnArgs} args - Arguments to update many DeliveryZones.
     * @example
     * // Update many DeliveryZones
     * const deliveryZone = await prisma.deliveryZone.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DeliveryZones and only return the `id`
     * const deliveryZoneWithIdOnly = await prisma.deliveryZone.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DeliveryZoneUpdateManyAndReturnArgs>(args: SelectSubset<T, DeliveryZoneUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryZonePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DeliveryZone.
     * @param {DeliveryZoneUpsertArgs} args - Arguments to update or create a DeliveryZone.
     * @example
     * // Update or create a DeliveryZone
     * const deliveryZone = await prisma.deliveryZone.upsert({
     *   create: {
     *     // ... data to create a DeliveryZone
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeliveryZone we want to update
     *   }
     * })
     */
    upsert<T extends DeliveryZoneUpsertArgs>(args: SelectSubset<T, DeliveryZoneUpsertArgs<ExtArgs>>): Prisma__DeliveryZoneClient<$Result.GetResult<Prisma.$DeliveryZonePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DeliveryZones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryZoneCountArgs} args - Arguments to filter DeliveryZones to count.
     * @example
     * // Count the number of DeliveryZones
     * const count = await prisma.deliveryZone.count({
     *   where: {
     *     // ... the filter for the DeliveryZones we want to count
     *   }
     * })
    **/
    count<T extends DeliveryZoneCountArgs>(
      args?: Subset<T, DeliveryZoneCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeliveryZoneCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DeliveryZone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryZoneAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeliveryZoneAggregateArgs>(args: Subset<T, DeliveryZoneAggregateArgs>): Prisma.PrismaPromise<GetDeliveryZoneAggregateType<T>>

    /**
     * Group by DeliveryZone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryZoneGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeliveryZoneGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeliveryZoneGroupByArgs['orderBy'] }
        : { orderBy?: DeliveryZoneGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeliveryZoneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeliveryZoneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DeliveryZone model
   */
  readonly fields: DeliveryZoneFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DeliveryZone.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeliveryZoneClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DeliveryZone model
   */
  interface DeliveryZoneFieldRefs {
    readonly id: FieldRef<"DeliveryZone", 'String'>
    readonly name: FieldRef<"DeliveryZone", 'String'>
    readonly description: FieldRef<"DeliveryZone", 'String'>
    readonly cities: FieldRef<"DeliveryZone", 'String[]'>
    readonly isDefault: FieldRef<"DeliveryZone", 'Boolean'>
    readonly fee: FieldRef<"DeliveryZone", 'Decimal'>
    readonly perKgFee: FieldRef<"DeliveryZone", 'Decimal'>
    readonly includedKg: FieldRef<"DeliveryZone", 'Decimal'>
    readonly freeAbove: FieldRef<"DeliveryZone", 'Decimal'>
    readonly minDays: FieldRef<"DeliveryZone", 'Int'>
    readonly maxDays: FieldRef<"DeliveryZone", 'Int'>
    readonly allowsCod: FieldRef<"DeliveryZone", 'Boolean'>
    readonly isActive: FieldRef<"DeliveryZone", 'Boolean'>
    readonly sortOrder: FieldRef<"DeliveryZone", 'Int'>
    readonly createdAt: FieldRef<"DeliveryZone", 'DateTime'>
    readonly updatedAt: FieldRef<"DeliveryZone", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DeliveryZone findUnique
   */
  export type DeliveryZoneFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryZone
     */
    select?: DeliveryZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryZone
     */
    omit?: DeliveryZoneOmit<ExtArgs> | null
    /**
     * Filter, which DeliveryZone to fetch.
     */
    where: DeliveryZoneWhereUniqueInput
  }

  /**
   * DeliveryZone findUniqueOrThrow
   */
  export type DeliveryZoneFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryZone
     */
    select?: DeliveryZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryZone
     */
    omit?: DeliveryZoneOmit<ExtArgs> | null
    /**
     * Filter, which DeliveryZone to fetch.
     */
    where: DeliveryZoneWhereUniqueInput
  }

  /**
   * DeliveryZone findFirst
   */
  export type DeliveryZoneFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryZone
     */
    select?: DeliveryZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryZone
     */
    omit?: DeliveryZoneOmit<ExtArgs> | null
    /**
     * Filter, which DeliveryZone to fetch.
     */
    where?: DeliveryZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryZones to fetch.
     */
    orderBy?: DeliveryZoneOrderByWithRelationInput | DeliveryZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeliveryZones.
     */
    cursor?: DeliveryZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryZones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryZones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeliveryZones.
     */
    distinct?: DeliveryZoneScalarFieldEnum | DeliveryZoneScalarFieldEnum[]
  }

  /**
   * DeliveryZone findFirstOrThrow
   */
  export type DeliveryZoneFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryZone
     */
    select?: DeliveryZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryZone
     */
    omit?: DeliveryZoneOmit<ExtArgs> | null
    /**
     * Filter, which DeliveryZone to fetch.
     */
    where?: DeliveryZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryZones to fetch.
     */
    orderBy?: DeliveryZoneOrderByWithRelationInput | DeliveryZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeliveryZones.
     */
    cursor?: DeliveryZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryZones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryZones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeliveryZones.
     */
    distinct?: DeliveryZoneScalarFieldEnum | DeliveryZoneScalarFieldEnum[]
  }

  /**
   * DeliveryZone findMany
   */
  export type DeliveryZoneFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryZone
     */
    select?: DeliveryZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryZone
     */
    omit?: DeliveryZoneOmit<ExtArgs> | null
    /**
     * Filter, which DeliveryZones to fetch.
     */
    where?: DeliveryZoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryZones to fetch.
     */
    orderBy?: DeliveryZoneOrderByWithRelationInput | DeliveryZoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DeliveryZones.
     */
    cursor?: DeliveryZoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryZones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryZones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeliveryZones.
     */
    distinct?: DeliveryZoneScalarFieldEnum | DeliveryZoneScalarFieldEnum[]
  }

  /**
   * DeliveryZone create
   */
  export type DeliveryZoneCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryZone
     */
    select?: DeliveryZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryZone
     */
    omit?: DeliveryZoneOmit<ExtArgs> | null
    /**
     * The data needed to create a DeliveryZone.
     */
    data: XOR<DeliveryZoneCreateInput, DeliveryZoneUncheckedCreateInput>
  }

  /**
   * DeliveryZone createMany
   */
  export type DeliveryZoneCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DeliveryZones.
     */
    data: DeliveryZoneCreateManyInput | DeliveryZoneCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DeliveryZone createManyAndReturn
   */
  export type DeliveryZoneCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryZone
     */
    select?: DeliveryZoneSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryZone
     */
    omit?: DeliveryZoneOmit<ExtArgs> | null
    /**
     * The data used to create many DeliveryZones.
     */
    data: DeliveryZoneCreateManyInput | DeliveryZoneCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DeliveryZone update
   */
  export type DeliveryZoneUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryZone
     */
    select?: DeliveryZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryZone
     */
    omit?: DeliveryZoneOmit<ExtArgs> | null
    /**
     * The data needed to update a DeliveryZone.
     */
    data: XOR<DeliveryZoneUpdateInput, DeliveryZoneUncheckedUpdateInput>
    /**
     * Choose, which DeliveryZone to update.
     */
    where: DeliveryZoneWhereUniqueInput
  }

  /**
   * DeliveryZone updateMany
   */
  export type DeliveryZoneUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DeliveryZones.
     */
    data: XOR<DeliveryZoneUpdateManyMutationInput, DeliveryZoneUncheckedUpdateManyInput>
    /**
     * Filter which DeliveryZones to update
     */
    where?: DeliveryZoneWhereInput
    /**
     * Limit how many DeliveryZones to update.
     */
    limit?: number
  }

  /**
   * DeliveryZone updateManyAndReturn
   */
  export type DeliveryZoneUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryZone
     */
    select?: DeliveryZoneSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryZone
     */
    omit?: DeliveryZoneOmit<ExtArgs> | null
    /**
     * The data used to update DeliveryZones.
     */
    data: XOR<DeliveryZoneUpdateManyMutationInput, DeliveryZoneUncheckedUpdateManyInput>
    /**
     * Filter which DeliveryZones to update
     */
    where?: DeliveryZoneWhereInput
    /**
     * Limit how many DeliveryZones to update.
     */
    limit?: number
  }

  /**
   * DeliveryZone upsert
   */
  export type DeliveryZoneUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryZone
     */
    select?: DeliveryZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryZone
     */
    omit?: DeliveryZoneOmit<ExtArgs> | null
    /**
     * The filter to search for the DeliveryZone to update in case it exists.
     */
    where: DeliveryZoneWhereUniqueInput
    /**
     * In case the DeliveryZone found by the `where` argument doesn't exist, create a new DeliveryZone with this data.
     */
    create: XOR<DeliveryZoneCreateInput, DeliveryZoneUncheckedCreateInput>
    /**
     * In case the DeliveryZone was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeliveryZoneUpdateInput, DeliveryZoneUncheckedUpdateInput>
  }

  /**
   * DeliveryZone delete
   */
  export type DeliveryZoneDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryZone
     */
    select?: DeliveryZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryZone
     */
    omit?: DeliveryZoneOmit<ExtArgs> | null
    /**
     * Filter which DeliveryZone to delete.
     */
    where: DeliveryZoneWhereUniqueInput
  }

  /**
   * DeliveryZone deleteMany
   */
  export type DeliveryZoneDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeliveryZones to delete
     */
    where?: DeliveryZoneWhereInput
    /**
     * Limit how many DeliveryZones to delete.
     */
    limit?: number
  }

  /**
   * DeliveryZone without action
   */
  export type DeliveryZoneDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryZone
     */
    select?: DeliveryZoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryZone
     */
    omit?: DeliveryZoneOmit<ExtArgs> | null
  }


  /**
   * Model CheckoutSettings
   */

  export type AggregateCheckoutSettings = {
    _count: CheckoutSettingsCountAggregateOutputType | null
    _avg: CheckoutSettingsAvgAggregateOutputType | null
    _sum: CheckoutSettingsSumAggregateOutputType | null
    _min: CheckoutSettingsMinAggregateOutputType | null
    _max: CheckoutSettingsMaxAggregateOutputType | null
  }

  export type CheckoutSettingsAvgAggregateOutputType = {
    id: number | null
    vatRate: Decimal | null
  }

  export type CheckoutSettingsSumAggregateOutputType = {
    id: number | null
    vatRate: Decimal | null
  }

  export type CheckoutSettingsMinAggregateOutputType = {
    id: number | null
    vatRate: Decimal | null
    vatOnShipping: boolean | null
    updatedBy: string | null
    updatedAt: Date | null
  }

  export type CheckoutSettingsMaxAggregateOutputType = {
    id: number | null
    vatRate: Decimal | null
    vatOnShipping: boolean | null
    updatedBy: string | null
    updatedAt: Date | null
  }

  export type CheckoutSettingsCountAggregateOutputType = {
    id: number
    vatRate: number
    vatOnShipping: number
    updatedBy: number
    updatedAt: number
    _all: number
  }


  export type CheckoutSettingsAvgAggregateInputType = {
    id?: true
    vatRate?: true
  }

  export type CheckoutSettingsSumAggregateInputType = {
    id?: true
    vatRate?: true
  }

  export type CheckoutSettingsMinAggregateInputType = {
    id?: true
    vatRate?: true
    vatOnShipping?: true
    updatedBy?: true
    updatedAt?: true
  }

  export type CheckoutSettingsMaxAggregateInputType = {
    id?: true
    vatRate?: true
    vatOnShipping?: true
    updatedBy?: true
    updatedAt?: true
  }

  export type CheckoutSettingsCountAggregateInputType = {
    id?: true
    vatRate?: true
    vatOnShipping?: true
    updatedBy?: true
    updatedAt?: true
    _all?: true
  }

  export type CheckoutSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CheckoutSettings to aggregate.
     */
    where?: CheckoutSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CheckoutSettings to fetch.
     */
    orderBy?: CheckoutSettingsOrderByWithRelationInput | CheckoutSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CheckoutSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CheckoutSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CheckoutSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CheckoutSettings
    **/
    _count?: true | CheckoutSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CheckoutSettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CheckoutSettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CheckoutSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CheckoutSettingsMaxAggregateInputType
  }

  export type GetCheckoutSettingsAggregateType<T extends CheckoutSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateCheckoutSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCheckoutSettings[P]>
      : GetScalarType<T[P], AggregateCheckoutSettings[P]>
  }




  export type CheckoutSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CheckoutSettingsWhereInput
    orderBy?: CheckoutSettingsOrderByWithAggregationInput | CheckoutSettingsOrderByWithAggregationInput[]
    by: CheckoutSettingsScalarFieldEnum[] | CheckoutSettingsScalarFieldEnum
    having?: CheckoutSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CheckoutSettingsCountAggregateInputType | true
    _avg?: CheckoutSettingsAvgAggregateInputType
    _sum?: CheckoutSettingsSumAggregateInputType
    _min?: CheckoutSettingsMinAggregateInputType
    _max?: CheckoutSettingsMaxAggregateInputType
  }

  export type CheckoutSettingsGroupByOutputType = {
    id: number
    vatRate: Decimal
    vatOnShipping: boolean
    updatedBy: string | null
    updatedAt: Date
    _count: CheckoutSettingsCountAggregateOutputType | null
    _avg: CheckoutSettingsAvgAggregateOutputType | null
    _sum: CheckoutSettingsSumAggregateOutputType | null
    _min: CheckoutSettingsMinAggregateOutputType | null
    _max: CheckoutSettingsMaxAggregateOutputType | null
  }

  type GetCheckoutSettingsGroupByPayload<T extends CheckoutSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CheckoutSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CheckoutSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CheckoutSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], CheckoutSettingsGroupByOutputType[P]>
        }
      >
    >


  export type CheckoutSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vatRate?: boolean
    vatOnShipping?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["checkoutSettings"]>

  export type CheckoutSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vatRate?: boolean
    vatOnShipping?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["checkoutSettings"]>

  export type CheckoutSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vatRate?: boolean
    vatOnShipping?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["checkoutSettings"]>

  export type CheckoutSettingsSelectScalar = {
    id?: boolean
    vatRate?: boolean
    vatOnShipping?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
  }

  export type CheckoutSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "vatRate" | "vatOnShipping" | "updatedBy" | "updatedAt", ExtArgs["result"]["checkoutSettings"]>

  export type $CheckoutSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CheckoutSettings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      vatRate: Prisma.Decimal
      vatOnShipping: boolean
      updatedBy: string | null
      updatedAt: Date
    }, ExtArgs["result"]["checkoutSettings"]>
    composites: {}
  }

  type CheckoutSettingsGetPayload<S extends boolean | null | undefined | CheckoutSettingsDefaultArgs> = $Result.GetResult<Prisma.$CheckoutSettingsPayload, S>

  type CheckoutSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CheckoutSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CheckoutSettingsCountAggregateInputType | true
    }

  export interface CheckoutSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CheckoutSettings'], meta: { name: 'CheckoutSettings' } }
    /**
     * Find zero or one CheckoutSettings that matches the filter.
     * @param {CheckoutSettingsFindUniqueArgs} args - Arguments to find a CheckoutSettings
     * @example
     * // Get one CheckoutSettings
     * const checkoutSettings = await prisma.checkoutSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CheckoutSettingsFindUniqueArgs>(args: SelectSubset<T, CheckoutSettingsFindUniqueArgs<ExtArgs>>): Prisma__CheckoutSettingsClient<$Result.GetResult<Prisma.$CheckoutSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CheckoutSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CheckoutSettingsFindUniqueOrThrowArgs} args - Arguments to find a CheckoutSettings
     * @example
     * // Get one CheckoutSettings
     * const checkoutSettings = await prisma.checkoutSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CheckoutSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, CheckoutSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CheckoutSettingsClient<$Result.GetResult<Prisma.$CheckoutSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CheckoutSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutSettingsFindFirstArgs} args - Arguments to find a CheckoutSettings
     * @example
     * // Get one CheckoutSettings
     * const checkoutSettings = await prisma.checkoutSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CheckoutSettingsFindFirstArgs>(args?: SelectSubset<T, CheckoutSettingsFindFirstArgs<ExtArgs>>): Prisma__CheckoutSettingsClient<$Result.GetResult<Prisma.$CheckoutSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CheckoutSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutSettingsFindFirstOrThrowArgs} args - Arguments to find a CheckoutSettings
     * @example
     * // Get one CheckoutSettings
     * const checkoutSettings = await prisma.checkoutSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CheckoutSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, CheckoutSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__CheckoutSettingsClient<$Result.GetResult<Prisma.$CheckoutSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CheckoutSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CheckoutSettings
     * const checkoutSettings = await prisma.checkoutSettings.findMany()
     * 
     * // Get first 10 CheckoutSettings
     * const checkoutSettings = await prisma.checkoutSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const checkoutSettingsWithIdOnly = await prisma.checkoutSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CheckoutSettingsFindManyArgs>(args?: SelectSubset<T, CheckoutSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CheckoutSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CheckoutSettings.
     * @param {CheckoutSettingsCreateArgs} args - Arguments to create a CheckoutSettings.
     * @example
     * // Create one CheckoutSettings
     * const CheckoutSettings = await prisma.checkoutSettings.create({
     *   data: {
     *     // ... data to create a CheckoutSettings
     *   }
     * })
     * 
     */
    create<T extends CheckoutSettingsCreateArgs>(args: SelectSubset<T, CheckoutSettingsCreateArgs<ExtArgs>>): Prisma__CheckoutSettingsClient<$Result.GetResult<Prisma.$CheckoutSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CheckoutSettings.
     * @param {CheckoutSettingsCreateManyArgs} args - Arguments to create many CheckoutSettings.
     * @example
     * // Create many CheckoutSettings
     * const checkoutSettings = await prisma.checkoutSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CheckoutSettingsCreateManyArgs>(args?: SelectSubset<T, CheckoutSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CheckoutSettings and returns the data saved in the database.
     * @param {CheckoutSettingsCreateManyAndReturnArgs} args - Arguments to create many CheckoutSettings.
     * @example
     * // Create many CheckoutSettings
     * const checkoutSettings = await prisma.checkoutSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CheckoutSettings and only return the `id`
     * const checkoutSettingsWithIdOnly = await prisma.checkoutSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CheckoutSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, CheckoutSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CheckoutSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CheckoutSettings.
     * @param {CheckoutSettingsDeleteArgs} args - Arguments to delete one CheckoutSettings.
     * @example
     * // Delete one CheckoutSettings
     * const CheckoutSettings = await prisma.checkoutSettings.delete({
     *   where: {
     *     // ... filter to delete one CheckoutSettings
     *   }
     * })
     * 
     */
    delete<T extends CheckoutSettingsDeleteArgs>(args: SelectSubset<T, CheckoutSettingsDeleteArgs<ExtArgs>>): Prisma__CheckoutSettingsClient<$Result.GetResult<Prisma.$CheckoutSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CheckoutSettings.
     * @param {CheckoutSettingsUpdateArgs} args - Arguments to update one CheckoutSettings.
     * @example
     * // Update one CheckoutSettings
     * const checkoutSettings = await prisma.checkoutSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CheckoutSettingsUpdateArgs>(args: SelectSubset<T, CheckoutSettingsUpdateArgs<ExtArgs>>): Prisma__CheckoutSettingsClient<$Result.GetResult<Prisma.$CheckoutSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CheckoutSettings.
     * @param {CheckoutSettingsDeleteManyArgs} args - Arguments to filter CheckoutSettings to delete.
     * @example
     * // Delete a few CheckoutSettings
     * const { count } = await prisma.checkoutSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CheckoutSettingsDeleteManyArgs>(args?: SelectSubset<T, CheckoutSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CheckoutSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CheckoutSettings
     * const checkoutSettings = await prisma.checkoutSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CheckoutSettingsUpdateManyArgs>(args: SelectSubset<T, CheckoutSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CheckoutSettings and returns the data updated in the database.
     * @param {CheckoutSettingsUpdateManyAndReturnArgs} args - Arguments to update many CheckoutSettings.
     * @example
     * // Update many CheckoutSettings
     * const checkoutSettings = await prisma.checkoutSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CheckoutSettings and only return the `id`
     * const checkoutSettingsWithIdOnly = await prisma.checkoutSettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CheckoutSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, CheckoutSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CheckoutSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CheckoutSettings.
     * @param {CheckoutSettingsUpsertArgs} args - Arguments to update or create a CheckoutSettings.
     * @example
     * // Update or create a CheckoutSettings
     * const checkoutSettings = await prisma.checkoutSettings.upsert({
     *   create: {
     *     // ... data to create a CheckoutSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CheckoutSettings we want to update
     *   }
     * })
     */
    upsert<T extends CheckoutSettingsUpsertArgs>(args: SelectSubset<T, CheckoutSettingsUpsertArgs<ExtArgs>>): Prisma__CheckoutSettingsClient<$Result.GetResult<Prisma.$CheckoutSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CheckoutSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutSettingsCountArgs} args - Arguments to filter CheckoutSettings to count.
     * @example
     * // Count the number of CheckoutSettings
     * const count = await prisma.checkoutSettings.count({
     *   where: {
     *     // ... the filter for the CheckoutSettings we want to count
     *   }
     * })
    **/
    count<T extends CheckoutSettingsCountArgs>(
      args?: Subset<T, CheckoutSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CheckoutSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CheckoutSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CheckoutSettingsAggregateArgs>(args: Subset<T, CheckoutSettingsAggregateArgs>): Prisma.PrismaPromise<GetCheckoutSettingsAggregateType<T>>

    /**
     * Group by CheckoutSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CheckoutSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CheckoutSettingsGroupByArgs['orderBy'] }
        : { orderBy?: CheckoutSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CheckoutSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCheckoutSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CheckoutSettings model
   */
  readonly fields: CheckoutSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CheckoutSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CheckoutSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CheckoutSettings model
   */
  interface CheckoutSettingsFieldRefs {
    readonly id: FieldRef<"CheckoutSettings", 'Int'>
    readonly vatRate: FieldRef<"CheckoutSettings", 'Decimal'>
    readonly vatOnShipping: FieldRef<"CheckoutSettings", 'Boolean'>
    readonly updatedBy: FieldRef<"CheckoutSettings", 'String'>
    readonly updatedAt: FieldRef<"CheckoutSettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CheckoutSettings findUnique
   */
  export type CheckoutSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSettings
     */
    select?: CheckoutSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutSettings
     */
    omit?: CheckoutSettingsOmit<ExtArgs> | null
    /**
     * Filter, which CheckoutSettings to fetch.
     */
    where: CheckoutSettingsWhereUniqueInput
  }

  /**
   * CheckoutSettings findUniqueOrThrow
   */
  export type CheckoutSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSettings
     */
    select?: CheckoutSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutSettings
     */
    omit?: CheckoutSettingsOmit<ExtArgs> | null
    /**
     * Filter, which CheckoutSettings to fetch.
     */
    where: CheckoutSettingsWhereUniqueInput
  }

  /**
   * CheckoutSettings findFirst
   */
  export type CheckoutSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSettings
     */
    select?: CheckoutSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutSettings
     */
    omit?: CheckoutSettingsOmit<ExtArgs> | null
    /**
     * Filter, which CheckoutSettings to fetch.
     */
    where?: CheckoutSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CheckoutSettings to fetch.
     */
    orderBy?: CheckoutSettingsOrderByWithRelationInput | CheckoutSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CheckoutSettings.
     */
    cursor?: CheckoutSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CheckoutSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CheckoutSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CheckoutSettings.
     */
    distinct?: CheckoutSettingsScalarFieldEnum | CheckoutSettingsScalarFieldEnum[]
  }

  /**
   * CheckoutSettings findFirstOrThrow
   */
  export type CheckoutSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSettings
     */
    select?: CheckoutSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutSettings
     */
    omit?: CheckoutSettingsOmit<ExtArgs> | null
    /**
     * Filter, which CheckoutSettings to fetch.
     */
    where?: CheckoutSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CheckoutSettings to fetch.
     */
    orderBy?: CheckoutSettingsOrderByWithRelationInput | CheckoutSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CheckoutSettings.
     */
    cursor?: CheckoutSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CheckoutSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CheckoutSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CheckoutSettings.
     */
    distinct?: CheckoutSettingsScalarFieldEnum | CheckoutSettingsScalarFieldEnum[]
  }

  /**
   * CheckoutSettings findMany
   */
  export type CheckoutSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSettings
     */
    select?: CheckoutSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutSettings
     */
    omit?: CheckoutSettingsOmit<ExtArgs> | null
    /**
     * Filter, which CheckoutSettings to fetch.
     */
    where?: CheckoutSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CheckoutSettings to fetch.
     */
    orderBy?: CheckoutSettingsOrderByWithRelationInput | CheckoutSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CheckoutSettings.
     */
    cursor?: CheckoutSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CheckoutSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CheckoutSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CheckoutSettings.
     */
    distinct?: CheckoutSettingsScalarFieldEnum | CheckoutSettingsScalarFieldEnum[]
  }

  /**
   * CheckoutSettings create
   */
  export type CheckoutSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSettings
     */
    select?: CheckoutSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutSettings
     */
    omit?: CheckoutSettingsOmit<ExtArgs> | null
    /**
     * The data needed to create a CheckoutSettings.
     */
    data: XOR<CheckoutSettingsCreateInput, CheckoutSettingsUncheckedCreateInput>
  }

  /**
   * CheckoutSettings createMany
   */
  export type CheckoutSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CheckoutSettings.
     */
    data: CheckoutSettingsCreateManyInput | CheckoutSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CheckoutSettings createManyAndReturn
   */
  export type CheckoutSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSettings
     */
    select?: CheckoutSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutSettings
     */
    omit?: CheckoutSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many CheckoutSettings.
     */
    data: CheckoutSettingsCreateManyInput | CheckoutSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CheckoutSettings update
   */
  export type CheckoutSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSettings
     */
    select?: CheckoutSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutSettings
     */
    omit?: CheckoutSettingsOmit<ExtArgs> | null
    /**
     * The data needed to update a CheckoutSettings.
     */
    data: XOR<CheckoutSettingsUpdateInput, CheckoutSettingsUncheckedUpdateInput>
    /**
     * Choose, which CheckoutSettings to update.
     */
    where: CheckoutSettingsWhereUniqueInput
  }

  /**
   * CheckoutSettings updateMany
   */
  export type CheckoutSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CheckoutSettings.
     */
    data: XOR<CheckoutSettingsUpdateManyMutationInput, CheckoutSettingsUncheckedUpdateManyInput>
    /**
     * Filter which CheckoutSettings to update
     */
    where?: CheckoutSettingsWhereInput
    /**
     * Limit how many CheckoutSettings to update.
     */
    limit?: number
  }

  /**
   * CheckoutSettings updateManyAndReturn
   */
  export type CheckoutSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSettings
     */
    select?: CheckoutSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutSettings
     */
    omit?: CheckoutSettingsOmit<ExtArgs> | null
    /**
     * The data used to update CheckoutSettings.
     */
    data: XOR<CheckoutSettingsUpdateManyMutationInput, CheckoutSettingsUncheckedUpdateManyInput>
    /**
     * Filter which CheckoutSettings to update
     */
    where?: CheckoutSettingsWhereInput
    /**
     * Limit how many CheckoutSettings to update.
     */
    limit?: number
  }

  /**
   * CheckoutSettings upsert
   */
  export type CheckoutSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSettings
     */
    select?: CheckoutSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutSettings
     */
    omit?: CheckoutSettingsOmit<ExtArgs> | null
    /**
     * The filter to search for the CheckoutSettings to update in case it exists.
     */
    where: CheckoutSettingsWhereUniqueInput
    /**
     * In case the CheckoutSettings found by the `where` argument doesn't exist, create a new CheckoutSettings with this data.
     */
    create: XOR<CheckoutSettingsCreateInput, CheckoutSettingsUncheckedCreateInput>
    /**
     * In case the CheckoutSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CheckoutSettingsUpdateInput, CheckoutSettingsUncheckedUpdateInput>
  }

  /**
   * CheckoutSettings delete
   */
  export type CheckoutSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSettings
     */
    select?: CheckoutSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutSettings
     */
    omit?: CheckoutSettingsOmit<ExtArgs> | null
    /**
     * Filter which CheckoutSettings to delete.
     */
    where: CheckoutSettingsWhereUniqueInput
  }

  /**
   * CheckoutSettings deleteMany
   */
  export type CheckoutSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CheckoutSettings to delete
     */
    where?: CheckoutSettingsWhereInput
    /**
     * Limit how many CheckoutSettings to delete.
     */
    limit?: number
  }

  /**
   * CheckoutSettings without action
   */
  export type CheckoutSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSettings
     */
    select?: CheckoutSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutSettings
     */
    omit?: CheckoutSettingsOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const OrderScalarFieldEnum: {
    id: 'id',
    orderNumber: 'orderNumber',
    customerId: 'customerId',
    customerEmail: 'customerEmail',
    customerName: 'customerName',
    customerPhone: 'customerPhone',
    status: 'status',
    paymentStatus: 'paymentStatus',
    paymentMethod: 'paymentMethod',
    currency: 'currency',
    subtotal: 'subtotal',
    taxAmount: 'taxAmount',
    shippingAmount: 'shippingAmount',
    discountAmount: 'discountAmount',
    total: 'total',
    taxRate: 'taxRate',
    deliveryZoneName: 'deliveryZoneName',
    paymentDueAt: 'paymentDueAt',
    couponCode: 'couponCode',
    customerNote: 'customerNote',
    shippingAddress: 'shippingAddress',
    billingAddress: 'billingAddress',
    trackingNumber: 'trackingNumber',
    trackingCarrier: 'trackingCarrier',
    estimatedDeliveryAt: 'estimatedDeliveryAt',
    shippedAt: 'shippedAt',
    deliveredAt: 'deliveredAt',
    cancelledAt: 'cancelledAt',
    cancelReason: 'cancelReason',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const OrderItemScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    productId: 'productId',
    variantId: 'variantId',
    sku: 'sku',
    name: 'name',
    image: 'image',
    unitPrice: 'unitPrice',
    unitCost: 'unitCost',
    quantity: 'quantity',
    subtotal: 'subtotal',
    attributes: 'attributes',
    createdAt: 'createdAt'
  };

  export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum]


  export const OrderStatusHistoryScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    type: 'type',
    status: 'status',
    note: 'note',
    location: 'location',
    isPublic: 'isPublic',
    changedBy: 'changedBy',
    actor: 'actor',
    createdAt: 'createdAt'
  };

  export type OrderStatusHistoryScalarFieldEnum = (typeof OrderStatusHistoryScalarFieldEnum)[keyof typeof OrderStatusHistoryScalarFieldEnum]


  export const OrderNoteScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    content: 'content',
    authorId: 'authorId',
    isInternal: 'isInternal',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrderNoteScalarFieldEnum = (typeof OrderNoteScalarFieldEnum)[keyof typeof OrderNoteScalarFieldEnum]


  export const ReturnRequestScalarFieldEnum: {
    id: 'id',
    rmaNumber: 'rmaNumber',
    orderId: 'orderId',
    customerId: 'customerId',
    status: 'status',
    reason: 'reason',
    details: 'details',
    photos: 'photos',
    resolution: 'resolution',
    instructions: 'instructions',
    rejectReason: 'rejectReason',
    restocked: 'restocked',
    refundAmount: 'refundAmount',
    adminNote: 'adminNote',
    approvedAt: 'approvedAt',
    rejectedAt: 'rejectedAt',
    receivedAt: 'receivedAt',
    refundedAt: 'refundedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReturnRequestScalarFieldEnum = (typeof ReturnRequestScalarFieldEnum)[keyof typeof ReturnRequestScalarFieldEnum]


  export const ReturnItemScalarFieldEnum: {
    id: 'id',
    returnId: 'returnId',
    orderItemId: 'orderItemId',
    productId: 'productId',
    sku: 'sku',
    name: 'name',
    quantity: 'quantity',
    unitPrice: 'unitPrice'
  };

  export type ReturnItemScalarFieldEnum = (typeof ReturnItemScalarFieldEnum)[keyof typeof ReturnItemScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    provider: 'provider',
    status: 'status',
    amount: 'amount',
    currency: 'currency',
    phone: 'phone',
    merchantRequestId: 'merchantRequestId',
    checkoutRequestId: 'checkoutRequestId',
    receiptNumber: 'receiptNumber',
    resultCode: 'resultCode',
    resultDesc: 'resultDesc',
    paidAt: 'paidAt',
    raw: 'raw',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const DeliveryZoneScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    cities: 'cities',
    isDefault: 'isDefault',
    fee: 'fee',
    perKgFee: 'perKgFee',
    includedKg: 'includedKg',
    freeAbove: 'freeAbove',
    minDays: 'minDays',
    maxDays: 'maxDays',
    allowsCod: 'allowsCod',
    isActive: 'isActive',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DeliveryZoneScalarFieldEnum = (typeof DeliveryZoneScalarFieldEnum)[keyof typeof DeliveryZoneScalarFieldEnum]


  export const CheckoutSettingsScalarFieldEnum: {
    id: 'id',
    vatRate: 'vatRate',
    vatOnShipping: 'vatOnShipping',
    updatedBy: 'updatedBy',
    updatedAt: 'updatedAt'
  };

  export type CheckoutSettingsScalarFieldEnum = (typeof CheckoutSettingsScalarFieldEnum)[keyof typeof CheckoutSettingsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    orderNumber?: StringFilter<"Order"> | string
    customerId?: StringFilter<"Order"> | string
    customerEmail?: StringFilter<"Order"> | string
    customerName?: StringFilter<"Order"> | string
    customerPhone?: StringNullableFilter<"Order"> | string | null
    status?: StringFilter<"Order"> | string
    paymentStatus?: StringFilter<"Order"> | string
    paymentMethod?: StringNullableFilter<"Order"> | string | null
    currency?: StringFilter<"Order"> | string
    subtotal?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    shippingAmount?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    total?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    taxRate?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: StringNullableFilter<"Order"> | string | null
    paymentDueAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    couponCode?: StringNullableFilter<"Order"> | string | null
    customerNote?: StringNullableFilter<"Order"> | string | null
    shippingAddress?: JsonFilter<"Order">
    billingAddress?: JsonNullableFilter<"Order">
    trackingNumber?: StringNullableFilter<"Order"> | string | null
    trackingCarrier?: StringNullableFilter<"Order"> | string | null
    estimatedDeliveryAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    shippedAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    deliveredAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    cancelledAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    cancelReason?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    items?: OrderItemListRelationFilter
    statusHistory?: OrderStatusHistoryListRelationFilter
    notes?: OrderNoteListRelationFilter
    returns?: ReturnRequestListRelationFilter
    payments?: PaymentListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    customerId?: SortOrder
    customerEmail?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrderInput | SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    currency?: SortOrder
    subtotal?: SortOrder
    taxAmount?: SortOrder
    shippingAmount?: SortOrder
    discountAmount?: SortOrder
    total?: SortOrder
    taxRate?: SortOrderInput | SortOrder
    deliveryZoneName?: SortOrderInput | SortOrder
    paymentDueAt?: SortOrderInput | SortOrder
    couponCode?: SortOrderInput | SortOrder
    customerNote?: SortOrderInput | SortOrder
    shippingAddress?: SortOrder
    billingAddress?: SortOrderInput | SortOrder
    trackingNumber?: SortOrderInput | SortOrder
    trackingCarrier?: SortOrderInput | SortOrder
    estimatedDeliveryAt?: SortOrderInput | SortOrder
    shippedAt?: SortOrderInput | SortOrder
    deliveredAt?: SortOrderInput | SortOrder
    cancelledAt?: SortOrderInput | SortOrder
    cancelReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    items?: OrderItemOrderByRelationAggregateInput
    statusHistory?: OrderStatusHistoryOrderByRelationAggregateInput
    notes?: OrderNoteOrderByRelationAggregateInput
    returns?: ReturnRequestOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orderNumber?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    customerId?: StringFilter<"Order"> | string
    customerEmail?: StringFilter<"Order"> | string
    customerName?: StringFilter<"Order"> | string
    customerPhone?: StringNullableFilter<"Order"> | string | null
    status?: StringFilter<"Order"> | string
    paymentStatus?: StringFilter<"Order"> | string
    paymentMethod?: StringNullableFilter<"Order"> | string | null
    currency?: StringFilter<"Order"> | string
    subtotal?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    shippingAmount?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    total?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    taxRate?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: StringNullableFilter<"Order"> | string | null
    paymentDueAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    couponCode?: StringNullableFilter<"Order"> | string | null
    customerNote?: StringNullableFilter<"Order"> | string | null
    shippingAddress?: JsonFilter<"Order">
    billingAddress?: JsonNullableFilter<"Order">
    trackingNumber?: StringNullableFilter<"Order"> | string | null
    trackingCarrier?: StringNullableFilter<"Order"> | string | null
    estimatedDeliveryAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    shippedAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    deliveredAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    cancelledAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    cancelReason?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    items?: OrderItemListRelationFilter
    statusHistory?: OrderStatusHistoryListRelationFilter
    notes?: OrderNoteListRelationFilter
    returns?: ReturnRequestListRelationFilter
    payments?: PaymentListRelationFilter
  }, "id" | "orderNumber">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    customerId?: SortOrder
    customerEmail?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrderInput | SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    currency?: SortOrder
    subtotal?: SortOrder
    taxAmount?: SortOrder
    shippingAmount?: SortOrder
    discountAmount?: SortOrder
    total?: SortOrder
    taxRate?: SortOrderInput | SortOrder
    deliveryZoneName?: SortOrderInput | SortOrder
    paymentDueAt?: SortOrderInput | SortOrder
    couponCode?: SortOrderInput | SortOrder
    customerNote?: SortOrderInput | SortOrder
    shippingAddress?: SortOrder
    billingAddress?: SortOrderInput | SortOrder
    trackingNumber?: SortOrderInput | SortOrder
    trackingCarrier?: SortOrderInput | SortOrder
    estimatedDeliveryAt?: SortOrderInput | SortOrder
    shippedAt?: SortOrderInput | SortOrder
    deliveredAt?: SortOrderInput | SortOrder
    cancelledAt?: SortOrderInput | SortOrder
    cancelReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    orderNumber?: StringWithAggregatesFilter<"Order"> | string
    customerId?: StringWithAggregatesFilter<"Order"> | string
    customerEmail?: StringWithAggregatesFilter<"Order"> | string
    customerName?: StringWithAggregatesFilter<"Order"> | string
    customerPhone?: StringNullableWithAggregatesFilter<"Order"> | string | null
    status?: StringWithAggregatesFilter<"Order"> | string
    paymentStatus?: StringWithAggregatesFilter<"Order"> | string
    paymentMethod?: StringNullableWithAggregatesFilter<"Order"> | string | null
    currency?: StringWithAggregatesFilter<"Order"> | string
    subtotal?: DecimalWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string
    shippingAmount?: DecimalWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string
    total?: DecimalWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string
    taxRate?: DecimalNullableWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: StringNullableWithAggregatesFilter<"Order"> | string | null
    paymentDueAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    couponCode?: StringNullableWithAggregatesFilter<"Order"> | string | null
    customerNote?: StringNullableWithAggregatesFilter<"Order"> | string | null
    shippingAddress?: JsonWithAggregatesFilter<"Order">
    billingAddress?: JsonNullableWithAggregatesFilter<"Order">
    trackingNumber?: StringNullableWithAggregatesFilter<"Order"> | string | null
    trackingCarrier?: StringNullableWithAggregatesFilter<"Order"> | string | null
    estimatedDeliveryAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    shippedAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    deliveredAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    cancelledAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    cancelReason?: StringNullableWithAggregatesFilter<"Order"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    variantId?: StringNullableFilter<"OrderItem"> | string | null
    sku?: StringFilter<"OrderItem"> | string
    name?: StringFilter<"OrderItem"> | string
    image?: StringNullableFilter<"OrderItem"> | string | null
    unitPrice?: DecimalFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    unitCost?: DecimalNullableFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string | null
    quantity?: IntFilter<"OrderItem"> | number
    subtotal?: DecimalFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    attributes?: JsonNullableFilter<"OrderItem">
    createdAt?: DateTimeFilter<"OrderItem"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type OrderItemOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    variantId?: SortOrderInput | SortOrder
    sku?: SortOrder
    name?: SortOrder
    image?: SortOrderInput | SortOrder
    unitPrice?: SortOrder
    unitCost?: SortOrderInput | SortOrder
    quantity?: SortOrder
    subtotal?: SortOrder
    attributes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    order?: OrderOrderByWithRelationInput
  }

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    variantId?: StringNullableFilter<"OrderItem"> | string | null
    sku?: StringFilter<"OrderItem"> | string
    name?: StringFilter<"OrderItem"> | string
    image?: StringNullableFilter<"OrderItem"> | string | null
    unitPrice?: DecimalFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    unitCost?: DecimalNullableFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string | null
    quantity?: IntFilter<"OrderItem"> | number
    subtotal?: DecimalFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    attributes?: JsonNullableFilter<"OrderItem">
    createdAt?: DateTimeFilter<"OrderItem"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "id">

  export type OrderItemOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    variantId?: SortOrderInput | SortOrder
    sku?: SortOrder
    name?: SortOrder
    image?: SortOrderInput | SortOrder
    unitPrice?: SortOrder
    unitCost?: SortOrderInput | SortOrder
    quantity?: SortOrder
    subtotal?: SortOrder
    attributes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: OrderItemCountOrderByAggregateInput
    _avg?: OrderItemAvgOrderByAggregateInput
    _max?: OrderItemMaxOrderByAggregateInput
    _min?: OrderItemMinOrderByAggregateInput
    _sum?: OrderItemSumOrderByAggregateInput
  }

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    OR?: OrderItemScalarWhereWithAggregatesInput[]
    NOT?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderItem"> | string
    orderId?: StringWithAggregatesFilter<"OrderItem"> | string
    productId?: StringWithAggregatesFilter<"OrderItem"> | string
    variantId?: StringNullableWithAggregatesFilter<"OrderItem"> | string | null
    sku?: StringWithAggregatesFilter<"OrderItem"> | string
    name?: StringWithAggregatesFilter<"OrderItem"> | string
    image?: StringNullableWithAggregatesFilter<"OrderItem"> | string | null
    unitPrice?: DecimalWithAggregatesFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    unitCost?: DecimalNullableWithAggregatesFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string | null
    quantity?: IntWithAggregatesFilter<"OrderItem"> | number
    subtotal?: DecimalWithAggregatesFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    attributes?: JsonNullableWithAggregatesFilter<"OrderItem">
    createdAt?: DateTimeWithAggregatesFilter<"OrderItem"> | Date | string
  }

  export type OrderStatusHistoryWhereInput = {
    AND?: OrderStatusHistoryWhereInput | OrderStatusHistoryWhereInput[]
    OR?: OrderStatusHistoryWhereInput[]
    NOT?: OrderStatusHistoryWhereInput | OrderStatusHistoryWhereInput[]
    id?: StringFilter<"OrderStatusHistory"> | string
    orderId?: StringFilter<"OrderStatusHistory"> | string
    type?: StringFilter<"OrderStatusHistory"> | string
    status?: StringFilter<"OrderStatusHistory"> | string
    note?: StringNullableFilter<"OrderStatusHistory"> | string | null
    location?: StringNullableFilter<"OrderStatusHistory"> | string | null
    isPublic?: BoolFilter<"OrderStatusHistory"> | boolean
    changedBy?: StringNullableFilter<"OrderStatusHistory"> | string | null
    actor?: StringNullableFilter<"OrderStatusHistory"> | string | null
    createdAt?: DateTimeFilter<"OrderStatusHistory"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type OrderStatusHistoryOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    note?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    changedBy?: SortOrderInput | SortOrder
    actor?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    order?: OrderOrderByWithRelationInput
  }

  export type OrderStatusHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderStatusHistoryWhereInput | OrderStatusHistoryWhereInput[]
    OR?: OrderStatusHistoryWhereInput[]
    NOT?: OrderStatusHistoryWhereInput | OrderStatusHistoryWhereInput[]
    orderId?: StringFilter<"OrderStatusHistory"> | string
    type?: StringFilter<"OrderStatusHistory"> | string
    status?: StringFilter<"OrderStatusHistory"> | string
    note?: StringNullableFilter<"OrderStatusHistory"> | string | null
    location?: StringNullableFilter<"OrderStatusHistory"> | string | null
    isPublic?: BoolFilter<"OrderStatusHistory"> | boolean
    changedBy?: StringNullableFilter<"OrderStatusHistory"> | string | null
    actor?: StringNullableFilter<"OrderStatusHistory"> | string | null
    createdAt?: DateTimeFilter<"OrderStatusHistory"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "id">

  export type OrderStatusHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    note?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    changedBy?: SortOrderInput | SortOrder
    actor?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: OrderStatusHistoryCountOrderByAggregateInput
    _max?: OrderStatusHistoryMaxOrderByAggregateInput
    _min?: OrderStatusHistoryMinOrderByAggregateInput
  }

  export type OrderStatusHistoryScalarWhereWithAggregatesInput = {
    AND?: OrderStatusHistoryScalarWhereWithAggregatesInput | OrderStatusHistoryScalarWhereWithAggregatesInput[]
    OR?: OrderStatusHistoryScalarWhereWithAggregatesInput[]
    NOT?: OrderStatusHistoryScalarWhereWithAggregatesInput | OrderStatusHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderStatusHistory"> | string
    orderId?: StringWithAggregatesFilter<"OrderStatusHistory"> | string
    type?: StringWithAggregatesFilter<"OrderStatusHistory"> | string
    status?: StringWithAggregatesFilter<"OrderStatusHistory"> | string
    note?: StringNullableWithAggregatesFilter<"OrderStatusHistory"> | string | null
    location?: StringNullableWithAggregatesFilter<"OrderStatusHistory"> | string | null
    isPublic?: BoolWithAggregatesFilter<"OrderStatusHistory"> | boolean
    changedBy?: StringNullableWithAggregatesFilter<"OrderStatusHistory"> | string | null
    actor?: StringNullableWithAggregatesFilter<"OrderStatusHistory"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OrderStatusHistory"> | Date | string
  }

  export type OrderNoteWhereInput = {
    AND?: OrderNoteWhereInput | OrderNoteWhereInput[]
    OR?: OrderNoteWhereInput[]
    NOT?: OrderNoteWhereInput | OrderNoteWhereInput[]
    id?: StringFilter<"OrderNote"> | string
    orderId?: StringFilter<"OrderNote"> | string
    content?: StringFilter<"OrderNote"> | string
    authorId?: StringFilter<"OrderNote"> | string
    isInternal?: BoolFilter<"OrderNote"> | boolean
    createdAt?: DateTimeFilter<"OrderNote"> | Date | string
    updatedAt?: DateTimeFilter<"OrderNote"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type OrderNoteOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
    isInternal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    order?: OrderOrderByWithRelationInput
  }

  export type OrderNoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderNoteWhereInput | OrderNoteWhereInput[]
    OR?: OrderNoteWhereInput[]
    NOT?: OrderNoteWhereInput | OrderNoteWhereInput[]
    orderId?: StringFilter<"OrderNote"> | string
    content?: StringFilter<"OrderNote"> | string
    authorId?: StringFilter<"OrderNote"> | string
    isInternal?: BoolFilter<"OrderNote"> | boolean
    createdAt?: DateTimeFilter<"OrderNote"> | Date | string
    updatedAt?: DateTimeFilter<"OrderNote"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "id">

  export type OrderNoteOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
    isInternal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrderNoteCountOrderByAggregateInput
    _max?: OrderNoteMaxOrderByAggregateInput
    _min?: OrderNoteMinOrderByAggregateInput
  }

  export type OrderNoteScalarWhereWithAggregatesInput = {
    AND?: OrderNoteScalarWhereWithAggregatesInput | OrderNoteScalarWhereWithAggregatesInput[]
    OR?: OrderNoteScalarWhereWithAggregatesInput[]
    NOT?: OrderNoteScalarWhereWithAggregatesInput | OrderNoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderNote"> | string
    orderId?: StringWithAggregatesFilter<"OrderNote"> | string
    content?: StringWithAggregatesFilter<"OrderNote"> | string
    authorId?: StringWithAggregatesFilter<"OrderNote"> | string
    isInternal?: BoolWithAggregatesFilter<"OrderNote"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"OrderNote"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OrderNote"> | Date | string
  }

  export type ReturnRequestWhereInput = {
    AND?: ReturnRequestWhereInput | ReturnRequestWhereInput[]
    OR?: ReturnRequestWhereInput[]
    NOT?: ReturnRequestWhereInput | ReturnRequestWhereInput[]
    id?: StringFilter<"ReturnRequest"> | string
    rmaNumber?: StringFilter<"ReturnRequest"> | string
    orderId?: StringFilter<"ReturnRequest"> | string
    customerId?: StringFilter<"ReturnRequest"> | string
    status?: StringFilter<"ReturnRequest"> | string
    reason?: StringFilter<"ReturnRequest"> | string
    details?: StringNullableFilter<"ReturnRequest"> | string | null
    photos?: StringNullableListFilter<"ReturnRequest">
    resolution?: StringFilter<"ReturnRequest"> | string
    instructions?: StringNullableFilter<"ReturnRequest"> | string | null
    rejectReason?: StringNullableFilter<"ReturnRequest"> | string | null
    restocked?: BoolFilter<"ReturnRequest"> | boolean
    refundAmount?: DecimalNullableFilter<"ReturnRequest"> | Decimal | DecimalJsLike | number | string | null
    adminNote?: StringNullableFilter<"ReturnRequest"> | string | null
    approvedAt?: DateTimeNullableFilter<"ReturnRequest"> | Date | string | null
    rejectedAt?: DateTimeNullableFilter<"ReturnRequest"> | Date | string | null
    receivedAt?: DateTimeNullableFilter<"ReturnRequest"> | Date | string | null
    refundedAt?: DateTimeNullableFilter<"ReturnRequest"> | Date | string | null
    createdAt?: DateTimeFilter<"ReturnRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ReturnRequest"> | Date | string
    items?: ReturnItemListRelationFilter
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type ReturnRequestOrderByWithRelationInput = {
    id?: SortOrder
    rmaNumber?: SortOrder
    orderId?: SortOrder
    customerId?: SortOrder
    status?: SortOrder
    reason?: SortOrder
    details?: SortOrderInput | SortOrder
    photos?: SortOrder
    resolution?: SortOrder
    instructions?: SortOrderInput | SortOrder
    rejectReason?: SortOrderInput | SortOrder
    restocked?: SortOrder
    refundAmount?: SortOrderInput | SortOrder
    adminNote?: SortOrderInput | SortOrder
    approvedAt?: SortOrderInput | SortOrder
    rejectedAt?: SortOrderInput | SortOrder
    receivedAt?: SortOrderInput | SortOrder
    refundedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    items?: ReturnItemOrderByRelationAggregateInput
    order?: OrderOrderByWithRelationInput
  }

  export type ReturnRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    rmaNumber?: string
    AND?: ReturnRequestWhereInput | ReturnRequestWhereInput[]
    OR?: ReturnRequestWhereInput[]
    NOT?: ReturnRequestWhereInput | ReturnRequestWhereInput[]
    orderId?: StringFilter<"ReturnRequest"> | string
    customerId?: StringFilter<"ReturnRequest"> | string
    status?: StringFilter<"ReturnRequest"> | string
    reason?: StringFilter<"ReturnRequest"> | string
    details?: StringNullableFilter<"ReturnRequest"> | string | null
    photos?: StringNullableListFilter<"ReturnRequest">
    resolution?: StringFilter<"ReturnRequest"> | string
    instructions?: StringNullableFilter<"ReturnRequest"> | string | null
    rejectReason?: StringNullableFilter<"ReturnRequest"> | string | null
    restocked?: BoolFilter<"ReturnRequest"> | boolean
    refundAmount?: DecimalNullableFilter<"ReturnRequest"> | Decimal | DecimalJsLike | number | string | null
    adminNote?: StringNullableFilter<"ReturnRequest"> | string | null
    approvedAt?: DateTimeNullableFilter<"ReturnRequest"> | Date | string | null
    rejectedAt?: DateTimeNullableFilter<"ReturnRequest"> | Date | string | null
    receivedAt?: DateTimeNullableFilter<"ReturnRequest"> | Date | string | null
    refundedAt?: DateTimeNullableFilter<"ReturnRequest"> | Date | string | null
    createdAt?: DateTimeFilter<"ReturnRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ReturnRequest"> | Date | string
    items?: ReturnItemListRelationFilter
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "id" | "rmaNumber">

  export type ReturnRequestOrderByWithAggregationInput = {
    id?: SortOrder
    rmaNumber?: SortOrder
    orderId?: SortOrder
    customerId?: SortOrder
    status?: SortOrder
    reason?: SortOrder
    details?: SortOrderInput | SortOrder
    photos?: SortOrder
    resolution?: SortOrder
    instructions?: SortOrderInput | SortOrder
    rejectReason?: SortOrderInput | SortOrder
    restocked?: SortOrder
    refundAmount?: SortOrderInput | SortOrder
    adminNote?: SortOrderInput | SortOrder
    approvedAt?: SortOrderInput | SortOrder
    rejectedAt?: SortOrderInput | SortOrder
    receivedAt?: SortOrderInput | SortOrder
    refundedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReturnRequestCountOrderByAggregateInput
    _avg?: ReturnRequestAvgOrderByAggregateInput
    _max?: ReturnRequestMaxOrderByAggregateInput
    _min?: ReturnRequestMinOrderByAggregateInput
    _sum?: ReturnRequestSumOrderByAggregateInput
  }

  export type ReturnRequestScalarWhereWithAggregatesInput = {
    AND?: ReturnRequestScalarWhereWithAggregatesInput | ReturnRequestScalarWhereWithAggregatesInput[]
    OR?: ReturnRequestScalarWhereWithAggregatesInput[]
    NOT?: ReturnRequestScalarWhereWithAggregatesInput | ReturnRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReturnRequest"> | string
    rmaNumber?: StringWithAggregatesFilter<"ReturnRequest"> | string
    orderId?: StringWithAggregatesFilter<"ReturnRequest"> | string
    customerId?: StringWithAggregatesFilter<"ReturnRequest"> | string
    status?: StringWithAggregatesFilter<"ReturnRequest"> | string
    reason?: StringWithAggregatesFilter<"ReturnRequest"> | string
    details?: StringNullableWithAggregatesFilter<"ReturnRequest"> | string | null
    photos?: StringNullableListFilter<"ReturnRequest">
    resolution?: StringWithAggregatesFilter<"ReturnRequest"> | string
    instructions?: StringNullableWithAggregatesFilter<"ReturnRequest"> | string | null
    rejectReason?: StringNullableWithAggregatesFilter<"ReturnRequest"> | string | null
    restocked?: BoolWithAggregatesFilter<"ReturnRequest"> | boolean
    refundAmount?: DecimalNullableWithAggregatesFilter<"ReturnRequest"> | Decimal | DecimalJsLike | number | string | null
    adminNote?: StringNullableWithAggregatesFilter<"ReturnRequest"> | string | null
    approvedAt?: DateTimeNullableWithAggregatesFilter<"ReturnRequest"> | Date | string | null
    rejectedAt?: DateTimeNullableWithAggregatesFilter<"ReturnRequest"> | Date | string | null
    receivedAt?: DateTimeNullableWithAggregatesFilter<"ReturnRequest"> | Date | string | null
    refundedAt?: DateTimeNullableWithAggregatesFilter<"ReturnRequest"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ReturnRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ReturnRequest"> | Date | string
  }

  export type ReturnItemWhereInput = {
    AND?: ReturnItemWhereInput | ReturnItemWhereInput[]
    OR?: ReturnItemWhereInput[]
    NOT?: ReturnItemWhereInput | ReturnItemWhereInput[]
    id?: StringFilter<"ReturnItem"> | string
    returnId?: StringFilter<"ReturnItem"> | string
    orderItemId?: StringFilter<"ReturnItem"> | string
    productId?: StringFilter<"ReturnItem"> | string
    sku?: StringFilter<"ReturnItem"> | string
    name?: StringFilter<"ReturnItem"> | string
    quantity?: IntFilter<"ReturnItem"> | number
    unitPrice?: DecimalFilter<"ReturnItem"> | Decimal | DecimalJsLike | number | string
    returnRequest?: XOR<ReturnRequestScalarRelationFilter, ReturnRequestWhereInput>
  }

  export type ReturnItemOrderByWithRelationInput = {
    id?: SortOrder
    returnId?: SortOrder
    orderItemId?: SortOrder
    productId?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    returnRequest?: ReturnRequestOrderByWithRelationInput
  }

  export type ReturnItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReturnItemWhereInput | ReturnItemWhereInput[]
    OR?: ReturnItemWhereInput[]
    NOT?: ReturnItemWhereInput | ReturnItemWhereInput[]
    returnId?: StringFilter<"ReturnItem"> | string
    orderItemId?: StringFilter<"ReturnItem"> | string
    productId?: StringFilter<"ReturnItem"> | string
    sku?: StringFilter<"ReturnItem"> | string
    name?: StringFilter<"ReturnItem"> | string
    quantity?: IntFilter<"ReturnItem"> | number
    unitPrice?: DecimalFilter<"ReturnItem"> | Decimal | DecimalJsLike | number | string
    returnRequest?: XOR<ReturnRequestScalarRelationFilter, ReturnRequestWhereInput>
  }, "id">

  export type ReturnItemOrderByWithAggregationInput = {
    id?: SortOrder
    returnId?: SortOrder
    orderItemId?: SortOrder
    productId?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    _count?: ReturnItemCountOrderByAggregateInput
    _avg?: ReturnItemAvgOrderByAggregateInput
    _max?: ReturnItemMaxOrderByAggregateInput
    _min?: ReturnItemMinOrderByAggregateInput
    _sum?: ReturnItemSumOrderByAggregateInput
  }

  export type ReturnItemScalarWhereWithAggregatesInput = {
    AND?: ReturnItemScalarWhereWithAggregatesInput | ReturnItemScalarWhereWithAggregatesInput[]
    OR?: ReturnItemScalarWhereWithAggregatesInput[]
    NOT?: ReturnItemScalarWhereWithAggregatesInput | ReturnItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReturnItem"> | string
    returnId?: StringWithAggregatesFilter<"ReturnItem"> | string
    orderItemId?: StringWithAggregatesFilter<"ReturnItem"> | string
    productId?: StringWithAggregatesFilter<"ReturnItem"> | string
    sku?: StringWithAggregatesFilter<"ReturnItem"> | string
    name?: StringWithAggregatesFilter<"ReturnItem"> | string
    quantity?: IntWithAggregatesFilter<"ReturnItem"> | number
    unitPrice?: DecimalWithAggregatesFilter<"ReturnItem"> | Decimal | DecimalJsLike | number | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    orderId?: StringFilter<"Payment"> | string
    provider?: StringFilter<"Payment"> | string
    status?: StringFilter<"Payment"> | string
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Payment"> | string
    phone?: StringFilter<"Payment"> | string
    merchantRequestId?: StringNullableFilter<"Payment"> | string | null
    checkoutRequestId?: StringNullableFilter<"Payment"> | string | null
    receiptNumber?: StringNullableFilter<"Payment"> | string | null
    resultCode?: IntNullableFilter<"Payment"> | number | null
    resultDesc?: StringNullableFilter<"Payment"> | string | null
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    raw?: JsonNullableFilter<"Payment">
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    phone?: SortOrder
    merchantRequestId?: SortOrderInput | SortOrder
    checkoutRequestId?: SortOrderInput | SortOrder
    receiptNumber?: SortOrderInput | SortOrder
    resultCode?: SortOrderInput | SortOrder
    resultDesc?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    raw?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    order?: OrderOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    checkoutRequestId?: string
    receiptNumber?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    orderId?: StringFilter<"Payment"> | string
    provider?: StringFilter<"Payment"> | string
    status?: StringFilter<"Payment"> | string
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Payment"> | string
    phone?: StringFilter<"Payment"> | string
    merchantRequestId?: StringNullableFilter<"Payment"> | string | null
    resultCode?: IntNullableFilter<"Payment"> | number | null
    resultDesc?: StringNullableFilter<"Payment"> | string | null
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    raw?: JsonNullableFilter<"Payment">
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "id" | "checkoutRequestId" | "receiptNumber">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    phone?: SortOrder
    merchantRequestId?: SortOrderInput | SortOrder
    checkoutRequestId?: SortOrderInput | SortOrder
    receiptNumber?: SortOrderInput | SortOrder
    resultCode?: SortOrderInput | SortOrder
    resultDesc?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    raw?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    orderId?: StringWithAggregatesFilter<"Payment"> | string
    provider?: StringWithAggregatesFilter<"Payment"> | string
    status?: StringWithAggregatesFilter<"Payment"> | string
    amount?: DecimalWithAggregatesFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    currency?: StringWithAggregatesFilter<"Payment"> | string
    phone?: StringWithAggregatesFilter<"Payment"> | string
    merchantRequestId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    checkoutRequestId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    receiptNumber?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    resultCode?: IntNullableWithAggregatesFilter<"Payment"> | number | null
    resultDesc?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    paidAt?: DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
    raw?: JsonNullableWithAggregatesFilter<"Payment">
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type DeliveryZoneWhereInput = {
    AND?: DeliveryZoneWhereInput | DeliveryZoneWhereInput[]
    OR?: DeliveryZoneWhereInput[]
    NOT?: DeliveryZoneWhereInput | DeliveryZoneWhereInput[]
    id?: StringFilter<"DeliveryZone"> | string
    name?: StringFilter<"DeliveryZone"> | string
    description?: StringNullableFilter<"DeliveryZone"> | string | null
    cities?: StringNullableListFilter<"DeliveryZone">
    isDefault?: BoolFilter<"DeliveryZone"> | boolean
    fee?: DecimalFilter<"DeliveryZone"> | Decimal | DecimalJsLike | number | string
    perKgFee?: DecimalFilter<"DeliveryZone"> | Decimal | DecimalJsLike | number | string
    includedKg?: DecimalFilter<"DeliveryZone"> | Decimal | DecimalJsLike | number | string
    freeAbove?: DecimalNullableFilter<"DeliveryZone"> | Decimal | DecimalJsLike | number | string | null
    minDays?: IntFilter<"DeliveryZone"> | number
    maxDays?: IntFilter<"DeliveryZone"> | number
    allowsCod?: BoolFilter<"DeliveryZone"> | boolean
    isActive?: BoolFilter<"DeliveryZone"> | boolean
    sortOrder?: IntFilter<"DeliveryZone"> | number
    createdAt?: DateTimeFilter<"DeliveryZone"> | Date | string
    updatedAt?: DateTimeFilter<"DeliveryZone"> | Date | string
  }

  export type DeliveryZoneOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    cities?: SortOrder
    isDefault?: SortOrder
    fee?: SortOrder
    perKgFee?: SortOrder
    includedKg?: SortOrder
    freeAbove?: SortOrderInput | SortOrder
    minDays?: SortOrder
    maxDays?: SortOrder
    allowsCod?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliveryZoneWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DeliveryZoneWhereInput | DeliveryZoneWhereInput[]
    OR?: DeliveryZoneWhereInput[]
    NOT?: DeliveryZoneWhereInput | DeliveryZoneWhereInput[]
    name?: StringFilter<"DeliveryZone"> | string
    description?: StringNullableFilter<"DeliveryZone"> | string | null
    cities?: StringNullableListFilter<"DeliveryZone">
    isDefault?: BoolFilter<"DeliveryZone"> | boolean
    fee?: DecimalFilter<"DeliveryZone"> | Decimal | DecimalJsLike | number | string
    perKgFee?: DecimalFilter<"DeliveryZone"> | Decimal | DecimalJsLike | number | string
    includedKg?: DecimalFilter<"DeliveryZone"> | Decimal | DecimalJsLike | number | string
    freeAbove?: DecimalNullableFilter<"DeliveryZone"> | Decimal | DecimalJsLike | number | string | null
    minDays?: IntFilter<"DeliveryZone"> | number
    maxDays?: IntFilter<"DeliveryZone"> | number
    allowsCod?: BoolFilter<"DeliveryZone"> | boolean
    isActive?: BoolFilter<"DeliveryZone"> | boolean
    sortOrder?: IntFilter<"DeliveryZone"> | number
    createdAt?: DateTimeFilter<"DeliveryZone"> | Date | string
    updatedAt?: DateTimeFilter<"DeliveryZone"> | Date | string
  }, "id">

  export type DeliveryZoneOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    cities?: SortOrder
    isDefault?: SortOrder
    fee?: SortOrder
    perKgFee?: SortOrder
    includedKg?: SortOrder
    freeAbove?: SortOrderInput | SortOrder
    minDays?: SortOrder
    maxDays?: SortOrder
    allowsCod?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DeliveryZoneCountOrderByAggregateInput
    _avg?: DeliveryZoneAvgOrderByAggregateInput
    _max?: DeliveryZoneMaxOrderByAggregateInput
    _min?: DeliveryZoneMinOrderByAggregateInput
    _sum?: DeliveryZoneSumOrderByAggregateInput
  }

  export type DeliveryZoneScalarWhereWithAggregatesInput = {
    AND?: DeliveryZoneScalarWhereWithAggregatesInput | DeliveryZoneScalarWhereWithAggregatesInput[]
    OR?: DeliveryZoneScalarWhereWithAggregatesInput[]
    NOT?: DeliveryZoneScalarWhereWithAggregatesInput | DeliveryZoneScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DeliveryZone"> | string
    name?: StringWithAggregatesFilter<"DeliveryZone"> | string
    description?: StringNullableWithAggregatesFilter<"DeliveryZone"> | string | null
    cities?: StringNullableListFilter<"DeliveryZone">
    isDefault?: BoolWithAggregatesFilter<"DeliveryZone"> | boolean
    fee?: DecimalWithAggregatesFilter<"DeliveryZone"> | Decimal | DecimalJsLike | number | string
    perKgFee?: DecimalWithAggregatesFilter<"DeliveryZone"> | Decimal | DecimalJsLike | number | string
    includedKg?: DecimalWithAggregatesFilter<"DeliveryZone"> | Decimal | DecimalJsLike | number | string
    freeAbove?: DecimalNullableWithAggregatesFilter<"DeliveryZone"> | Decimal | DecimalJsLike | number | string | null
    minDays?: IntWithAggregatesFilter<"DeliveryZone"> | number
    maxDays?: IntWithAggregatesFilter<"DeliveryZone"> | number
    allowsCod?: BoolWithAggregatesFilter<"DeliveryZone"> | boolean
    isActive?: BoolWithAggregatesFilter<"DeliveryZone"> | boolean
    sortOrder?: IntWithAggregatesFilter<"DeliveryZone"> | number
    createdAt?: DateTimeWithAggregatesFilter<"DeliveryZone"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DeliveryZone"> | Date | string
  }

  export type CheckoutSettingsWhereInput = {
    AND?: CheckoutSettingsWhereInput | CheckoutSettingsWhereInput[]
    OR?: CheckoutSettingsWhereInput[]
    NOT?: CheckoutSettingsWhereInput | CheckoutSettingsWhereInput[]
    id?: IntFilter<"CheckoutSettings"> | number
    vatRate?: DecimalFilter<"CheckoutSettings"> | Decimal | DecimalJsLike | number | string
    vatOnShipping?: BoolFilter<"CheckoutSettings"> | boolean
    updatedBy?: StringNullableFilter<"CheckoutSettings"> | string | null
    updatedAt?: DateTimeFilter<"CheckoutSettings"> | Date | string
  }

  export type CheckoutSettingsOrderByWithRelationInput = {
    id?: SortOrder
    vatRate?: SortOrder
    vatOnShipping?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
  }

  export type CheckoutSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CheckoutSettingsWhereInput | CheckoutSettingsWhereInput[]
    OR?: CheckoutSettingsWhereInput[]
    NOT?: CheckoutSettingsWhereInput | CheckoutSettingsWhereInput[]
    vatRate?: DecimalFilter<"CheckoutSettings"> | Decimal | DecimalJsLike | number | string
    vatOnShipping?: BoolFilter<"CheckoutSettings"> | boolean
    updatedBy?: StringNullableFilter<"CheckoutSettings"> | string | null
    updatedAt?: DateTimeFilter<"CheckoutSettings"> | Date | string
  }, "id">

  export type CheckoutSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    vatRate?: SortOrder
    vatOnShipping?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: CheckoutSettingsCountOrderByAggregateInput
    _avg?: CheckoutSettingsAvgOrderByAggregateInput
    _max?: CheckoutSettingsMaxOrderByAggregateInput
    _min?: CheckoutSettingsMinOrderByAggregateInput
    _sum?: CheckoutSettingsSumOrderByAggregateInput
  }

  export type CheckoutSettingsScalarWhereWithAggregatesInput = {
    AND?: CheckoutSettingsScalarWhereWithAggregatesInput | CheckoutSettingsScalarWhereWithAggregatesInput[]
    OR?: CheckoutSettingsScalarWhereWithAggregatesInput[]
    NOT?: CheckoutSettingsScalarWhereWithAggregatesInput | CheckoutSettingsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CheckoutSettings"> | number
    vatRate?: DecimalWithAggregatesFilter<"CheckoutSettings"> | Decimal | DecimalJsLike | number | string
    vatOnShipping?: BoolWithAggregatesFilter<"CheckoutSettings"> | boolean
    updatedBy?: StringNullableWithAggregatesFilter<"CheckoutSettings"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"CheckoutSettings"> | Date | string
  }

  export type OrderCreateInput = {
    id?: string
    orderNumber: string
    customerId: string
    customerEmail: string
    customerName: string
    customerPhone?: string | null
    status?: string
    paymentStatus?: string
    paymentMethod?: string | null
    currency?: string
    subtotal: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    shippingAmount?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    taxRate?: Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: string | null
    paymentDueAt?: Date | string | null
    couponCode?: string | null
    customerNote?: string | null
    shippingAddress: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: string | null
    trackingCarrier?: string | null
    estimatedDeliveryAt?: Date | string | null
    shippedAt?: Date | string | null
    deliveredAt?: Date | string | null
    cancelledAt?: Date | string | null
    cancelReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemCreateNestedManyWithoutOrderInput
    statusHistory?: OrderStatusHistoryCreateNestedManyWithoutOrderInput
    notes?: OrderNoteCreateNestedManyWithoutOrderInput
    returns?: ReturnRequestCreateNestedManyWithoutOrderInput
    payments?: PaymentCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    orderNumber: string
    customerId: string
    customerEmail: string
    customerName: string
    customerPhone?: string | null
    status?: string
    paymentStatus?: string
    paymentMethod?: string | null
    currency?: string
    subtotal: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    shippingAmount?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    taxRate?: Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: string | null
    paymentDueAt?: Date | string | null
    couponCode?: string | null
    customerNote?: string | null
    shippingAddress: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: string | null
    trackingCarrier?: string | null
    estimatedDeliveryAt?: Date | string | null
    shippedAt?: Date | string | null
    deliveredAt?: Date | string | null
    cancelledAt?: Date | string | null
    cancelReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    statusHistory?: OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInput
    notes?: OrderNoteUncheckedCreateNestedManyWithoutOrderInput
    returns?: ReturnRequestUncheckedCreateNestedManyWithoutOrderInput
    payments?: PaymentUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    shippingAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    couponCode?: NullableStringFieldUpdateOperationsInput | string | null
    customerNote?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddress?: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingCarrier?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    statusHistory?: OrderStatusHistoryUpdateManyWithoutOrderNestedInput
    notes?: OrderNoteUpdateManyWithoutOrderNestedInput
    returns?: ReturnRequestUpdateManyWithoutOrderNestedInput
    payments?: PaymentUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    shippingAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    couponCode?: NullableStringFieldUpdateOperationsInput | string | null
    customerNote?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddress?: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingCarrier?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    statusHistory?: OrderStatusHistoryUncheckedUpdateManyWithoutOrderNestedInput
    notes?: OrderNoteUncheckedUpdateManyWithoutOrderNestedInput
    returns?: ReturnRequestUncheckedUpdateManyWithoutOrderNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: string
    orderNumber: string
    customerId: string
    customerEmail: string
    customerName: string
    customerPhone?: string | null
    status?: string
    paymentStatus?: string
    paymentMethod?: string | null
    currency?: string
    subtotal: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    shippingAmount?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    taxRate?: Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: string | null
    paymentDueAt?: Date | string | null
    couponCode?: string | null
    customerNote?: string | null
    shippingAddress: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: string | null
    trackingCarrier?: string | null
    estimatedDeliveryAt?: Date | string | null
    shippedAt?: Date | string | null
    deliveredAt?: Date | string | null
    cancelledAt?: Date | string | null
    cancelReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    shippingAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    couponCode?: NullableStringFieldUpdateOperationsInput | string | null
    customerNote?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddress?: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingCarrier?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    shippingAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    couponCode?: NullableStringFieldUpdateOperationsInput | string | null
    customerNote?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddress?: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingCarrier?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateInput = {
    id?: string
    productId: string
    variantId?: string | null
    sku: string
    name: string
    image?: string | null
    unitPrice: Decimal | DecimalJsLike | number | string
    unitCost?: Decimal | DecimalJsLike | number | string | null
    quantity: number
    subtotal: Decimal | DecimalJsLike | number | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutItemsInput
  }

  export type OrderItemUncheckedCreateInput = {
    id?: string
    orderId: string
    productId: string
    variantId?: string | null
    sku: string
    name: string
    image?: string | null
    unitPrice: Decimal | DecimalJsLike | number | string
    unitCost?: Decimal | DecimalJsLike | number | string | null
    quantity: number
    subtotal: Decimal | DecimalJsLike | number | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OrderItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    variantId?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
  }

  export type OrderItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    variantId?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateManyInput = {
    id?: string
    orderId: string
    productId: string
    variantId?: string | null
    sku: string
    name: string
    image?: string | null
    unitPrice: Decimal | DecimalJsLike | number | string
    unitCost?: Decimal | DecimalJsLike | number | string | null
    quantity: number
    subtotal: Decimal | DecimalJsLike | number | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OrderItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    variantId?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    variantId?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderStatusHistoryCreateInput = {
    id?: string
    type?: string
    status: string
    note?: string | null
    location?: string | null
    isPublic?: boolean
    changedBy?: string | null
    actor?: string | null
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutStatusHistoryInput
  }

  export type OrderStatusHistoryUncheckedCreateInput = {
    id?: string
    orderId: string
    type?: string
    status: string
    note?: string | null
    location?: string | null
    isPublic?: boolean
    changedBy?: string | null
    actor?: string | null
    createdAt?: Date | string
  }

  export type OrderStatusHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    actor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutStatusHistoryNestedInput
  }

  export type OrderStatusHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    actor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderStatusHistoryCreateManyInput = {
    id?: string
    orderId: string
    type?: string
    status: string
    note?: string | null
    location?: string | null
    isPublic?: boolean
    changedBy?: string | null
    actor?: string | null
    createdAt?: Date | string
  }

  export type OrderStatusHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    actor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderStatusHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    actor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderNoteCreateInput = {
    id?: string
    content: string
    authorId: string
    isInternal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    order: OrderCreateNestedOneWithoutNotesInput
  }

  export type OrderNoteUncheckedCreateInput = {
    id?: string
    orderId: string
    content: string
    authorId: string
    isInternal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderNoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutNotesNestedInput
  }

  export type OrderNoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderNoteCreateManyInput = {
    id?: string
    orderId: string
    content: string
    authorId: string
    isInternal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderNoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderNoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReturnRequestCreateInput = {
    id?: string
    rmaNumber: string
    customerId: string
    status?: string
    reason: string
    details?: string | null
    photos?: ReturnRequestCreatephotosInput | string[]
    resolution?: string
    instructions?: string | null
    rejectReason?: string | null
    restocked?: boolean
    refundAmount?: Decimal | DecimalJsLike | number | string | null
    adminNote?: string | null
    approvedAt?: Date | string | null
    rejectedAt?: Date | string | null
    receivedAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ReturnItemCreateNestedManyWithoutReturnRequestInput
    order: OrderCreateNestedOneWithoutReturnsInput
  }

  export type ReturnRequestUncheckedCreateInput = {
    id?: string
    rmaNumber: string
    orderId: string
    customerId: string
    status?: string
    reason: string
    details?: string | null
    photos?: ReturnRequestCreatephotosInput | string[]
    resolution?: string
    instructions?: string | null
    rejectReason?: string | null
    restocked?: boolean
    refundAmount?: Decimal | DecimalJsLike | number | string | null
    adminNote?: string | null
    approvedAt?: Date | string | null
    rejectedAt?: Date | string | null
    receivedAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ReturnItemUncheckedCreateNestedManyWithoutReturnRequestInput
  }

  export type ReturnRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rmaNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: ReturnRequestUpdatephotosInput | string[]
    resolution?: StringFieldUpdateOperationsInput | string
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    rejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    restocked?: BoolFieldUpdateOperationsInput | boolean
    refundAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ReturnItemUpdateManyWithoutReturnRequestNestedInput
    order?: OrderUpdateOneRequiredWithoutReturnsNestedInput
  }

  export type ReturnRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rmaNumber?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: ReturnRequestUpdatephotosInput | string[]
    resolution?: StringFieldUpdateOperationsInput | string
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    rejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    restocked?: BoolFieldUpdateOperationsInput | boolean
    refundAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ReturnItemUncheckedUpdateManyWithoutReturnRequestNestedInput
  }

  export type ReturnRequestCreateManyInput = {
    id?: string
    rmaNumber: string
    orderId: string
    customerId: string
    status?: string
    reason: string
    details?: string | null
    photos?: ReturnRequestCreatephotosInput | string[]
    resolution?: string
    instructions?: string | null
    rejectReason?: string | null
    restocked?: boolean
    refundAmount?: Decimal | DecimalJsLike | number | string | null
    adminNote?: string | null
    approvedAt?: Date | string | null
    rejectedAt?: Date | string | null
    receivedAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReturnRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rmaNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: ReturnRequestUpdatephotosInput | string[]
    resolution?: StringFieldUpdateOperationsInput | string
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    rejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    restocked?: BoolFieldUpdateOperationsInput | boolean
    refundAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReturnRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    rmaNumber?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: ReturnRequestUpdatephotosInput | string[]
    resolution?: StringFieldUpdateOperationsInput | string
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    rejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    restocked?: BoolFieldUpdateOperationsInput | boolean
    refundAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReturnItemCreateInput = {
    id?: string
    orderItemId: string
    productId: string
    sku: string
    name: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
    returnRequest: ReturnRequestCreateNestedOneWithoutItemsInput
  }

  export type ReturnItemUncheckedCreateInput = {
    id?: string
    returnId: string
    orderItemId: string
    productId: string
    sku: string
    name: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
  }

  export type ReturnItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderItemId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    returnRequest?: ReturnRequestUpdateOneRequiredWithoutItemsNestedInput
  }

  export type ReturnItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    returnId?: StringFieldUpdateOperationsInput | string
    orderItemId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type ReturnItemCreateManyInput = {
    id?: string
    returnId: string
    orderItemId: string
    productId: string
    sku: string
    name: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
  }

  export type ReturnItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderItemId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type ReturnItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    returnId?: StringFieldUpdateOperationsInput | string
    orderItemId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type PaymentCreateInput = {
    id?: string
    provider?: string
    status?: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    phone: string
    merchantRequestId?: string | null
    checkoutRequestId?: string | null
    receiptNumber?: string | null
    resultCode?: number | null
    resultDesc?: string | null
    paidAt?: Date | string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    order: OrderCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    orderId: string
    provider?: string
    status?: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    phone: string
    merchantRequestId?: string | null
    checkoutRequestId?: string | null
    receiptNumber?: string | null
    resultCode?: number | null
    resultDesc?: string | null
    paidAt?: Date | string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    merchantRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resultCode?: NullableIntFieldUpdateOperationsInput | number | null
    resultDesc?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    merchantRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resultCode?: NullableIntFieldUpdateOperationsInput | number | null
    resultDesc?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: string
    orderId: string
    provider?: string
    status?: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    phone: string
    merchantRequestId?: string | null
    checkoutRequestId?: string | null
    receiptNumber?: string | null
    resultCode?: number | null
    resultDesc?: string | null
    paidAt?: Date | string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    merchantRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resultCode?: NullableIntFieldUpdateOperationsInput | number | null
    resultDesc?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    merchantRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resultCode?: NullableIntFieldUpdateOperationsInput | number | null
    resultDesc?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryZoneCreateInput = {
    id?: string
    name: string
    description?: string | null
    cities?: DeliveryZoneCreatecitiesInput | string[]
    isDefault?: boolean
    fee: Decimal | DecimalJsLike | number | string
    perKgFee?: Decimal | DecimalJsLike | number | string
    includedKg?: Decimal | DecimalJsLike | number | string
    freeAbove?: Decimal | DecimalJsLike | number | string | null
    minDays?: number
    maxDays?: number
    allowsCod?: boolean
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryZoneUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    cities?: DeliveryZoneCreatecitiesInput | string[]
    isDefault?: boolean
    fee: Decimal | DecimalJsLike | number | string
    perKgFee?: Decimal | DecimalJsLike | number | string
    includedKg?: Decimal | DecimalJsLike | number | string
    freeAbove?: Decimal | DecimalJsLike | number | string | null
    minDays?: number
    maxDays?: number
    allowsCod?: boolean
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryZoneUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cities?: DeliveryZoneUpdatecitiesInput | string[]
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    perKgFee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    includedKg?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    freeAbove?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    minDays?: IntFieldUpdateOperationsInput | number
    maxDays?: IntFieldUpdateOperationsInput | number
    allowsCod?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryZoneUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cities?: DeliveryZoneUpdatecitiesInput | string[]
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    perKgFee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    includedKg?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    freeAbove?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    minDays?: IntFieldUpdateOperationsInput | number
    maxDays?: IntFieldUpdateOperationsInput | number
    allowsCod?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryZoneCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    cities?: DeliveryZoneCreatecitiesInput | string[]
    isDefault?: boolean
    fee: Decimal | DecimalJsLike | number | string
    perKgFee?: Decimal | DecimalJsLike | number | string
    includedKg?: Decimal | DecimalJsLike | number | string
    freeAbove?: Decimal | DecimalJsLike | number | string | null
    minDays?: number
    maxDays?: number
    allowsCod?: boolean
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryZoneUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cities?: DeliveryZoneUpdatecitiesInput | string[]
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    perKgFee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    includedKg?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    freeAbove?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    minDays?: IntFieldUpdateOperationsInput | number
    maxDays?: IntFieldUpdateOperationsInput | number
    allowsCod?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryZoneUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cities?: DeliveryZoneUpdatecitiesInput | string[]
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    perKgFee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    includedKg?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    freeAbove?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    minDays?: IntFieldUpdateOperationsInput | number
    maxDays?: IntFieldUpdateOperationsInput | number
    allowsCod?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CheckoutSettingsCreateInput = {
    id?: number
    vatRate?: Decimal | DecimalJsLike | number | string
    vatOnShipping?: boolean
    updatedBy?: string | null
    updatedAt?: Date | string
  }

  export type CheckoutSettingsUncheckedCreateInput = {
    id?: number
    vatRate?: Decimal | DecimalJsLike | number | string
    vatOnShipping?: boolean
    updatedBy?: string | null
    updatedAt?: Date | string
  }

  export type CheckoutSettingsUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    vatRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vatOnShipping?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CheckoutSettingsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    vatRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vatOnShipping?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CheckoutSettingsCreateManyInput = {
    id?: number
    vatRate?: Decimal | DecimalJsLike | number | string
    vatOnShipping?: boolean
    updatedBy?: string | null
    updatedAt?: Date | string
  }

  export type CheckoutSettingsUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    vatRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vatOnShipping?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CheckoutSettingsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    vatRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vatOnShipping?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput
    some?: OrderItemWhereInput
    none?: OrderItemWhereInput
  }

  export type OrderStatusHistoryListRelationFilter = {
    every?: OrderStatusHistoryWhereInput
    some?: OrderStatusHistoryWhereInput
    none?: OrderStatusHistoryWhereInput
  }

  export type OrderNoteListRelationFilter = {
    every?: OrderNoteWhereInput
    some?: OrderNoteWhereInput
    none?: OrderNoteWhereInput
  }

  export type ReturnRequestListRelationFilter = {
    every?: ReturnRequestWhereInput
    some?: ReturnRequestWhereInput
    none?: ReturnRequestWhereInput
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderStatusHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderNoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReturnRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    customerId?: SortOrder
    customerEmail?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    paymentMethod?: SortOrder
    currency?: SortOrder
    subtotal?: SortOrder
    taxAmount?: SortOrder
    shippingAmount?: SortOrder
    discountAmount?: SortOrder
    total?: SortOrder
    taxRate?: SortOrder
    deliveryZoneName?: SortOrder
    paymentDueAt?: SortOrder
    couponCode?: SortOrder
    customerNote?: SortOrder
    shippingAddress?: SortOrder
    billingAddress?: SortOrder
    trackingNumber?: SortOrder
    trackingCarrier?: SortOrder
    estimatedDeliveryAt?: SortOrder
    shippedAt?: SortOrder
    deliveredAt?: SortOrder
    cancelledAt?: SortOrder
    cancelReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    subtotal?: SortOrder
    taxAmount?: SortOrder
    shippingAmount?: SortOrder
    discountAmount?: SortOrder
    total?: SortOrder
    taxRate?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    customerId?: SortOrder
    customerEmail?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    paymentMethod?: SortOrder
    currency?: SortOrder
    subtotal?: SortOrder
    taxAmount?: SortOrder
    shippingAmount?: SortOrder
    discountAmount?: SortOrder
    total?: SortOrder
    taxRate?: SortOrder
    deliveryZoneName?: SortOrder
    paymentDueAt?: SortOrder
    couponCode?: SortOrder
    customerNote?: SortOrder
    trackingNumber?: SortOrder
    trackingCarrier?: SortOrder
    estimatedDeliveryAt?: SortOrder
    shippedAt?: SortOrder
    deliveredAt?: SortOrder
    cancelledAt?: SortOrder
    cancelReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    customerId?: SortOrder
    customerEmail?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    paymentMethod?: SortOrder
    currency?: SortOrder
    subtotal?: SortOrder
    taxAmount?: SortOrder
    shippingAmount?: SortOrder
    discountAmount?: SortOrder
    total?: SortOrder
    taxRate?: SortOrder
    deliveryZoneName?: SortOrder
    paymentDueAt?: SortOrder
    couponCode?: SortOrder
    customerNote?: SortOrder
    trackingNumber?: SortOrder
    trackingCarrier?: SortOrder
    estimatedDeliveryAt?: SortOrder
    shippedAt?: SortOrder
    deliveredAt?: SortOrder
    cancelledAt?: SortOrder
    cancelReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    subtotal?: SortOrder
    taxAmount?: SortOrder
    shippingAmount?: SortOrder
    discountAmount?: SortOrder
    total?: SortOrder
    taxRate?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type OrderItemCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    variantId?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    image?: SortOrder
    unitPrice?: SortOrder
    unitCost?: SortOrder
    quantity?: SortOrder
    subtotal?: SortOrder
    attributes?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderItemAvgOrderByAggregateInput = {
    unitPrice?: SortOrder
    unitCost?: SortOrder
    quantity?: SortOrder
    subtotal?: SortOrder
  }

  export type OrderItemMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    variantId?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    image?: SortOrder
    unitPrice?: SortOrder
    unitCost?: SortOrder
    quantity?: SortOrder
    subtotal?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderItemMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    variantId?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    image?: SortOrder
    unitPrice?: SortOrder
    unitCost?: SortOrder
    quantity?: SortOrder
    subtotal?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderItemSumOrderByAggregateInput = {
    unitPrice?: SortOrder
    unitCost?: SortOrder
    quantity?: SortOrder
    subtotal?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type OrderStatusHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    note?: SortOrder
    location?: SortOrder
    isPublic?: SortOrder
    changedBy?: SortOrder
    actor?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderStatusHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    note?: SortOrder
    location?: SortOrder
    isPublic?: SortOrder
    changedBy?: SortOrder
    actor?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderStatusHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    note?: SortOrder
    location?: SortOrder
    isPublic?: SortOrder
    changedBy?: SortOrder
    actor?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type OrderNoteCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
    isInternal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderNoteMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
    isInternal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderNoteMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
    isInternal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ReturnItemListRelationFilter = {
    every?: ReturnItemWhereInput
    some?: ReturnItemWhereInput
    none?: ReturnItemWhereInput
  }

  export type ReturnItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReturnRequestCountOrderByAggregateInput = {
    id?: SortOrder
    rmaNumber?: SortOrder
    orderId?: SortOrder
    customerId?: SortOrder
    status?: SortOrder
    reason?: SortOrder
    details?: SortOrder
    photos?: SortOrder
    resolution?: SortOrder
    instructions?: SortOrder
    rejectReason?: SortOrder
    restocked?: SortOrder
    refundAmount?: SortOrder
    adminNote?: SortOrder
    approvedAt?: SortOrder
    rejectedAt?: SortOrder
    receivedAt?: SortOrder
    refundedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReturnRequestAvgOrderByAggregateInput = {
    refundAmount?: SortOrder
  }

  export type ReturnRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    rmaNumber?: SortOrder
    orderId?: SortOrder
    customerId?: SortOrder
    status?: SortOrder
    reason?: SortOrder
    details?: SortOrder
    resolution?: SortOrder
    instructions?: SortOrder
    rejectReason?: SortOrder
    restocked?: SortOrder
    refundAmount?: SortOrder
    adminNote?: SortOrder
    approvedAt?: SortOrder
    rejectedAt?: SortOrder
    receivedAt?: SortOrder
    refundedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReturnRequestMinOrderByAggregateInput = {
    id?: SortOrder
    rmaNumber?: SortOrder
    orderId?: SortOrder
    customerId?: SortOrder
    status?: SortOrder
    reason?: SortOrder
    details?: SortOrder
    resolution?: SortOrder
    instructions?: SortOrder
    rejectReason?: SortOrder
    restocked?: SortOrder
    refundAmount?: SortOrder
    adminNote?: SortOrder
    approvedAt?: SortOrder
    rejectedAt?: SortOrder
    receivedAt?: SortOrder
    refundedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReturnRequestSumOrderByAggregateInput = {
    refundAmount?: SortOrder
  }

  export type ReturnRequestScalarRelationFilter = {
    is?: ReturnRequestWhereInput
    isNot?: ReturnRequestWhereInput
  }

  export type ReturnItemCountOrderByAggregateInput = {
    id?: SortOrder
    returnId?: SortOrder
    orderItemId?: SortOrder
    productId?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
  }

  export type ReturnItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
  }

  export type ReturnItemMaxOrderByAggregateInput = {
    id?: SortOrder
    returnId?: SortOrder
    orderItemId?: SortOrder
    productId?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
  }

  export type ReturnItemMinOrderByAggregateInput = {
    id?: SortOrder
    returnId?: SortOrder
    orderItemId?: SortOrder
    productId?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
  }

  export type ReturnItemSumOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    phone?: SortOrder
    merchantRequestId?: SortOrder
    checkoutRequestId?: SortOrder
    receiptNumber?: SortOrder
    resultCode?: SortOrder
    resultDesc?: SortOrder
    paidAt?: SortOrder
    raw?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
    resultCode?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    phone?: SortOrder
    merchantRequestId?: SortOrder
    checkoutRequestId?: SortOrder
    receiptNumber?: SortOrder
    resultCode?: SortOrder
    resultDesc?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    phone?: SortOrder
    merchantRequestId?: SortOrder
    checkoutRequestId?: SortOrder
    receiptNumber?: SortOrder
    resultCode?: SortOrder
    resultDesc?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder
    resultCode?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DeliveryZoneCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    cities?: SortOrder
    isDefault?: SortOrder
    fee?: SortOrder
    perKgFee?: SortOrder
    includedKg?: SortOrder
    freeAbove?: SortOrder
    minDays?: SortOrder
    maxDays?: SortOrder
    allowsCod?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliveryZoneAvgOrderByAggregateInput = {
    fee?: SortOrder
    perKgFee?: SortOrder
    includedKg?: SortOrder
    freeAbove?: SortOrder
    minDays?: SortOrder
    maxDays?: SortOrder
    sortOrder?: SortOrder
  }

  export type DeliveryZoneMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isDefault?: SortOrder
    fee?: SortOrder
    perKgFee?: SortOrder
    includedKg?: SortOrder
    freeAbove?: SortOrder
    minDays?: SortOrder
    maxDays?: SortOrder
    allowsCod?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliveryZoneMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isDefault?: SortOrder
    fee?: SortOrder
    perKgFee?: SortOrder
    includedKg?: SortOrder
    freeAbove?: SortOrder
    minDays?: SortOrder
    maxDays?: SortOrder
    allowsCod?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliveryZoneSumOrderByAggregateInput = {
    fee?: SortOrder
    perKgFee?: SortOrder
    includedKg?: SortOrder
    freeAbove?: SortOrder
    minDays?: SortOrder
    maxDays?: SortOrder
    sortOrder?: SortOrder
  }

  export type CheckoutSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    vatRate?: SortOrder
    vatOnShipping?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type CheckoutSettingsAvgOrderByAggregateInput = {
    id?: SortOrder
    vatRate?: SortOrder
  }

  export type CheckoutSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    vatRate?: SortOrder
    vatOnShipping?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type CheckoutSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    vatRate?: SortOrder
    vatOnShipping?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type CheckoutSettingsSumOrderByAggregateInput = {
    id?: SortOrder
    vatRate?: SortOrder
  }

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderStatusHistoryCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderStatusHistoryCreateWithoutOrderInput, OrderStatusHistoryUncheckedCreateWithoutOrderInput> | OrderStatusHistoryCreateWithoutOrderInput[] | OrderStatusHistoryUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderStatusHistoryCreateOrConnectWithoutOrderInput | OrderStatusHistoryCreateOrConnectWithoutOrderInput[]
    createMany?: OrderStatusHistoryCreateManyOrderInputEnvelope
    connect?: OrderStatusHistoryWhereUniqueInput | OrderStatusHistoryWhereUniqueInput[]
  }

  export type OrderNoteCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderNoteCreateWithoutOrderInput, OrderNoteUncheckedCreateWithoutOrderInput> | OrderNoteCreateWithoutOrderInput[] | OrderNoteUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderNoteCreateOrConnectWithoutOrderInput | OrderNoteCreateOrConnectWithoutOrderInput[]
    createMany?: OrderNoteCreateManyOrderInputEnvelope
    connect?: OrderNoteWhereUniqueInput | OrderNoteWhereUniqueInput[]
  }

  export type ReturnRequestCreateNestedManyWithoutOrderInput = {
    create?: XOR<ReturnRequestCreateWithoutOrderInput, ReturnRequestUncheckedCreateWithoutOrderInput> | ReturnRequestCreateWithoutOrderInput[] | ReturnRequestUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: ReturnRequestCreateOrConnectWithoutOrderInput | ReturnRequestCreateOrConnectWithoutOrderInput[]
    createMany?: ReturnRequestCreateManyOrderInputEnvelope
    connect?: ReturnRequestWhereUniqueInput | ReturnRequestWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutOrderInput = {
    create?: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput> | PaymentCreateWithoutOrderInput[] | PaymentUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutOrderInput | PaymentCreateOrConnectWithoutOrderInput[]
    createMany?: PaymentCreateManyOrderInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderStatusHistoryCreateWithoutOrderInput, OrderStatusHistoryUncheckedCreateWithoutOrderInput> | OrderStatusHistoryCreateWithoutOrderInput[] | OrderStatusHistoryUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderStatusHistoryCreateOrConnectWithoutOrderInput | OrderStatusHistoryCreateOrConnectWithoutOrderInput[]
    createMany?: OrderStatusHistoryCreateManyOrderInputEnvelope
    connect?: OrderStatusHistoryWhereUniqueInput | OrderStatusHistoryWhereUniqueInput[]
  }

  export type OrderNoteUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderNoteCreateWithoutOrderInput, OrderNoteUncheckedCreateWithoutOrderInput> | OrderNoteCreateWithoutOrderInput[] | OrderNoteUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderNoteCreateOrConnectWithoutOrderInput | OrderNoteCreateOrConnectWithoutOrderInput[]
    createMany?: OrderNoteCreateManyOrderInputEnvelope
    connect?: OrderNoteWhereUniqueInput | OrderNoteWhereUniqueInput[]
  }

  export type ReturnRequestUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<ReturnRequestCreateWithoutOrderInput, ReturnRequestUncheckedCreateWithoutOrderInput> | ReturnRequestCreateWithoutOrderInput[] | ReturnRequestUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: ReturnRequestCreateOrConnectWithoutOrderInput | ReturnRequestCreateOrConnectWithoutOrderInput[]
    createMany?: ReturnRequestCreateManyOrderInputEnvelope
    connect?: ReturnRequestWhereUniqueInput | ReturnRequestWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput> | PaymentCreateWithoutOrderInput[] | PaymentUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutOrderInput | PaymentCreateOrConnectWithoutOrderInput[]
    createMany?: PaymentCreateManyOrderInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderStatusHistoryUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderStatusHistoryCreateWithoutOrderInput, OrderStatusHistoryUncheckedCreateWithoutOrderInput> | OrderStatusHistoryCreateWithoutOrderInput[] | OrderStatusHistoryUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderStatusHistoryCreateOrConnectWithoutOrderInput | OrderStatusHistoryCreateOrConnectWithoutOrderInput[]
    upsert?: OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInput | OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderStatusHistoryCreateManyOrderInputEnvelope
    set?: OrderStatusHistoryWhereUniqueInput | OrderStatusHistoryWhereUniqueInput[]
    disconnect?: OrderStatusHistoryWhereUniqueInput | OrderStatusHistoryWhereUniqueInput[]
    delete?: OrderStatusHistoryWhereUniqueInput | OrderStatusHistoryWhereUniqueInput[]
    connect?: OrderStatusHistoryWhereUniqueInput | OrderStatusHistoryWhereUniqueInput[]
    update?: OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInput | OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderStatusHistoryUpdateManyWithWhereWithoutOrderInput | OrderStatusHistoryUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderStatusHistoryScalarWhereInput | OrderStatusHistoryScalarWhereInput[]
  }

  export type OrderNoteUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderNoteCreateWithoutOrderInput, OrderNoteUncheckedCreateWithoutOrderInput> | OrderNoteCreateWithoutOrderInput[] | OrderNoteUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderNoteCreateOrConnectWithoutOrderInput | OrderNoteCreateOrConnectWithoutOrderInput[]
    upsert?: OrderNoteUpsertWithWhereUniqueWithoutOrderInput | OrderNoteUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderNoteCreateManyOrderInputEnvelope
    set?: OrderNoteWhereUniqueInput | OrderNoteWhereUniqueInput[]
    disconnect?: OrderNoteWhereUniqueInput | OrderNoteWhereUniqueInput[]
    delete?: OrderNoteWhereUniqueInput | OrderNoteWhereUniqueInput[]
    connect?: OrderNoteWhereUniqueInput | OrderNoteWhereUniqueInput[]
    update?: OrderNoteUpdateWithWhereUniqueWithoutOrderInput | OrderNoteUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderNoteUpdateManyWithWhereWithoutOrderInput | OrderNoteUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderNoteScalarWhereInput | OrderNoteScalarWhereInput[]
  }

  export type ReturnRequestUpdateManyWithoutOrderNestedInput = {
    create?: XOR<ReturnRequestCreateWithoutOrderInput, ReturnRequestUncheckedCreateWithoutOrderInput> | ReturnRequestCreateWithoutOrderInput[] | ReturnRequestUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: ReturnRequestCreateOrConnectWithoutOrderInput | ReturnRequestCreateOrConnectWithoutOrderInput[]
    upsert?: ReturnRequestUpsertWithWhereUniqueWithoutOrderInput | ReturnRequestUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: ReturnRequestCreateManyOrderInputEnvelope
    set?: ReturnRequestWhereUniqueInput | ReturnRequestWhereUniqueInput[]
    disconnect?: ReturnRequestWhereUniqueInput | ReturnRequestWhereUniqueInput[]
    delete?: ReturnRequestWhereUniqueInput | ReturnRequestWhereUniqueInput[]
    connect?: ReturnRequestWhereUniqueInput | ReturnRequestWhereUniqueInput[]
    update?: ReturnRequestUpdateWithWhereUniqueWithoutOrderInput | ReturnRequestUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: ReturnRequestUpdateManyWithWhereWithoutOrderInput | ReturnRequestUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: ReturnRequestScalarWhereInput | ReturnRequestScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutOrderNestedInput = {
    create?: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput> | PaymentCreateWithoutOrderInput[] | PaymentUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutOrderInput | PaymentCreateOrConnectWithoutOrderInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutOrderInput | PaymentUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: PaymentCreateManyOrderInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutOrderInput | PaymentUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutOrderInput | PaymentUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderStatusHistoryUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderStatusHistoryCreateWithoutOrderInput, OrderStatusHistoryUncheckedCreateWithoutOrderInput> | OrderStatusHistoryCreateWithoutOrderInput[] | OrderStatusHistoryUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderStatusHistoryCreateOrConnectWithoutOrderInput | OrderStatusHistoryCreateOrConnectWithoutOrderInput[]
    upsert?: OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInput | OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderStatusHistoryCreateManyOrderInputEnvelope
    set?: OrderStatusHistoryWhereUniqueInput | OrderStatusHistoryWhereUniqueInput[]
    disconnect?: OrderStatusHistoryWhereUniqueInput | OrderStatusHistoryWhereUniqueInput[]
    delete?: OrderStatusHistoryWhereUniqueInput | OrderStatusHistoryWhereUniqueInput[]
    connect?: OrderStatusHistoryWhereUniqueInput | OrderStatusHistoryWhereUniqueInput[]
    update?: OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInput | OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderStatusHistoryUpdateManyWithWhereWithoutOrderInput | OrderStatusHistoryUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderStatusHistoryScalarWhereInput | OrderStatusHistoryScalarWhereInput[]
  }

  export type OrderNoteUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderNoteCreateWithoutOrderInput, OrderNoteUncheckedCreateWithoutOrderInput> | OrderNoteCreateWithoutOrderInput[] | OrderNoteUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderNoteCreateOrConnectWithoutOrderInput | OrderNoteCreateOrConnectWithoutOrderInput[]
    upsert?: OrderNoteUpsertWithWhereUniqueWithoutOrderInput | OrderNoteUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderNoteCreateManyOrderInputEnvelope
    set?: OrderNoteWhereUniqueInput | OrderNoteWhereUniqueInput[]
    disconnect?: OrderNoteWhereUniqueInput | OrderNoteWhereUniqueInput[]
    delete?: OrderNoteWhereUniqueInput | OrderNoteWhereUniqueInput[]
    connect?: OrderNoteWhereUniqueInput | OrderNoteWhereUniqueInput[]
    update?: OrderNoteUpdateWithWhereUniqueWithoutOrderInput | OrderNoteUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderNoteUpdateManyWithWhereWithoutOrderInput | OrderNoteUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderNoteScalarWhereInput | OrderNoteScalarWhereInput[]
  }

  export type ReturnRequestUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<ReturnRequestCreateWithoutOrderInput, ReturnRequestUncheckedCreateWithoutOrderInput> | ReturnRequestCreateWithoutOrderInput[] | ReturnRequestUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: ReturnRequestCreateOrConnectWithoutOrderInput | ReturnRequestCreateOrConnectWithoutOrderInput[]
    upsert?: ReturnRequestUpsertWithWhereUniqueWithoutOrderInput | ReturnRequestUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: ReturnRequestCreateManyOrderInputEnvelope
    set?: ReturnRequestWhereUniqueInput | ReturnRequestWhereUniqueInput[]
    disconnect?: ReturnRequestWhereUniqueInput | ReturnRequestWhereUniqueInput[]
    delete?: ReturnRequestWhereUniqueInput | ReturnRequestWhereUniqueInput[]
    connect?: ReturnRequestWhereUniqueInput | ReturnRequestWhereUniqueInput[]
    update?: ReturnRequestUpdateWithWhereUniqueWithoutOrderInput | ReturnRequestUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: ReturnRequestUpdateManyWithWhereWithoutOrderInput | ReturnRequestUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: ReturnRequestScalarWhereInput | ReturnRequestScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput> | PaymentCreateWithoutOrderInput[] | PaymentUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutOrderInput | PaymentCreateOrConnectWithoutOrderInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutOrderInput | PaymentUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: PaymentCreateManyOrderInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutOrderInput | PaymentUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutOrderInput | PaymentUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type OrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    connect?: OrderWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    upsert?: OrderUpsertWithoutItemsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutItemsInput, OrderUpdateWithoutItemsInput>, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type OrderCreateNestedOneWithoutStatusHistoryInput = {
    create?: XOR<OrderCreateWithoutStatusHistoryInput, OrderUncheckedCreateWithoutStatusHistoryInput>
    connectOrCreate?: OrderCreateOrConnectWithoutStatusHistoryInput
    connect?: OrderWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type OrderUpdateOneRequiredWithoutStatusHistoryNestedInput = {
    create?: XOR<OrderCreateWithoutStatusHistoryInput, OrderUncheckedCreateWithoutStatusHistoryInput>
    connectOrCreate?: OrderCreateOrConnectWithoutStatusHistoryInput
    upsert?: OrderUpsertWithoutStatusHistoryInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutStatusHistoryInput, OrderUpdateWithoutStatusHistoryInput>, OrderUncheckedUpdateWithoutStatusHistoryInput>
  }

  export type OrderCreateNestedOneWithoutNotesInput = {
    create?: XOR<OrderCreateWithoutNotesInput, OrderUncheckedCreateWithoutNotesInput>
    connectOrCreate?: OrderCreateOrConnectWithoutNotesInput
    connect?: OrderWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutNotesNestedInput = {
    create?: XOR<OrderCreateWithoutNotesInput, OrderUncheckedCreateWithoutNotesInput>
    connectOrCreate?: OrderCreateOrConnectWithoutNotesInput
    upsert?: OrderUpsertWithoutNotesInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutNotesInput, OrderUpdateWithoutNotesInput>, OrderUncheckedUpdateWithoutNotesInput>
  }

  export type ReturnRequestCreatephotosInput = {
    set: string[]
  }

  export type ReturnItemCreateNestedManyWithoutReturnRequestInput = {
    create?: XOR<ReturnItemCreateWithoutReturnRequestInput, ReturnItemUncheckedCreateWithoutReturnRequestInput> | ReturnItemCreateWithoutReturnRequestInput[] | ReturnItemUncheckedCreateWithoutReturnRequestInput[]
    connectOrCreate?: ReturnItemCreateOrConnectWithoutReturnRequestInput | ReturnItemCreateOrConnectWithoutReturnRequestInput[]
    createMany?: ReturnItemCreateManyReturnRequestInputEnvelope
    connect?: ReturnItemWhereUniqueInput | ReturnItemWhereUniqueInput[]
  }

  export type OrderCreateNestedOneWithoutReturnsInput = {
    create?: XOR<OrderCreateWithoutReturnsInput, OrderUncheckedCreateWithoutReturnsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutReturnsInput
    connect?: OrderWhereUniqueInput
  }

  export type ReturnItemUncheckedCreateNestedManyWithoutReturnRequestInput = {
    create?: XOR<ReturnItemCreateWithoutReturnRequestInput, ReturnItemUncheckedCreateWithoutReturnRequestInput> | ReturnItemCreateWithoutReturnRequestInput[] | ReturnItemUncheckedCreateWithoutReturnRequestInput[]
    connectOrCreate?: ReturnItemCreateOrConnectWithoutReturnRequestInput | ReturnItemCreateOrConnectWithoutReturnRequestInput[]
    createMany?: ReturnItemCreateManyReturnRequestInputEnvelope
    connect?: ReturnItemWhereUniqueInput | ReturnItemWhereUniqueInput[]
  }

  export type ReturnRequestUpdatephotosInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ReturnItemUpdateManyWithoutReturnRequestNestedInput = {
    create?: XOR<ReturnItemCreateWithoutReturnRequestInput, ReturnItemUncheckedCreateWithoutReturnRequestInput> | ReturnItemCreateWithoutReturnRequestInput[] | ReturnItemUncheckedCreateWithoutReturnRequestInput[]
    connectOrCreate?: ReturnItemCreateOrConnectWithoutReturnRequestInput | ReturnItemCreateOrConnectWithoutReturnRequestInput[]
    upsert?: ReturnItemUpsertWithWhereUniqueWithoutReturnRequestInput | ReturnItemUpsertWithWhereUniqueWithoutReturnRequestInput[]
    createMany?: ReturnItemCreateManyReturnRequestInputEnvelope
    set?: ReturnItemWhereUniqueInput | ReturnItemWhereUniqueInput[]
    disconnect?: ReturnItemWhereUniqueInput | ReturnItemWhereUniqueInput[]
    delete?: ReturnItemWhereUniqueInput | ReturnItemWhereUniqueInput[]
    connect?: ReturnItemWhereUniqueInput | ReturnItemWhereUniqueInput[]
    update?: ReturnItemUpdateWithWhereUniqueWithoutReturnRequestInput | ReturnItemUpdateWithWhereUniqueWithoutReturnRequestInput[]
    updateMany?: ReturnItemUpdateManyWithWhereWithoutReturnRequestInput | ReturnItemUpdateManyWithWhereWithoutReturnRequestInput[]
    deleteMany?: ReturnItemScalarWhereInput | ReturnItemScalarWhereInput[]
  }

  export type OrderUpdateOneRequiredWithoutReturnsNestedInput = {
    create?: XOR<OrderCreateWithoutReturnsInput, OrderUncheckedCreateWithoutReturnsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutReturnsInput
    upsert?: OrderUpsertWithoutReturnsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutReturnsInput, OrderUpdateWithoutReturnsInput>, OrderUncheckedUpdateWithoutReturnsInput>
  }

  export type ReturnItemUncheckedUpdateManyWithoutReturnRequestNestedInput = {
    create?: XOR<ReturnItemCreateWithoutReturnRequestInput, ReturnItemUncheckedCreateWithoutReturnRequestInput> | ReturnItemCreateWithoutReturnRequestInput[] | ReturnItemUncheckedCreateWithoutReturnRequestInput[]
    connectOrCreate?: ReturnItemCreateOrConnectWithoutReturnRequestInput | ReturnItemCreateOrConnectWithoutReturnRequestInput[]
    upsert?: ReturnItemUpsertWithWhereUniqueWithoutReturnRequestInput | ReturnItemUpsertWithWhereUniqueWithoutReturnRequestInput[]
    createMany?: ReturnItemCreateManyReturnRequestInputEnvelope
    set?: ReturnItemWhereUniqueInput | ReturnItemWhereUniqueInput[]
    disconnect?: ReturnItemWhereUniqueInput | ReturnItemWhereUniqueInput[]
    delete?: ReturnItemWhereUniqueInput | ReturnItemWhereUniqueInput[]
    connect?: ReturnItemWhereUniqueInput | ReturnItemWhereUniqueInput[]
    update?: ReturnItemUpdateWithWhereUniqueWithoutReturnRequestInput | ReturnItemUpdateWithWhereUniqueWithoutReturnRequestInput[]
    updateMany?: ReturnItemUpdateManyWithWhereWithoutReturnRequestInput | ReturnItemUpdateManyWithWhereWithoutReturnRequestInput[]
    deleteMany?: ReturnItemScalarWhereInput | ReturnItemScalarWhereInput[]
  }

  export type ReturnRequestCreateNestedOneWithoutItemsInput = {
    create?: XOR<ReturnRequestCreateWithoutItemsInput, ReturnRequestUncheckedCreateWithoutItemsInput>
    connectOrCreate?: ReturnRequestCreateOrConnectWithoutItemsInput
    connect?: ReturnRequestWhereUniqueInput
  }

  export type ReturnRequestUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<ReturnRequestCreateWithoutItemsInput, ReturnRequestUncheckedCreateWithoutItemsInput>
    connectOrCreate?: ReturnRequestCreateOrConnectWithoutItemsInput
    upsert?: ReturnRequestUpsertWithoutItemsInput
    connect?: ReturnRequestWhereUniqueInput
    update?: XOR<XOR<ReturnRequestUpdateToOneWithWhereWithoutItemsInput, ReturnRequestUpdateWithoutItemsInput>, ReturnRequestUncheckedUpdateWithoutItemsInput>
  }

  export type OrderCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<OrderCreateWithoutPaymentsInput, OrderUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutPaymentsInput
    connect?: OrderWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OrderUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<OrderCreateWithoutPaymentsInput, OrderUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutPaymentsInput
    upsert?: OrderUpsertWithoutPaymentsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutPaymentsInput, OrderUpdateWithoutPaymentsInput>, OrderUncheckedUpdateWithoutPaymentsInput>
  }

  export type DeliveryZoneCreatecitiesInput = {
    set: string[]
  }

  export type DeliveryZoneUpdatecitiesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type OrderItemCreateWithoutOrderInput = {
    id?: string
    productId: string
    variantId?: string | null
    sku: string
    name: string
    image?: string | null
    unitPrice: Decimal | DecimalJsLike | number | string
    unitCost?: Decimal | DecimalJsLike | number | string | null
    quantity: number
    subtotal: Decimal | DecimalJsLike | number | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    id?: string
    productId: string
    variantId?: string | null
    sku: string
    name: string
    image?: string | null
    unitPrice: Decimal | DecimalJsLike | number | string
    unitCost?: Decimal | DecimalJsLike | number | string | null
    quantity: number
    subtotal: Decimal | DecimalJsLike | number | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type OrderStatusHistoryCreateWithoutOrderInput = {
    id?: string
    type?: string
    status: string
    note?: string | null
    location?: string | null
    isPublic?: boolean
    changedBy?: string | null
    actor?: string | null
    createdAt?: Date | string
  }

  export type OrderStatusHistoryUncheckedCreateWithoutOrderInput = {
    id?: string
    type?: string
    status: string
    note?: string | null
    location?: string | null
    isPublic?: boolean
    changedBy?: string | null
    actor?: string | null
    createdAt?: Date | string
  }

  export type OrderStatusHistoryCreateOrConnectWithoutOrderInput = {
    where: OrderStatusHistoryWhereUniqueInput
    create: XOR<OrderStatusHistoryCreateWithoutOrderInput, OrderStatusHistoryUncheckedCreateWithoutOrderInput>
  }

  export type OrderStatusHistoryCreateManyOrderInputEnvelope = {
    data: OrderStatusHistoryCreateManyOrderInput | OrderStatusHistoryCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type OrderNoteCreateWithoutOrderInput = {
    id?: string
    content: string
    authorId: string
    isInternal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderNoteUncheckedCreateWithoutOrderInput = {
    id?: string
    content: string
    authorId: string
    isInternal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderNoteCreateOrConnectWithoutOrderInput = {
    where: OrderNoteWhereUniqueInput
    create: XOR<OrderNoteCreateWithoutOrderInput, OrderNoteUncheckedCreateWithoutOrderInput>
  }

  export type OrderNoteCreateManyOrderInputEnvelope = {
    data: OrderNoteCreateManyOrderInput | OrderNoteCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type ReturnRequestCreateWithoutOrderInput = {
    id?: string
    rmaNumber: string
    customerId: string
    status?: string
    reason: string
    details?: string | null
    photos?: ReturnRequestCreatephotosInput | string[]
    resolution?: string
    instructions?: string | null
    rejectReason?: string | null
    restocked?: boolean
    refundAmount?: Decimal | DecimalJsLike | number | string | null
    adminNote?: string | null
    approvedAt?: Date | string | null
    rejectedAt?: Date | string | null
    receivedAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ReturnItemCreateNestedManyWithoutReturnRequestInput
  }

  export type ReturnRequestUncheckedCreateWithoutOrderInput = {
    id?: string
    rmaNumber: string
    customerId: string
    status?: string
    reason: string
    details?: string | null
    photos?: ReturnRequestCreatephotosInput | string[]
    resolution?: string
    instructions?: string | null
    rejectReason?: string | null
    restocked?: boolean
    refundAmount?: Decimal | DecimalJsLike | number | string | null
    adminNote?: string | null
    approvedAt?: Date | string | null
    rejectedAt?: Date | string | null
    receivedAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ReturnItemUncheckedCreateNestedManyWithoutReturnRequestInput
  }

  export type ReturnRequestCreateOrConnectWithoutOrderInput = {
    where: ReturnRequestWhereUniqueInput
    create: XOR<ReturnRequestCreateWithoutOrderInput, ReturnRequestUncheckedCreateWithoutOrderInput>
  }

  export type ReturnRequestCreateManyOrderInputEnvelope = {
    data: ReturnRequestCreateManyOrderInput | ReturnRequestCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutOrderInput = {
    id?: string
    provider?: string
    status?: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    phone: string
    merchantRequestId?: string | null
    checkoutRequestId?: string | null
    receiptNumber?: string | null
    resultCode?: number | null
    resultDesc?: string | null
    paidAt?: Date | string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUncheckedCreateWithoutOrderInput = {
    id?: string
    provider?: string
    status?: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    phone: string
    merchantRequestId?: string | null
    checkoutRequestId?: string | null
    receiptNumber?: string | null
    resultCode?: number | null
    resultDesc?: string | null
    paidAt?: Date | string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutOrderInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput>
  }

  export type PaymentCreateManyOrderInputEnvelope = {
    data: PaymentCreateManyOrderInput | PaymentCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    OR?: OrderItemScalarWhereInput[]
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    variantId?: StringNullableFilter<"OrderItem"> | string | null
    sku?: StringFilter<"OrderItem"> | string
    name?: StringFilter<"OrderItem"> | string
    image?: StringNullableFilter<"OrderItem"> | string | null
    unitPrice?: DecimalFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    unitCost?: DecimalNullableFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string | null
    quantity?: IntFilter<"OrderItem"> | number
    subtotal?: DecimalFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    attributes?: JsonNullableFilter<"OrderItem">
    createdAt?: DateTimeFilter<"OrderItem"> | Date | string
  }

  export type OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderStatusHistoryWhereUniqueInput
    update: XOR<OrderStatusHistoryUpdateWithoutOrderInput, OrderStatusHistoryUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderStatusHistoryCreateWithoutOrderInput, OrderStatusHistoryUncheckedCreateWithoutOrderInput>
  }

  export type OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderStatusHistoryWhereUniqueInput
    data: XOR<OrderStatusHistoryUpdateWithoutOrderInput, OrderStatusHistoryUncheckedUpdateWithoutOrderInput>
  }

  export type OrderStatusHistoryUpdateManyWithWhereWithoutOrderInput = {
    where: OrderStatusHistoryScalarWhereInput
    data: XOR<OrderStatusHistoryUpdateManyMutationInput, OrderStatusHistoryUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderStatusHistoryScalarWhereInput = {
    AND?: OrderStatusHistoryScalarWhereInput | OrderStatusHistoryScalarWhereInput[]
    OR?: OrderStatusHistoryScalarWhereInput[]
    NOT?: OrderStatusHistoryScalarWhereInput | OrderStatusHistoryScalarWhereInput[]
    id?: StringFilter<"OrderStatusHistory"> | string
    orderId?: StringFilter<"OrderStatusHistory"> | string
    type?: StringFilter<"OrderStatusHistory"> | string
    status?: StringFilter<"OrderStatusHistory"> | string
    note?: StringNullableFilter<"OrderStatusHistory"> | string | null
    location?: StringNullableFilter<"OrderStatusHistory"> | string | null
    isPublic?: BoolFilter<"OrderStatusHistory"> | boolean
    changedBy?: StringNullableFilter<"OrderStatusHistory"> | string | null
    actor?: StringNullableFilter<"OrderStatusHistory"> | string | null
    createdAt?: DateTimeFilter<"OrderStatusHistory"> | Date | string
  }

  export type OrderNoteUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderNoteWhereUniqueInput
    update: XOR<OrderNoteUpdateWithoutOrderInput, OrderNoteUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderNoteCreateWithoutOrderInput, OrderNoteUncheckedCreateWithoutOrderInput>
  }

  export type OrderNoteUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderNoteWhereUniqueInput
    data: XOR<OrderNoteUpdateWithoutOrderInput, OrderNoteUncheckedUpdateWithoutOrderInput>
  }

  export type OrderNoteUpdateManyWithWhereWithoutOrderInput = {
    where: OrderNoteScalarWhereInput
    data: XOR<OrderNoteUpdateManyMutationInput, OrderNoteUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderNoteScalarWhereInput = {
    AND?: OrderNoteScalarWhereInput | OrderNoteScalarWhereInput[]
    OR?: OrderNoteScalarWhereInput[]
    NOT?: OrderNoteScalarWhereInput | OrderNoteScalarWhereInput[]
    id?: StringFilter<"OrderNote"> | string
    orderId?: StringFilter<"OrderNote"> | string
    content?: StringFilter<"OrderNote"> | string
    authorId?: StringFilter<"OrderNote"> | string
    isInternal?: BoolFilter<"OrderNote"> | boolean
    createdAt?: DateTimeFilter<"OrderNote"> | Date | string
    updatedAt?: DateTimeFilter<"OrderNote"> | Date | string
  }

  export type ReturnRequestUpsertWithWhereUniqueWithoutOrderInput = {
    where: ReturnRequestWhereUniqueInput
    update: XOR<ReturnRequestUpdateWithoutOrderInput, ReturnRequestUncheckedUpdateWithoutOrderInput>
    create: XOR<ReturnRequestCreateWithoutOrderInput, ReturnRequestUncheckedCreateWithoutOrderInput>
  }

  export type ReturnRequestUpdateWithWhereUniqueWithoutOrderInput = {
    where: ReturnRequestWhereUniqueInput
    data: XOR<ReturnRequestUpdateWithoutOrderInput, ReturnRequestUncheckedUpdateWithoutOrderInput>
  }

  export type ReturnRequestUpdateManyWithWhereWithoutOrderInput = {
    where: ReturnRequestScalarWhereInput
    data: XOR<ReturnRequestUpdateManyMutationInput, ReturnRequestUncheckedUpdateManyWithoutOrderInput>
  }

  export type ReturnRequestScalarWhereInput = {
    AND?: ReturnRequestScalarWhereInput | ReturnRequestScalarWhereInput[]
    OR?: ReturnRequestScalarWhereInput[]
    NOT?: ReturnRequestScalarWhereInput | ReturnRequestScalarWhereInput[]
    id?: StringFilter<"ReturnRequest"> | string
    rmaNumber?: StringFilter<"ReturnRequest"> | string
    orderId?: StringFilter<"ReturnRequest"> | string
    customerId?: StringFilter<"ReturnRequest"> | string
    status?: StringFilter<"ReturnRequest"> | string
    reason?: StringFilter<"ReturnRequest"> | string
    details?: StringNullableFilter<"ReturnRequest"> | string | null
    photos?: StringNullableListFilter<"ReturnRequest">
    resolution?: StringFilter<"ReturnRequest"> | string
    instructions?: StringNullableFilter<"ReturnRequest"> | string | null
    rejectReason?: StringNullableFilter<"ReturnRequest"> | string | null
    restocked?: BoolFilter<"ReturnRequest"> | boolean
    refundAmount?: DecimalNullableFilter<"ReturnRequest"> | Decimal | DecimalJsLike | number | string | null
    adminNote?: StringNullableFilter<"ReturnRequest"> | string | null
    approvedAt?: DateTimeNullableFilter<"ReturnRequest"> | Date | string | null
    rejectedAt?: DateTimeNullableFilter<"ReturnRequest"> | Date | string | null
    receivedAt?: DateTimeNullableFilter<"ReturnRequest"> | Date | string | null
    refundedAt?: DateTimeNullableFilter<"ReturnRequest"> | Date | string | null
    createdAt?: DateTimeFilter<"ReturnRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ReturnRequest"> | Date | string
  }

  export type PaymentUpsertWithWhereUniqueWithoutOrderInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutOrderInput, PaymentUncheckedUpdateWithoutOrderInput>
    create: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutOrderInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutOrderInput, PaymentUncheckedUpdateWithoutOrderInput>
  }

  export type PaymentUpdateManyWithWhereWithoutOrderInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutOrderInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: StringFilter<"Payment"> | string
    orderId?: StringFilter<"Payment"> | string
    provider?: StringFilter<"Payment"> | string
    status?: StringFilter<"Payment"> | string
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Payment"> | string
    phone?: StringFilter<"Payment"> | string
    merchantRequestId?: StringNullableFilter<"Payment"> | string | null
    checkoutRequestId?: StringNullableFilter<"Payment"> | string | null
    receiptNumber?: StringNullableFilter<"Payment"> | string | null
    resultCode?: IntNullableFilter<"Payment"> | number | null
    resultDesc?: StringNullableFilter<"Payment"> | string | null
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    raw?: JsonNullableFilter<"Payment">
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type OrderCreateWithoutItemsInput = {
    id?: string
    orderNumber: string
    customerId: string
    customerEmail: string
    customerName: string
    customerPhone?: string | null
    status?: string
    paymentStatus?: string
    paymentMethod?: string | null
    currency?: string
    subtotal: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    shippingAmount?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    taxRate?: Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: string | null
    paymentDueAt?: Date | string | null
    couponCode?: string | null
    customerNote?: string | null
    shippingAddress: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: string | null
    trackingCarrier?: string | null
    estimatedDeliveryAt?: Date | string | null
    shippedAt?: Date | string | null
    deliveredAt?: Date | string | null
    cancelledAt?: Date | string | null
    cancelReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    statusHistory?: OrderStatusHistoryCreateNestedManyWithoutOrderInput
    notes?: OrderNoteCreateNestedManyWithoutOrderInput
    returns?: ReturnRequestCreateNestedManyWithoutOrderInput
    payments?: PaymentCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutItemsInput = {
    id?: string
    orderNumber: string
    customerId: string
    customerEmail: string
    customerName: string
    customerPhone?: string | null
    status?: string
    paymentStatus?: string
    paymentMethod?: string | null
    currency?: string
    subtotal: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    shippingAmount?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    taxRate?: Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: string | null
    paymentDueAt?: Date | string | null
    couponCode?: string | null
    customerNote?: string | null
    shippingAddress: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: string | null
    trackingCarrier?: string | null
    estimatedDeliveryAt?: Date | string | null
    shippedAt?: Date | string | null
    deliveredAt?: Date | string | null
    cancelledAt?: Date | string | null
    cancelReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    statusHistory?: OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInput
    notes?: OrderNoteUncheckedCreateNestedManyWithoutOrderInput
    returns?: ReturnRequestUncheckedCreateNestedManyWithoutOrderInput
    payments?: PaymentUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutItemsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
  }

  export type OrderUpsertWithoutItemsInput = {
    update: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type OrderUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    shippingAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    couponCode?: NullableStringFieldUpdateOperationsInput | string | null
    customerNote?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddress?: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingCarrier?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statusHistory?: OrderStatusHistoryUpdateManyWithoutOrderNestedInput
    notes?: OrderNoteUpdateManyWithoutOrderNestedInput
    returns?: ReturnRequestUpdateManyWithoutOrderNestedInput
    payments?: PaymentUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    shippingAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    couponCode?: NullableStringFieldUpdateOperationsInput | string | null
    customerNote?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddress?: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingCarrier?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statusHistory?: OrderStatusHistoryUncheckedUpdateManyWithoutOrderNestedInput
    notes?: OrderNoteUncheckedUpdateManyWithoutOrderNestedInput
    returns?: ReturnRequestUncheckedUpdateManyWithoutOrderNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateWithoutStatusHistoryInput = {
    id?: string
    orderNumber: string
    customerId: string
    customerEmail: string
    customerName: string
    customerPhone?: string | null
    status?: string
    paymentStatus?: string
    paymentMethod?: string | null
    currency?: string
    subtotal: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    shippingAmount?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    taxRate?: Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: string | null
    paymentDueAt?: Date | string | null
    couponCode?: string | null
    customerNote?: string | null
    shippingAddress: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: string | null
    trackingCarrier?: string | null
    estimatedDeliveryAt?: Date | string | null
    shippedAt?: Date | string | null
    deliveredAt?: Date | string | null
    cancelledAt?: Date | string | null
    cancelReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemCreateNestedManyWithoutOrderInput
    notes?: OrderNoteCreateNestedManyWithoutOrderInput
    returns?: ReturnRequestCreateNestedManyWithoutOrderInput
    payments?: PaymentCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutStatusHistoryInput = {
    id?: string
    orderNumber: string
    customerId: string
    customerEmail: string
    customerName: string
    customerPhone?: string | null
    status?: string
    paymentStatus?: string
    paymentMethod?: string | null
    currency?: string
    subtotal: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    shippingAmount?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    taxRate?: Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: string | null
    paymentDueAt?: Date | string | null
    couponCode?: string | null
    customerNote?: string | null
    shippingAddress: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: string | null
    trackingCarrier?: string | null
    estimatedDeliveryAt?: Date | string | null
    shippedAt?: Date | string | null
    deliveredAt?: Date | string | null
    cancelledAt?: Date | string | null
    cancelReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    notes?: OrderNoteUncheckedCreateNestedManyWithoutOrderInput
    returns?: ReturnRequestUncheckedCreateNestedManyWithoutOrderInput
    payments?: PaymentUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutStatusHistoryInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutStatusHistoryInput, OrderUncheckedCreateWithoutStatusHistoryInput>
  }

  export type OrderUpsertWithoutStatusHistoryInput = {
    update: XOR<OrderUpdateWithoutStatusHistoryInput, OrderUncheckedUpdateWithoutStatusHistoryInput>
    create: XOR<OrderCreateWithoutStatusHistoryInput, OrderUncheckedCreateWithoutStatusHistoryInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutStatusHistoryInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutStatusHistoryInput, OrderUncheckedUpdateWithoutStatusHistoryInput>
  }

  export type OrderUpdateWithoutStatusHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    shippingAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    couponCode?: NullableStringFieldUpdateOperationsInput | string | null
    customerNote?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddress?: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingCarrier?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    notes?: OrderNoteUpdateManyWithoutOrderNestedInput
    returns?: ReturnRequestUpdateManyWithoutOrderNestedInput
    payments?: PaymentUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutStatusHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    shippingAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    couponCode?: NullableStringFieldUpdateOperationsInput | string | null
    customerNote?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddress?: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingCarrier?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    notes?: OrderNoteUncheckedUpdateManyWithoutOrderNestedInput
    returns?: ReturnRequestUncheckedUpdateManyWithoutOrderNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateWithoutNotesInput = {
    id?: string
    orderNumber: string
    customerId: string
    customerEmail: string
    customerName: string
    customerPhone?: string | null
    status?: string
    paymentStatus?: string
    paymentMethod?: string | null
    currency?: string
    subtotal: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    shippingAmount?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    taxRate?: Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: string | null
    paymentDueAt?: Date | string | null
    couponCode?: string | null
    customerNote?: string | null
    shippingAddress: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: string | null
    trackingCarrier?: string | null
    estimatedDeliveryAt?: Date | string | null
    shippedAt?: Date | string | null
    deliveredAt?: Date | string | null
    cancelledAt?: Date | string | null
    cancelReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemCreateNestedManyWithoutOrderInput
    statusHistory?: OrderStatusHistoryCreateNestedManyWithoutOrderInput
    returns?: ReturnRequestCreateNestedManyWithoutOrderInput
    payments?: PaymentCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutNotesInput = {
    id?: string
    orderNumber: string
    customerId: string
    customerEmail: string
    customerName: string
    customerPhone?: string | null
    status?: string
    paymentStatus?: string
    paymentMethod?: string | null
    currency?: string
    subtotal: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    shippingAmount?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    taxRate?: Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: string | null
    paymentDueAt?: Date | string | null
    couponCode?: string | null
    customerNote?: string | null
    shippingAddress: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: string | null
    trackingCarrier?: string | null
    estimatedDeliveryAt?: Date | string | null
    shippedAt?: Date | string | null
    deliveredAt?: Date | string | null
    cancelledAt?: Date | string | null
    cancelReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    statusHistory?: OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInput
    returns?: ReturnRequestUncheckedCreateNestedManyWithoutOrderInput
    payments?: PaymentUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutNotesInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutNotesInput, OrderUncheckedCreateWithoutNotesInput>
  }

  export type OrderUpsertWithoutNotesInput = {
    update: XOR<OrderUpdateWithoutNotesInput, OrderUncheckedUpdateWithoutNotesInput>
    create: XOR<OrderCreateWithoutNotesInput, OrderUncheckedCreateWithoutNotesInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutNotesInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutNotesInput, OrderUncheckedUpdateWithoutNotesInput>
  }

  export type OrderUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    shippingAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    couponCode?: NullableStringFieldUpdateOperationsInput | string | null
    customerNote?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddress?: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingCarrier?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    statusHistory?: OrderStatusHistoryUpdateManyWithoutOrderNestedInput
    returns?: ReturnRequestUpdateManyWithoutOrderNestedInput
    payments?: PaymentUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    shippingAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    couponCode?: NullableStringFieldUpdateOperationsInput | string | null
    customerNote?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddress?: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingCarrier?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    statusHistory?: OrderStatusHistoryUncheckedUpdateManyWithoutOrderNestedInput
    returns?: ReturnRequestUncheckedUpdateManyWithoutOrderNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type ReturnItemCreateWithoutReturnRequestInput = {
    id?: string
    orderItemId: string
    productId: string
    sku: string
    name: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
  }

  export type ReturnItemUncheckedCreateWithoutReturnRequestInput = {
    id?: string
    orderItemId: string
    productId: string
    sku: string
    name: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
  }

  export type ReturnItemCreateOrConnectWithoutReturnRequestInput = {
    where: ReturnItemWhereUniqueInput
    create: XOR<ReturnItemCreateWithoutReturnRequestInput, ReturnItemUncheckedCreateWithoutReturnRequestInput>
  }

  export type ReturnItemCreateManyReturnRequestInputEnvelope = {
    data: ReturnItemCreateManyReturnRequestInput | ReturnItemCreateManyReturnRequestInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutReturnsInput = {
    id?: string
    orderNumber: string
    customerId: string
    customerEmail: string
    customerName: string
    customerPhone?: string | null
    status?: string
    paymentStatus?: string
    paymentMethod?: string | null
    currency?: string
    subtotal: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    shippingAmount?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    taxRate?: Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: string | null
    paymentDueAt?: Date | string | null
    couponCode?: string | null
    customerNote?: string | null
    shippingAddress: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: string | null
    trackingCarrier?: string | null
    estimatedDeliveryAt?: Date | string | null
    shippedAt?: Date | string | null
    deliveredAt?: Date | string | null
    cancelledAt?: Date | string | null
    cancelReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemCreateNestedManyWithoutOrderInput
    statusHistory?: OrderStatusHistoryCreateNestedManyWithoutOrderInput
    notes?: OrderNoteCreateNestedManyWithoutOrderInput
    payments?: PaymentCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutReturnsInput = {
    id?: string
    orderNumber: string
    customerId: string
    customerEmail: string
    customerName: string
    customerPhone?: string | null
    status?: string
    paymentStatus?: string
    paymentMethod?: string | null
    currency?: string
    subtotal: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    shippingAmount?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    taxRate?: Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: string | null
    paymentDueAt?: Date | string | null
    couponCode?: string | null
    customerNote?: string | null
    shippingAddress: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: string | null
    trackingCarrier?: string | null
    estimatedDeliveryAt?: Date | string | null
    shippedAt?: Date | string | null
    deliveredAt?: Date | string | null
    cancelledAt?: Date | string | null
    cancelReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    statusHistory?: OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInput
    notes?: OrderNoteUncheckedCreateNestedManyWithoutOrderInput
    payments?: PaymentUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutReturnsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutReturnsInput, OrderUncheckedCreateWithoutReturnsInput>
  }

  export type ReturnItemUpsertWithWhereUniqueWithoutReturnRequestInput = {
    where: ReturnItemWhereUniqueInput
    update: XOR<ReturnItemUpdateWithoutReturnRequestInput, ReturnItemUncheckedUpdateWithoutReturnRequestInput>
    create: XOR<ReturnItemCreateWithoutReturnRequestInput, ReturnItemUncheckedCreateWithoutReturnRequestInput>
  }

  export type ReturnItemUpdateWithWhereUniqueWithoutReturnRequestInput = {
    where: ReturnItemWhereUniqueInput
    data: XOR<ReturnItemUpdateWithoutReturnRequestInput, ReturnItemUncheckedUpdateWithoutReturnRequestInput>
  }

  export type ReturnItemUpdateManyWithWhereWithoutReturnRequestInput = {
    where: ReturnItemScalarWhereInput
    data: XOR<ReturnItemUpdateManyMutationInput, ReturnItemUncheckedUpdateManyWithoutReturnRequestInput>
  }

  export type ReturnItemScalarWhereInput = {
    AND?: ReturnItemScalarWhereInput | ReturnItemScalarWhereInput[]
    OR?: ReturnItemScalarWhereInput[]
    NOT?: ReturnItemScalarWhereInput | ReturnItemScalarWhereInput[]
    id?: StringFilter<"ReturnItem"> | string
    returnId?: StringFilter<"ReturnItem"> | string
    orderItemId?: StringFilter<"ReturnItem"> | string
    productId?: StringFilter<"ReturnItem"> | string
    sku?: StringFilter<"ReturnItem"> | string
    name?: StringFilter<"ReturnItem"> | string
    quantity?: IntFilter<"ReturnItem"> | number
    unitPrice?: DecimalFilter<"ReturnItem"> | Decimal | DecimalJsLike | number | string
  }

  export type OrderUpsertWithoutReturnsInput = {
    update: XOR<OrderUpdateWithoutReturnsInput, OrderUncheckedUpdateWithoutReturnsInput>
    create: XOR<OrderCreateWithoutReturnsInput, OrderUncheckedCreateWithoutReturnsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutReturnsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutReturnsInput, OrderUncheckedUpdateWithoutReturnsInput>
  }

  export type OrderUpdateWithoutReturnsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    shippingAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    couponCode?: NullableStringFieldUpdateOperationsInput | string | null
    customerNote?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddress?: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingCarrier?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    statusHistory?: OrderStatusHistoryUpdateManyWithoutOrderNestedInput
    notes?: OrderNoteUpdateManyWithoutOrderNestedInput
    payments?: PaymentUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutReturnsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    shippingAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    couponCode?: NullableStringFieldUpdateOperationsInput | string | null
    customerNote?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddress?: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingCarrier?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    statusHistory?: OrderStatusHistoryUncheckedUpdateManyWithoutOrderNestedInput
    notes?: OrderNoteUncheckedUpdateManyWithoutOrderNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type ReturnRequestCreateWithoutItemsInput = {
    id?: string
    rmaNumber: string
    customerId: string
    status?: string
    reason: string
    details?: string | null
    photos?: ReturnRequestCreatephotosInput | string[]
    resolution?: string
    instructions?: string | null
    rejectReason?: string | null
    restocked?: boolean
    refundAmount?: Decimal | DecimalJsLike | number | string | null
    adminNote?: string | null
    approvedAt?: Date | string | null
    rejectedAt?: Date | string | null
    receivedAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    order: OrderCreateNestedOneWithoutReturnsInput
  }

  export type ReturnRequestUncheckedCreateWithoutItemsInput = {
    id?: string
    rmaNumber: string
    orderId: string
    customerId: string
    status?: string
    reason: string
    details?: string | null
    photos?: ReturnRequestCreatephotosInput | string[]
    resolution?: string
    instructions?: string | null
    rejectReason?: string | null
    restocked?: boolean
    refundAmount?: Decimal | DecimalJsLike | number | string | null
    adminNote?: string | null
    approvedAt?: Date | string | null
    rejectedAt?: Date | string | null
    receivedAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReturnRequestCreateOrConnectWithoutItemsInput = {
    where: ReturnRequestWhereUniqueInput
    create: XOR<ReturnRequestCreateWithoutItemsInput, ReturnRequestUncheckedCreateWithoutItemsInput>
  }

  export type ReturnRequestUpsertWithoutItemsInput = {
    update: XOR<ReturnRequestUpdateWithoutItemsInput, ReturnRequestUncheckedUpdateWithoutItemsInput>
    create: XOR<ReturnRequestCreateWithoutItemsInput, ReturnRequestUncheckedCreateWithoutItemsInput>
    where?: ReturnRequestWhereInput
  }

  export type ReturnRequestUpdateToOneWithWhereWithoutItemsInput = {
    where?: ReturnRequestWhereInput
    data: XOR<ReturnRequestUpdateWithoutItemsInput, ReturnRequestUncheckedUpdateWithoutItemsInput>
  }

  export type ReturnRequestUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    rmaNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: ReturnRequestUpdatephotosInput | string[]
    resolution?: StringFieldUpdateOperationsInput | string
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    rejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    restocked?: BoolFieldUpdateOperationsInput | boolean
    refundAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutReturnsNestedInput
  }

  export type ReturnRequestUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    rmaNumber?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: ReturnRequestUpdatephotosInput | string[]
    resolution?: StringFieldUpdateOperationsInput | string
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    rejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    restocked?: BoolFieldUpdateOperationsInput | boolean
    refundAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateWithoutPaymentsInput = {
    id?: string
    orderNumber: string
    customerId: string
    customerEmail: string
    customerName: string
    customerPhone?: string | null
    status?: string
    paymentStatus?: string
    paymentMethod?: string | null
    currency?: string
    subtotal: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    shippingAmount?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    taxRate?: Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: string | null
    paymentDueAt?: Date | string | null
    couponCode?: string | null
    customerNote?: string | null
    shippingAddress: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: string | null
    trackingCarrier?: string | null
    estimatedDeliveryAt?: Date | string | null
    shippedAt?: Date | string | null
    deliveredAt?: Date | string | null
    cancelledAt?: Date | string | null
    cancelReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemCreateNestedManyWithoutOrderInput
    statusHistory?: OrderStatusHistoryCreateNestedManyWithoutOrderInput
    notes?: OrderNoteCreateNestedManyWithoutOrderInput
    returns?: ReturnRequestCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutPaymentsInput = {
    id?: string
    orderNumber: string
    customerId: string
    customerEmail: string
    customerName: string
    customerPhone?: string | null
    status?: string
    paymentStatus?: string
    paymentMethod?: string | null
    currency?: string
    subtotal: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    shippingAmount?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    taxRate?: Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: string | null
    paymentDueAt?: Date | string | null
    couponCode?: string | null
    customerNote?: string | null
    shippingAddress: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: string | null
    trackingCarrier?: string | null
    estimatedDeliveryAt?: Date | string | null
    shippedAt?: Date | string | null
    deliveredAt?: Date | string | null
    cancelledAt?: Date | string | null
    cancelReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    statusHistory?: OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInput
    notes?: OrderNoteUncheckedCreateNestedManyWithoutOrderInput
    returns?: ReturnRequestUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutPaymentsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutPaymentsInput, OrderUncheckedCreateWithoutPaymentsInput>
  }

  export type OrderUpsertWithoutPaymentsInput = {
    update: XOR<OrderUpdateWithoutPaymentsInput, OrderUncheckedUpdateWithoutPaymentsInput>
    create: XOR<OrderCreateWithoutPaymentsInput, OrderUncheckedCreateWithoutPaymentsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutPaymentsInput, OrderUncheckedUpdateWithoutPaymentsInput>
  }

  export type OrderUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    shippingAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    couponCode?: NullableStringFieldUpdateOperationsInput | string | null
    customerNote?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddress?: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingCarrier?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    statusHistory?: OrderStatusHistoryUpdateManyWithoutOrderNestedInput
    notes?: OrderNoteUpdateManyWithoutOrderNestedInput
    returns?: ReturnRequestUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    shippingAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    deliveryZoneName?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    couponCode?: NullableStringFieldUpdateOperationsInput | string | null
    customerNote?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddress?: JsonNullValueInput | InputJsonValue
    billingAddress?: NullableJsonNullValueInput | InputJsonValue
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingCarrier?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    statusHistory?: OrderStatusHistoryUncheckedUpdateManyWithoutOrderNestedInput
    notes?: OrderNoteUncheckedUpdateManyWithoutOrderNestedInput
    returns?: ReturnRequestUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderItemCreateManyOrderInput = {
    id?: string
    productId: string
    variantId?: string | null
    sku: string
    name: string
    image?: string | null
    unitPrice: Decimal | DecimalJsLike | number | string
    unitCost?: Decimal | DecimalJsLike | number | string | null
    quantity: number
    subtotal: Decimal | DecimalJsLike | number | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OrderStatusHistoryCreateManyOrderInput = {
    id?: string
    type?: string
    status: string
    note?: string | null
    location?: string | null
    isPublic?: boolean
    changedBy?: string | null
    actor?: string | null
    createdAt?: Date | string
  }

  export type OrderNoteCreateManyOrderInput = {
    id?: string
    content: string
    authorId: string
    isInternal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReturnRequestCreateManyOrderInput = {
    id?: string
    rmaNumber: string
    customerId: string
    status?: string
    reason: string
    details?: string | null
    photos?: ReturnRequestCreatephotosInput | string[]
    resolution?: string
    instructions?: string | null
    rejectReason?: string | null
    restocked?: boolean
    refundAmount?: Decimal | DecimalJsLike | number | string | null
    adminNote?: string | null
    approvedAt?: Date | string | null
    rejectedAt?: Date | string | null
    receivedAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateManyOrderInput = {
    id?: string
    provider?: string
    status?: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    phone: string
    merchantRequestId?: string | null
    checkoutRequestId?: string | null
    receiptNumber?: string | null
    resultCode?: number | null
    resultDesc?: string | null
    paidAt?: Date | string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderItemUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    variantId?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    variantId?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    variantId?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unitCost?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    attributes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderStatusHistoryUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    actor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderStatusHistoryUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    actor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderStatusHistoryUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    actor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderNoteUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderNoteUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderNoteUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReturnRequestUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    rmaNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: ReturnRequestUpdatephotosInput | string[]
    resolution?: StringFieldUpdateOperationsInput | string
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    rejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    restocked?: BoolFieldUpdateOperationsInput | boolean
    refundAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ReturnItemUpdateManyWithoutReturnRequestNestedInput
  }

  export type ReturnRequestUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    rmaNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: ReturnRequestUpdatephotosInput | string[]
    resolution?: StringFieldUpdateOperationsInput | string
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    rejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    restocked?: BoolFieldUpdateOperationsInput | boolean
    refundAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ReturnItemUncheckedUpdateManyWithoutReturnRequestNestedInput
  }

  export type ReturnRequestUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    rmaNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: ReturnRequestUpdatephotosInput | string[]
    resolution?: StringFieldUpdateOperationsInput | string
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    rejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    restocked?: BoolFieldUpdateOperationsInput | boolean
    refundAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    merchantRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resultCode?: NullableIntFieldUpdateOperationsInput | number | null
    resultDesc?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    merchantRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resultCode?: NullableIntFieldUpdateOperationsInput | number | null
    resultDesc?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    merchantRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    receiptNumber?: NullableStringFieldUpdateOperationsInput | string | null
    resultCode?: NullableIntFieldUpdateOperationsInput | number | null
    resultDesc?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReturnItemCreateManyReturnRequestInput = {
    id?: string
    orderItemId: string
    productId: string
    sku: string
    name: string
    quantity: number
    unitPrice: Decimal | DecimalJsLike | number | string
  }

  export type ReturnItemUpdateWithoutReturnRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderItemId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type ReturnItemUncheckedUpdateWithoutReturnRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderItemId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type ReturnItemUncheckedUpdateManyWithoutReturnRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderItemId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}