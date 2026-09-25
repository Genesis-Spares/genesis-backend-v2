
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
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model CustomerPreference
 * 
 */
export type CustomerPreference = $Result.DefaultSelection<Prisma.$CustomerPreferencePayload>
/**
 * Model Address
 * 
 */
export type Address = $Result.DefaultSelection<Prisma.$AddressPayload>
/**
 * Model Communication
 * 
 */
export type Communication = $Result.DefaultSelection<Prisma.$CommunicationPayload>
/**
 * Model CustomerNote
 * 
 */
export type CustomerNote = $Result.DefaultSelection<Prisma.$CustomerNotePayload>
/**
 * Model CustomerActivity
 * 
 */
export type CustomerActivity = $Result.DefaultSelection<Prisma.$CustomerActivityPayload>
/**
 * Model CustomerSegment
 * 
 */
export type CustomerSegment = $Result.DefaultSelection<Prisma.$CustomerSegmentPayload>
/**
 * Model CustomerSegmentAssignment
 * 
 */
export type CustomerSegmentAssignment = $Result.DefaultSelection<Prisma.$CustomerSegmentAssignmentPayload>
/**
 * Model SupportMessage
 * 
 */
export type SupportMessage = $Result.DefaultSelection<Prisma.$SupportMessagePayload>
/**
 * Model SupportMessageReply
 * 
 */
export type SupportMessageReply = $Result.DefaultSelection<Prisma.$SupportMessageReplyPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Customers
 * const customers = await prisma.customer.findMany()
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
   * // Fetch zero or more Customers
   * const customers = await prisma.customer.findMany()
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
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customerPreference`: Exposes CRUD operations for the **CustomerPreference** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomerPreferences
    * const customerPreferences = await prisma.customerPreference.findMany()
    * ```
    */
  get customerPreference(): Prisma.CustomerPreferenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.address`: Exposes CRUD operations for the **Address** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Addresses
    * const addresses = await prisma.address.findMany()
    * ```
    */
  get address(): Prisma.AddressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.communication`: Exposes CRUD operations for the **Communication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Communications
    * const communications = await prisma.communication.findMany()
    * ```
    */
  get communication(): Prisma.CommunicationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customerNote`: Exposes CRUD operations for the **CustomerNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomerNotes
    * const customerNotes = await prisma.customerNote.findMany()
    * ```
    */
  get customerNote(): Prisma.CustomerNoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customerActivity`: Exposes CRUD operations for the **CustomerActivity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomerActivities
    * const customerActivities = await prisma.customerActivity.findMany()
    * ```
    */
  get customerActivity(): Prisma.CustomerActivityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customerSegment`: Exposes CRUD operations for the **CustomerSegment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomerSegments
    * const customerSegments = await prisma.customerSegment.findMany()
    * ```
    */
  get customerSegment(): Prisma.CustomerSegmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customerSegmentAssignment`: Exposes CRUD operations for the **CustomerSegmentAssignment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomerSegmentAssignments
    * const customerSegmentAssignments = await prisma.customerSegmentAssignment.findMany()
    * ```
    */
  get customerSegmentAssignment(): Prisma.CustomerSegmentAssignmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.supportMessage`: Exposes CRUD operations for the **SupportMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SupportMessages
    * const supportMessages = await prisma.supportMessage.findMany()
    * ```
    */
  get supportMessage(): Prisma.SupportMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.supportMessageReply`: Exposes CRUD operations for the **SupportMessageReply** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SupportMessageReplies
    * const supportMessageReplies = await prisma.supportMessageReply.findMany()
    * ```
    */
  get supportMessageReply(): Prisma.SupportMessageReplyDelegate<ExtArgs, ClientOptions>;
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
    Customer: 'Customer',
    CustomerPreference: 'CustomerPreference',
    Address: 'Address',
    Communication: 'Communication',
    CustomerNote: 'CustomerNote',
    CustomerActivity: 'CustomerActivity',
    CustomerSegment: 'CustomerSegment',
    CustomerSegmentAssignment: 'CustomerSegmentAssignment',
    SupportMessage: 'SupportMessage',
    SupportMessageReply: 'SupportMessageReply'
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
      modelProps: "customer" | "customerPreference" | "address" | "communication" | "customerNote" | "customerActivity" | "customerSegment" | "customerSegmentAssignment" | "supportMessage" | "supportMessageReply"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      CustomerPreference: {
        payload: Prisma.$CustomerPreferencePayload<ExtArgs>
        fields: Prisma.CustomerPreferenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerPreferenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPreferencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerPreferenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPreferencePayload>
          }
          findFirst: {
            args: Prisma.CustomerPreferenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPreferencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerPreferenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPreferencePayload>
          }
          findMany: {
            args: Prisma.CustomerPreferenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPreferencePayload>[]
          }
          create: {
            args: Prisma.CustomerPreferenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPreferencePayload>
          }
          createMany: {
            args: Prisma.CustomerPreferenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerPreferenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPreferencePayload>[]
          }
          delete: {
            args: Prisma.CustomerPreferenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPreferencePayload>
          }
          update: {
            args: Prisma.CustomerPreferenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPreferencePayload>
          }
          deleteMany: {
            args: Prisma.CustomerPreferenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerPreferenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerPreferenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPreferencePayload>[]
          }
          upsert: {
            args: Prisma.CustomerPreferenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPreferencePayload>
          }
          aggregate: {
            args: Prisma.CustomerPreferenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomerPreference>
          }
          groupBy: {
            args: Prisma.CustomerPreferenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerPreferenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerPreferenceCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerPreferenceCountAggregateOutputType> | number
          }
        }
      }
      Address: {
        payload: Prisma.$AddressPayload<ExtArgs>
        fields: Prisma.AddressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AddressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AddressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          findFirst: {
            args: Prisma.AddressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AddressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          findMany: {
            args: Prisma.AddressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[]
          }
          create: {
            args: Prisma.AddressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          createMany: {
            args: Prisma.AddressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AddressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[]
          }
          delete: {
            args: Prisma.AddressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          update: {
            args: Prisma.AddressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          deleteMany: {
            args: Prisma.AddressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AddressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AddressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[]
          }
          upsert: {
            args: Prisma.AddressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          aggregate: {
            args: Prisma.AddressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAddress>
          }
          groupBy: {
            args: Prisma.AddressGroupByArgs<ExtArgs>
            result: $Utils.Optional<AddressGroupByOutputType>[]
          }
          count: {
            args: Prisma.AddressCountArgs<ExtArgs>
            result: $Utils.Optional<AddressCountAggregateOutputType> | number
          }
        }
      }
      Communication: {
        payload: Prisma.$CommunicationPayload<ExtArgs>
        fields: Prisma.CommunicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommunicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommunicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunicationPayload>
          }
          findFirst: {
            args: Prisma.CommunicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommunicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunicationPayload>
          }
          findMany: {
            args: Prisma.CommunicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunicationPayload>[]
          }
          create: {
            args: Prisma.CommunicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunicationPayload>
          }
          createMany: {
            args: Prisma.CommunicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommunicationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunicationPayload>[]
          }
          delete: {
            args: Prisma.CommunicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunicationPayload>
          }
          update: {
            args: Prisma.CommunicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunicationPayload>
          }
          deleteMany: {
            args: Prisma.CommunicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommunicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommunicationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunicationPayload>[]
          }
          upsert: {
            args: Prisma.CommunicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunicationPayload>
          }
          aggregate: {
            args: Prisma.CommunicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommunication>
          }
          groupBy: {
            args: Prisma.CommunicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommunicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommunicationCountArgs<ExtArgs>
            result: $Utils.Optional<CommunicationCountAggregateOutputType> | number
          }
        }
      }
      CustomerNote: {
        payload: Prisma.$CustomerNotePayload<ExtArgs>
        fields: Prisma.CustomerNoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerNoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerNotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerNoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerNotePayload>
          }
          findFirst: {
            args: Prisma.CustomerNoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerNotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerNoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerNotePayload>
          }
          findMany: {
            args: Prisma.CustomerNoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerNotePayload>[]
          }
          create: {
            args: Prisma.CustomerNoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerNotePayload>
          }
          createMany: {
            args: Prisma.CustomerNoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerNoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerNotePayload>[]
          }
          delete: {
            args: Prisma.CustomerNoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerNotePayload>
          }
          update: {
            args: Prisma.CustomerNoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerNotePayload>
          }
          deleteMany: {
            args: Prisma.CustomerNoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerNoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerNoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerNotePayload>[]
          }
          upsert: {
            args: Prisma.CustomerNoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerNotePayload>
          }
          aggregate: {
            args: Prisma.CustomerNoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomerNote>
          }
          groupBy: {
            args: Prisma.CustomerNoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerNoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerNoteCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerNoteCountAggregateOutputType> | number
          }
        }
      }
      CustomerActivity: {
        payload: Prisma.$CustomerActivityPayload<ExtArgs>
        fields: Prisma.CustomerActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerActivityPayload>
          }
          findFirst: {
            args: Prisma.CustomerActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerActivityPayload>
          }
          findMany: {
            args: Prisma.CustomerActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerActivityPayload>[]
          }
          create: {
            args: Prisma.CustomerActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerActivityPayload>
          }
          createMany: {
            args: Prisma.CustomerActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerActivityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerActivityPayload>[]
          }
          delete: {
            args: Prisma.CustomerActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerActivityPayload>
          }
          update: {
            args: Prisma.CustomerActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerActivityPayload>
          }
          deleteMany: {
            args: Prisma.CustomerActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerActivityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerActivityPayload>[]
          }
          upsert: {
            args: Prisma.CustomerActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerActivityPayload>
          }
          aggregate: {
            args: Prisma.CustomerActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomerActivity>
          }
          groupBy: {
            args: Prisma.CustomerActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerActivityCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerActivityCountAggregateOutputType> | number
          }
        }
      }
      CustomerSegment: {
        payload: Prisma.$CustomerSegmentPayload<ExtArgs>
        fields: Prisma.CustomerSegmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerSegmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerSegmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerSegmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerSegmentPayload>
          }
          findFirst: {
            args: Prisma.CustomerSegmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerSegmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerSegmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerSegmentPayload>
          }
          findMany: {
            args: Prisma.CustomerSegmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerSegmentPayload>[]
          }
          create: {
            args: Prisma.CustomerSegmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerSegmentPayload>
          }
          createMany: {
            args: Prisma.CustomerSegmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerSegmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerSegmentPayload>[]
          }
          delete: {
            args: Prisma.CustomerSegmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerSegmentPayload>
          }
          update: {
            args: Prisma.CustomerSegmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerSegmentPayload>
          }
          deleteMany: {
            args: Prisma.CustomerSegmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerSegmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerSegmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerSegmentPayload>[]
          }
          upsert: {
            args: Prisma.CustomerSegmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerSegmentPayload>
          }
          aggregate: {
            args: Prisma.CustomerSegmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomerSegment>
          }
          groupBy: {
            args: Prisma.CustomerSegmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerSegmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerSegmentCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerSegmentCountAggregateOutputType> | number
          }
        }
      }
      CustomerSegmentAssignment: {
        payload: Prisma.$CustomerSegmentAssignmentPayload<ExtArgs>
        fields: Prisma.CustomerSegmentAssignmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerSegmentAssignmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerSegmentAssignmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerSegmentAssignmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerSegmentAssignmentPayload>
          }
          findFirst: {
            args: Prisma.CustomerSegmentAssignmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerSegmentAssignmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerSegmentAssignmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerSegmentAssignmentPayload>
          }
          findMany: {
            args: Prisma.CustomerSegmentAssignmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerSegmentAssignmentPayload>[]
          }
          create: {
            args: Prisma.CustomerSegmentAssignmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerSegmentAssignmentPayload>
          }
          createMany: {
            args: Prisma.CustomerSegmentAssignmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerSegmentAssignmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerSegmentAssignmentPayload>[]
          }
          delete: {
            args: Prisma.CustomerSegmentAssignmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerSegmentAssignmentPayload>
          }
          update: {
            args: Prisma.CustomerSegmentAssignmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerSegmentAssignmentPayload>
          }
          deleteMany: {
            args: Prisma.CustomerSegmentAssignmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerSegmentAssignmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerSegmentAssignmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerSegmentAssignmentPayload>[]
          }
          upsert: {
            args: Prisma.CustomerSegmentAssignmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerSegmentAssignmentPayload>
          }
          aggregate: {
            args: Prisma.CustomerSegmentAssignmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomerSegmentAssignment>
          }
          groupBy: {
            args: Prisma.CustomerSegmentAssignmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerSegmentAssignmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerSegmentAssignmentCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerSegmentAssignmentCountAggregateOutputType> | number
          }
        }
      }
      SupportMessage: {
        payload: Prisma.$SupportMessagePayload<ExtArgs>
        fields: Prisma.SupportMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupportMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupportMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>
          }
          findFirst: {
            args: Prisma.SupportMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupportMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>
          }
          findMany: {
            args: Prisma.SupportMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>[]
          }
          create: {
            args: Prisma.SupportMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>
          }
          createMany: {
            args: Prisma.SupportMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SupportMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>[]
          }
          delete: {
            args: Prisma.SupportMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>
          }
          update: {
            args: Prisma.SupportMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>
          }
          deleteMany: {
            args: Prisma.SupportMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupportMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SupportMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>[]
          }
          upsert: {
            args: Prisma.SupportMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>
          }
          aggregate: {
            args: Prisma.SupportMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupportMessage>
          }
          groupBy: {
            args: Prisma.SupportMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupportMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupportMessageCountArgs<ExtArgs>
            result: $Utils.Optional<SupportMessageCountAggregateOutputType> | number
          }
        }
      }
      SupportMessageReply: {
        payload: Prisma.$SupportMessageReplyPayload<ExtArgs>
        fields: Prisma.SupportMessageReplyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupportMessageReplyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessageReplyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupportMessageReplyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessageReplyPayload>
          }
          findFirst: {
            args: Prisma.SupportMessageReplyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessageReplyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupportMessageReplyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessageReplyPayload>
          }
          findMany: {
            args: Prisma.SupportMessageReplyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessageReplyPayload>[]
          }
          create: {
            args: Prisma.SupportMessageReplyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessageReplyPayload>
          }
          createMany: {
            args: Prisma.SupportMessageReplyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SupportMessageReplyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessageReplyPayload>[]
          }
          delete: {
            args: Prisma.SupportMessageReplyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessageReplyPayload>
          }
          update: {
            args: Prisma.SupportMessageReplyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessageReplyPayload>
          }
          deleteMany: {
            args: Prisma.SupportMessageReplyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupportMessageReplyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SupportMessageReplyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessageReplyPayload>[]
          }
          upsert: {
            args: Prisma.SupportMessageReplyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessageReplyPayload>
          }
          aggregate: {
            args: Prisma.SupportMessageReplyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupportMessageReply>
          }
          groupBy: {
            args: Prisma.SupportMessageReplyGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupportMessageReplyGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupportMessageReplyCountArgs<ExtArgs>
            result: $Utils.Optional<SupportMessageReplyCountAggregateOutputType> | number
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
    customer?: CustomerOmit
    customerPreference?: CustomerPreferenceOmit
    address?: AddressOmit
    communication?: CommunicationOmit
    customerNote?: CustomerNoteOmit
    customerActivity?: CustomerActivityOmit
    customerSegment?: CustomerSegmentOmit
    customerSegmentAssignment?: CustomerSegmentAssignmentOmit
    supportMessage?: SupportMessageOmit
    supportMessageReply?: SupportMessageReplyOmit
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
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    addresses: number
    communications: number
    notes: number
    activities: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    addresses?: boolean | CustomerCountOutputTypeCountAddressesArgs
    communications?: boolean | CustomerCountOutputTypeCountCommunicationsArgs
    notes?: boolean | CustomerCountOutputTypeCountNotesArgs
    activities?: boolean | CustomerCountOutputTypeCountActivitiesArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountAddressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountCommunicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommunicationWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerNoteWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerActivityWhereInput
  }


  /**
   * Count Type SupportMessageCountOutputType
   */

  export type SupportMessageCountOutputType = {
    replies: number
  }

  export type SupportMessageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    replies?: boolean | SupportMessageCountOutputTypeCountRepliesArgs
  }

  // Custom InputTypes
  /**
   * SupportMessageCountOutputType without action
   */
  export type SupportMessageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessageCountOutputType
     */
    select?: SupportMessageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SupportMessageCountOutputType without action
   */
  export type SupportMessageCountOutputTypeCountRepliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportMessageReplyWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerAvgAggregateOutputType = {
    loyaltyPoints: number | null
    loginCount: number | null
  }

  export type CustomerSumAggregateOutputType = {
    loyaltyPoints: number | null
    loginCount: number | null
  }

  export type CustomerMinAggregateOutputType = {
    id: string | null
    userId: string | null
    email: string | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    avatar: string | null
    dateOfBirth: Date | null
    gender: string | null
    language: string | null
    timezone: string | null
    currency: string | null
    loyaltyPoints: number | null
    loyaltyTier: string | null
    isActive: boolean | null
    lastLoginAt: Date | null
    loginCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    email: string | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    avatar: string | null
    dateOfBirth: Date | null
    gender: string | null
    language: string | null
    timezone: string | null
    currency: string | null
    loyaltyPoints: number | null
    loyaltyTier: string | null
    isActive: boolean | null
    lastLoginAt: Date | null
    loginCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    userId: number
    email: number
    firstName: number
    lastName: number
    phone: number
    avatar: number
    dateOfBirth: number
    gender: number
    language: number
    timezone: number
    currency: number
    loyaltyPoints: number
    loyaltyTier: number
    isActive: number
    lastLoginAt: number
    loginCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerAvgAggregateInputType = {
    loyaltyPoints?: true
    loginCount?: true
  }

  export type CustomerSumAggregateInputType = {
    loyaltyPoints?: true
    loginCount?: true
  }

  export type CustomerMinAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    firstName?: true
    lastName?: true
    phone?: true
    avatar?: true
    dateOfBirth?: true
    gender?: true
    language?: true
    timezone?: true
    currency?: true
    loyaltyPoints?: true
    loyaltyTier?: true
    isActive?: true
    lastLoginAt?: true
    loginCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    firstName?: true
    lastName?: true
    phone?: true
    avatar?: true
    dateOfBirth?: true
    gender?: true
    language?: true
    timezone?: true
    currency?: true
    loyaltyPoints?: true
    loyaltyTier?: true
    isActive?: true
    lastLoginAt?: true
    loginCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    firstName?: true
    lastName?: true
    phone?: true
    avatar?: true
    dateOfBirth?: true
    gender?: true
    language?: true
    timezone?: true
    currency?: true
    loyaltyPoints?: true
    loyaltyTier?: true
    isActive?: true
    lastLoginAt?: true
    loginCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CustomerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CustomerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _avg?: CustomerAvgAggregateInputType
    _sum?: CustomerSumAggregateInputType
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: string
    userId: string
    email: string
    firstName: string
    lastName: string
    phone: string | null
    avatar: string | null
    dateOfBirth: Date | null
    gender: string | null
    language: string
    timezone: string
    currency: string
    loyaltyPoints: number
    loyaltyTier: string
    isActive: boolean
    lastLoginAt: Date | null
    loginCount: number
    createdAt: Date
    updatedAt: Date
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    avatar?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    language?: boolean
    timezone?: boolean
    currency?: boolean
    loyaltyPoints?: boolean
    loyaltyTier?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    loginCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    preferences?: boolean | Customer$preferencesArgs<ExtArgs>
    addresses?: boolean | Customer$addressesArgs<ExtArgs>
    communications?: boolean | Customer$communicationsArgs<ExtArgs>
    notes?: boolean | Customer$notesArgs<ExtArgs>
    activities?: boolean | Customer$activitiesArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    avatar?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    language?: boolean
    timezone?: boolean
    currency?: boolean
    loyaltyPoints?: boolean
    loyaltyTier?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    loginCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    avatar?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    language?: boolean
    timezone?: boolean
    currency?: boolean
    loyaltyPoints?: boolean
    loyaltyTier?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    loginCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    userId?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    avatar?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    language?: boolean
    timezone?: boolean
    currency?: boolean
    loyaltyPoints?: boolean
    loyaltyTier?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    loginCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "email" | "firstName" | "lastName" | "phone" | "avatar" | "dateOfBirth" | "gender" | "language" | "timezone" | "currency" | "loyaltyPoints" | "loyaltyTier" | "isActive" | "lastLoginAt" | "loginCount" | "createdAt" | "updatedAt", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preferences?: boolean | Customer$preferencesArgs<ExtArgs>
    addresses?: boolean | Customer$addressesArgs<ExtArgs>
    communications?: boolean | Customer$communicationsArgs<ExtArgs>
    notes?: boolean | Customer$notesArgs<ExtArgs>
    activities?: boolean | Customer$activitiesArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      preferences: Prisma.$CustomerPreferencePayload<ExtArgs> | null
      addresses: Prisma.$AddressPayload<ExtArgs>[]
      communications: Prisma.$CommunicationPayload<ExtArgs>[]
      notes: Prisma.$CustomerNotePayload<ExtArgs>[]
      activities: Prisma.$CustomerActivityPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      email: string
      firstName: string
      lastName: string
      phone: string | null
      avatar: string | null
      dateOfBirth: Date | null
      gender: string | null
      language: string
      timezone: string
      currency: string
      loyaltyPoints: number
      loyaltyTier: string
      isActive: boolean
      lastLoginAt: Date | null
      loginCount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers and returns the data updated in the database.
     * @param {CustomerUpdateManyAndReturnArgs} args - Arguments to update many Customers.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.updateManyAndReturn({
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
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
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
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    preferences<T extends Customer$preferencesArgs<ExtArgs> = {}>(args?: Subset<T, Customer$preferencesArgs<ExtArgs>>): Prisma__CustomerPreferenceClient<$Result.GetResult<Prisma.$CustomerPreferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    addresses<T extends Customer$addressesArgs<ExtArgs> = {}>(args?: Subset<T, Customer$addressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    communications<T extends Customer$communicationsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$communicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommunicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notes<T extends Customer$notesArgs<ExtArgs> = {}>(args?: Subset<T, Customer$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activities<T extends Customer$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, Customer$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Customer model
   */
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'String'>
    readonly userId: FieldRef<"Customer", 'String'>
    readonly email: FieldRef<"Customer", 'String'>
    readonly firstName: FieldRef<"Customer", 'String'>
    readonly lastName: FieldRef<"Customer", 'String'>
    readonly phone: FieldRef<"Customer", 'String'>
    readonly avatar: FieldRef<"Customer", 'String'>
    readonly dateOfBirth: FieldRef<"Customer", 'DateTime'>
    readonly gender: FieldRef<"Customer", 'String'>
    readonly language: FieldRef<"Customer", 'String'>
    readonly timezone: FieldRef<"Customer", 'String'>
    readonly currency: FieldRef<"Customer", 'String'>
    readonly loyaltyPoints: FieldRef<"Customer", 'Int'>
    readonly loyaltyTier: FieldRef<"Customer", 'String'>
    readonly isActive: FieldRef<"Customer", 'Boolean'>
    readonly lastLoginAt: FieldRef<"Customer", 'DateTime'>
    readonly loginCount: FieldRef<"Customer", 'Int'>
    readonly createdAt: FieldRef<"Customer", 'DateTime'>
    readonly updatedAt: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer updateManyAndReturn
   */
  export type CustomerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer.preferences
   */
  export type Customer$preferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPreference
     */
    select?: CustomerPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPreference
     */
    omit?: CustomerPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPreferenceInclude<ExtArgs> | null
    where?: CustomerPreferenceWhereInput
  }

  /**
   * Customer.addresses
   */
  export type Customer$addressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    cursor?: AddressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Customer.communications
   */
  export type Customer$communicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Communication
     */
    select?: CommunicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Communication
     */
    omit?: CommunicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunicationInclude<ExtArgs> | null
    where?: CommunicationWhereInput
    orderBy?: CommunicationOrderByWithRelationInput | CommunicationOrderByWithRelationInput[]
    cursor?: CommunicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommunicationScalarFieldEnum | CommunicationScalarFieldEnum[]
  }

  /**
   * Customer.notes
   */
  export type Customer$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerNote
     */
    select?: CustomerNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerNote
     */
    omit?: CustomerNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerNoteInclude<ExtArgs> | null
    where?: CustomerNoteWhereInput
    orderBy?: CustomerNoteOrderByWithRelationInput | CustomerNoteOrderByWithRelationInput[]
    cursor?: CustomerNoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomerNoteScalarFieldEnum | CustomerNoteScalarFieldEnum[]
  }

  /**
   * Customer.activities
   */
  export type Customer$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerActivity
     */
    select?: CustomerActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerActivity
     */
    omit?: CustomerActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerActivityInclude<ExtArgs> | null
    where?: CustomerActivityWhereInput
    orderBy?: CustomerActivityOrderByWithRelationInput | CustomerActivityOrderByWithRelationInput[]
    cursor?: CustomerActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomerActivityScalarFieldEnum | CustomerActivityScalarFieldEnum[]
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model CustomerPreference
   */

  export type AggregateCustomerPreference = {
    _count: CustomerPreferenceCountAggregateOutputType | null
    _min: CustomerPreferenceMinAggregateOutputType | null
    _max: CustomerPreferenceMaxAggregateOutputType | null
  }

  export type CustomerPreferenceMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    emailNotifications: boolean | null
    smsNotifications: boolean | null
    pushNotifications: boolean | null
    marketingEmails: boolean | null
    dataSharingConsent: boolean | null
    cookieConsent: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerPreferenceMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    emailNotifications: boolean | null
    smsNotifications: boolean | null
    pushNotifications: boolean | null
    marketingEmails: boolean | null
    dataSharingConsent: boolean | null
    cookieConsent: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerPreferenceCountAggregateOutputType = {
    id: number
    customerId: number
    emailNotifications: number
    smsNotifications: number
    pushNotifications: number
    marketingEmails: number
    dataSharingConsent: number
    cookieConsent: number
    preferredCategories: number
    preferredBrands: number
    productViewHistory: number
    searchHistory: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerPreferenceMinAggregateInputType = {
    id?: true
    customerId?: true
    emailNotifications?: true
    smsNotifications?: true
    pushNotifications?: true
    marketingEmails?: true
    dataSharingConsent?: true
    cookieConsent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerPreferenceMaxAggregateInputType = {
    id?: true
    customerId?: true
    emailNotifications?: true
    smsNotifications?: true
    pushNotifications?: true
    marketingEmails?: true
    dataSharingConsent?: true
    cookieConsent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerPreferenceCountAggregateInputType = {
    id?: true
    customerId?: true
    emailNotifications?: true
    smsNotifications?: true
    pushNotifications?: true
    marketingEmails?: true
    dataSharingConsent?: true
    cookieConsent?: true
    preferredCategories?: true
    preferredBrands?: true
    productViewHistory?: true
    searchHistory?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerPreferenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerPreference to aggregate.
     */
    where?: CustomerPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerPreferences to fetch.
     */
    orderBy?: CustomerPreferenceOrderByWithRelationInput | CustomerPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomerPreferences
    **/
    _count?: true | CustomerPreferenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerPreferenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerPreferenceMaxAggregateInputType
  }

  export type GetCustomerPreferenceAggregateType<T extends CustomerPreferenceAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomerPreference]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomerPreference[P]>
      : GetScalarType<T[P], AggregateCustomerPreference[P]>
  }




  export type CustomerPreferenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerPreferenceWhereInput
    orderBy?: CustomerPreferenceOrderByWithAggregationInput | CustomerPreferenceOrderByWithAggregationInput[]
    by: CustomerPreferenceScalarFieldEnum[] | CustomerPreferenceScalarFieldEnum
    having?: CustomerPreferenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerPreferenceCountAggregateInputType | true
    _min?: CustomerPreferenceMinAggregateInputType
    _max?: CustomerPreferenceMaxAggregateInputType
  }

  export type CustomerPreferenceGroupByOutputType = {
    id: string
    customerId: string
    emailNotifications: boolean
    smsNotifications: boolean
    pushNotifications: boolean
    marketingEmails: boolean
    dataSharingConsent: boolean
    cookieConsent: boolean
    preferredCategories: string[]
    preferredBrands: string[]
    productViewHistory: JsonValue | null
    searchHistory: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: CustomerPreferenceCountAggregateOutputType | null
    _min: CustomerPreferenceMinAggregateOutputType | null
    _max: CustomerPreferenceMaxAggregateOutputType | null
  }

  type GetCustomerPreferenceGroupByPayload<T extends CustomerPreferenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerPreferenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerPreferenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerPreferenceGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerPreferenceGroupByOutputType[P]>
        }
      >
    >


  export type CustomerPreferenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    emailNotifications?: boolean
    smsNotifications?: boolean
    pushNotifications?: boolean
    marketingEmails?: boolean
    dataSharingConsent?: boolean
    cookieConsent?: boolean
    preferredCategories?: boolean
    preferredBrands?: boolean
    productViewHistory?: boolean
    searchHistory?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customerPreference"]>

  export type CustomerPreferenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    emailNotifications?: boolean
    smsNotifications?: boolean
    pushNotifications?: boolean
    marketingEmails?: boolean
    dataSharingConsent?: boolean
    cookieConsent?: boolean
    preferredCategories?: boolean
    preferredBrands?: boolean
    productViewHistory?: boolean
    searchHistory?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customerPreference"]>

  export type CustomerPreferenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    emailNotifications?: boolean
    smsNotifications?: boolean
    pushNotifications?: boolean
    marketingEmails?: boolean
    dataSharingConsent?: boolean
    cookieConsent?: boolean
    preferredCategories?: boolean
    preferredBrands?: boolean
    productViewHistory?: boolean
    searchHistory?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customerPreference"]>

  export type CustomerPreferenceSelectScalar = {
    id?: boolean
    customerId?: boolean
    emailNotifications?: boolean
    smsNotifications?: boolean
    pushNotifications?: boolean
    marketingEmails?: boolean
    dataSharingConsent?: boolean
    cookieConsent?: boolean
    preferredCategories?: boolean
    preferredBrands?: boolean
    productViewHistory?: boolean
    searchHistory?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerPreferenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "emailNotifications" | "smsNotifications" | "pushNotifications" | "marketingEmails" | "dataSharingConsent" | "cookieConsent" | "preferredCategories" | "preferredBrands" | "productViewHistory" | "searchHistory" | "createdAt" | "updatedAt", ExtArgs["result"]["customerPreference"]>
  export type CustomerPreferenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type CustomerPreferenceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type CustomerPreferenceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }

  export type $CustomerPreferencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomerPreference"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      emailNotifications: boolean
      smsNotifications: boolean
      pushNotifications: boolean
      marketingEmails: boolean
      dataSharingConsent: boolean
      cookieConsent: boolean
      preferredCategories: string[]
      preferredBrands: string[]
      productViewHistory: Prisma.JsonValue | null
      searchHistory: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customerPreference"]>
    composites: {}
  }

  type CustomerPreferenceGetPayload<S extends boolean | null | undefined | CustomerPreferenceDefaultArgs> = $Result.GetResult<Prisma.$CustomerPreferencePayload, S>

  type CustomerPreferenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerPreferenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerPreferenceCountAggregateInputType | true
    }

  export interface CustomerPreferenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomerPreference'], meta: { name: 'CustomerPreference' } }
    /**
     * Find zero or one CustomerPreference that matches the filter.
     * @param {CustomerPreferenceFindUniqueArgs} args - Arguments to find a CustomerPreference
     * @example
     * // Get one CustomerPreference
     * const customerPreference = await prisma.customerPreference.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerPreferenceFindUniqueArgs>(args: SelectSubset<T, CustomerPreferenceFindUniqueArgs<ExtArgs>>): Prisma__CustomerPreferenceClient<$Result.GetResult<Prisma.$CustomerPreferencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CustomerPreference that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerPreferenceFindUniqueOrThrowArgs} args - Arguments to find a CustomerPreference
     * @example
     * // Get one CustomerPreference
     * const customerPreference = await prisma.customerPreference.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerPreferenceFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerPreferenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerPreferenceClient<$Result.GetResult<Prisma.$CustomerPreferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerPreference that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerPreferenceFindFirstArgs} args - Arguments to find a CustomerPreference
     * @example
     * // Get one CustomerPreference
     * const customerPreference = await prisma.customerPreference.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerPreferenceFindFirstArgs>(args?: SelectSubset<T, CustomerPreferenceFindFirstArgs<ExtArgs>>): Prisma__CustomerPreferenceClient<$Result.GetResult<Prisma.$CustomerPreferencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerPreference that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerPreferenceFindFirstOrThrowArgs} args - Arguments to find a CustomerPreference
     * @example
     * // Get one CustomerPreference
     * const customerPreference = await prisma.customerPreference.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerPreferenceFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerPreferenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerPreferenceClient<$Result.GetResult<Prisma.$CustomerPreferencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CustomerPreferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerPreferenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomerPreferences
     * const customerPreferences = await prisma.customerPreference.findMany()
     * 
     * // Get first 10 CustomerPreferences
     * const customerPreferences = await prisma.customerPreference.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerPreferenceWithIdOnly = await prisma.customerPreference.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerPreferenceFindManyArgs>(args?: SelectSubset<T, CustomerPreferenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CustomerPreference.
     * @param {CustomerPreferenceCreateArgs} args - Arguments to create a CustomerPreference.
     * @example
     * // Create one CustomerPreference
     * const CustomerPreference = await prisma.customerPreference.create({
     *   data: {
     *     // ... data to create a CustomerPreference
     *   }
     * })
     * 
     */
    create<T extends CustomerPreferenceCreateArgs>(args: SelectSubset<T, CustomerPreferenceCreateArgs<ExtArgs>>): Prisma__CustomerPreferenceClient<$Result.GetResult<Prisma.$CustomerPreferencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CustomerPreferences.
     * @param {CustomerPreferenceCreateManyArgs} args - Arguments to create many CustomerPreferences.
     * @example
     * // Create many CustomerPreferences
     * const customerPreference = await prisma.customerPreference.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerPreferenceCreateManyArgs>(args?: SelectSubset<T, CustomerPreferenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CustomerPreferences and returns the data saved in the database.
     * @param {CustomerPreferenceCreateManyAndReturnArgs} args - Arguments to create many CustomerPreferences.
     * @example
     * // Create many CustomerPreferences
     * const customerPreference = await prisma.customerPreference.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CustomerPreferences and only return the `id`
     * const customerPreferenceWithIdOnly = await prisma.customerPreference.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerPreferenceCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerPreferenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPreferencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CustomerPreference.
     * @param {CustomerPreferenceDeleteArgs} args - Arguments to delete one CustomerPreference.
     * @example
     * // Delete one CustomerPreference
     * const CustomerPreference = await prisma.customerPreference.delete({
     *   where: {
     *     // ... filter to delete one CustomerPreference
     *   }
     * })
     * 
     */
    delete<T extends CustomerPreferenceDeleteArgs>(args: SelectSubset<T, CustomerPreferenceDeleteArgs<ExtArgs>>): Prisma__CustomerPreferenceClient<$Result.GetResult<Prisma.$CustomerPreferencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CustomerPreference.
     * @param {CustomerPreferenceUpdateArgs} args - Arguments to update one CustomerPreference.
     * @example
     * // Update one CustomerPreference
     * const customerPreference = await prisma.customerPreference.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerPreferenceUpdateArgs>(args: SelectSubset<T, CustomerPreferenceUpdateArgs<ExtArgs>>): Prisma__CustomerPreferenceClient<$Result.GetResult<Prisma.$CustomerPreferencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CustomerPreferences.
     * @param {CustomerPreferenceDeleteManyArgs} args - Arguments to filter CustomerPreferences to delete.
     * @example
     * // Delete a few CustomerPreferences
     * const { count } = await prisma.customerPreference.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerPreferenceDeleteManyArgs>(args?: SelectSubset<T, CustomerPreferenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerPreferenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomerPreferences
     * const customerPreference = await prisma.customerPreference.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerPreferenceUpdateManyArgs>(args: SelectSubset<T, CustomerPreferenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerPreferences and returns the data updated in the database.
     * @param {CustomerPreferenceUpdateManyAndReturnArgs} args - Arguments to update many CustomerPreferences.
     * @example
     * // Update many CustomerPreferences
     * const customerPreference = await prisma.customerPreference.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CustomerPreferences and only return the `id`
     * const customerPreferenceWithIdOnly = await prisma.customerPreference.updateManyAndReturn({
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
    updateManyAndReturn<T extends CustomerPreferenceUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerPreferenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPreferencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CustomerPreference.
     * @param {CustomerPreferenceUpsertArgs} args - Arguments to update or create a CustomerPreference.
     * @example
     * // Update or create a CustomerPreference
     * const customerPreference = await prisma.customerPreference.upsert({
     *   create: {
     *     // ... data to create a CustomerPreference
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomerPreference we want to update
     *   }
     * })
     */
    upsert<T extends CustomerPreferenceUpsertArgs>(args: SelectSubset<T, CustomerPreferenceUpsertArgs<ExtArgs>>): Prisma__CustomerPreferenceClient<$Result.GetResult<Prisma.$CustomerPreferencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CustomerPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerPreferenceCountArgs} args - Arguments to filter CustomerPreferences to count.
     * @example
     * // Count the number of CustomerPreferences
     * const count = await prisma.customerPreference.count({
     *   where: {
     *     // ... the filter for the CustomerPreferences we want to count
     *   }
     * })
    **/
    count<T extends CustomerPreferenceCountArgs>(
      args?: Subset<T, CustomerPreferenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerPreferenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomerPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerPreferenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustomerPreferenceAggregateArgs>(args: Subset<T, CustomerPreferenceAggregateArgs>): Prisma.PrismaPromise<GetCustomerPreferenceAggregateType<T>>

    /**
     * Group by CustomerPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerPreferenceGroupByArgs} args - Group by arguments.
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
      T extends CustomerPreferenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerPreferenceGroupByArgs['orderBy'] }
        : { orderBy?: CustomerPreferenceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustomerPreferenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerPreferenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomerPreference model
   */
  readonly fields: CustomerPreferenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomerPreference.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerPreferenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CustomerPreference model
   */
  interface CustomerPreferenceFieldRefs {
    readonly id: FieldRef<"CustomerPreference", 'String'>
    readonly customerId: FieldRef<"CustomerPreference", 'String'>
    readonly emailNotifications: FieldRef<"CustomerPreference", 'Boolean'>
    readonly smsNotifications: FieldRef<"CustomerPreference", 'Boolean'>
    readonly pushNotifications: FieldRef<"CustomerPreference", 'Boolean'>
    readonly marketingEmails: FieldRef<"CustomerPreference", 'Boolean'>
    readonly dataSharingConsent: FieldRef<"CustomerPreference", 'Boolean'>
    readonly cookieConsent: FieldRef<"CustomerPreference", 'Boolean'>
    readonly preferredCategories: FieldRef<"CustomerPreference", 'String[]'>
    readonly preferredBrands: FieldRef<"CustomerPreference", 'String[]'>
    readonly productViewHistory: FieldRef<"CustomerPreference", 'Json'>
    readonly searchHistory: FieldRef<"CustomerPreference", 'Json'>
    readonly createdAt: FieldRef<"CustomerPreference", 'DateTime'>
    readonly updatedAt: FieldRef<"CustomerPreference", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CustomerPreference findUnique
   */
  export type CustomerPreferenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPreference
     */
    select?: CustomerPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPreference
     */
    omit?: CustomerPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which CustomerPreference to fetch.
     */
    where: CustomerPreferenceWhereUniqueInput
  }

  /**
   * CustomerPreference findUniqueOrThrow
   */
  export type CustomerPreferenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPreference
     */
    select?: CustomerPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPreference
     */
    omit?: CustomerPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which CustomerPreference to fetch.
     */
    where: CustomerPreferenceWhereUniqueInput
  }

  /**
   * CustomerPreference findFirst
   */
  export type CustomerPreferenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPreference
     */
    select?: CustomerPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPreference
     */
    omit?: CustomerPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which CustomerPreference to fetch.
     */
    where?: CustomerPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerPreferences to fetch.
     */
    orderBy?: CustomerPreferenceOrderByWithRelationInput | CustomerPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerPreferences.
     */
    cursor?: CustomerPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerPreferences.
     */
    distinct?: CustomerPreferenceScalarFieldEnum | CustomerPreferenceScalarFieldEnum[]
  }

  /**
   * CustomerPreference findFirstOrThrow
   */
  export type CustomerPreferenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPreference
     */
    select?: CustomerPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPreference
     */
    omit?: CustomerPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which CustomerPreference to fetch.
     */
    where?: CustomerPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerPreferences to fetch.
     */
    orderBy?: CustomerPreferenceOrderByWithRelationInput | CustomerPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerPreferences.
     */
    cursor?: CustomerPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerPreferences.
     */
    distinct?: CustomerPreferenceScalarFieldEnum | CustomerPreferenceScalarFieldEnum[]
  }

  /**
   * CustomerPreference findMany
   */
  export type CustomerPreferenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPreference
     */
    select?: CustomerPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPreference
     */
    omit?: CustomerPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which CustomerPreferences to fetch.
     */
    where?: CustomerPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerPreferences to fetch.
     */
    orderBy?: CustomerPreferenceOrderByWithRelationInput | CustomerPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomerPreferences.
     */
    cursor?: CustomerPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerPreferences.
     */
    distinct?: CustomerPreferenceScalarFieldEnum | CustomerPreferenceScalarFieldEnum[]
  }

  /**
   * CustomerPreference create
   */
  export type CustomerPreferenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPreference
     */
    select?: CustomerPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPreference
     */
    omit?: CustomerPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPreferenceInclude<ExtArgs> | null
    /**
     * The data needed to create a CustomerPreference.
     */
    data: XOR<CustomerPreferenceCreateInput, CustomerPreferenceUncheckedCreateInput>
  }

  /**
   * CustomerPreference createMany
   */
  export type CustomerPreferenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomerPreferences.
     */
    data: CustomerPreferenceCreateManyInput | CustomerPreferenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomerPreference createManyAndReturn
   */
  export type CustomerPreferenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPreference
     */
    select?: CustomerPreferenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPreference
     */
    omit?: CustomerPreferenceOmit<ExtArgs> | null
    /**
     * The data used to create many CustomerPreferences.
     */
    data: CustomerPreferenceCreateManyInput | CustomerPreferenceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPreferenceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CustomerPreference update
   */
  export type CustomerPreferenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPreference
     */
    select?: CustomerPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPreference
     */
    omit?: CustomerPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPreferenceInclude<ExtArgs> | null
    /**
     * The data needed to update a CustomerPreference.
     */
    data: XOR<CustomerPreferenceUpdateInput, CustomerPreferenceUncheckedUpdateInput>
    /**
     * Choose, which CustomerPreference to update.
     */
    where: CustomerPreferenceWhereUniqueInput
  }

  /**
   * CustomerPreference updateMany
   */
  export type CustomerPreferenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomerPreferences.
     */
    data: XOR<CustomerPreferenceUpdateManyMutationInput, CustomerPreferenceUncheckedUpdateManyInput>
    /**
     * Filter which CustomerPreferences to update
     */
    where?: CustomerPreferenceWhereInput
    /**
     * Limit how many CustomerPreferences to update.
     */
    limit?: number
  }

  /**
   * CustomerPreference updateManyAndReturn
   */
  export type CustomerPreferenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPreference
     */
    select?: CustomerPreferenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPreference
     */
    omit?: CustomerPreferenceOmit<ExtArgs> | null
    /**
     * The data used to update CustomerPreferences.
     */
    data: XOR<CustomerPreferenceUpdateManyMutationInput, CustomerPreferenceUncheckedUpdateManyInput>
    /**
     * Filter which CustomerPreferences to update
     */
    where?: CustomerPreferenceWhereInput
    /**
     * Limit how many CustomerPreferences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPreferenceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CustomerPreference upsert
   */
  export type CustomerPreferenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPreference
     */
    select?: CustomerPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPreference
     */
    omit?: CustomerPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPreferenceInclude<ExtArgs> | null
    /**
     * The filter to search for the CustomerPreference to update in case it exists.
     */
    where: CustomerPreferenceWhereUniqueInput
    /**
     * In case the CustomerPreference found by the `where` argument doesn't exist, create a new CustomerPreference with this data.
     */
    create: XOR<CustomerPreferenceCreateInput, CustomerPreferenceUncheckedCreateInput>
    /**
     * In case the CustomerPreference was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerPreferenceUpdateInput, CustomerPreferenceUncheckedUpdateInput>
  }

  /**
   * CustomerPreference delete
   */
  export type CustomerPreferenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPreference
     */
    select?: CustomerPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPreference
     */
    omit?: CustomerPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPreferenceInclude<ExtArgs> | null
    /**
     * Filter which CustomerPreference to delete.
     */
    where: CustomerPreferenceWhereUniqueInput
  }

  /**
   * CustomerPreference deleteMany
   */
  export type CustomerPreferenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerPreferences to delete
     */
    where?: CustomerPreferenceWhereInput
    /**
     * Limit how many CustomerPreferences to delete.
     */
    limit?: number
  }

  /**
   * CustomerPreference without action
   */
  export type CustomerPreferenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerPreference
     */
    select?: CustomerPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerPreference
     */
    omit?: CustomerPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerPreferenceInclude<ExtArgs> | null
  }


  /**
   * Model Address
   */

  export type AggregateAddress = {
    _count: AddressCountAggregateOutputType | null
    _avg: AddressAvgAggregateOutputType | null
    _sum: AddressSumAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  export type AddressAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type AddressSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type AddressMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    label: string | null
    type: string | null
    line1: string | null
    line2: string | null
    city: string | null
    state: string | null
    postalCode: string | null
    country: string | null
    phone: string | null
    isDefault: boolean | null
    isActive: boolean | null
    latitude: number | null
    longitude: number | null
    deliveryInstructions: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AddressMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    label: string | null
    type: string | null
    line1: string | null
    line2: string | null
    city: string | null
    state: string | null
    postalCode: string | null
    country: string | null
    phone: string | null
    isDefault: boolean | null
    isActive: boolean | null
    latitude: number | null
    longitude: number | null
    deliveryInstructions: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AddressCountAggregateOutputType = {
    id: number
    customerId: number
    label: number
    type: number
    line1: number
    line2: number
    city: number
    state: number
    postalCode: number
    country: number
    phone: number
    isDefault: number
    isActive: number
    latitude: number
    longitude: number
    deliveryInstructions: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AddressAvgAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type AddressSumAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type AddressMinAggregateInputType = {
    id?: true
    customerId?: true
    label?: true
    type?: true
    line1?: true
    line2?: true
    city?: true
    state?: true
    postalCode?: true
    country?: true
    phone?: true
    isDefault?: true
    isActive?: true
    latitude?: true
    longitude?: true
    deliveryInstructions?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AddressMaxAggregateInputType = {
    id?: true
    customerId?: true
    label?: true
    type?: true
    line1?: true
    line2?: true
    city?: true
    state?: true
    postalCode?: true
    country?: true
    phone?: true
    isDefault?: true
    isActive?: true
    latitude?: true
    longitude?: true
    deliveryInstructions?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AddressCountAggregateInputType = {
    id?: true
    customerId?: true
    label?: true
    type?: true
    line1?: true
    line2?: true
    city?: true
    state?: true
    postalCode?: true
    country?: true
    phone?: true
    isDefault?: true
    isActive?: true
    latitude?: true
    longitude?: true
    deliveryInstructions?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AddressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Address to aggregate.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Addresses
    **/
    _count?: true | AddressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AddressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AddressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AddressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AddressMaxAggregateInputType
  }

  export type GetAddressAggregateType<T extends AddressAggregateArgs> = {
        [P in keyof T & keyof AggregateAddress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAddress[P]>
      : GetScalarType<T[P], AggregateAddress[P]>
  }




  export type AddressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithAggregationInput | AddressOrderByWithAggregationInput[]
    by: AddressScalarFieldEnum[] | AddressScalarFieldEnum
    having?: AddressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AddressCountAggregateInputType | true
    _avg?: AddressAvgAggregateInputType
    _sum?: AddressSumAggregateInputType
    _min?: AddressMinAggregateInputType
    _max?: AddressMaxAggregateInputType
  }

  export type AddressGroupByOutputType = {
    id: string
    customerId: string
    label: string
    type: string
    line1: string
    line2: string | null
    city: string
    state: string | null
    postalCode: string
    country: string
    phone: string | null
    isDefault: boolean
    isActive: boolean
    latitude: number | null
    longitude: number | null
    deliveryInstructions: string | null
    createdAt: Date
    updatedAt: Date
    _count: AddressCountAggregateOutputType | null
    _avg: AddressAvgAggregateOutputType | null
    _sum: AddressSumAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  type GetAddressGroupByPayload<T extends AddressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AddressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AddressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AddressGroupByOutputType[P]>
            : GetScalarType<T[P], AddressGroupByOutputType[P]>
        }
      >
    >


  export type AddressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    label?: boolean
    type?: boolean
    line1?: boolean
    line2?: boolean
    city?: boolean
    state?: boolean
    postalCode?: boolean
    country?: boolean
    phone?: boolean
    isDefault?: boolean
    isActive?: boolean
    latitude?: boolean
    longitude?: boolean
    deliveryInstructions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["address"]>

  export type AddressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    label?: boolean
    type?: boolean
    line1?: boolean
    line2?: boolean
    city?: boolean
    state?: boolean
    postalCode?: boolean
    country?: boolean
    phone?: boolean
    isDefault?: boolean
    isActive?: boolean
    latitude?: boolean
    longitude?: boolean
    deliveryInstructions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["address"]>

  export type AddressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    label?: boolean
    type?: boolean
    line1?: boolean
    line2?: boolean
    city?: boolean
    state?: boolean
    postalCode?: boolean
    country?: boolean
    phone?: boolean
    isDefault?: boolean
    isActive?: boolean
    latitude?: boolean
    longitude?: boolean
    deliveryInstructions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["address"]>

  export type AddressSelectScalar = {
    id?: boolean
    customerId?: boolean
    label?: boolean
    type?: boolean
    line1?: boolean
    line2?: boolean
    city?: boolean
    state?: boolean
    postalCode?: boolean
    country?: boolean
    phone?: boolean
    isDefault?: boolean
    isActive?: boolean
    latitude?: boolean
    longitude?: boolean
    deliveryInstructions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AddressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "label" | "type" | "line1" | "line2" | "city" | "state" | "postalCode" | "country" | "phone" | "isDefault" | "isActive" | "latitude" | "longitude" | "deliveryInstructions" | "createdAt" | "updatedAt", ExtArgs["result"]["address"]>
  export type AddressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type AddressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type AddressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }

  export type $AddressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Address"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      label: string
      type: string
      line1: string
      line2: string | null
      city: string
      state: string | null
      postalCode: string
      country: string
      phone: string | null
      isDefault: boolean
      isActive: boolean
      latitude: number | null
      longitude: number | null
      deliveryInstructions: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["address"]>
    composites: {}
  }

  type AddressGetPayload<S extends boolean | null | undefined | AddressDefaultArgs> = $Result.GetResult<Prisma.$AddressPayload, S>

  type AddressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AddressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AddressCountAggregateInputType | true
    }

  export interface AddressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Address'], meta: { name: 'Address' } }
    /**
     * Find zero or one Address that matches the filter.
     * @param {AddressFindUniqueArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AddressFindUniqueArgs>(args: SelectSubset<T, AddressFindUniqueArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Address that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AddressFindUniqueOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AddressFindUniqueOrThrowArgs>(args: SelectSubset<T, AddressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Address that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AddressFindFirstArgs>(args?: SelectSubset<T, AddressFindFirstArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Address that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AddressFindFirstOrThrowArgs>(args?: SelectSubset<T, AddressFindFirstOrThrowArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Addresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Addresses
     * const addresses = await prisma.address.findMany()
     * 
     * // Get first 10 Addresses
     * const addresses = await prisma.address.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const addressWithIdOnly = await prisma.address.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AddressFindManyArgs>(args?: SelectSubset<T, AddressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Address.
     * @param {AddressCreateArgs} args - Arguments to create a Address.
     * @example
     * // Create one Address
     * const Address = await prisma.address.create({
     *   data: {
     *     // ... data to create a Address
     *   }
     * })
     * 
     */
    create<T extends AddressCreateArgs>(args: SelectSubset<T, AddressCreateArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Addresses.
     * @param {AddressCreateManyArgs} args - Arguments to create many Addresses.
     * @example
     * // Create many Addresses
     * const address = await prisma.address.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AddressCreateManyArgs>(args?: SelectSubset<T, AddressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Addresses and returns the data saved in the database.
     * @param {AddressCreateManyAndReturnArgs} args - Arguments to create many Addresses.
     * @example
     * // Create many Addresses
     * const address = await prisma.address.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Addresses and only return the `id`
     * const addressWithIdOnly = await prisma.address.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AddressCreateManyAndReturnArgs>(args?: SelectSubset<T, AddressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Address.
     * @param {AddressDeleteArgs} args - Arguments to delete one Address.
     * @example
     * // Delete one Address
     * const Address = await prisma.address.delete({
     *   where: {
     *     // ... filter to delete one Address
     *   }
     * })
     * 
     */
    delete<T extends AddressDeleteArgs>(args: SelectSubset<T, AddressDeleteArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Address.
     * @param {AddressUpdateArgs} args - Arguments to update one Address.
     * @example
     * // Update one Address
     * const address = await prisma.address.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AddressUpdateArgs>(args: SelectSubset<T, AddressUpdateArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Addresses.
     * @param {AddressDeleteManyArgs} args - Arguments to filter Addresses to delete.
     * @example
     * // Delete a few Addresses
     * const { count } = await prisma.address.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AddressDeleteManyArgs>(args?: SelectSubset<T, AddressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Addresses
     * const address = await prisma.address.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AddressUpdateManyArgs>(args: SelectSubset<T, AddressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Addresses and returns the data updated in the database.
     * @param {AddressUpdateManyAndReturnArgs} args - Arguments to update many Addresses.
     * @example
     * // Update many Addresses
     * const address = await prisma.address.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Addresses and only return the `id`
     * const addressWithIdOnly = await prisma.address.updateManyAndReturn({
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
    updateManyAndReturn<T extends AddressUpdateManyAndReturnArgs>(args: SelectSubset<T, AddressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Address.
     * @param {AddressUpsertArgs} args - Arguments to update or create a Address.
     * @example
     * // Update or create a Address
     * const address = await prisma.address.upsert({
     *   create: {
     *     // ... data to create a Address
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Address we want to update
     *   }
     * })
     */
    upsert<T extends AddressUpsertArgs>(args: SelectSubset<T, AddressUpsertArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressCountArgs} args - Arguments to filter Addresses to count.
     * @example
     * // Count the number of Addresses
     * const count = await prisma.address.count({
     *   where: {
     *     // ... the filter for the Addresses we want to count
     *   }
     * })
    **/
    count<T extends AddressCountArgs>(
      args?: Subset<T, AddressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AddressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AddressAggregateArgs>(args: Subset<T, AddressAggregateArgs>): Prisma.PrismaPromise<GetAddressAggregateType<T>>

    /**
     * Group by Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressGroupByArgs} args - Group by arguments.
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
      T extends AddressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AddressGroupByArgs['orderBy'] }
        : { orderBy?: AddressGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AddressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAddressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Address model
   */
  readonly fields: AddressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Address.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AddressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Address model
   */
  interface AddressFieldRefs {
    readonly id: FieldRef<"Address", 'String'>
    readonly customerId: FieldRef<"Address", 'String'>
    readonly label: FieldRef<"Address", 'String'>
    readonly type: FieldRef<"Address", 'String'>
    readonly line1: FieldRef<"Address", 'String'>
    readonly line2: FieldRef<"Address", 'String'>
    readonly city: FieldRef<"Address", 'String'>
    readonly state: FieldRef<"Address", 'String'>
    readonly postalCode: FieldRef<"Address", 'String'>
    readonly country: FieldRef<"Address", 'String'>
    readonly phone: FieldRef<"Address", 'String'>
    readonly isDefault: FieldRef<"Address", 'Boolean'>
    readonly isActive: FieldRef<"Address", 'Boolean'>
    readonly latitude: FieldRef<"Address", 'Float'>
    readonly longitude: FieldRef<"Address", 'Float'>
    readonly deliveryInstructions: FieldRef<"Address", 'String'>
    readonly createdAt: FieldRef<"Address", 'DateTime'>
    readonly updatedAt: FieldRef<"Address", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Address findUnique
   */
  export type AddressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address findUniqueOrThrow
   */
  export type AddressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address findFirst
   */
  export type AddressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address findFirstOrThrow
   */
  export type AddressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address findMany
   */
  export type AddressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Addresses to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address create
   */
  export type AddressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The data needed to create a Address.
     */
    data: XOR<AddressCreateInput, AddressUncheckedCreateInput>
  }

  /**
   * Address createMany
   */
  export type AddressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Addresses.
     */
    data: AddressCreateManyInput | AddressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Address createManyAndReturn
   */
  export type AddressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * The data used to create many Addresses.
     */
    data: AddressCreateManyInput | AddressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Address update
   */
  export type AddressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The data needed to update a Address.
     */
    data: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>
    /**
     * Choose, which Address to update.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address updateMany
   */
  export type AddressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Addresses.
     */
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyInput>
    /**
     * Filter which Addresses to update
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to update.
     */
    limit?: number
  }

  /**
   * Address updateManyAndReturn
   */
  export type AddressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * The data used to update Addresses.
     */
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyInput>
    /**
     * Filter which Addresses to update
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Address upsert
   */
  export type AddressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The filter to search for the Address to update in case it exists.
     */
    where: AddressWhereUniqueInput
    /**
     * In case the Address found by the `where` argument doesn't exist, create a new Address with this data.
     */
    create: XOR<AddressCreateInput, AddressUncheckedCreateInput>
    /**
     * In case the Address was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>
  }

  /**
   * Address delete
   */
  export type AddressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter which Address to delete.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address deleteMany
   */
  export type AddressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Addresses to delete
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to delete.
     */
    limit?: number
  }

  /**
   * Address without action
   */
  export type AddressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
  }


  /**
   * Model Communication
   */

  export type AggregateCommunication = {
    _count: CommunicationCountAggregateOutputType | null
    _min: CommunicationMinAggregateOutputType | null
    _max: CommunicationMaxAggregateOutputType | null
  }

  export type CommunicationMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    type: string | null
    direction: string | null
    subject: string | null
    content: string | null
    status: string | null
    sentAt: Date | null
    deliveredAt: Date | null
    readAt: Date | null
    failedAt: Date | null
    error: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CommunicationMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    type: string | null
    direction: string | null
    subject: string | null
    content: string | null
    status: string | null
    sentAt: Date | null
    deliveredAt: Date | null
    readAt: Date | null
    failedAt: Date | null
    error: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CommunicationCountAggregateOutputType = {
    id: number
    customerId: number
    type: number
    direction: number
    subject: number
    content: number
    status: number
    metadata: number
    sentAt: number
    deliveredAt: number
    readAt: number
    failedAt: number
    error: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CommunicationMinAggregateInputType = {
    id?: true
    customerId?: true
    type?: true
    direction?: true
    subject?: true
    content?: true
    status?: true
    sentAt?: true
    deliveredAt?: true
    readAt?: true
    failedAt?: true
    error?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CommunicationMaxAggregateInputType = {
    id?: true
    customerId?: true
    type?: true
    direction?: true
    subject?: true
    content?: true
    status?: true
    sentAt?: true
    deliveredAt?: true
    readAt?: true
    failedAt?: true
    error?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CommunicationCountAggregateInputType = {
    id?: true
    customerId?: true
    type?: true
    direction?: true
    subject?: true
    content?: true
    status?: true
    metadata?: true
    sentAt?: true
    deliveredAt?: true
    readAt?: true
    failedAt?: true
    error?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CommunicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Communication to aggregate.
     */
    where?: CommunicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Communications to fetch.
     */
    orderBy?: CommunicationOrderByWithRelationInput | CommunicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommunicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Communications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Communications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Communications
    **/
    _count?: true | CommunicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommunicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommunicationMaxAggregateInputType
  }

  export type GetCommunicationAggregateType<T extends CommunicationAggregateArgs> = {
        [P in keyof T & keyof AggregateCommunication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommunication[P]>
      : GetScalarType<T[P], AggregateCommunication[P]>
  }




  export type CommunicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommunicationWhereInput
    orderBy?: CommunicationOrderByWithAggregationInput | CommunicationOrderByWithAggregationInput[]
    by: CommunicationScalarFieldEnum[] | CommunicationScalarFieldEnum
    having?: CommunicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommunicationCountAggregateInputType | true
    _min?: CommunicationMinAggregateInputType
    _max?: CommunicationMaxAggregateInputType
  }

  export type CommunicationGroupByOutputType = {
    id: string
    customerId: string
    type: string
    direction: string
    subject: string | null
    content: string
    status: string
    metadata: JsonValue | null
    sentAt: Date | null
    deliveredAt: Date | null
    readAt: Date | null
    failedAt: Date | null
    error: string | null
    createdAt: Date
    updatedAt: Date
    _count: CommunicationCountAggregateOutputType | null
    _min: CommunicationMinAggregateOutputType | null
    _max: CommunicationMaxAggregateOutputType | null
  }

  type GetCommunicationGroupByPayload<T extends CommunicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommunicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommunicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommunicationGroupByOutputType[P]>
            : GetScalarType<T[P], CommunicationGroupByOutputType[P]>
        }
      >
    >


  export type CommunicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    type?: boolean
    direction?: boolean
    subject?: boolean
    content?: boolean
    status?: boolean
    metadata?: boolean
    sentAt?: boolean
    deliveredAt?: boolean
    readAt?: boolean
    failedAt?: boolean
    error?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["communication"]>

  export type CommunicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    type?: boolean
    direction?: boolean
    subject?: boolean
    content?: boolean
    status?: boolean
    metadata?: boolean
    sentAt?: boolean
    deliveredAt?: boolean
    readAt?: boolean
    failedAt?: boolean
    error?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["communication"]>

  export type CommunicationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    type?: boolean
    direction?: boolean
    subject?: boolean
    content?: boolean
    status?: boolean
    metadata?: boolean
    sentAt?: boolean
    deliveredAt?: boolean
    readAt?: boolean
    failedAt?: boolean
    error?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["communication"]>

  export type CommunicationSelectScalar = {
    id?: boolean
    customerId?: boolean
    type?: boolean
    direction?: boolean
    subject?: boolean
    content?: boolean
    status?: boolean
    metadata?: boolean
    sentAt?: boolean
    deliveredAt?: boolean
    readAt?: boolean
    failedAt?: boolean
    error?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CommunicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "type" | "direction" | "subject" | "content" | "status" | "metadata" | "sentAt" | "deliveredAt" | "readAt" | "failedAt" | "error" | "createdAt" | "updatedAt", ExtArgs["result"]["communication"]>
  export type CommunicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type CommunicationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type CommunicationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }

  export type $CommunicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Communication"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      type: string
      direction: string
      subject: string | null
      content: string
      status: string
      metadata: Prisma.JsonValue | null
      sentAt: Date | null
      deliveredAt: Date | null
      readAt: Date | null
      failedAt: Date | null
      error: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["communication"]>
    composites: {}
  }

  type CommunicationGetPayload<S extends boolean | null | undefined | CommunicationDefaultArgs> = $Result.GetResult<Prisma.$CommunicationPayload, S>

  type CommunicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommunicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommunicationCountAggregateInputType | true
    }

  export interface CommunicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Communication'], meta: { name: 'Communication' } }
    /**
     * Find zero or one Communication that matches the filter.
     * @param {CommunicationFindUniqueArgs} args - Arguments to find a Communication
     * @example
     * // Get one Communication
     * const communication = await prisma.communication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommunicationFindUniqueArgs>(args: SelectSubset<T, CommunicationFindUniqueArgs<ExtArgs>>): Prisma__CommunicationClient<$Result.GetResult<Prisma.$CommunicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Communication that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommunicationFindUniqueOrThrowArgs} args - Arguments to find a Communication
     * @example
     * // Get one Communication
     * const communication = await prisma.communication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommunicationFindUniqueOrThrowArgs>(args: SelectSubset<T, CommunicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommunicationClient<$Result.GetResult<Prisma.$CommunicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Communication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunicationFindFirstArgs} args - Arguments to find a Communication
     * @example
     * // Get one Communication
     * const communication = await prisma.communication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommunicationFindFirstArgs>(args?: SelectSubset<T, CommunicationFindFirstArgs<ExtArgs>>): Prisma__CommunicationClient<$Result.GetResult<Prisma.$CommunicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Communication that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunicationFindFirstOrThrowArgs} args - Arguments to find a Communication
     * @example
     * // Get one Communication
     * const communication = await prisma.communication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommunicationFindFirstOrThrowArgs>(args?: SelectSubset<T, CommunicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommunicationClient<$Result.GetResult<Prisma.$CommunicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Communications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Communications
     * const communications = await prisma.communication.findMany()
     * 
     * // Get first 10 Communications
     * const communications = await prisma.communication.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const communicationWithIdOnly = await prisma.communication.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommunicationFindManyArgs>(args?: SelectSubset<T, CommunicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommunicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Communication.
     * @param {CommunicationCreateArgs} args - Arguments to create a Communication.
     * @example
     * // Create one Communication
     * const Communication = await prisma.communication.create({
     *   data: {
     *     // ... data to create a Communication
     *   }
     * })
     * 
     */
    create<T extends CommunicationCreateArgs>(args: SelectSubset<T, CommunicationCreateArgs<ExtArgs>>): Prisma__CommunicationClient<$Result.GetResult<Prisma.$CommunicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Communications.
     * @param {CommunicationCreateManyArgs} args - Arguments to create many Communications.
     * @example
     * // Create many Communications
     * const communication = await prisma.communication.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommunicationCreateManyArgs>(args?: SelectSubset<T, CommunicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Communications and returns the data saved in the database.
     * @param {CommunicationCreateManyAndReturnArgs} args - Arguments to create many Communications.
     * @example
     * // Create many Communications
     * const communication = await prisma.communication.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Communications and only return the `id`
     * const communicationWithIdOnly = await prisma.communication.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommunicationCreateManyAndReturnArgs>(args?: SelectSubset<T, CommunicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommunicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Communication.
     * @param {CommunicationDeleteArgs} args - Arguments to delete one Communication.
     * @example
     * // Delete one Communication
     * const Communication = await prisma.communication.delete({
     *   where: {
     *     // ... filter to delete one Communication
     *   }
     * })
     * 
     */
    delete<T extends CommunicationDeleteArgs>(args: SelectSubset<T, CommunicationDeleteArgs<ExtArgs>>): Prisma__CommunicationClient<$Result.GetResult<Prisma.$CommunicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Communication.
     * @param {CommunicationUpdateArgs} args - Arguments to update one Communication.
     * @example
     * // Update one Communication
     * const communication = await prisma.communication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommunicationUpdateArgs>(args: SelectSubset<T, CommunicationUpdateArgs<ExtArgs>>): Prisma__CommunicationClient<$Result.GetResult<Prisma.$CommunicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Communications.
     * @param {CommunicationDeleteManyArgs} args - Arguments to filter Communications to delete.
     * @example
     * // Delete a few Communications
     * const { count } = await prisma.communication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommunicationDeleteManyArgs>(args?: SelectSubset<T, CommunicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Communications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Communications
     * const communication = await prisma.communication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommunicationUpdateManyArgs>(args: SelectSubset<T, CommunicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Communications and returns the data updated in the database.
     * @param {CommunicationUpdateManyAndReturnArgs} args - Arguments to update many Communications.
     * @example
     * // Update many Communications
     * const communication = await prisma.communication.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Communications and only return the `id`
     * const communicationWithIdOnly = await prisma.communication.updateManyAndReturn({
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
    updateManyAndReturn<T extends CommunicationUpdateManyAndReturnArgs>(args: SelectSubset<T, CommunicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommunicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Communication.
     * @param {CommunicationUpsertArgs} args - Arguments to update or create a Communication.
     * @example
     * // Update or create a Communication
     * const communication = await prisma.communication.upsert({
     *   create: {
     *     // ... data to create a Communication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Communication we want to update
     *   }
     * })
     */
    upsert<T extends CommunicationUpsertArgs>(args: SelectSubset<T, CommunicationUpsertArgs<ExtArgs>>): Prisma__CommunicationClient<$Result.GetResult<Prisma.$CommunicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Communications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunicationCountArgs} args - Arguments to filter Communications to count.
     * @example
     * // Count the number of Communications
     * const count = await prisma.communication.count({
     *   where: {
     *     // ... the filter for the Communications we want to count
     *   }
     * })
    **/
    count<T extends CommunicationCountArgs>(
      args?: Subset<T, CommunicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommunicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Communication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CommunicationAggregateArgs>(args: Subset<T, CommunicationAggregateArgs>): Prisma.PrismaPromise<GetCommunicationAggregateType<T>>

    /**
     * Group by Communication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunicationGroupByArgs} args - Group by arguments.
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
      T extends CommunicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommunicationGroupByArgs['orderBy'] }
        : { orderBy?: CommunicationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CommunicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommunicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Communication model
   */
  readonly fields: CommunicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Communication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommunicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Communication model
   */
  interface CommunicationFieldRefs {
    readonly id: FieldRef<"Communication", 'String'>
    readonly customerId: FieldRef<"Communication", 'String'>
    readonly type: FieldRef<"Communication", 'String'>
    readonly direction: FieldRef<"Communication", 'String'>
    readonly subject: FieldRef<"Communication", 'String'>
    readonly content: FieldRef<"Communication", 'String'>
    readonly status: FieldRef<"Communication", 'String'>
    readonly metadata: FieldRef<"Communication", 'Json'>
    readonly sentAt: FieldRef<"Communication", 'DateTime'>
    readonly deliveredAt: FieldRef<"Communication", 'DateTime'>
    readonly readAt: FieldRef<"Communication", 'DateTime'>
    readonly failedAt: FieldRef<"Communication", 'DateTime'>
    readonly error: FieldRef<"Communication", 'String'>
    readonly createdAt: FieldRef<"Communication", 'DateTime'>
    readonly updatedAt: FieldRef<"Communication", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Communication findUnique
   */
  export type CommunicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Communication
     */
    select?: CommunicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Communication
     */
    omit?: CommunicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunicationInclude<ExtArgs> | null
    /**
     * Filter, which Communication to fetch.
     */
    where: CommunicationWhereUniqueInput
  }

  /**
   * Communication findUniqueOrThrow
   */
  export type CommunicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Communication
     */
    select?: CommunicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Communication
     */
    omit?: CommunicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunicationInclude<ExtArgs> | null
    /**
     * Filter, which Communication to fetch.
     */
    where: CommunicationWhereUniqueInput
  }

  /**
   * Communication findFirst
   */
  export type CommunicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Communication
     */
    select?: CommunicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Communication
     */
    omit?: CommunicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunicationInclude<ExtArgs> | null
    /**
     * Filter, which Communication to fetch.
     */
    where?: CommunicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Communications to fetch.
     */
    orderBy?: CommunicationOrderByWithRelationInput | CommunicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Communications.
     */
    cursor?: CommunicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Communications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Communications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Communications.
     */
    distinct?: CommunicationScalarFieldEnum | CommunicationScalarFieldEnum[]
  }

  /**
   * Communication findFirstOrThrow
   */
  export type CommunicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Communication
     */
    select?: CommunicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Communication
     */
    omit?: CommunicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunicationInclude<ExtArgs> | null
    /**
     * Filter, which Communication to fetch.
     */
    where?: CommunicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Communications to fetch.
     */
    orderBy?: CommunicationOrderByWithRelationInput | CommunicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Communications.
     */
    cursor?: CommunicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Communications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Communications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Communications.
     */
    distinct?: CommunicationScalarFieldEnum | CommunicationScalarFieldEnum[]
  }

  /**
   * Communication findMany
   */
  export type CommunicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Communication
     */
    select?: CommunicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Communication
     */
    omit?: CommunicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunicationInclude<ExtArgs> | null
    /**
     * Filter, which Communications to fetch.
     */
    where?: CommunicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Communications to fetch.
     */
    orderBy?: CommunicationOrderByWithRelationInput | CommunicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Communications.
     */
    cursor?: CommunicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Communications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Communications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Communications.
     */
    distinct?: CommunicationScalarFieldEnum | CommunicationScalarFieldEnum[]
  }

  /**
   * Communication create
   */
  export type CommunicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Communication
     */
    select?: CommunicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Communication
     */
    omit?: CommunicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunicationInclude<ExtArgs> | null
    /**
     * The data needed to create a Communication.
     */
    data: XOR<CommunicationCreateInput, CommunicationUncheckedCreateInput>
  }

  /**
   * Communication createMany
   */
  export type CommunicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Communications.
     */
    data: CommunicationCreateManyInput | CommunicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Communication createManyAndReturn
   */
  export type CommunicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Communication
     */
    select?: CommunicationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Communication
     */
    omit?: CommunicationOmit<ExtArgs> | null
    /**
     * The data used to create many Communications.
     */
    data: CommunicationCreateManyInput | CommunicationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunicationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Communication update
   */
  export type CommunicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Communication
     */
    select?: CommunicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Communication
     */
    omit?: CommunicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunicationInclude<ExtArgs> | null
    /**
     * The data needed to update a Communication.
     */
    data: XOR<CommunicationUpdateInput, CommunicationUncheckedUpdateInput>
    /**
     * Choose, which Communication to update.
     */
    where: CommunicationWhereUniqueInput
  }

  /**
   * Communication updateMany
   */
  export type CommunicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Communications.
     */
    data: XOR<CommunicationUpdateManyMutationInput, CommunicationUncheckedUpdateManyInput>
    /**
     * Filter which Communications to update
     */
    where?: CommunicationWhereInput
    /**
     * Limit how many Communications to update.
     */
    limit?: number
  }

  /**
   * Communication updateManyAndReturn
   */
  export type CommunicationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Communication
     */
    select?: CommunicationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Communication
     */
    omit?: CommunicationOmit<ExtArgs> | null
    /**
     * The data used to update Communications.
     */
    data: XOR<CommunicationUpdateManyMutationInput, CommunicationUncheckedUpdateManyInput>
    /**
     * Filter which Communications to update
     */
    where?: CommunicationWhereInput
    /**
     * Limit how many Communications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunicationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Communication upsert
   */
  export type CommunicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Communication
     */
    select?: CommunicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Communication
     */
    omit?: CommunicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunicationInclude<ExtArgs> | null
    /**
     * The filter to search for the Communication to update in case it exists.
     */
    where: CommunicationWhereUniqueInput
    /**
     * In case the Communication found by the `where` argument doesn't exist, create a new Communication with this data.
     */
    create: XOR<CommunicationCreateInput, CommunicationUncheckedCreateInput>
    /**
     * In case the Communication was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommunicationUpdateInput, CommunicationUncheckedUpdateInput>
  }

  /**
   * Communication delete
   */
  export type CommunicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Communication
     */
    select?: CommunicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Communication
     */
    omit?: CommunicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunicationInclude<ExtArgs> | null
    /**
     * Filter which Communication to delete.
     */
    where: CommunicationWhereUniqueInput
  }

  /**
   * Communication deleteMany
   */
  export type CommunicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Communications to delete
     */
    where?: CommunicationWhereInput
    /**
     * Limit how many Communications to delete.
     */
    limit?: number
  }

  /**
   * Communication without action
   */
  export type CommunicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Communication
     */
    select?: CommunicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Communication
     */
    omit?: CommunicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunicationInclude<ExtArgs> | null
  }


  /**
   * Model CustomerNote
   */

  export type AggregateCustomerNote = {
    _count: CustomerNoteCountAggregateOutputType | null
    _min: CustomerNoteMinAggregateOutputType | null
    _max: CustomerNoteMaxAggregateOutputType | null
  }

  export type CustomerNoteMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    content: string | null
    type: string | null
    authorId: string | null
    isInternal: boolean | null
    isPinned: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerNoteMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    content: string | null
    type: string | null
    authorId: string | null
    isInternal: boolean | null
    isPinned: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerNoteCountAggregateOutputType = {
    id: number
    customerId: number
    content: number
    type: number
    authorId: number
    isInternal: number
    isPinned: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerNoteMinAggregateInputType = {
    id?: true
    customerId?: true
    content?: true
    type?: true
    authorId?: true
    isInternal?: true
    isPinned?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerNoteMaxAggregateInputType = {
    id?: true
    customerId?: true
    content?: true
    type?: true
    authorId?: true
    isInternal?: true
    isPinned?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerNoteCountAggregateInputType = {
    id?: true
    customerId?: true
    content?: true
    type?: true
    authorId?: true
    isInternal?: true
    isPinned?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerNoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerNote to aggregate.
     */
    where?: CustomerNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerNotes to fetch.
     */
    orderBy?: CustomerNoteOrderByWithRelationInput | CustomerNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomerNotes
    **/
    _count?: true | CustomerNoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerNoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerNoteMaxAggregateInputType
  }

  export type GetCustomerNoteAggregateType<T extends CustomerNoteAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomerNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomerNote[P]>
      : GetScalarType<T[P], AggregateCustomerNote[P]>
  }




  export type CustomerNoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerNoteWhereInput
    orderBy?: CustomerNoteOrderByWithAggregationInput | CustomerNoteOrderByWithAggregationInput[]
    by: CustomerNoteScalarFieldEnum[] | CustomerNoteScalarFieldEnum
    having?: CustomerNoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerNoteCountAggregateInputType | true
    _min?: CustomerNoteMinAggregateInputType
    _max?: CustomerNoteMaxAggregateInputType
  }

  export type CustomerNoteGroupByOutputType = {
    id: string
    customerId: string
    content: string
    type: string
    authorId: string
    isInternal: boolean
    isPinned: boolean
    createdAt: Date
    updatedAt: Date
    _count: CustomerNoteCountAggregateOutputType | null
    _min: CustomerNoteMinAggregateOutputType | null
    _max: CustomerNoteMaxAggregateOutputType | null
  }

  type GetCustomerNoteGroupByPayload<T extends CustomerNoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerNoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerNoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerNoteGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerNoteGroupByOutputType[P]>
        }
      >
    >


  export type CustomerNoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    content?: boolean
    type?: boolean
    authorId?: boolean
    isInternal?: boolean
    isPinned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customerNote"]>

  export type CustomerNoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    content?: boolean
    type?: boolean
    authorId?: boolean
    isInternal?: boolean
    isPinned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customerNote"]>

  export type CustomerNoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    content?: boolean
    type?: boolean
    authorId?: boolean
    isInternal?: boolean
    isPinned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customerNote"]>

  export type CustomerNoteSelectScalar = {
    id?: boolean
    customerId?: boolean
    content?: boolean
    type?: boolean
    authorId?: boolean
    isInternal?: boolean
    isPinned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerNoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "content" | "type" | "authorId" | "isInternal" | "isPinned" | "createdAt" | "updatedAt", ExtArgs["result"]["customerNote"]>
  export type CustomerNoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type CustomerNoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type CustomerNoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }

  export type $CustomerNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomerNote"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      content: string
      type: string
      authorId: string
      isInternal: boolean
      isPinned: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customerNote"]>
    composites: {}
  }

  type CustomerNoteGetPayload<S extends boolean | null | undefined | CustomerNoteDefaultArgs> = $Result.GetResult<Prisma.$CustomerNotePayload, S>

  type CustomerNoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerNoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerNoteCountAggregateInputType | true
    }

  export interface CustomerNoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomerNote'], meta: { name: 'CustomerNote' } }
    /**
     * Find zero or one CustomerNote that matches the filter.
     * @param {CustomerNoteFindUniqueArgs} args - Arguments to find a CustomerNote
     * @example
     * // Get one CustomerNote
     * const customerNote = await prisma.customerNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerNoteFindUniqueArgs>(args: SelectSubset<T, CustomerNoteFindUniqueArgs<ExtArgs>>): Prisma__CustomerNoteClient<$Result.GetResult<Prisma.$CustomerNotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CustomerNote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerNoteFindUniqueOrThrowArgs} args - Arguments to find a CustomerNote
     * @example
     * // Get one CustomerNote
     * const customerNote = await prisma.customerNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerNoteFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerNoteClient<$Result.GetResult<Prisma.$CustomerNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerNoteFindFirstArgs} args - Arguments to find a CustomerNote
     * @example
     * // Get one CustomerNote
     * const customerNote = await prisma.customerNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerNoteFindFirstArgs>(args?: SelectSubset<T, CustomerNoteFindFirstArgs<ExtArgs>>): Prisma__CustomerNoteClient<$Result.GetResult<Prisma.$CustomerNotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerNoteFindFirstOrThrowArgs} args - Arguments to find a CustomerNote
     * @example
     * // Get one CustomerNote
     * const customerNote = await prisma.customerNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerNoteFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerNoteClient<$Result.GetResult<Prisma.$CustomerNotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CustomerNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomerNotes
     * const customerNotes = await prisma.customerNote.findMany()
     * 
     * // Get first 10 CustomerNotes
     * const customerNotes = await prisma.customerNote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerNoteWithIdOnly = await prisma.customerNote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerNoteFindManyArgs>(args?: SelectSubset<T, CustomerNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CustomerNote.
     * @param {CustomerNoteCreateArgs} args - Arguments to create a CustomerNote.
     * @example
     * // Create one CustomerNote
     * const CustomerNote = await prisma.customerNote.create({
     *   data: {
     *     // ... data to create a CustomerNote
     *   }
     * })
     * 
     */
    create<T extends CustomerNoteCreateArgs>(args: SelectSubset<T, CustomerNoteCreateArgs<ExtArgs>>): Prisma__CustomerNoteClient<$Result.GetResult<Prisma.$CustomerNotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CustomerNotes.
     * @param {CustomerNoteCreateManyArgs} args - Arguments to create many CustomerNotes.
     * @example
     * // Create many CustomerNotes
     * const customerNote = await prisma.customerNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerNoteCreateManyArgs>(args?: SelectSubset<T, CustomerNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CustomerNotes and returns the data saved in the database.
     * @param {CustomerNoteCreateManyAndReturnArgs} args - Arguments to create many CustomerNotes.
     * @example
     * // Create many CustomerNotes
     * const customerNote = await prisma.customerNote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CustomerNotes and only return the `id`
     * const customerNoteWithIdOnly = await prisma.customerNote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerNoteCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerNoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerNotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CustomerNote.
     * @param {CustomerNoteDeleteArgs} args - Arguments to delete one CustomerNote.
     * @example
     * // Delete one CustomerNote
     * const CustomerNote = await prisma.customerNote.delete({
     *   where: {
     *     // ... filter to delete one CustomerNote
     *   }
     * })
     * 
     */
    delete<T extends CustomerNoteDeleteArgs>(args: SelectSubset<T, CustomerNoteDeleteArgs<ExtArgs>>): Prisma__CustomerNoteClient<$Result.GetResult<Prisma.$CustomerNotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CustomerNote.
     * @param {CustomerNoteUpdateArgs} args - Arguments to update one CustomerNote.
     * @example
     * // Update one CustomerNote
     * const customerNote = await prisma.customerNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerNoteUpdateArgs>(args: SelectSubset<T, CustomerNoteUpdateArgs<ExtArgs>>): Prisma__CustomerNoteClient<$Result.GetResult<Prisma.$CustomerNotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CustomerNotes.
     * @param {CustomerNoteDeleteManyArgs} args - Arguments to filter CustomerNotes to delete.
     * @example
     * // Delete a few CustomerNotes
     * const { count } = await prisma.customerNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerNoteDeleteManyArgs>(args?: SelectSubset<T, CustomerNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomerNotes
     * const customerNote = await prisma.customerNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerNoteUpdateManyArgs>(args: SelectSubset<T, CustomerNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerNotes and returns the data updated in the database.
     * @param {CustomerNoteUpdateManyAndReturnArgs} args - Arguments to update many CustomerNotes.
     * @example
     * // Update many CustomerNotes
     * const customerNote = await prisma.customerNote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CustomerNotes and only return the `id`
     * const customerNoteWithIdOnly = await prisma.customerNote.updateManyAndReturn({
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
    updateManyAndReturn<T extends CustomerNoteUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerNoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerNotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CustomerNote.
     * @param {CustomerNoteUpsertArgs} args - Arguments to update or create a CustomerNote.
     * @example
     * // Update or create a CustomerNote
     * const customerNote = await prisma.customerNote.upsert({
     *   create: {
     *     // ... data to create a CustomerNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomerNote we want to update
     *   }
     * })
     */
    upsert<T extends CustomerNoteUpsertArgs>(args: SelectSubset<T, CustomerNoteUpsertArgs<ExtArgs>>): Prisma__CustomerNoteClient<$Result.GetResult<Prisma.$CustomerNotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CustomerNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerNoteCountArgs} args - Arguments to filter CustomerNotes to count.
     * @example
     * // Count the number of CustomerNotes
     * const count = await prisma.customerNote.count({
     *   where: {
     *     // ... the filter for the CustomerNotes we want to count
     *   }
     * })
    **/
    count<T extends CustomerNoteCountArgs>(
      args?: Subset<T, CustomerNoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerNoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomerNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustomerNoteAggregateArgs>(args: Subset<T, CustomerNoteAggregateArgs>): Prisma.PrismaPromise<GetCustomerNoteAggregateType<T>>

    /**
     * Group by CustomerNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerNoteGroupByArgs} args - Group by arguments.
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
      T extends CustomerNoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerNoteGroupByArgs['orderBy'] }
        : { orderBy?: CustomerNoteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustomerNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomerNote model
   */
  readonly fields: CustomerNoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomerNote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerNoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CustomerNote model
   */
  interface CustomerNoteFieldRefs {
    readonly id: FieldRef<"CustomerNote", 'String'>
    readonly customerId: FieldRef<"CustomerNote", 'String'>
    readonly content: FieldRef<"CustomerNote", 'String'>
    readonly type: FieldRef<"CustomerNote", 'String'>
    readonly authorId: FieldRef<"CustomerNote", 'String'>
    readonly isInternal: FieldRef<"CustomerNote", 'Boolean'>
    readonly isPinned: FieldRef<"CustomerNote", 'Boolean'>
    readonly createdAt: FieldRef<"CustomerNote", 'DateTime'>
    readonly updatedAt: FieldRef<"CustomerNote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CustomerNote findUnique
   */
  export type CustomerNoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerNote
     */
    select?: CustomerNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerNote
     */
    omit?: CustomerNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerNoteInclude<ExtArgs> | null
    /**
     * Filter, which CustomerNote to fetch.
     */
    where: CustomerNoteWhereUniqueInput
  }

  /**
   * CustomerNote findUniqueOrThrow
   */
  export type CustomerNoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerNote
     */
    select?: CustomerNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerNote
     */
    omit?: CustomerNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerNoteInclude<ExtArgs> | null
    /**
     * Filter, which CustomerNote to fetch.
     */
    where: CustomerNoteWhereUniqueInput
  }

  /**
   * CustomerNote findFirst
   */
  export type CustomerNoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerNote
     */
    select?: CustomerNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerNote
     */
    omit?: CustomerNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerNoteInclude<ExtArgs> | null
    /**
     * Filter, which CustomerNote to fetch.
     */
    where?: CustomerNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerNotes to fetch.
     */
    orderBy?: CustomerNoteOrderByWithRelationInput | CustomerNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerNotes.
     */
    cursor?: CustomerNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerNotes.
     */
    distinct?: CustomerNoteScalarFieldEnum | CustomerNoteScalarFieldEnum[]
  }

  /**
   * CustomerNote findFirstOrThrow
   */
  export type CustomerNoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerNote
     */
    select?: CustomerNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerNote
     */
    omit?: CustomerNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerNoteInclude<ExtArgs> | null
    /**
     * Filter, which CustomerNote to fetch.
     */
    where?: CustomerNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerNotes to fetch.
     */
    orderBy?: CustomerNoteOrderByWithRelationInput | CustomerNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerNotes.
     */
    cursor?: CustomerNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerNotes.
     */
    distinct?: CustomerNoteScalarFieldEnum | CustomerNoteScalarFieldEnum[]
  }

  /**
   * CustomerNote findMany
   */
  export type CustomerNoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerNote
     */
    select?: CustomerNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerNote
     */
    omit?: CustomerNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerNoteInclude<ExtArgs> | null
    /**
     * Filter, which CustomerNotes to fetch.
     */
    where?: CustomerNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerNotes to fetch.
     */
    orderBy?: CustomerNoteOrderByWithRelationInput | CustomerNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomerNotes.
     */
    cursor?: CustomerNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerNotes.
     */
    distinct?: CustomerNoteScalarFieldEnum | CustomerNoteScalarFieldEnum[]
  }

  /**
   * CustomerNote create
   */
  export type CustomerNoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerNote
     */
    select?: CustomerNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerNote
     */
    omit?: CustomerNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerNoteInclude<ExtArgs> | null
    /**
     * The data needed to create a CustomerNote.
     */
    data: XOR<CustomerNoteCreateInput, CustomerNoteUncheckedCreateInput>
  }

  /**
   * CustomerNote createMany
   */
  export type CustomerNoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomerNotes.
     */
    data: CustomerNoteCreateManyInput | CustomerNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomerNote createManyAndReturn
   */
  export type CustomerNoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerNote
     */
    select?: CustomerNoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerNote
     */
    omit?: CustomerNoteOmit<ExtArgs> | null
    /**
     * The data used to create many CustomerNotes.
     */
    data: CustomerNoteCreateManyInput | CustomerNoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerNoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CustomerNote update
   */
  export type CustomerNoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerNote
     */
    select?: CustomerNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerNote
     */
    omit?: CustomerNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerNoteInclude<ExtArgs> | null
    /**
     * The data needed to update a CustomerNote.
     */
    data: XOR<CustomerNoteUpdateInput, CustomerNoteUncheckedUpdateInput>
    /**
     * Choose, which CustomerNote to update.
     */
    where: CustomerNoteWhereUniqueInput
  }

  /**
   * CustomerNote updateMany
   */
  export type CustomerNoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomerNotes.
     */
    data: XOR<CustomerNoteUpdateManyMutationInput, CustomerNoteUncheckedUpdateManyInput>
    /**
     * Filter which CustomerNotes to update
     */
    where?: CustomerNoteWhereInput
    /**
     * Limit how many CustomerNotes to update.
     */
    limit?: number
  }

  /**
   * CustomerNote updateManyAndReturn
   */
  export type CustomerNoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerNote
     */
    select?: CustomerNoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerNote
     */
    omit?: CustomerNoteOmit<ExtArgs> | null
    /**
     * The data used to update CustomerNotes.
     */
    data: XOR<CustomerNoteUpdateManyMutationInput, CustomerNoteUncheckedUpdateManyInput>
    /**
     * Filter which CustomerNotes to update
     */
    where?: CustomerNoteWhereInput
    /**
     * Limit how many CustomerNotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerNoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CustomerNote upsert
   */
  export type CustomerNoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerNote
     */
    select?: CustomerNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerNote
     */
    omit?: CustomerNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerNoteInclude<ExtArgs> | null
    /**
     * The filter to search for the CustomerNote to update in case it exists.
     */
    where: CustomerNoteWhereUniqueInput
    /**
     * In case the CustomerNote found by the `where` argument doesn't exist, create a new CustomerNote with this data.
     */
    create: XOR<CustomerNoteCreateInput, CustomerNoteUncheckedCreateInput>
    /**
     * In case the CustomerNote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerNoteUpdateInput, CustomerNoteUncheckedUpdateInput>
  }

  /**
   * CustomerNote delete
   */
  export type CustomerNoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerNote
     */
    select?: CustomerNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerNote
     */
    omit?: CustomerNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerNoteInclude<ExtArgs> | null
    /**
     * Filter which CustomerNote to delete.
     */
    where: CustomerNoteWhereUniqueInput
  }

  /**
   * CustomerNote deleteMany
   */
  export type CustomerNoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerNotes to delete
     */
    where?: CustomerNoteWhereInput
    /**
     * Limit how many CustomerNotes to delete.
     */
    limit?: number
  }

  /**
   * CustomerNote without action
   */
  export type CustomerNoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerNote
     */
    select?: CustomerNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerNote
     */
    omit?: CustomerNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerNoteInclude<ExtArgs> | null
  }


  /**
   * Model CustomerActivity
   */

  export type AggregateCustomerActivity = {
    _count: CustomerActivityCountAggregateOutputType | null
    _min: CustomerActivityMinAggregateOutputType | null
    _max: CustomerActivityMaxAggregateOutputType | null
  }

  export type CustomerActivityMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    action: string | null
    resource: string | null
    resourceId: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type CustomerActivityMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    action: string | null
    resource: string | null
    resourceId: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type CustomerActivityCountAggregateOutputType = {
    id: number
    customerId: number
    action: number
    resource: number
    resourceId: number
    metadata: number
    ipAddress: number
    userAgent: number
    createdAt: number
    _all: number
  }


  export type CustomerActivityMinAggregateInputType = {
    id?: true
    customerId?: true
    action?: true
    resource?: true
    resourceId?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type CustomerActivityMaxAggregateInputType = {
    id?: true
    customerId?: true
    action?: true
    resource?: true
    resourceId?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type CustomerActivityCountAggregateInputType = {
    id?: true
    customerId?: true
    action?: true
    resource?: true
    resourceId?: true
    metadata?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    _all?: true
  }

  export type CustomerActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerActivity to aggregate.
     */
    where?: CustomerActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerActivities to fetch.
     */
    orderBy?: CustomerActivityOrderByWithRelationInput | CustomerActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomerActivities
    **/
    _count?: true | CustomerActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerActivityMaxAggregateInputType
  }

  export type GetCustomerActivityAggregateType<T extends CustomerActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomerActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomerActivity[P]>
      : GetScalarType<T[P], AggregateCustomerActivity[P]>
  }




  export type CustomerActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerActivityWhereInput
    orderBy?: CustomerActivityOrderByWithAggregationInput | CustomerActivityOrderByWithAggregationInput[]
    by: CustomerActivityScalarFieldEnum[] | CustomerActivityScalarFieldEnum
    having?: CustomerActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerActivityCountAggregateInputType | true
    _min?: CustomerActivityMinAggregateInputType
    _max?: CustomerActivityMaxAggregateInputType
  }

  export type CustomerActivityGroupByOutputType = {
    id: string
    customerId: string
    action: string
    resource: string | null
    resourceId: string | null
    metadata: JsonValue | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date
    _count: CustomerActivityCountAggregateOutputType | null
    _min: CustomerActivityMinAggregateOutputType | null
    _max: CustomerActivityMaxAggregateOutputType | null
  }

  type GetCustomerActivityGroupByPayload<T extends CustomerActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerActivityGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerActivityGroupByOutputType[P]>
        }
      >
    >


  export type CustomerActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    action?: boolean
    resource?: boolean
    resourceId?: boolean
    metadata?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customerActivity"]>

  export type CustomerActivitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    action?: boolean
    resource?: boolean
    resourceId?: boolean
    metadata?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customerActivity"]>

  export type CustomerActivitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    action?: boolean
    resource?: boolean
    resourceId?: boolean
    metadata?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customerActivity"]>

  export type CustomerActivitySelectScalar = {
    id?: boolean
    customerId?: boolean
    action?: boolean
    resource?: boolean
    resourceId?: boolean
    metadata?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }

  export type CustomerActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "action" | "resource" | "resourceId" | "metadata" | "ipAddress" | "userAgent" | "createdAt", ExtArgs["result"]["customerActivity"]>
  export type CustomerActivityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type CustomerActivityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type CustomerActivityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }

  export type $CustomerActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomerActivity"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      action: string
      resource: string | null
      resourceId: string | null
      metadata: Prisma.JsonValue | null
      ipAddress: string | null
      userAgent: string | null
      createdAt: Date
    }, ExtArgs["result"]["customerActivity"]>
    composites: {}
  }

  type CustomerActivityGetPayload<S extends boolean | null | undefined | CustomerActivityDefaultArgs> = $Result.GetResult<Prisma.$CustomerActivityPayload, S>

  type CustomerActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerActivityCountAggregateInputType | true
    }

  export interface CustomerActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomerActivity'], meta: { name: 'CustomerActivity' } }
    /**
     * Find zero or one CustomerActivity that matches the filter.
     * @param {CustomerActivityFindUniqueArgs} args - Arguments to find a CustomerActivity
     * @example
     * // Get one CustomerActivity
     * const customerActivity = await prisma.customerActivity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerActivityFindUniqueArgs>(args: SelectSubset<T, CustomerActivityFindUniqueArgs<ExtArgs>>): Prisma__CustomerActivityClient<$Result.GetResult<Prisma.$CustomerActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CustomerActivity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerActivityFindUniqueOrThrowArgs} args - Arguments to find a CustomerActivity
     * @example
     * // Get one CustomerActivity
     * const customerActivity = await prisma.customerActivity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerActivityClient<$Result.GetResult<Prisma.$CustomerActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerActivity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerActivityFindFirstArgs} args - Arguments to find a CustomerActivity
     * @example
     * // Get one CustomerActivity
     * const customerActivity = await prisma.customerActivity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerActivityFindFirstArgs>(args?: SelectSubset<T, CustomerActivityFindFirstArgs<ExtArgs>>): Prisma__CustomerActivityClient<$Result.GetResult<Prisma.$CustomerActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerActivity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerActivityFindFirstOrThrowArgs} args - Arguments to find a CustomerActivity
     * @example
     * // Get one CustomerActivity
     * const customerActivity = await prisma.customerActivity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerActivityClient<$Result.GetResult<Prisma.$CustomerActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CustomerActivities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomerActivities
     * const customerActivities = await prisma.customerActivity.findMany()
     * 
     * // Get first 10 CustomerActivities
     * const customerActivities = await prisma.customerActivity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerActivityWithIdOnly = await prisma.customerActivity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerActivityFindManyArgs>(args?: SelectSubset<T, CustomerActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CustomerActivity.
     * @param {CustomerActivityCreateArgs} args - Arguments to create a CustomerActivity.
     * @example
     * // Create one CustomerActivity
     * const CustomerActivity = await prisma.customerActivity.create({
     *   data: {
     *     // ... data to create a CustomerActivity
     *   }
     * })
     * 
     */
    create<T extends CustomerActivityCreateArgs>(args: SelectSubset<T, CustomerActivityCreateArgs<ExtArgs>>): Prisma__CustomerActivityClient<$Result.GetResult<Prisma.$CustomerActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CustomerActivities.
     * @param {CustomerActivityCreateManyArgs} args - Arguments to create many CustomerActivities.
     * @example
     * // Create many CustomerActivities
     * const customerActivity = await prisma.customerActivity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerActivityCreateManyArgs>(args?: SelectSubset<T, CustomerActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CustomerActivities and returns the data saved in the database.
     * @param {CustomerActivityCreateManyAndReturnArgs} args - Arguments to create many CustomerActivities.
     * @example
     * // Create many CustomerActivities
     * const customerActivity = await prisma.customerActivity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CustomerActivities and only return the `id`
     * const customerActivityWithIdOnly = await prisma.customerActivity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerActivityCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerActivityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerActivityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CustomerActivity.
     * @param {CustomerActivityDeleteArgs} args - Arguments to delete one CustomerActivity.
     * @example
     * // Delete one CustomerActivity
     * const CustomerActivity = await prisma.customerActivity.delete({
     *   where: {
     *     // ... filter to delete one CustomerActivity
     *   }
     * })
     * 
     */
    delete<T extends CustomerActivityDeleteArgs>(args: SelectSubset<T, CustomerActivityDeleteArgs<ExtArgs>>): Prisma__CustomerActivityClient<$Result.GetResult<Prisma.$CustomerActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CustomerActivity.
     * @param {CustomerActivityUpdateArgs} args - Arguments to update one CustomerActivity.
     * @example
     * // Update one CustomerActivity
     * const customerActivity = await prisma.customerActivity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerActivityUpdateArgs>(args: SelectSubset<T, CustomerActivityUpdateArgs<ExtArgs>>): Prisma__CustomerActivityClient<$Result.GetResult<Prisma.$CustomerActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CustomerActivities.
     * @param {CustomerActivityDeleteManyArgs} args - Arguments to filter CustomerActivities to delete.
     * @example
     * // Delete a few CustomerActivities
     * const { count } = await prisma.customerActivity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerActivityDeleteManyArgs>(args?: SelectSubset<T, CustomerActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomerActivities
     * const customerActivity = await prisma.customerActivity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerActivityUpdateManyArgs>(args: SelectSubset<T, CustomerActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerActivities and returns the data updated in the database.
     * @param {CustomerActivityUpdateManyAndReturnArgs} args - Arguments to update many CustomerActivities.
     * @example
     * // Update many CustomerActivities
     * const customerActivity = await prisma.customerActivity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CustomerActivities and only return the `id`
     * const customerActivityWithIdOnly = await prisma.customerActivity.updateManyAndReturn({
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
    updateManyAndReturn<T extends CustomerActivityUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerActivityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerActivityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CustomerActivity.
     * @param {CustomerActivityUpsertArgs} args - Arguments to update or create a CustomerActivity.
     * @example
     * // Update or create a CustomerActivity
     * const customerActivity = await prisma.customerActivity.upsert({
     *   create: {
     *     // ... data to create a CustomerActivity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomerActivity we want to update
     *   }
     * })
     */
    upsert<T extends CustomerActivityUpsertArgs>(args: SelectSubset<T, CustomerActivityUpsertArgs<ExtArgs>>): Prisma__CustomerActivityClient<$Result.GetResult<Prisma.$CustomerActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CustomerActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerActivityCountArgs} args - Arguments to filter CustomerActivities to count.
     * @example
     * // Count the number of CustomerActivities
     * const count = await prisma.customerActivity.count({
     *   where: {
     *     // ... the filter for the CustomerActivities we want to count
     *   }
     * })
    **/
    count<T extends CustomerActivityCountArgs>(
      args?: Subset<T, CustomerActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomerActivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustomerActivityAggregateArgs>(args: Subset<T, CustomerActivityAggregateArgs>): Prisma.PrismaPromise<GetCustomerActivityAggregateType<T>>

    /**
     * Group by CustomerActivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerActivityGroupByArgs} args - Group by arguments.
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
      T extends CustomerActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerActivityGroupByArgs['orderBy'] }
        : { orderBy?: CustomerActivityGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustomerActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomerActivity model
   */
  readonly fields: CustomerActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomerActivity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CustomerActivity model
   */
  interface CustomerActivityFieldRefs {
    readonly id: FieldRef<"CustomerActivity", 'String'>
    readonly customerId: FieldRef<"CustomerActivity", 'String'>
    readonly action: FieldRef<"CustomerActivity", 'String'>
    readonly resource: FieldRef<"CustomerActivity", 'String'>
    readonly resourceId: FieldRef<"CustomerActivity", 'String'>
    readonly metadata: FieldRef<"CustomerActivity", 'Json'>
    readonly ipAddress: FieldRef<"CustomerActivity", 'String'>
    readonly userAgent: FieldRef<"CustomerActivity", 'String'>
    readonly createdAt: FieldRef<"CustomerActivity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CustomerActivity findUnique
   */
  export type CustomerActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerActivity
     */
    select?: CustomerActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerActivity
     */
    omit?: CustomerActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerActivityInclude<ExtArgs> | null
    /**
     * Filter, which CustomerActivity to fetch.
     */
    where: CustomerActivityWhereUniqueInput
  }

  /**
   * CustomerActivity findUniqueOrThrow
   */
  export type CustomerActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerActivity
     */
    select?: CustomerActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerActivity
     */
    omit?: CustomerActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerActivityInclude<ExtArgs> | null
    /**
     * Filter, which CustomerActivity to fetch.
     */
    where: CustomerActivityWhereUniqueInput
  }

  /**
   * CustomerActivity findFirst
   */
  export type CustomerActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerActivity
     */
    select?: CustomerActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerActivity
     */
    omit?: CustomerActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerActivityInclude<ExtArgs> | null
    /**
     * Filter, which CustomerActivity to fetch.
     */
    where?: CustomerActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerActivities to fetch.
     */
    orderBy?: CustomerActivityOrderByWithRelationInput | CustomerActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerActivities.
     */
    cursor?: CustomerActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerActivities.
     */
    distinct?: CustomerActivityScalarFieldEnum | CustomerActivityScalarFieldEnum[]
  }

  /**
   * CustomerActivity findFirstOrThrow
   */
  export type CustomerActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerActivity
     */
    select?: CustomerActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerActivity
     */
    omit?: CustomerActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerActivityInclude<ExtArgs> | null
    /**
     * Filter, which CustomerActivity to fetch.
     */
    where?: CustomerActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerActivities to fetch.
     */
    orderBy?: CustomerActivityOrderByWithRelationInput | CustomerActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerActivities.
     */
    cursor?: CustomerActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerActivities.
     */
    distinct?: CustomerActivityScalarFieldEnum | CustomerActivityScalarFieldEnum[]
  }

  /**
   * CustomerActivity findMany
   */
  export type CustomerActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerActivity
     */
    select?: CustomerActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerActivity
     */
    omit?: CustomerActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerActivityInclude<ExtArgs> | null
    /**
     * Filter, which CustomerActivities to fetch.
     */
    where?: CustomerActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerActivities to fetch.
     */
    orderBy?: CustomerActivityOrderByWithRelationInput | CustomerActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomerActivities.
     */
    cursor?: CustomerActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerActivities.
     */
    distinct?: CustomerActivityScalarFieldEnum | CustomerActivityScalarFieldEnum[]
  }

  /**
   * CustomerActivity create
   */
  export type CustomerActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerActivity
     */
    select?: CustomerActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerActivity
     */
    omit?: CustomerActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerActivityInclude<ExtArgs> | null
    /**
     * The data needed to create a CustomerActivity.
     */
    data: XOR<CustomerActivityCreateInput, CustomerActivityUncheckedCreateInput>
  }

  /**
   * CustomerActivity createMany
   */
  export type CustomerActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomerActivities.
     */
    data: CustomerActivityCreateManyInput | CustomerActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomerActivity createManyAndReturn
   */
  export type CustomerActivityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerActivity
     */
    select?: CustomerActivitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerActivity
     */
    omit?: CustomerActivityOmit<ExtArgs> | null
    /**
     * The data used to create many CustomerActivities.
     */
    data: CustomerActivityCreateManyInput | CustomerActivityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerActivityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CustomerActivity update
   */
  export type CustomerActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerActivity
     */
    select?: CustomerActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerActivity
     */
    omit?: CustomerActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerActivityInclude<ExtArgs> | null
    /**
     * The data needed to update a CustomerActivity.
     */
    data: XOR<CustomerActivityUpdateInput, CustomerActivityUncheckedUpdateInput>
    /**
     * Choose, which CustomerActivity to update.
     */
    where: CustomerActivityWhereUniqueInput
  }

  /**
   * CustomerActivity updateMany
   */
  export type CustomerActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomerActivities.
     */
    data: XOR<CustomerActivityUpdateManyMutationInput, CustomerActivityUncheckedUpdateManyInput>
    /**
     * Filter which CustomerActivities to update
     */
    where?: CustomerActivityWhereInput
    /**
     * Limit how many CustomerActivities to update.
     */
    limit?: number
  }

  /**
   * CustomerActivity updateManyAndReturn
   */
  export type CustomerActivityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerActivity
     */
    select?: CustomerActivitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerActivity
     */
    omit?: CustomerActivityOmit<ExtArgs> | null
    /**
     * The data used to update CustomerActivities.
     */
    data: XOR<CustomerActivityUpdateManyMutationInput, CustomerActivityUncheckedUpdateManyInput>
    /**
     * Filter which CustomerActivities to update
     */
    where?: CustomerActivityWhereInput
    /**
     * Limit how many CustomerActivities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerActivityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CustomerActivity upsert
   */
  export type CustomerActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerActivity
     */
    select?: CustomerActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerActivity
     */
    omit?: CustomerActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerActivityInclude<ExtArgs> | null
    /**
     * The filter to search for the CustomerActivity to update in case it exists.
     */
    where: CustomerActivityWhereUniqueInput
    /**
     * In case the CustomerActivity found by the `where` argument doesn't exist, create a new CustomerActivity with this data.
     */
    create: XOR<CustomerActivityCreateInput, CustomerActivityUncheckedCreateInput>
    /**
     * In case the CustomerActivity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerActivityUpdateInput, CustomerActivityUncheckedUpdateInput>
  }

  /**
   * CustomerActivity delete
   */
  export type CustomerActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerActivity
     */
    select?: CustomerActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerActivity
     */
    omit?: CustomerActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerActivityInclude<ExtArgs> | null
    /**
     * Filter which CustomerActivity to delete.
     */
    where: CustomerActivityWhereUniqueInput
  }

  /**
   * CustomerActivity deleteMany
   */
  export type CustomerActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerActivities to delete
     */
    where?: CustomerActivityWhereInput
    /**
     * Limit how many CustomerActivities to delete.
     */
    limit?: number
  }

  /**
   * CustomerActivity without action
   */
  export type CustomerActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerActivity
     */
    select?: CustomerActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerActivity
     */
    omit?: CustomerActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerActivityInclude<ExtArgs> | null
  }


  /**
   * Model CustomerSegment
   */

  export type AggregateCustomerSegment = {
    _count: CustomerSegmentCountAggregateOutputType | null
    _min: CustomerSegmentMinAggregateOutputType | null
    _max: CustomerSegmentMaxAggregateOutputType | null
  }

  export type CustomerSegmentMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerSegmentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerSegmentCountAggregateOutputType = {
    id: number
    name: number
    description: number
    criteria: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerSegmentMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerSegmentMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerSegmentCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    criteria?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerSegmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerSegment to aggregate.
     */
    where?: CustomerSegmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerSegments to fetch.
     */
    orderBy?: CustomerSegmentOrderByWithRelationInput | CustomerSegmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerSegmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerSegments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerSegments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomerSegments
    **/
    _count?: true | CustomerSegmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerSegmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerSegmentMaxAggregateInputType
  }

  export type GetCustomerSegmentAggregateType<T extends CustomerSegmentAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomerSegment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomerSegment[P]>
      : GetScalarType<T[P], AggregateCustomerSegment[P]>
  }




  export type CustomerSegmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerSegmentWhereInput
    orderBy?: CustomerSegmentOrderByWithAggregationInput | CustomerSegmentOrderByWithAggregationInput[]
    by: CustomerSegmentScalarFieldEnum[] | CustomerSegmentScalarFieldEnum
    having?: CustomerSegmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerSegmentCountAggregateInputType | true
    _min?: CustomerSegmentMinAggregateInputType
    _max?: CustomerSegmentMaxAggregateInputType
  }

  export type CustomerSegmentGroupByOutputType = {
    id: string
    name: string
    description: string | null
    criteria: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: CustomerSegmentCountAggregateOutputType | null
    _min: CustomerSegmentMinAggregateOutputType | null
    _max: CustomerSegmentMaxAggregateOutputType | null
  }

  type GetCustomerSegmentGroupByPayload<T extends CustomerSegmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerSegmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerSegmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerSegmentGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerSegmentGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSegmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    criteria?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customerSegment"]>

  export type CustomerSegmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    criteria?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customerSegment"]>

  export type CustomerSegmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    criteria?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customerSegment"]>

  export type CustomerSegmentSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    criteria?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerSegmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "criteria" | "createdAt" | "updatedAt", ExtArgs["result"]["customerSegment"]>

  export type $CustomerSegmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomerSegment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      criteria: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customerSegment"]>
    composites: {}
  }

  type CustomerSegmentGetPayload<S extends boolean | null | undefined | CustomerSegmentDefaultArgs> = $Result.GetResult<Prisma.$CustomerSegmentPayload, S>

  type CustomerSegmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerSegmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerSegmentCountAggregateInputType | true
    }

  export interface CustomerSegmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomerSegment'], meta: { name: 'CustomerSegment' } }
    /**
     * Find zero or one CustomerSegment that matches the filter.
     * @param {CustomerSegmentFindUniqueArgs} args - Arguments to find a CustomerSegment
     * @example
     * // Get one CustomerSegment
     * const customerSegment = await prisma.customerSegment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerSegmentFindUniqueArgs>(args: SelectSubset<T, CustomerSegmentFindUniqueArgs<ExtArgs>>): Prisma__CustomerSegmentClient<$Result.GetResult<Prisma.$CustomerSegmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CustomerSegment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerSegmentFindUniqueOrThrowArgs} args - Arguments to find a CustomerSegment
     * @example
     * // Get one CustomerSegment
     * const customerSegment = await prisma.customerSegment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerSegmentFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerSegmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerSegmentClient<$Result.GetResult<Prisma.$CustomerSegmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerSegment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerSegmentFindFirstArgs} args - Arguments to find a CustomerSegment
     * @example
     * // Get one CustomerSegment
     * const customerSegment = await prisma.customerSegment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerSegmentFindFirstArgs>(args?: SelectSubset<T, CustomerSegmentFindFirstArgs<ExtArgs>>): Prisma__CustomerSegmentClient<$Result.GetResult<Prisma.$CustomerSegmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerSegment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerSegmentFindFirstOrThrowArgs} args - Arguments to find a CustomerSegment
     * @example
     * // Get one CustomerSegment
     * const customerSegment = await prisma.customerSegment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerSegmentFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerSegmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerSegmentClient<$Result.GetResult<Prisma.$CustomerSegmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CustomerSegments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerSegmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomerSegments
     * const customerSegments = await prisma.customerSegment.findMany()
     * 
     * // Get first 10 CustomerSegments
     * const customerSegments = await prisma.customerSegment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerSegmentWithIdOnly = await prisma.customerSegment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerSegmentFindManyArgs>(args?: SelectSubset<T, CustomerSegmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerSegmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CustomerSegment.
     * @param {CustomerSegmentCreateArgs} args - Arguments to create a CustomerSegment.
     * @example
     * // Create one CustomerSegment
     * const CustomerSegment = await prisma.customerSegment.create({
     *   data: {
     *     // ... data to create a CustomerSegment
     *   }
     * })
     * 
     */
    create<T extends CustomerSegmentCreateArgs>(args: SelectSubset<T, CustomerSegmentCreateArgs<ExtArgs>>): Prisma__CustomerSegmentClient<$Result.GetResult<Prisma.$CustomerSegmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CustomerSegments.
     * @param {CustomerSegmentCreateManyArgs} args - Arguments to create many CustomerSegments.
     * @example
     * // Create many CustomerSegments
     * const customerSegment = await prisma.customerSegment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerSegmentCreateManyArgs>(args?: SelectSubset<T, CustomerSegmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CustomerSegments and returns the data saved in the database.
     * @param {CustomerSegmentCreateManyAndReturnArgs} args - Arguments to create many CustomerSegments.
     * @example
     * // Create many CustomerSegments
     * const customerSegment = await prisma.customerSegment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CustomerSegments and only return the `id`
     * const customerSegmentWithIdOnly = await prisma.customerSegment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerSegmentCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerSegmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerSegmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CustomerSegment.
     * @param {CustomerSegmentDeleteArgs} args - Arguments to delete one CustomerSegment.
     * @example
     * // Delete one CustomerSegment
     * const CustomerSegment = await prisma.customerSegment.delete({
     *   where: {
     *     // ... filter to delete one CustomerSegment
     *   }
     * })
     * 
     */
    delete<T extends CustomerSegmentDeleteArgs>(args: SelectSubset<T, CustomerSegmentDeleteArgs<ExtArgs>>): Prisma__CustomerSegmentClient<$Result.GetResult<Prisma.$CustomerSegmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CustomerSegment.
     * @param {CustomerSegmentUpdateArgs} args - Arguments to update one CustomerSegment.
     * @example
     * // Update one CustomerSegment
     * const customerSegment = await prisma.customerSegment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerSegmentUpdateArgs>(args: SelectSubset<T, CustomerSegmentUpdateArgs<ExtArgs>>): Prisma__CustomerSegmentClient<$Result.GetResult<Prisma.$CustomerSegmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CustomerSegments.
     * @param {CustomerSegmentDeleteManyArgs} args - Arguments to filter CustomerSegments to delete.
     * @example
     * // Delete a few CustomerSegments
     * const { count } = await prisma.customerSegment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerSegmentDeleteManyArgs>(args?: SelectSubset<T, CustomerSegmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerSegments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerSegmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomerSegments
     * const customerSegment = await prisma.customerSegment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerSegmentUpdateManyArgs>(args: SelectSubset<T, CustomerSegmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerSegments and returns the data updated in the database.
     * @param {CustomerSegmentUpdateManyAndReturnArgs} args - Arguments to update many CustomerSegments.
     * @example
     * // Update many CustomerSegments
     * const customerSegment = await prisma.customerSegment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CustomerSegments and only return the `id`
     * const customerSegmentWithIdOnly = await prisma.customerSegment.updateManyAndReturn({
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
    updateManyAndReturn<T extends CustomerSegmentUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerSegmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerSegmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CustomerSegment.
     * @param {CustomerSegmentUpsertArgs} args - Arguments to update or create a CustomerSegment.
     * @example
     * // Update or create a CustomerSegment
     * const customerSegment = await prisma.customerSegment.upsert({
     *   create: {
     *     // ... data to create a CustomerSegment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomerSegment we want to update
     *   }
     * })
     */
    upsert<T extends CustomerSegmentUpsertArgs>(args: SelectSubset<T, CustomerSegmentUpsertArgs<ExtArgs>>): Prisma__CustomerSegmentClient<$Result.GetResult<Prisma.$CustomerSegmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CustomerSegments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerSegmentCountArgs} args - Arguments to filter CustomerSegments to count.
     * @example
     * // Count the number of CustomerSegments
     * const count = await prisma.customerSegment.count({
     *   where: {
     *     // ... the filter for the CustomerSegments we want to count
     *   }
     * })
    **/
    count<T extends CustomerSegmentCountArgs>(
      args?: Subset<T, CustomerSegmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerSegmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomerSegment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerSegmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustomerSegmentAggregateArgs>(args: Subset<T, CustomerSegmentAggregateArgs>): Prisma.PrismaPromise<GetCustomerSegmentAggregateType<T>>

    /**
     * Group by CustomerSegment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerSegmentGroupByArgs} args - Group by arguments.
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
      T extends CustomerSegmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerSegmentGroupByArgs['orderBy'] }
        : { orderBy?: CustomerSegmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustomerSegmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerSegmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomerSegment model
   */
  readonly fields: CustomerSegmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomerSegment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerSegmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the CustomerSegment model
   */
  interface CustomerSegmentFieldRefs {
    readonly id: FieldRef<"CustomerSegment", 'String'>
    readonly name: FieldRef<"CustomerSegment", 'String'>
    readonly description: FieldRef<"CustomerSegment", 'String'>
    readonly criteria: FieldRef<"CustomerSegment", 'Json'>
    readonly createdAt: FieldRef<"CustomerSegment", 'DateTime'>
    readonly updatedAt: FieldRef<"CustomerSegment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CustomerSegment findUnique
   */
  export type CustomerSegmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegment
     */
    select?: CustomerSegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegment
     */
    omit?: CustomerSegmentOmit<ExtArgs> | null
    /**
     * Filter, which CustomerSegment to fetch.
     */
    where: CustomerSegmentWhereUniqueInput
  }

  /**
   * CustomerSegment findUniqueOrThrow
   */
  export type CustomerSegmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegment
     */
    select?: CustomerSegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegment
     */
    omit?: CustomerSegmentOmit<ExtArgs> | null
    /**
     * Filter, which CustomerSegment to fetch.
     */
    where: CustomerSegmentWhereUniqueInput
  }

  /**
   * CustomerSegment findFirst
   */
  export type CustomerSegmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegment
     */
    select?: CustomerSegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegment
     */
    omit?: CustomerSegmentOmit<ExtArgs> | null
    /**
     * Filter, which CustomerSegment to fetch.
     */
    where?: CustomerSegmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerSegments to fetch.
     */
    orderBy?: CustomerSegmentOrderByWithRelationInput | CustomerSegmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerSegments.
     */
    cursor?: CustomerSegmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerSegments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerSegments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerSegments.
     */
    distinct?: CustomerSegmentScalarFieldEnum | CustomerSegmentScalarFieldEnum[]
  }

  /**
   * CustomerSegment findFirstOrThrow
   */
  export type CustomerSegmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegment
     */
    select?: CustomerSegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegment
     */
    omit?: CustomerSegmentOmit<ExtArgs> | null
    /**
     * Filter, which CustomerSegment to fetch.
     */
    where?: CustomerSegmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerSegments to fetch.
     */
    orderBy?: CustomerSegmentOrderByWithRelationInput | CustomerSegmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerSegments.
     */
    cursor?: CustomerSegmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerSegments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerSegments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerSegments.
     */
    distinct?: CustomerSegmentScalarFieldEnum | CustomerSegmentScalarFieldEnum[]
  }

  /**
   * CustomerSegment findMany
   */
  export type CustomerSegmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegment
     */
    select?: CustomerSegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegment
     */
    omit?: CustomerSegmentOmit<ExtArgs> | null
    /**
     * Filter, which CustomerSegments to fetch.
     */
    where?: CustomerSegmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerSegments to fetch.
     */
    orderBy?: CustomerSegmentOrderByWithRelationInput | CustomerSegmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomerSegments.
     */
    cursor?: CustomerSegmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerSegments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerSegments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerSegments.
     */
    distinct?: CustomerSegmentScalarFieldEnum | CustomerSegmentScalarFieldEnum[]
  }

  /**
   * CustomerSegment create
   */
  export type CustomerSegmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegment
     */
    select?: CustomerSegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegment
     */
    omit?: CustomerSegmentOmit<ExtArgs> | null
    /**
     * The data needed to create a CustomerSegment.
     */
    data: XOR<CustomerSegmentCreateInput, CustomerSegmentUncheckedCreateInput>
  }

  /**
   * CustomerSegment createMany
   */
  export type CustomerSegmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomerSegments.
     */
    data: CustomerSegmentCreateManyInput | CustomerSegmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomerSegment createManyAndReturn
   */
  export type CustomerSegmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegment
     */
    select?: CustomerSegmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegment
     */
    omit?: CustomerSegmentOmit<ExtArgs> | null
    /**
     * The data used to create many CustomerSegments.
     */
    data: CustomerSegmentCreateManyInput | CustomerSegmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomerSegment update
   */
  export type CustomerSegmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegment
     */
    select?: CustomerSegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegment
     */
    omit?: CustomerSegmentOmit<ExtArgs> | null
    /**
     * The data needed to update a CustomerSegment.
     */
    data: XOR<CustomerSegmentUpdateInput, CustomerSegmentUncheckedUpdateInput>
    /**
     * Choose, which CustomerSegment to update.
     */
    where: CustomerSegmentWhereUniqueInput
  }

  /**
   * CustomerSegment updateMany
   */
  export type CustomerSegmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomerSegments.
     */
    data: XOR<CustomerSegmentUpdateManyMutationInput, CustomerSegmentUncheckedUpdateManyInput>
    /**
     * Filter which CustomerSegments to update
     */
    where?: CustomerSegmentWhereInput
    /**
     * Limit how many CustomerSegments to update.
     */
    limit?: number
  }

  /**
   * CustomerSegment updateManyAndReturn
   */
  export type CustomerSegmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegment
     */
    select?: CustomerSegmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegment
     */
    omit?: CustomerSegmentOmit<ExtArgs> | null
    /**
     * The data used to update CustomerSegments.
     */
    data: XOR<CustomerSegmentUpdateManyMutationInput, CustomerSegmentUncheckedUpdateManyInput>
    /**
     * Filter which CustomerSegments to update
     */
    where?: CustomerSegmentWhereInput
    /**
     * Limit how many CustomerSegments to update.
     */
    limit?: number
  }

  /**
   * CustomerSegment upsert
   */
  export type CustomerSegmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegment
     */
    select?: CustomerSegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegment
     */
    omit?: CustomerSegmentOmit<ExtArgs> | null
    /**
     * The filter to search for the CustomerSegment to update in case it exists.
     */
    where: CustomerSegmentWhereUniqueInput
    /**
     * In case the CustomerSegment found by the `where` argument doesn't exist, create a new CustomerSegment with this data.
     */
    create: XOR<CustomerSegmentCreateInput, CustomerSegmentUncheckedCreateInput>
    /**
     * In case the CustomerSegment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerSegmentUpdateInput, CustomerSegmentUncheckedUpdateInput>
  }

  /**
   * CustomerSegment delete
   */
  export type CustomerSegmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegment
     */
    select?: CustomerSegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegment
     */
    omit?: CustomerSegmentOmit<ExtArgs> | null
    /**
     * Filter which CustomerSegment to delete.
     */
    where: CustomerSegmentWhereUniqueInput
  }

  /**
   * CustomerSegment deleteMany
   */
  export type CustomerSegmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerSegments to delete
     */
    where?: CustomerSegmentWhereInput
    /**
     * Limit how many CustomerSegments to delete.
     */
    limit?: number
  }

  /**
   * CustomerSegment without action
   */
  export type CustomerSegmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegment
     */
    select?: CustomerSegmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegment
     */
    omit?: CustomerSegmentOmit<ExtArgs> | null
  }


  /**
   * Model CustomerSegmentAssignment
   */

  export type AggregateCustomerSegmentAssignment = {
    _count: CustomerSegmentAssignmentCountAggregateOutputType | null
    _min: CustomerSegmentAssignmentMinAggregateOutputType | null
    _max: CustomerSegmentAssignmentMaxAggregateOutputType | null
  }

  export type CustomerSegmentAssignmentMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    segmentId: string | null
    assignedAt: Date | null
  }

  export type CustomerSegmentAssignmentMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    segmentId: string | null
    assignedAt: Date | null
  }

  export type CustomerSegmentAssignmentCountAggregateOutputType = {
    id: number
    customerId: number
    segmentId: number
    assignedAt: number
    _all: number
  }


  export type CustomerSegmentAssignmentMinAggregateInputType = {
    id?: true
    customerId?: true
    segmentId?: true
    assignedAt?: true
  }

  export type CustomerSegmentAssignmentMaxAggregateInputType = {
    id?: true
    customerId?: true
    segmentId?: true
    assignedAt?: true
  }

  export type CustomerSegmentAssignmentCountAggregateInputType = {
    id?: true
    customerId?: true
    segmentId?: true
    assignedAt?: true
    _all?: true
  }

  export type CustomerSegmentAssignmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerSegmentAssignment to aggregate.
     */
    where?: CustomerSegmentAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerSegmentAssignments to fetch.
     */
    orderBy?: CustomerSegmentAssignmentOrderByWithRelationInput | CustomerSegmentAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerSegmentAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerSegmentAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerSegmentAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomerSegmentAssignments
    **/
    _count?: true | CustomerSegmentAssignmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerSegmentAssignmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerSegmentAssignmentMaxAggregateInputType
  }

  export type GetCustomerSegmentAssignmentAggregateType<T extends CustomerSegmentAssignmentAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomerSegmentAssignment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomerSegmentAssignment[P]>
      : GetScalarType<T[P], AggregateCustomerSegmentAssignment[P]>
  }




  export type CustomerSegmentAssignmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerSegmentAssignmentWhereInput
    orderBy?: CustomerSegmentAssignmentOrderByWithAggregationInput | CustomerSegmentAssignmentOrderByWithAggregationInput[]
    by: CustomerSegmentAssignmentScalarFieldEnum[] | CustomerSegmentAssignmentScalarFieldEnum
    having?: CustomerSegmentAssignmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerSegmentAssignmentCountAggregateInputType | true
    _min?: CustomerSegmentAssignmentMinAggregateInputType
    _max?: CustomerSegmentAssignmentMaxAggregateInputType
  }

  export type CustomerSegmentAssignmentGroupByOutputType = {
    id: string
    customerId: string
    segmentId: string
    assignedAt: Date
    _count: CustomerSegmentAssignmentCountAggregateOutputType | null
    _min: CustomerSegmentAssignmentMinAggregateOutputType | null
    _max: CustomerSegmentAssignmentMaxAggregateOutputType | null
  }

  type GetCustomerSegmentAssignmentGroupByPayload<T extends CustomerSegmentAssignmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerSegmentAssignmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerSegmentAssignmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerSegmentAssignmentGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerSegmentAssignmentGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSegmentAssignmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    segmentId?: boolean
    assignedAt?: boolean
  }, ExtArgs["result"]["customerSegmentAssignment"]>

  export type CustomerSegmentAssignmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    segmentId?: boolean
    assignedAt?: boolean
  }, ExtArgs["result"]["customerSegmentAssignment"]>

  export type CustomerSegmentAssignmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    segmentId?: boolean
    assignedAt?: boolean
  }, ExtArgs["result"]["customerSegmentAssignment"]>

  export type CustomerSegmentAssignmentSelectScalar = {
    id?: boolean
    customerId?: boolean
    segmentId?: boolean
    assignedAt?: boolean
  }

  export type CustomerSegmentAssignmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "segmentId" | "assignedAt", ExtArgs["result"]["customerSegmentAssignment"]>

  export type $CustomerSegmentAssignmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomerSegmentAssignment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      segmentId: string
      assignedAt: Date
    }, ExtArgs["result"]["customerSegmentAssignment"]>
    composites: {}
  }

  type CustomerSegmentAssignmentGetPayload<S extends boolean | null | undefined | CustomerSegmentAssignmentDefaultArgs> = $Result.GetResult<Prisma.$CustomerSegmentAssignmentPayload, S>

  type CustomerSegmentAssignmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerSegmentAssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerSegmentAssignmentCountAggregateInputType | true
    }

  export interface CustomerSegmentAssignmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomerSegmentAssignment'], meta: { name: 'CustomerSegmentAssignment' } }
    /**
     * Find zero or one CustomerSegmentAssignment that matches the filter.
     * @param {CustomerSegmentAssignmentFindUniqueArgs} args - Arguments to find a CustomerSegmentAssignment
     * @example
     * // Get one CustomerSegmentAssignment
     * const customerSegmentAssignment = await prisma.customerSegmentAssignment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerSegmentAssignmentFindUniqueArgs>(args: SelectSubset<T, CustomerSegmentAssignmentFindUniqueArgs<ExtArgs>>): Prisma__CustomerSegmentAssignmentClient<$Result.GetResult<Prisma.$CustomerSegmentAssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CustomerSegmentAssignment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerSegmentAssignmentFindUniqueOrThrowArgs} args - Arguments to find a CustomerSegmentAssignment
     * @example
     * // Get one CustomerSegmentAssignment
     * const customerSegmentAssignment = await prisma.customerSegmentAssignment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerSegmentAssignmentFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerSegmentAssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerSegmentAssignmentClient<$Result.GetResult<Prisma.$CustomerSegmentAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerSegmentAssignment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerSegmentAssignmentFindFirstArgs} args - Arguments to find a CustomerSegmentAssignment
     * @example
     * // Get one CustomerSegmentAssignment
     * const customerSegmentAssignment = await prisma.customerSegmentAssignment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerSegmentAssignmentFindFirstArgs>(args?: SelectSubset<T, CustomerSegmentAssignmentFindFirstArgs<ExtArgs>>): Prisma__CustomerSegmentAssignmentClient<$Result.GetResult<Prisma.$CustomerSegmentAssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerSegmentAssignment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerSegmentAssignmentFindFirstOrThrowArgs} args - Arguments to find a CustomerSegmentAssignment
     * @example
     * // Get one CustomerSegmentAssignment
     * const customerSegmentAssignment = await prisma.customerSegmentAssignment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerSegmentAssignmentFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerSegmentAssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerSegmentAssignmentClient<$Result.GetResult<Prisma.$CustomerSegmentAssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CustomerSegmentAssignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerSegmentAssignmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomerSegmentAssignments
     * const customerSegmentAssignments = await prisma.customerSegmentAssignment.findMany()
     * 
     * // Get first 10 CustomerSegmentAssignments
     * const customerSegmentAssignments = await prisma.customerSegmentAssignment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerSegmentAssignmentWithIdOnly = await prisma.customerSegmentAssignment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerSegmentAssignmentFindManyArgs>(args?: SelectSubset<T, CustomerSegmentAssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerSegmentAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CustomerSegmentAssignment.
     * @param {CustomerSegmentAssignmentCreateArgs} args - Arguments to create a CustomerSegmentAssignment.
     * @example
     * // Create one CustomerSegmentAssignment
     * const CustomerSegmentAssignment = await prisma.customerSegmentAssignment.create({
     *   data: {
     *     // ... data to create a CustomerSegmentAssignment
     *   }
     * })
     * 
     */
    create<T extends CustomerSegmentAssignmentCreateArgs>(args: SelectSubset<T, CustomerSegmentAssignmentCreateArgs<ExtArgs>>): Prisma__CustomerSegmentAssignmentClient<$Result.GetResult<Prisma.$CustomerSegmentAssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CustomerSegmentAssignments.
     * @param {CustomerSegmentAssignmentCreateManyArgs} args - Arguments to create many CustomerSegmentAssignments.
     * @example
     * // Create many CustomerSegmentAssignments
     * const customerSegmentAssignment = await prisma.customerSegmentAssignment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerSegmentAssignmentCreateManyArgs>(args?: SelectSubset<T, CustomerSegmentAssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CustomerSegmentAssignments and returns the data saved in the database.
     * @param {CustomerSegmentAssignmentCreateManyAndReturnArgs} args - Arguments to create many CustomerSegmentAssignments.
     * @example
     * // Create many CustomerSegmentAssignments
     * const customerSegmentAssignment = await prisma.customerSegmentAssignment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CustomerSegmentAssignments and only return the `id`
     * const customerSegmentAssignmentWithIdOnly = await prisma.customerSegmentAssignment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerSegmentAssignmentCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerSegmentAssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerSegmentAssignmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CustomerSegmentAssignment.
     * @param {CustomerSegmentAssignmentDeleteArgs} args - Arguments to delete one CustomerSegmentAssignment.
     * @example
     * // Delete one CustomerSegmentAssignment
     * const CustomerSegmentAssignment = await prisma.customerSegmentAssignment.delete({
     *   where: {
     *     // ... filter to delete one CustomerSegmentAssignment
     *   }
     * })
     * 
     */
    delete<T extends CustomerSegmentAssignmentDeleteArgs>(args: SelectSubset<T, CustomerSegmentAssignmentDeleteArgs<ExtArgs>>): Prisma__CustomerSegmentAssignmentClient<$Result.GetResult<Prisma.$CustomerSegmentAssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CustomerSegmentAssignment.
     * @param {CustomerSegmentAssignmentUpdateArgs} args - Arguments to update one CustomerSegmentAssignment.
     * @example
     * // Update one CustomerSegmentAssignment
     * const customerSegmentAssignment = await prisma.customerSegmentAssignment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerSegmentAssignmentUpdateArgs>(args: SelectSubset<T, CustomerSegmentAssignmentUpdateArgs<ExtArgs>>): Prisma__CustomerSegmentAssignmentClient<$Result.GetResult<Prisma.$CustomerSegmentAssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CustomerSegmentAssignments.
     * @param {CustomerSegmentAssignmentDeleteManyArgs} args - Arguments to filter CustomerSegmentAssignments to delete.
     * @example
     * // Delete a few CustomerSegmentAssignments
     * const { count } = await prisma.customerSegmentAssignment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerSegmentAssignmentDeleteManyArgs>(args?: SelectSubset<T, CustomerSegmentAssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerSegmentAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerSegmentAssignmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomerSegmentAssignments
     * const customerSegmentAssignment = await prisma.customerSegmentAssignment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerSegmentAssignmentUpdateManyArgs>(args: SelectSubset<T, CustomerSegmentAssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerSegmentAssignments and returns the data updated in the database.
     * @param {CustomerSegmentAssignmentUpdateManyAndReturnArgs} args - Arguments to update many CustomerSegmentAssignments.
     * @example
     * // Update many CustomerSegmentAssignments
     * const customerSegmentAssignment = await prisma.customerSegmentAssignment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CustomerSegmentAssignments and only return the `id`
     * const customerSegmentAssignmentWithIdOnly = await prisma.customerSegmentAssignment.updateManyAndReturn({
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
    updateManyAndReturn<T extends CustomerSegmentAssignmentUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerSegmentAssignmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerSegmentAssignmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CustomerSegmentAssignment.
     * @param {CustomerSegmentAssignmentUpsertArgs} args - Arguments to update or create a CustomerSegmentAssignment.
     * @example
     * // Update or create a CustomerSegmentAssignment
     * const customerSegmentAssignment = await prisma.customerSegmentAssignment.upsert({
     *   create: {
     *     // ... data to create a CustomerSegmentAssignment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomerSegmentAssignment we want to update
     *   }
     * })
     */
    upsert<T extends CustomerSegmentAssignmentUpsertArgs>(args: SelectSubset<T, CustomerSegmentAssignmentUpsertArgs<ExtArgs>>): Prisma__CustomerSegmentAssignmentClient<$Result.GetResult<Prisma.$CustomerSegmentAssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CustomerSegmentAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerSegmentAssignmentCountArgs} args - Arguments to filter CustomerSegmentAssignments to count.
     * @example
     * // Count the number of CustomerSegmentAssignments
     * const count = await prisma.customerSegmentAssignment.count({
     *   where: {
     *     // ... the filter for the CustomerSegmentAssignments we want to count
     *   }
     * })
    **/
    count<T extends CustomerSegmentAssignmentCountArgs>(
      args?: Subset<T, CustomerSegmentAssignmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerSegmentAssignmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomerSegmentAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerSegmentAssignmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustomerSegmentAssignmentAggregateArgs>(args: Subset<T, CustomerSegmentAssignmentAggregateArgs>): Prisma.PrismaPromise<GetCustomerSegmentAssignmentAggregateType<T>>

    /**
     * Group by CustomerSegmentAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerSegmentAssignmentGroupByArgs} args - Group by arguments.
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
      T extends CustomerSegmentAssignmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerSegmentAssignmentGroupByArgs['orderBy'] }
        : { orderBy?: CustomerSegmentAssignmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustomerSegmentAssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerSegmentAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomerSegmentAssignment model
   */
  readonly fields: CustomerSegmentAssignmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomerSegmentAssignment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerSegmentAssignmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the CustomerSegmentAssignment model
   */
  interface CustomerSegmentAssignmentFieldRefs {
    readonly id: FieldRef<"CustomerSegmentAssignment", 'String'>
    readonly customerId: FieldRef<"CustomerSegmentAssignment", 'String'>
    readonly segmentId: FieldRef<"CustomerSegmentAssignment", 'String'>
    readonly assignedAt: FieldRef<"CustomerSegmentAssignment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CustomerSegmentAssignment findUnique
   */
  export type CustomerSegmentAssignmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegmentAssignment
     */
    select?: CustomerSegmentAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegmentAssignment
     */
    omit?: CustomerSegmentAssignmentOmit<ExtArgs> | null
    /**
     * Filter, which CustomerSegmentAssignment to fetch.
     */
    where: CustomerSegmentAssignmentWhereUniqueInput
  }

  /**
   * CustomerSegmentAssignment findUniqueOrThrow
   */
  export type CustomerSegmentAssignmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegmentAssignment
     */
    select?: CustomerSegmentAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegmentAssignment
     */
    omit?: CustomerSegmentAssignmentOmit<ExtArgs> | null
    /**
     * Filter, which CustomerSegmentAssignment to fetch.
     */
    where: CustomerSegmentAssignmentWhereUniqueInput
  }

  /**
   * CustomerSegmentAssignment findFirst
   */
  export type CustomerSegmentAssignmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegmentAssignment
     */
    select?: CustomerSegmentAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegmentAssignment
     */
    omit?: CustomerSegmentAssignmentOmit<ExtArgs> | null
    /**
     * Filter, which CustomerSegmentAssignment to fetch.
     */
    where?: CustomerSegmentAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerSegmentAssignments to fetch.
     */
    orderBy?: CustomerSegmentAssignmentOrderByWithRelationInput | CustomerSegmentAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerSegmentAssignments.
     */
    cursor?: CustomerSegmentAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerSegmentAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerSegmentAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerSegmentAssignments.
     */
    distinct?: CustomerSegmentAssignmentScalarFieldEnum | CustomerSegmentAssignmentScalarFieldEnum[]
  }

  /**
   * CustomerSegmentAssignment findFirstOrThrow
   */
  export type CustomerSegmentAssignmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegmentAssignment
     */
    select?: CustomerSegmentAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegmentAssignment
     */
    omit?: CustomerSegmentAssignmentOmit<ExtArgs> | null
    /**
     * Filter, which CustomerSegmentAssignment to fetch.
     */
    where?: CustomerSegmentAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerSegmentAssignments to fetch.
     */
    orderBy?: CustomerSegmentAssignmentOrderByWithRelationInput | CustomerSegmentAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerSegmentAssignments.
     */
    cursor?: CustomerSegmentAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerSegmentAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerSegmentAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerSegmentAssignments.
     */
    distinct?: CustomerSegmentAssignmentScalarFieldEnum | CustomerSegmentAssignmentScalarFieldEnum[]
  }

  /**
   * CustomerSegmentAssignment findMany
   */
  export type CustomerSegmentAssignmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegmentAssignment
     */
    select?: CustomerSegmentAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegmentAssignment
     */
    omit?: CustomerSegmentAssignmentOmit<ExtArgs> | null
    /**
     * Filter, which CustomerSegmentAssignments to fetch.
     */
    where?: CustomerSegmentAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerSegmentAssignments to fetch.
     */
    orderBy?: CustomerSegmentAssignmentOrderByWithRelationInput | CustomerSegmentAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomerSegmentAssignments.
     */
    cursor?: CustomerSegmentAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerSegmentAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerSegmentAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerSegmentAssignments.
     */
    distinct?: CustomerSegmentAssignmentScalarFieldEnum | CustomerSegmentAssignmentScalarFieldEnum[]
  }

  /**
   * CustomerSegmentAssignment create
   */
  export type CustomerSegmentAssignmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegmentAssignment
     */
    select?: CustomerSegmentAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegmentAssignment
     */
    omit?: CustomerSegmentAssignmentOmit<ExtArgs> | null
    /**
     * The data needed to create a CustomerSegmentAssignment.
     */
    data: XOR<CustomerSegmentAssignmentCreateInput, CustomerSegmentAssignmentUncheckedCreateInput>
  }

  /**
   * CustomerSegmentAssignment createMany
   */
  export type CustomerSegmentAssignmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomerSegmentAssignments.
     */
    data: CustomerSegmentAssignmentCreateManyInput | CustomerSegmentAssignmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomerSegmentAssignment createManyAndReturn
   */
  export type CustomerSegmentAssignmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegmentAssignment
     */
    select?: CustomerSegmentAssignmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegmentAssignment
     */
    omit?: CustomerSegmentAssignmentOmit<ExtArgs> | null
    /**
     * The data used to create many CustomerSegmentAssignments.
     */
    data: CustomerSegmentAssignmentCreateManyInput | CustomerSegmentAssignmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomerSegmentAssignment update
   */
  export type CustomerSegmentAssignmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegmentAssignment
     */
    select?: CustomerSegmentAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegmentAssignment
     */
    omit?: CustomerSegmentAssignmentOmit<ExtArgs> | null
    /**
     * The data needed to update a CustomerSegmentAssignment.
     */
    data: XOR<CustomerSegmentAssignmentUpdateInput, CustomerSegmentAssignmentUncheckedUpdateInput>
    /**
     * Choose, which CustomerSegmentAssignment to update.
     */
    where: CustomerSegmentAssignmentWhereUniqueInput
  }

  /**
   * CustomerSegmentAssignment updateMany
   */
  export type CustomerSegmentAssignmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomerSegmentAssignments.
     */
    data: XOR<CustomerSegmentAssignmentUpdateManyMutationInput, CustomerSegmentAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which CustomerSegmentAssignments to update
     */
    where?: CustomerSegmentAssignmentWhereInput
    /**
     * Limit how many CustomerSegmentAssignments to update.
     */
    limit?: number
  }

  /**
   * CustomerSegmentAssignment updateManyAndReturn
   */
  export type CustomerSegmentAssignmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegmentAssignment
     */
    select?: CustomerSegmentAssignmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegmentAssignment
     */
    omit?: CustomerSegmentAssignmentOmit<ExtArgs> | null
    /**
     * The data used to update CustomerSegmentAssignments.
     */
    data: XOR<CustomerSegmentAssignmentUpdateManyMutationInput, CustomerSegmentAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which CustomerSegmentAssignments to update
     */
    where?: CustomerSegmentAssignmentWhereInput
    /**
     * Limit how many CustomerSegmentAssignments to update.
     */
    limit?: number
  }

  /**
   * CustomerSegmentAssignment upsert
   */
  export type CustomerSegmentAssignmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegmentAssignment
     */
    select?: CustomerSegmentAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegmentAssignment
     */
    omit?: CustomerSegmentAssignmentOmit<ExtArgs> | null
    /**
     * The filter to search for the CustomerSegmentAssignment to update in case it exists.
     */
    where: CustomerSegmentAssignmentWhereUniqueInput
    /**
     * In case the CustomerSegmentAssignment found by the `where` argument doesn't exist, create a new CustomerSegmentAssignment with this data.
     */
    create: XOR<CustomerSegmentAssignmentCreateInput, CustomerSegmentAssignmentUncheckedCreateInput>
    /**
     * In case the CustomerSegmentAssignment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerSegmentAssignmentUpdateInput, CustomerSegmentAssignmentUncheckedUpdateInput>
  }

  /**
   * CustomerSegmentAssignment delete
   */
  export type CustomerSegmentAssignmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegmentAssignment
     */
    select?: CustomerSegmentAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegmentAssignment
     */
    omit?: CustomerSegmentAssignmentOmit<ExtArgs> | null
    /**
     * Filter which CustomerSegmentAssignment to delete.
     */
    where: CustomerSegmentAssignmentWhereUniqueInput
  }

  /**
   * CustomerSegmentAssignment deleteMany
   */
  export type CustomerSegmentAssignmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerSegmentAssignments to delete
     */
    where?: CustomerSegmentAssignmentWhereInput
    /**
     * Limit how many CustomerSegmentAssignments to delete.
     */
    limit?: number
  }

  /**
   * CustomerSegmentAssignment without action
   */
  export type CustomerSegmentAssignmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerSegmentAssignment
     */
    select?: CustomerSegmentAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerSegmentAssignment
     */
    omit?: CustomerSegmentAssignmentOmit<ExtArgs> | null
  }


  /**
   * Model SupportMessage
   */

  export type AggregateSupportMessage = {
    _count: SupportMessageCountAggregateOutputType | null
    _min: SupportMessageMinAggregateOutputType | null
    _max: SupportMessageMaxAggregateOutputType | null
  }

  export type SupportMessageMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    customerName: string | null
    customerEmail: string | null
    customerPhone: string | null
    subject: string | null
    body: string | null
    status: string | null
    priority: string | null
    orderId: string | null
    orderNumber: string | null
    assignedTo: string | null
    assignedToName: string | null
    resolvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupportMessageMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    customerName: string | null
    customerEmail: string | null
    customerPhone: string | null
    subject: string | null
    body: string | null
    status: string | null
    priority: string | null
    orderId: string | null
    orderNumber: string | null
    assignedTo: string | null
    assignedToName: string | null
    resolvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupportMessageCountAggregateOutputType = {
    id: number
    customerId: number
    customerName: number
    customerEmail: number
    customerPhone: number
    subject: number
    body: number
    status: number
    priority: number
    orderId: number
    orderNumber: number
    assignedTo: number
    assignedToName: number
    resolvedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SupportMessageMinAggregateInputType = {
    id?: true
    customerId?: true
    customerName?: true
    customerEmail?: true
    customerPhone?: true
    subject?: true
    body?: true
    status?: true
    priority?: true
    orderId?: true
    orderNumber?: true
    assignedTo?: true
    assignedToName?: true
    resolvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupportMessageMaxAggregateInputType = {
    id?: true
    customerId?: true
    customerName?: true
    customerEmail?: true
    customerPhone?: true
    subject?: true
    body?: true
    status?: true
    priority?: true
    orderId?: true
    orderNumber?: true
    assignedTo?: true
    assignedToName?: true
    resolvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupportMessageCountAggregateInputType = {
    id?: true
    customerId?: true
    customerName?: true
    customerEmail?: true
    customerPhone?: true
    subject?: true
    body?: true
    status?: true
    priority?: true
    orderId?: true
    orderNumber?: true
    assignedTo?: true
    assignedToName?: true
    resolvedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SupportMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportMessage to aggregate.
     */
    where?: SupportMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportMessages to fetch.
     */
    orderBy?: SupportMessageOrderByWithRelationInput | SupportMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupportMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SupportMessages
    **/
    _count?: true | SupportMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupportMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupportMessageMaxAggregateInputType
  }

  export type GetSupportMessageAggregateType<T extends SupportMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateSupportMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupportMessage[P]>
      : GetScalarType<T[P], AggregateSupportMessage[P]>
  }




  export type SupportMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportMessageWhereInput
    orderBy?: SupportMessageOrderByWithAggregationInput | SupportMessageOrderByWithAggregationInput[]
    by: SupportMessageScalarFieldEnum[] | SupportMessageScalarFieldEnum
    having?: SupportMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupportMessageCountAggregateInputType | true
    _min?: SupportMessageMinAggregateInputType
    _max?: SupportMessageMaxAggregateInputType
  }

  export type SupportMessageGroupByOutputType = {
    id: string
    customerId: string | null
    customerName: string
    customerEmail: string
    customerPhone: string | null
    subject: string
    body: string
    status: string
    priority: string
    orderId: string | null
    orderNumber: string | null
    assignedTo: string | null
    assignedToName: string | null
    resolvedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: SupportMessageCountAggregateOutputType | null
    _min: SupportMessageMinAggregateOutputType | null
    _max: SupportMessageMaxAggregateOutputType | null
  }

  type GetSupportMessageGroupByPayload<T extends SupportMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupportMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupportMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupportMessageGroupByOutputType[P]>
            : GetScalarType<T[P], SupportMessageGroupByOutputType[P]>
        }
      >
    >


  export type SupportMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerPhone?: boolean
    subject?: boolean
    body?: boolean
    status?: boolean
    priority?: boolean
    orderId?: boolean
    orderNumber?: boolean
    assignedTo?: boolean
    assignedToName?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    replies?: boolean | SupportMessage$repliesArgs<ExtArgs>
    _count?: boolean | SupportMessageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supportMessage"]>

  export type SupportMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerPhone?: boolean
    subject?: boolean
    body?: boolean
    status?: boolean
    priority?: boolean
    orderId?: boolean
    orderNumber?: boolean
    assignedTo?: boolean
    assignedToName?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["supportMessage"]>

  export type SupportMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerPhone?: boolean
    subject?: boolean
    body?: boolean
    status?: boolean
    priority?: boolean
    orderId?: boolean
    orderNumber?: boolean
    assignedTo?: boolean
    assignedToName?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["supportMessage"]>

  export type SupportMessageSelectScalar = {
    id?: boolean
    customerId?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerPhone?: boolean
    subject?: boolean
    body?: boolean
    status?: boolean
    priority?: boolean
    orderId?: boolean
    orderNumber?: boolean
    assignedTo?: boolean
    assignedToName?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SupportMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "customerName" | "customerEmail" | "customerPhone" | "subject" | "body" | "status" | "priority" | "orderId" | "orderNumber" | "assignedTo" | "assignedToName" | "resolvedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["supportMessage"]>
  export type SupportMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    replies?: boolean | SupportMessage$repliesArgs<ExtArgs>
    _count?: boolean | SupportMessageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SupportMessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SupportMessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SupportMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SupportMessage"
    objects: {
      replies: Prisma.$SupportMessageReplyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string | null
      customerName: string
      customerEmail: string
      customerPhone: string | null
      subject: string
      body: string
      status: string
      priority: string
      orderId: string | null
      orderNumber: string | null
      assignedTo: string | null
      assignedToName: string | null
      resolvedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["supportMessage"]>
    composites: {}
  }

  type SupportMessageGetPayload<S extends boolean | null | undefined | SupportMessageDefaultArgs> = $Result.GetResult<Prisma.$SupportMessagePayload, S>

  type SupportMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SupportMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SupportMessageCountAggregateInputType | true
    }

  export interface SupportMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SupportMessage'], meta: { name: 'SupportMessage' } }
    /**
     * Find zero or one SupportMessage that matches the filter.
     * @param {SupportMessageFindUniqueArgs} args - Arguments to find a SupportMessage
     * @example
     * // Get one SupportMessage
     * const supportMessage = await prisma.supportMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupportMessageFindUniqueArgs>(args: SelectSubset<T, SupportMessageFindUniqueArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SupportMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SupportMessageFindUniqueOrThrowArgs} args - Arguments to find a SupportMessage
     * @example
     * // Get one SupportMessage
     * const supportMessage = await prisma.supportMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupportMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, SupportMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SupportMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageFindFirstArgs} args - Arguments to find a SupportMessage
     * @example
     * // Get one SupportMessage
     * const supportMessage = await prisma.supportMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupportMessageFindFirstArgs>(args?: SelectSubset<T, SupportMessageFindFirstArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SupportMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageFindFirstOrThrowArgs} args - Arguments to find a SupportMessage
     * @example
     * // Get one SupportMessage
     * const supportMessage = await prisma.supportMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupportMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, SupportMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SupportMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SupportMessages
     * const supportMessages = await prisma.supportMessage.findMany()
     * 
     * // Get first 10 SupportMessages
     * const supportMessages = await prisma.supportMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supportMessageWithIdOnly = await prisma.supportMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupportMessageFindManyArgs>(args?: SelectSubset<T, SupportMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SupportMessage.
     * @param {SupportMessageCreateArgs} args - Arguments to create a SupportMessage.
     * @example
     * // Create one SupportMessage
     * const SupportMessage = await prisma.supportMessage.create({
     *   data: {
     *     // ... data to create a SupportMessage
     *   }
     * })
     * 
     */
    create<T extends SupportMessageCreateArgs>(args: SelectSubset<T, SupportMessageCreateArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SupportMessages.
     * @param {SupportMessageCreateManyArgs} args - Arguments to create many SupportMessages.
     * @example
     * // Create many SupportMessages
     * const supportMessage = await prisma.supportMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupportMessageCreateManyArgs>(args?: SelectSubset<T, SupportMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SupportMessages and returns the data saved in the database.
     * @param {SupportMessageCreateManyAndReturnArgs} args - Arguments to create many SupportMessages.
     * @example
     * // Create many SupportMessages
     * const supportMessage = await prisma.supportMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SupportMessages and only return the `id`
     * const supportMessageWithIdOnly = await prisma.supportMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SupportMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, SupportMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SupportMessage.
     * @param {SupportMessageDeleteArgs} args - Arguments to delete one SupportMessage.
     * @example
     * // Delete one SupportMessage
     * const SupportMessage = await prisma.supportMessage.delete({
     *   where: {
     *     // ... filter to delete one SupportMessage
     *   }
     * })
     * 
     */
    delete<T extends SupportMessageDeleteArgs>(args: SelectSubset<T, SupportMessageDeleteArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SupportMessage.
     * @param {SupportMessageUpdateArgs} args - Arguments to update one SupportMessage.
     * @example
     * // Update one SupportMessage
     * const supportMessage = await prisma.supportMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupportMessageUpdateArgs>(args: SelectSubset<T, SupportMessageUpdateArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SupportMessages.
     * @param {SupportMessageDeleteManyArgs} args - Arguments to filter SupportMessages to delete.
     * @example
     * // Delete a few SupportMessages
     * const { count } = await prisma.supportMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupportMessageDeleteManyArgs>(args?: SelectSubset<T, SupportMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupportMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SupportMessages
     * const supportMessage = await prisma.supportMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupportMessageUpdateManyArgs>(args: SelectSubset<T, SupportMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupportMessages and returns the data updated in the database.
     * @param {SupportMessageUpdateManyAndReturnArgs} args - Arguments to update many SupportMessages.
     * @example
     * // Update many SupportMessages
     * const supportMessage = await prisma.supportMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SupportMessages and only return the `id`
     * const supportMessageWithIdOnly = await prisma.supportMessage.updateManyAndReturn({
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
    updateManyAndReturn<T extends SupportMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, SupportMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SupportMessage.
     * @param {SupportMessageUpsertArgs} args - Arguments to update or create a SupportMessage.
     * @example
     * // Update or create a SupportMessage
     * const supportMessage = await prisma.supportMessage.upsert({
     *   create: {
     *     // ... data to create a SupportMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SupportMessage we want to update
     *   }
     * })
     */
    upsert<T extends SupportMessageUpsertArgs>(args: SelectSubset<T, SupportMessageUpsertArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SupportMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageCountArgs} args - Arguments to filter SupportMessages to count.
     * @example
     * // Count the number of SupportMessages
     * const count = await prisma.supportMessage.count({
     *   where: {
     *     // ... the filter for the SupportMessages we want to count
     *   }
     * })
    **/
    count<T extends SupportMessageCountArgs>(
      args?: Subset<T, SupportMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupportMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SupportMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SupportMessageAggregateArgs>(args: Subset<T, SupportMessageAggregateArgs>): Prisma.PrismaPromise<GetSupportMessageAggregateType<T>>

    /**
     * Group by SupportMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageGroupByArgs} args - Group by arguments.
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
      T extends SupportMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupportMessageGroupByArgs['orderBy'] }
        : { orderBy?: SupportMessageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SupportMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupportMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SupportMessage model
   */
  readonly fields: SupportMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SupportMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupportMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    replies<T extends SupportMessage$repliesArgs<ExtArgs> = {}>(args?: Subset<T, SupportMessage$repliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportMessageReplyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the SupportMessage model
   */
  interface SupportMessageFieldRefs {
    readonly id: FieldRef<"SupportMessage", 'String'>
    readonly customerId: FieldRef<"SupportMessage", 'String'>
    readonly customerName: FieldRef<"SupportMessage", 'String'>
    readonly customerEmail: FieldRef<"SupportMessage", 'String'>
    readonly customerPhone: FieldRef<"SupportMessage", 'String'>
    readonly subject: FieldRef<"SupportMessage", 'String'>
    readonly body: FieldRef<"SupportMessage", 'String'>
    readonly status: FieldRef<"SupportMessage", 'String'>
    readonly priority: FieldRef<"SupportMessage", 'String'>
    readonly orderId: FieldRef<"SupportMessage", 'String'>
    readonly orderNumber: FieldRef<"SupportMessage", 'String'>
    readonly assignedTo: FieldRef<"SupportMessage", 'String'>
    readonly assignedToName: FieldRef<"SupportMessage", 'String'>
    readonly resolvedAt: FieldRef<"SupportMessage", 'DateTime'>
    readonly createdAt: FieldRef<"SupportMessage", 'DateTime'>
    readonly updatedAt: FieldRef<"SupportMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SupportMessage findUnique
   */
  export type SupportMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * Filter, which SupportMessage to fetch.
     */
    where: SupportMessageWhereUniqueInput
  }

  /**
   * SupportMessage findUniqueOrThrow
   */
  export type SupportMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * Filter, which SupportMessage to fetch.
     */
    where: SupportMessageWhereUniqueInput
  }

  /**
   * SupportMessage findFirst
   */
  export type SupportMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * Filter, which SupportMessage to fetch.
     */
    where?: SupportMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportMessages to fetch.
     */
    orderBy?: SupportMessageOrderByWithRelationInput | SupportMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportMessages.
     */
    cursor?: SupportMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportMessages.
     */
    distinct?: SupportMessageScalarFieldEnum | SupportMessageScalarFieldEnum[]
  }

  /**
   * SupportMessage findFirstOrThrow
   */
  export type SupportMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * Filter, which SupportMessage to fetch.
     */
    where?: SupportMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportMessages to fetch.
     */
    orderBy?: SupportMessageOrderByWithRelationInput | SupportMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportMessages.
     */
    cursor?: SupportMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportMessages.
     */
    distinct?: SupportMessageScalarFieldEnum | SupportMessageScalarFieldEnum[]
  }

  /**
   * SupportMessage findMany
   */
  export type SupportMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * Filter, which SupportMessages to fetch.
     */
    where?: SupportMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportMessages to fetch.
     */
    orderBy?: SupportMessageOrderByWithRelationInput | SupportMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SupportMessages.
     */
    cursor?: SupportMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportMessages.
     */
    distinct?: SupportMessageScalarFieldEnum | SupportMessageScalarFieldEnum[]
  }

  /**
   * SupportMessage create
   */
  export type SupportMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a SupportMessage.
     */
    data: XOR<SupportMessageCreateInput, SupportMessageUncheckedCreateInput>
  }

  /**
   * SupportMessage createMany
   */
  export type SupportMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SupportMessages.
     */
    data: SupportMessageCreateManyInput | SupportMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SupportMessage createManyAndReturn
   */
  export type SupportMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * The data used to create many SupportMessages.
     */
    data: SupportMessageCreateManyInput | SupportMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SupportMessage update
   */
  export type SupportMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a SupportMessage.
     */
    data: XOR<SupportMessageUpdateInput, SupportMessageUncheckedUpdateInput>
    /**
     * Choose, which SupportMessage to update.
     */
    where: SupportMessageWhereUniqueInput
  }

  /**
   * SupportMessage updateMany
   */
  export type SupportMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SupportMessages.
     */
    data: XOR<SupportMessageUpdateManyMutationInput, SupportMessageUncheckedUpdateManyInput>
    /**
     * Filter which SupportMessages to update
     */
    where?: SupportMessageWhereInput
    /**
     * Limit how many SupportMessages to update.
     */
    limit?: number
  }

  /**
   * SupportMessage updateManyAndReturn
   */
  export type SupportMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * The data used to update SupportMessages.
     */
    data: XOR<SupportMessageUpdateManyMutationInput, SupportMessageUncheckedUpdateManyInput>
    /**
     * Filter which SupportMessages to update
     */
    where?: SupportMessageWhereInput
    /**
     * Limit how many SupportMessages to update.
     */
    limit?: number
  }

  /**
   * SupportMessage upsert
   */
  export type SupportMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the SupportMessage to update in case it exists.
     */
    where: SupportMessageWhereUniqueInput
    /**
     * In case the SupportMessage found by the `where` argument doesn't exist, create a new SupportMessage with this data.
     */
    create: XOR<SupportMessageCreateInput, SupportMessageUncheckedCreateInput>
    /**
     * In case the SupportMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupportMessageUpdateInput, SupportMessageUncheckedUpdateInput>
  }

  /**
   * SupportMessage delete
   */
  export type SupportMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * Filter which SupportMessage to delete.
     */
    where: SupportMessageWhereUniqueInput
  }

  /**
   * SupportMessage deleteMany
   */
  export type SupportMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportMessages to delete
     */
    where?: SupportMessageWhereInput
    /**
     * Limit how many SupportMessages to delete.
     */
    limit?: number
  }

  /**
   * SupportMessage.replies
   */
  export type SupportMessage$repliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessageReply
     */
    select?: SupportMessageReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessageReply
     */
    omit?: SupportMessageReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageReplyInclude<ExtArgs> | null
    where?: SupportMessageReplyWhereInput
    orderBy?: SupportMessageReplyOrderByWithRelationInput | SupportMessageReplyOrderByWithRelationInput[]
    cursor?: SupportMessageReplyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SupportMessageReplyScalarFieldEnum | SupportMessageReplyScalarFieldEnum[]
  }

  /**
   * SupportMessage without action
   */
  export type SupportMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
  }


  /**
   * Model SupportMessageReply
   */

  export type AggregateSupportMessageReply = {
    _count: SupportMessageReplyCountAggregateOutputType | null
    _min: SupportMessageReplyMinAggregateOutputType | null
    _max: SupportMessageReplyMaxAggregateOutputType | null
  }

  export type SupportMessageReplyMinAggregateOutputType = {
    id: string | null
    messageId: string | null
    body: string | null
    authorId: string | null
    authorName: string | null
    isInternal: boolean | null
    createdAt: Date | null
  }

  export type SupportMessageReplyMaxAggregateOutputType = {
    id: string | null
    messageId: string | null
    body: string | null
    authorId: string | null
    authorName: string | null
    isInternal: boolean | null
    createdAt: Date | null
  }

  export type SupportMessageReplyCountAggregateOutputType = {
    id: number
    messageId: number
    body: number
    authorId: number
    authorName: number
    isInternal: number
    createdAt: number
    _all: number
  }


  export type SupportMessageReplyMinAggregateInputType = {
    id?: true
    messageId?: true
    body?: true
    authorId?: true
    authorName?: true
    isInternal?: true
    createdAt?: true
  }

  export type SupportMessageReplyMaxAggregateInputType = {
    id?: true
    messageId?: true
    body?: true
    authorId?: true
    authorName?: true
    isInternal?: true
    createdAt?: true
  }

  export type SupportMessageReplyCountAggregateInputType = {
    id?: true
    messageId?: true
    body?: true
    authorId?: true
    authorName?: true
    isInternal?: true
    createdAt?: true
    _all?: true
  }

  export type SupportMessageReplyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportMessageReply to aggregate.
     */
    where?: SupportMessageReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportMessageReplies to fetch.
     */
    orderBy?: SupportMessageReplyOrderByWithRelationInput | SupportMessageReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupportMessageReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportMessageReplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportMessageReplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SupportMessageReplies
    **/
    _count?: true | SupportMessageReplyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupportMessageReplyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupportMessageReplyMaxAggregateInputType
  }

  export type GetSupportMessageReplyAggregateType<T extends SupportMessageReplyAggregateArgs> = {
        [P in keyof T & keyof AggregateSupportMessageReply]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupportMessageReply[P]>
      : GetScalarType<T[P], AggregateSupportMessageReply[P]>
  }




  export type SupportMessageReplyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportMessageReplyWhereInput
    orderBy?: SupportMessageReplyOrderByWithAggregationInput | SupportMessageReplyOrderByWithAggregationInput[]
    by: SupportMessageReplyScalarFieldEnum[] | SupportMessageReplyScalarFieldEnum
    having?: SupportMessageReplyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupportMessageReplyCountAggregateInputType | true
    _min?: SupportMessageReplyMinAggregateInputType
    _max?: SupportMessageReplyMaxAggregateInputType
  }

  export type SupportMessageReplyGroupByOutputType = {
    id: string
    messageId: string
    body: string
    authorId: string
    authorName: string | null
    isInternal: boolean
    createdAt: Date
    _count: SupportMessageReplyCountAggregateOutputType | null
    _min: SupportMessageReplyMinAggregateOutputType | null
    _max: SupportMessageReplyMaxAggregateOutputType | null
  }

  type GetSupportMessageReplyGroupByPayload<T extends SupportMessageReplyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupportMessageReplyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupportMessageReplyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupportMessageReplyGroupByOutputType[P]>
            : GetScalarType<T[P], SupportMessageReplyGroupByOutputType[P]>
        }
      >
    >


  export type SupportMessageReplySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    body?: boolean
    authorId?: boolean
    authorName?: boolean
    isInternal?: boolean
    createdAt?: boolean
    message?: boolean | SupportMessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supportMessageReply"]>

  export type SupportMessageReplySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    body?: boolean
    authorId?: boolean
    authorName?: boolean
    isInternal?: boolean
    createdAt?: boolean
    message?: boolean | SupportMessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supportMessageReply"]>

  export type SupportMessageReplySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    body?: boolean
    authorId?: boolean
    authorName?: boolean
    isInternal?: boolean
    createdAt?: boolean
    message?: boolean | SupportMessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supportMessageReply"]>

  export type SupportMessageReplySelectScalar = {
    id?: boolean
    messageId?: boolean
    body?: boolean
    authorId?: boolean
    authorName?: boolean
    isInternal?: boolean
    createdAt?: boolean
  }

  export type SupportMessageReplyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "messageId" | "body" | "authorId" | "authorName" | "isInternal" | "createdAt", ExtArgs["result"]["supportMessageReply"]>
  export type SupportMessageReplyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | SupportMessageDefaultArgs<ExtArgs>
  }
  export type SupportMessageReplyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | SupportMessageDefaultArgs<ExtArgs>
  }
  export type SupportMessageReplyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | SupportMessageDefaultArgs<ExtArgs>
  }

  export type $SupportMessageReplyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SupportMessageReply"
    objects: {
      message: Prisma.$SupportMessagePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      messageId: string
      body: string
      authorId: string
      authorName: string | null
      isInternal: boolean
      createdAt: Date
    }, ExtArgs["result"]["supportMessageReply"]>
    composites: {}
  }

  type SupportMessageReplyGetPayload<S extends boolean | null | undefined | SupportMessageReplyDefaultArgs> = $Result.GetResult<Prisma.$SupportMessageReplyPayload, S>

  type SupportMessageReplyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SupportMessageReplyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SupportMessageReplyCountAggregateInputType | true
    }

  export interface SupportMessageReplyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SupportMessageReply'], meta: { name: 'SupportMessageReply' } }
    /**
     * Find zero or one SupportMessageReply that matches the filter.
     * @param {SupportMessageReplyFindUniqueArgs} args - Arguments to find a SupportMessageReply
     * @example
     * // Get one SupportMessageReply
     * const supportMessageReply = await prisma.supportMessageReply.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupportMessageReplyFindUniqueArgs>(args: SelectSubset<T, SupportMessageReplyFindUniqueArgs<ExtArgs>>): Prisma__SupportMessageReplyClient<$Result.GetResult<Prisma.$SupportMessageReplyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SupportMessageReply that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SupportMessageReplyFindUniqueOrThrowArgs} args - Arguments to find a SupportMessageReply
     * @example
     * // Get one SupportMessageReply
     * const supportMessageReply = await prisma.supportMessageReply.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupportMessageReplyFindUniqueOrThrowArgs>(args: SelectSubset<T, SupportMessageReplyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupportMessageReplyClient<$Result.GetResult<Prisma.$SupportMessageReplyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SupportMessageReply that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageReplyFindFirstArgs} args - Arguments to find a SupportMessageReply
     * @example
     * // Get one SupportMessageReply
     * const supportMessageReply = await prisma.supportMessageReply.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupportMessageReplyFindFirstArgs>(args?: SelectSubset<T, SupportMessageReplyFindFirstArgs<ExtArgs>>): Prisma__SupportMessageReplyClient<$Result.GetResult<Prisma.$SupportMessageReplyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SupportMessageReply that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageReplyFindFirstOrThrowArgs} args - Arguments to find a SupportMessageReply
     * @example
     * // Get one SupportMessageReply
     * const supportMessageReply = await prisma.supportMessageReply.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupportMessageReplyFindFirstOrThrowArgs>(args?: SelectSubset<T, SupportMessageReplyFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupportMessageReplyClient<$Result.GetResult<Prisma.$SupportMessageReplyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SupportMessageReplies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageReplyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SupportMessageReplies
     * const supportMessageReplies = await prisma.supportMessageReply.findMany()
     * 
     * // Get first 10 SupportMessageReplies
     * const supportMessageReplies = await prisma.supportMessageReply.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supportMessageReplyWithIdOnly = await prisma.supportMessageReply.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupportMessageReplyFindManyArgs>(args?: SelectSubset<T, SupportMessageReplyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportMessageReplyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SupportMessageReply.
     * @param {SupportMessageReplyCreateArgs} args - Arguments to create a SupportMessageReply.
     * @example
     * // Create one SupportMessageReply
     * const SupportMessageReply = await prisma.supportMessageReply.create({
     *   data: {
     *     // ... data to create a SupportMessageReply
     *   }
     * })
     * 
     */
    create<T extends SupportMessageReplyCreateArgs>(args: SelectSubset<T, SupportMessageReplyCreateArgs<ExtArgs>>): Prisma__SupportMessageReplyClient<$Result.GetResult<Prisma.$SupportMessageReplyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SupportMessageReplies.
     * @param {SupportMessageReplyCreateManyArgs} args - Arguments to create many SupportMessageReplies.
     * @example
     * // Create many SupportMessageReplies
     * const supportMessageReply = await prisma.supportMessageReply.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupportMessageReplyCreateManyArgs>(args?: SelectSubset<T, SupportMessageReplyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SupportMessageReplies and returns the data saved in the database.
     * @param {SupportMessageReplyCreateManyAndReturnArgs} args - Arguments to create many SupportMessageReplies.
     * @example
     * // Create many SupportMessageReplies
     * const supportMessageReply = await prisma.supportMessageReply.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SupportMessageReplies and only return the `id`
     * const supportMessageReplyWithIdOnly = await prisma.supportMessageReply.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SupportMessageReplyCreateManyAndReturnArgs>(args?: SelectSubset<T, SupportMessageReplyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportMessageReplyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SupportMessageReply.
     * @param {SupportMessageReplyDeleteArgs} args - Arguments to delete one SupportMessageReply.
     * @example
     * // Delete one SupportMessageReply
     * const SupportMessageReply = await prisma.supportMessageReply.delete({
     *   where: {
     *     // ... filter to delete one SupportMessageReply
     *   }
     * })
     * 
     */
    delete<T extends SupportMessageReplyDeleteArgs>(args: SelectSubset<T, SupportMessageReplyDeleteArgs<ExtArgs>>): Prisma__SupportMessageReplyClient<$Result.GetResult<Prisma.$SupportMessageReplyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SupportMessageReply.
     * @param {SupportMessageReplyUpdateArgs} args - Arguments to update one SupportMessageReply.
     * @example
     * // Update one SupportMessageReply
     * const supportMessageReply = await prisma.supportMessageReply.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupportMessageReplyUpdateArgs>(args: SelectSubset<T, SupportMessageReplyUpdateArgs<ExtArgs>>): Prisma__SupportMessageReplyClient<$Result.GetResult<Prisma.$SupportMessageReplyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SupportMessageReplies.
     * @param {SupportMessageReplyDeleteManyArgs} args - Arguments to filter SupportMessageReplies to delete.
     * @example
     * // Delete a few SupportMessageReplies
     * const { count } = await prisma.supportMessageReply.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupportMessageReplyDeleteManyArgs>(args?: SelectSubset<T, SupportMessageReplyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupportMessageReplies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageReplyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SupportMessageReplies
     * const supportMessageReply = await prisma.supportMessageReply.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupportMessageReplyUpdateManyArgs>(args: SelectSubset<T, SupportMessageReplyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupportMessageReplies and returns the data updated in the database.
     * @param {SupportMessageReplyUpdateManyAndReturnArgs} args - Arguments to update many SupportMessageReplies.
     * @example
     * // Update many SupportMessageReplies
     * const supportMessageReply = await prisma.supportMessageReply.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SupportMessageReplies and only return the `id`
     * const supportMessageReplyWithIdOnly = await prisma.supportMessageReply.updateManyAndReturn({
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
    updateManyAndReturn<T extends SupportMessageReplyUpdateManyAndReturnArgs>(args: SelectSubset<T, SupportMessageReplyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportMessageReplyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SupportMessageReply.
     * @param {SupportMessageReplyUpsertArgs} args - Arguments to update or create a SupportMessageReply.
     * @example
     * // Update or create a SupportMessageReply
     * const supportMessageReply = await prisma.supportMessageReply.upsert({
     *   create: {
     *     // ... data to create a SupportMessageReply
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SupportMessageReply we want to update
     *   }
     * })
     */
    upsert<T extends SupportMessageReplyUpsertArgs>(args: SelectSubset<T, SupportMessageReplyUpsertArgs<ExtArgs>>): Prisma__SupportMessageReplyClient<$Result.GetResult<Prisma.$SupportMessageReplyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SupportMessageReplies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageReplyCountArgs} args - Arguments to filter SupportMessageReplies to count.
     * @example
     * // Count the number of SupportMessageReplies
     * const count = await prisma.supportMessageReply.count({
     *   where: {
     *     // ... the filter for the SupportMessageReplies we want to count
     *   }
     * })
    **/
    count<T extends SupportMessageReplyCountArgs>(
      args?: Subset<T, SupportMessageReplyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupportMessageReplyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SupportMessageReply.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageReplyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SupportMessageReplyAggregateArgs>(args: Subset<T, SupportMessageReplyAggregateArgs>): Prisma.PrismaPromise<GetSupportMessageReplyAggregateType<T>>

    /**
     * Group by SupportMessageReply.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageReplyGroupByArgs} args - Group by arguments.
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
      T extends SupportMessageReplyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupportMessageReplyGroupByArgs['orderBy'] }
        : { orderBy?: SupportMessageReplyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SupportMessageReplyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupportMessageReplyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SupportMessageReply model
   */
  readonly fields: SupportMessageReplyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SupportMessageReply.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupportMessageReplyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    message<T extends SupportMessageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SupportMessageDefaultArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SupportMessageReply model
   */
  interface SupportMessageReplyFieldRefs {
    readonly id: FieldRef<"SupportMessageReply", 'String'>
    readonly messageId: FieldRef<"SupportMessageReply", 'String'>
    readonly body: FieldRef<"SupportMessageReply", 'String'>
    readonly authorId: FieldRef<"SupportMessageReply", 'String'>
    readonly authorName: FieldRef<"SupportMessageReply", 'String'>
    readonly isInternal: FieldRef<"SupportMessageReply", 'Boolean'>
    readonly createdAt: FieldRef<"SupportMessageReply", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SupportMessageReply findUnique
   */
  export type SupportMessageReplyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessageReply
     */
    select?: SupportMessageReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessageReply
     */
    omit?: SupportMessageReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageReplyInclude<ExtArgs> | null
    /**
     * Filter, which SupportMessageReply to fetch.
     */
    where: SupportMessageReplyWhereUniqueInput
  }

  /**
   * SupportMessageReply findUniqueOrThrow
   */
  export type SupportMessageReplyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessageReply
     */
    select?: SupportMessageReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessageReply
     */
    omit?: SupportMessageReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageReplyInclude<ExtArgs> | null
    /**
     * Filter, which SupportMessageReply to fetch.
     */
    where: SupportMessageReplyWhereUniqueInput
  }

  /**
   * SupportMessageReply findFirst
   */
  export type SupportMessageReplyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessageReply
     */
    select?: SupportMessageReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessageReply
     */
    omit?: SupportMessageReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageReplyInclude<ExtArgs> | null
    /**
     * Filter, which SupportMessageReply to fetch.
     */
    where?: SupportMessageReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportMessageReplies to fetch.
     */
    orderBy?: SupportMessageReplyOrderByWithRelationInput | SupportMessageReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportMessageReplies.
     */
    cursor?: SupportMessageReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportMessageReplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportMessageReplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportMessageReplies.
     */
    distinct?: SupportMessageReplyScalarFieldEnum | SupportMessageReplyScalarFieldEnum[]
  }

  /**
   * SupportMessageReply findFirstOrThrow
   */
  export type SupportMessageReplyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessageReply
     */
    select?: SupportMessageReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessageReply
     */
    omit?: SupportMessageReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageReplyInclude<ExtArgs> | null
    /**
     * Filter, which SupportMessageReply to fetch.
     */
    where?: SupportMessageReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportMessageReplies to fetch.
     */
    orderBy?: SupportMessageReplyOrderByWithRelationInput | SupportMessageReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportMessageReplies.
     */
    cursor?: SupportMessageReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportMessageReplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportMessageReplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportMessageReplies.
     */
    distinct?: SupportMessageReplyScalarFieldEnum | SupportMessageReplyScalarFieldEnum[]
  }

  /**
   * SupportMessageReply findMany
   */
  export type SupportMessageReplyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessageReply
     */
    select?: SupportMessageReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessageReply
     */
    omit?: SupportMessageReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageReplyInclude<ExtArgs> | null
    /**
     * Filter, which SupportMessageReplies to fetch.
     */
    where?: SupportMessageReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportMessageReplies to fetch.
     */
    orderBy?: SupportMessageReplyOrderByWithRelationInput | SupportMessageReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SupportMessageReplies.
     */
    cursor?: SupportMessageReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportMessageReplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportMessageReplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportMessageReplies.
     */
    distinct?: SupportMessageReplyScalarFieldEnum | SupportMessageReplyScalarFieldEnum[]
  }

  /**
   * SupportMessageReply create
   */
  export type SupportMessageReplyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessageReply
     */
    select?: SupportMessageReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessageReply
     */
    omit?: SupportMessageReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageReplyInclude<ExtArgs> | null
    /**
     * The data needed to create a SupportMessageReply.
     */
    data: XOR<SupportMessageReplyCreateInput, SupportMessageReplyUncheckedCreateInput>
  }

  /**
   * SupportMessageReply createMany
   */
  export type SupportMessageReplyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SupportMessageReplies.
     */
    data: SupportMessageReplyCreateManyInput | SupportMessageReplyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SupportMessageReply createManyAndReturn
   */
  export type SupportMessageReplyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessageReply
     */
    select?: SupportMessageReplySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessageReply
     */
    omit?: SupportMessageReplyOmit<ExtArgs> | null
    /**
     * The data used to create many SupportMessageReplies.
     */
    data: SupportMessageReplyCreateManyInput | SupportMessageReplyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageReplyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SupportMessageReply update
   */
  export type SupportMessageReplyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessageReply
     */
    select?: SupportMessageReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessageReply
     */
    omit?: SupportMessageReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageReplyInclude<ExtArgs> | null
    /**
     * The data needed to update a SupportMessageReply.
     */
    data: XOR<SupportMessageReplyUpdateInput, SupportMessageReplyUncheckedUpdateInput>
    /**
     * Choose, which SupportMessageReply to update.
     */
    where: SupportMessageReplyWhereUniqueInput
  }

  /**
   * SupportMessageReply updateMany
   */
  export type SupportMessageReplyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SupportMessageReplies.
     */
    data: XOR<SupportMessageReplyUpdateManyMutationInput, SupportMessageReplyUncheckedUpdateManyInput>
    /**
     * Filter which SupportMessageReplies to update
     */
    where?: SupportMessageReplyWhereInput
    /**
     * Limit how many SupportMessageReplies to update.
     */
    limit?: number
  }

  /**
   * SupportMessageReply updateManyAndReturn
   */
  export type SupportMessageReplyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessageReply
     */
    select?: SupportMessageReplySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessageReply
     */
    omit?: SupportMessageReplyOmit<ExtArgs> | null
    /**
     * The data used to update SupportMessageReplies.
     */
    data: XOR<SupportMessageReplyUpdateManyMutationInput, SupportMessageReplyUncheckedUpdateManyInput>
    /**
     * Filter which SupportMessageReplies to update
     */
    where?: SupportMessageReplyWhereInput
    /**
     * Limit how many SupportMessageReplies to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageReplyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SupportMessageReply upsert
   */
  export type SupportMessageReplyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessageReply
     */
    select?: SupportMessageReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessageReply
     */
    omit?: SupportMessageReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageReplyInclude<ExtArgs> | null
    /**
     * The filter to search for the SupportMessageReply to update in case it exists.
     */
    where: SupportMessageReplyWhereUniqueInput
    /**
     * In case the SupportMessageReply found by the `where` argument doesn't exist, create a new SupportMessageReply with this data.
     */
    create: XOR<SupportMessageReplyCreateInput, SupportMessageReplyUncheckedCreateInput>
    /**
     * In case the SupportMessageReply was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupportMessageReplyUpdateInput, SupportMessageReplyUncheckedUpdateInput>
  }

  /**
   * SupportMessageReply delete
   */
  export type SupportMessageReplyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessageReply
     */
    select?: SupportMessageReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessageReply
     */
    omit?: SupportMessageReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageReplyInclude<ExtArgs> | null
    /**
     * Filter which SupportMessageReply to delete.
     */
    where: SupportMessageReplyWhereUniqueInput
  }

  /**
   * SupportMessageReply deleteMany
   */
  export type SupportMessageReplyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportMessageReplies to delete
     */
    where?: SupportMessageReplyWhereInput
    /**
     * Limit how many SupportMessageReplies to delete.
     */
    limit?: number
  }

  /**
   * SupportMessageReply without action
   */
  export type SupportMessageReplyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessageReply
     */
    select?: SupportMessageReplySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessageReply
     */
    omit?: SupportMessageReplyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageReplyInclude<ExtArgs> | null
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


  export const CustomerScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
    phone: 'phone',
    avatar: 'avatar',
    dateOfBirth: 'dateOfBirth',
    gender: 'gender',
    language: 'language',
    timezone: 'timezone',
    currency: 'currency',
    loyaltyPoints: 'loyaltyPoints',
    loyaltyTier: 'loyaltyTier',
    isActive: 'isActive',
    lastLoginAt: 'lastLoginAt',
    loginCount: 'loginCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const CustomerPreferenceScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    emailNotifications: 'emailNotifications',
    smsNotifications: 'smsNotifications',
    pushNotifications: 'pushNotifications',
    marketingEmails: 'marketingEmails',
    dataSharingConsent: 'dataSharingConsent',
    cookieConsent: 'cookieConsent',
    preferredCategories: 'preferredCategories',
    preferredBrands: 'preferredBrands',
    productViewHistory: 'productViewHistory',
    searchHistory: 'searchHistory',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerPreferenceScalarFieldEnum = (typeof CustomerPreferenceScalarFieldEnum)[keyof typeof CustomerPreferenceScalarFieldEnum]


  export const AddressScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    label: 'label',
    type: 'type',
    line1: 'line1',
    line2: 'line2',
    city: 'city',
    state: 'state',
    postalCode: 'postalCode',
    country: 'country',
    phone: 'phone',
    isDefault: 'isDefault',
    isActive: 'isActive',
    latitude: 'latitude',
    longitude: 'longitude',
    deliveryInstructions: 'deliveryInstructions',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AddressScalarFieldEnum = (typeof AddressScalarFieldEnum)[keyof typeof AddressScalarFieldEnum]


  export const CommunicationScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    type: 'type',
    direction: 'direction',
    subject: 'subject',
    content: 'content',
    status: 'status',
    metadata: 'metadata',
    sentAt: 'sentAt',
    deliveredAt: 'deliveredAt',
    readAt: 'readAt',
    failedAt: 'failedAt',
    error: 'error',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CommunicationScalarFieldEnum = (typeof CommunicationScalarFieldEnum)[keyof typeof CommunicationScalarFieldEnum]


  export const CustomerNoteScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    content: 'content',
    type: 'type',
    authorId: 'authorId',
    isInternal: 'isInternal',
    isPinned: 'isPinned',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerNoteScalarFieldEnum = (typeof CustomerNoteScalarFieldEnum)[keyof typeof CustomerNoteScalarFieldEnum]


  export const CustomerActivityScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    action: 'action',
    resource: 'resource',
    resourceId: 'resourceId',
    metadata: 'metadata',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt'
  };

  export type CustomerActivityScalarFieldEnum = (typeof CustomerActivityScalarFieldEnum)[keyof typeof CustomerActivityScalarFieldEnum]


  export const CustomerSegmentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    criteria: 'criteria',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerSegmentScalarFieldEnum = (typeof CustomerSegmentScalarFieldEnum)[keyof typeof CustomerSegmentScalarFieldEnum]


  export const CustomerSegmentAssignmentScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    segmentId: 'segmentId',
    assignedAt: 'assignedAt'
  };

  export type CustomerSegmentAssignmentScalarFieldEnum = (typeof CustomerSegmentAssignmentScalarFieldEnum)[keyof typeof CustomerSegmentAssignmentScalarFieldEnum]


  export const SupportMessageScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    customerName: 'customerName',
    customerEmail: 'customerEmail',
    customerPhone: 'customerPhone',
    subject: 'subject',
    body: 'body',
    status: 'status',
    priority: 'priority',
    orderId: 'orderId',
    orderNumber: 'orderNumber',
    assignedTo: 'assignedTo',
    assignedToName: 'assignedToName',
    resolvedAt: 'resolvedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SupportMessageScalarFieldEnum = (typeof SupportMessageScalarFieldEnum)[keyof typeof SupportMessageScalarFieldEnum]


  export const SupportMessageReplyScalarFieldEnum: {
    id: 'id',
    messageId: 'messageId',
    body: 'body',
    authorId: 'authorId',
    authorName: 'authorName',
    isInternal: 'isInternal',
    createdAt: 'createdAt'
  };

  export type SupportMessageReplyScalarFieldEnum = (typeof SupportMessageReplyScalarFieldEnum)[keyof typeof SupportMessageReplyScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


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
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


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


  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: StringFilter<"Customer"> | string
    userId?: StringFilter<"Customer"> | string
    email?: StringFilter<"Customer"> | string
    firstName?: StringFilter<"Customer"> | string
    lastName?: StringFilter<"Customer"> | string
    phone?: StringNullableFilter<"Customer"> | string | null
    avatar?: StringNullableFilter<"Customer"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"Customer"> | Date | string | null
    gender?: StringNullableFilter<"Customer"> | string | null
    language?: StringFilter<"Customer"> | string
    timezone?: StringFilter<"Customer"> | string
    currency?: StringFilter<"Customer"> | string
    loyaltyPoints?: IntFilter<"Customer"> | number
    loyaltyTier?: StringFilter<"Customer"> | string
    isActive?: BoolFilter<"Customer"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"Customer"> | Date | string | null
    loginCount?: IntFilter<"Customer"> | number
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    preferences?: XOR<CustomerPreferenceNullableScalarRelationFilter, CustomerPreferenceWhereInput> | null
    addresses?: AddressListRelationFilter
    communications?: CommunicationListRelationFilter
    notes?: CustomerNoteListRelationFilter
    activities?: CustomerActivityListRelationFilter
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    language?: SortOrder
    timezone?: SortOrder
    currency?: SortOrder
    loyaltyPoints?: SortOrder
    loyaltyTier?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    loginCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    preferences?: CustomerPreferenceOrderByWithRelationInput
    addresses?: AddressOrderByRelationAggregateInput
    communications?: CommunicationOrderByRelationAggregateInput
    notes?: CustomerNoteOrderByRelationAggregateInput
    activities?: CustomerActivityOrderByRelationAggregateInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    email?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    firstName?: StringFilter<"Customer"> | string
    lastName?: StringFilter<"Customer"> | string
    phone?: StringNullableFilter<"Customer"> | string | null
    avatar?: StringNullableFilter<"Customer"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"Customer"> | Date | string | null
    gender?: StringNullableFilter<"Customer"> | string | null
    language?: StringFilter<"Customer"> | string
    timezone?: StringFilter<"Customer"> | string
    currency?: StringFilter<"Customer"> | string
    loyaltyPoints?: IntFilter<"Customer"> | number
    loyaltyTier?: StringFilter<"Customer"> | string
    isActive?: BoolFilter<"Customer"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"Customer"> | Date | string | null
    loginCount?: IntFilter<"Customer"> | number
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    preferences?: XOR<CustomerPreferenceNullableScalarRelationFilter, CustomerPreferenceWhereInput> | null
    addresses?: AddressListRelationFilter
    communications?: CommunicationListRelationFilter
    notes?: CustomerNoteListRelationFilter
    activities?: CustomerActivityListRelationFilter
  }, "id" | "userId" | "email">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    language?: SortOrder
    timezone?: SortOrder
    currency?: SortOrder
    loyaltyPoints?: SortOrder
    loyaltyTier?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    loginCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _avg?: CustomerAvgOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
    _sum?: CustomerSumOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Customer"> | string
    userId?: StringWithAggregatesFilter<"Customer"> | string
    email?: StringWithAggregatesFilter<"Customer"> | string
    firstName?: StringWithAggregatesFilter<"Customer"> | string
    lastName?: StringWithAggregatesFilter<"Customer"> | string
    phone?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"Customer"> | Date | string | null
    gender?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    language?: StringWithAggregatesFilter<"Customer"> | string
    timezone?: StringWithAggregatesFilter<"Customer"> | string
    currency?: StringWithAggregatesFilter<"Customer"> | string
    loyaltyPoints?: IntWithAggregatesFilter<"Customer"> | number
    loyaltyTier?: StringWithAggregatesFilter<"Customer"> | string
    isActive?: BoolWithAggregatesFilter<"Customer"> | boolean
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"Customer"> | Date | string | null
    loginCount?: IntWithAggregatesFilter<"Customer"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
  }

  export type CustomerPreferenceWhereInput = {
    AND?: CustomerPreferenceWhereInput | CustomerPreferenceWhereInput[]
    OR?: CustomerPreferenceWhereInput[]
    NOT?: CustomerPreferenceWhereInput | CustomerPreferenceWhereInput[]
    id?: StringFilter<"CustomerPreference"> | string
    customerId?: StringFilter<"CustomerPreference"> | string
    emailNotifications?: BoolFilter<"CustomerPreference"> | boolean
    smsNotifications?: BoolFilter<"CustomerPreference"> | boolean
    pushNotifications?: BoolFilter<"CustomerPreference"> | boolean
    marketingEmails?: BoolFilter<"CustomerPreference"> | boolean
    dataSharingConsent?: BoolFilter<"CustomerPreference"> | boolean
    cookieConsent?: BoolFilter<"CustomerPreference"> | boolean
    preferredCategories?: StringNullableListFilter<"CustomerPreference">
    preferredBrands?: StringNullableListFilter<"CustomerPreference">
    productViewHistory?: JsonNullableFilter<"CustomerPreference">
    searchHistory?: JsonNullableFilter<"CustomerPreference">
    createdAt?: DateTimeFilter<"CustomerPreference"> | Date | string
    updatedAt?: DateTimeFilter<"CustomerPreference"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
  }

  export type CustomerPreferenceOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    emailNotifications?: SortOrder
    smsNotifications?: SortOrder
    pushNotifications?: SortOrder
    marketingEmails?: SortOrder
    dataSharingConsent?: SortOrder
    cookieConsent?: SortOrder
    preferredCategories?: SortOrder
    preferredBrands?: SortOrder
    productViewHistory?: SortOrderInput | SortOrder
    searchHistory?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
  }

  export type CustomerPreferenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    customerId?: string
    AND?: CustomerPreferenceWhereInput | CustomerPreferenceWhereInput[]
    OR?: CustomerPreferenceWhereInput[]
    NOT?: CustomerPreferenceWhereInput | CustomerPreferenceWhereInput[]
    emailNotifications?: BoolFilter<"CustomerPreference"> | boolean
    smsNotifications?: BoolFilter<"CustomerPreference"> | boolean
    pushNotifications?: BoolFilter<"CustomerPreference"> | boolean
    marketingEmails?: BoolFilter<"CustomerPreference"> | boolean
    dataSharingConsent?: BoolFilter<"CustomerPreference"> | boolean
    cookieConsent?: BoolFilter<"CustomerPreference"> | boolean
    preferredCategories?: StringNullableListFilter<"CustomerPreference">
    preferredBrands?: StringNullableListFilter<"CustomerPreference">
    productViewHistory?: JsonNullableFilter<"CustomerPreference">
    searchHistory?: JsonNullableFilter<"CustomerPreference">
    createdAt?: DateTimeFilter<"CustomerPreference"> | Date | string
    updatedAt?: DateTimeFilter<"CustomerPreference"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
  }, "id" | "customerId">

  export type CustomerPreferenceOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    emailNotifications?: SortOrder
    smsNotifications?: SortOrder
    pushNotifications?: SortOrder
    marketingEmails?: SortOrder
    dataSharingConsent?: SortOrder
    cookieConsent?: SortOrder
    preferredCategories?: SortOrder
    preferredBrands?: SortOrder
    productViewHistory?: SortOrderInput | SortOrder
    searchHistory?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerPreferenceCountOrderByAggregateInput
    _max?: CustomerPreferenceMaxOrderByAggregateInput
    _min?: CustomerPreferenceMinOrderByAggregateInput
  }

  export type CustomerPreferenceScalarWhereWithAggregatesInput = {
    AND?: CustomerPreferenceScalarWhereWithAggregatesInput | CustomerPreferenceScalarWhereWithAggregatesInput[]
    OR?: CustomerPreferenceScalarWhereWithAggregatesInput[]
    NOT?: CustomerPreferenceScalarWhereWithAggregatesInput | CustomerPreferenceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CustomerPreference"> | string
    customerId?: StringWithAggregatesFilter<"CustomerPreference"> | string
    emailNotifications?: BoolWithAggregatesFilter<"CustomerPreference"> | boolean
    smsNotifications?: BoolWithAggregatesFilter<"CustomerPreference"> | boolean
    pushNotifications?: BoolWithAggregatesFilter<"CustomerPreference"> | boolean
    marketingEmails?: BoolWithAggregatesFilter<"CustomerPreference"> | boolean
    dataSharingConsent?: BoolWithAggregatesFilter<"CustomerPreference"> | boolean
    cookieConsent?: BoolWithAggregatesFilter<"CustomerPreference"> | boolean
    preferredCategories?: StringNullableListFilter<"CustomerPreference">
    preferredBrands?: StringNullableListFilter<"CustomerPreference">
    productViewHistory?: JsonNullableWithAggregatesFilter<"CustomerPreference">
    searchHistory?: JsonNullableWithAggregatesFilter<"CustomerPreference">
    createdAt?: DateTimeWithAggregatesFilter<"CustomerPreference"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CustomerPreference"> | Date | string
  }

  export type AddressWhereInput = {
    AND?: AddressWhereInput | AddressWhereInput[]
    OR?: AddressWhereInput[]
    NOT?: AddressWhereInput | AddressWhereInput[]
    id?: StringFilter<"Address"> | string
    customerId?: StringFilter<"Address"> | string
    label?: StringFilter<"Address"> | string
    type?: StringFilter<"Address"> | string
    line1?: StringFilter<"Address"> | string
    line2?: StringNullableFilter<"Address"> | string | null
    city?: StringFilter<"Address"> | string
    state?: StringNullableFilter<"Address"> | string | null
    postalCode?: StringFilter<"Address"> | string
    country?: StringFilter<"Address"> | string
    phone?: StringNullableFilter<"Address"> | string | null
    isDefault?: BoolFilter<"Address"> | boolean
    isActive?: BoolFilter<"Address"> | boolean
    latitude?: FloatNullableFilter<"Address"> | number | null
    longitude?: FloatNullableFilter<"Address"> | number | null
    deliveryInstructions?: StringNullableFilter<"Address"> | string | null
    createdAt?: DateTimeFilter<"Address"> | Date | string
    updatedAt?: DateTimeFilter<"Address"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
  }

  export type AddressOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    label?: SortOrder
    type?: SortOrder
    line1?: SortOrder
    line2?: SortOrderInput | SortOrder
    city?: SortOrder
    state?: SortOrderInput | SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    phone?: SortOrderInput | SortOrder
    isDefault?: SortOrder
    isActive?: SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    deliveryInstructions?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
  }

  export type AddressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    customerId_label?: AddressCustomerIdLabelCompoundUniqueInput
    AND?: AddressWhereInput | AddressWhereInput[]
    OR?: AddressWhereInput[]
    NOT?: AddressWhereInput | AddressWhereInput[]
    customerId?: StringFilter<"Address"> | string
    label?: StringFilter<"Address"> | string
    type?: StringFilter<"Address"> | string
    line1?: StringFilter<"Address"> | string
    line2?: StringNullableFilter<"Address"> | string | null
    city?: StringFilter<"Address"> | string
    state?: StringNullableFilter<"Address"> | string | null
    postalCode?: StringFilter<"Address"> | string
    country?: StringFilter<"Address"> | string
    phone?: StringNullableFilter<"Address"> | string | null
    isDefault?: BoolFilter<"Address"> | boolean
    isActive?: BoolFilter<"Address"> | boolean
    latitude?: FloatNullableFilter<"Address"> | number | null
    longitude?: FloatNullableFilter<"Address"> | number | null
    deliveryInstructions?: StringNullableFilter<"Address"> | string | null
    createdAt?: DateTimeFilter<"Address"> | Date | string
    updatedAt?: DateTimeFilter<"Address"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
  }, "id" | "customerId_label">

  export type AddressOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    label?: SortOrder
    type?: SortOrder
    line1?: SortOrder
    line2?: SortOrderInput | SortOrder
    city?: SortOrder
    state?: SortOrderInput | SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    phone?: SortOrderInput | SortOrder
    isDefault?: SortOrder
    isActive?: SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    deliveryInstructions?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AddressCountOrderByAggregateInput
    _avg?: AddressAvgOrderByAggregateInput
    _max?: AddressMaxOrderByAggregateInput
    _min?: AddressMinOrderByAggregateInput
    _sum?: AddressSumOrderByAggregateInput
  }

  export type AddressScalarWhereWithAggregatesInput = {
    AND?: AddressScalarWhereWithAggregatesInput | AddressScalarWhereWithAggregatesInput[]
    OR?: AddressScalarWhereWithAggregatesInput[]
    NOT?: AddressScalarWhereWithAggregatesInput | AddressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Address"> | string
    customerId?: StringWithAggregatesFilter<"Address"> | string
    label?: StringWithAggregatesFilter<"Address"> | string
    type?: StringWithAggregatesFilter<"Address"> | string
    line1?: StringWithAggregatesFilter<"Address"> | string
    line2?: StringNullableWithAggregatesFilter<"Address"> | string | null
    city?: StringWithAggregatesFilter<"Address"> | string
    state?: StringNullableWithAggregatesFilter<"Address"> | string | null
    postalCode?: StringWithAggregatesFilter<"Address"> | string
    country?: StringWithAggregatesFilter<"Address"> | string
    phone?: StringNullableWithAggregatesFilter<"Address"> | string | null
    isDefault?: BoolWithAggregatesFilter<"Address"> | boolean
    isActive?: BoolWithAggregatesFilter<"Address"> | boolean
    latitude?: FloatNullableWithAggregatesFilter<"Address"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"Address"> | number | null
    deliveryInstructions?: StringNullableWithAggregatesFilter<"Address"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Address"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Address"> | Date | string
  }

  export type CommunicationWhereInput = {
    AND?: CommunicationWhereInput | CommunicationWhereInput[]
    OR?: CommunicationWhereInput[]
    NOT?: CommunicationWhereInput | CommunicationWhereInput[]
    id?: StringFilter<"Communication"> | string
    customerId?: StringFilter<"Communication"> | string
    type?: StringFilter<"Communication"> | string
    direction?: StringFilter<"Communication"> | string
    subject?: StringNullableFilter<"Communication"> | string | null
    content?: StringFilter<"Communication"> | string
    status?: StringFilter<"Communication"> | string
    metadata?: JsonNullableFilter<"Communication">
    sentAt?: DateTimeNullableFilter<"Communication"> | Date | string | null
    deliveredAt?: DateTimeNullableFilter<"Communication"> | Date | string | null
    readAt?: DateTimeNullableFilter<"Communication"> | Date | string | null
    failedAt?: DateTimeNullableFilter<"Communication"> | Date | string | null
    error?: StringNullableFilter<"Communication"> | string | null
    createdAt?: DateTimeFilter<"Communication"> | Date | string
    updatedAt?: DateTimeFilter<"Communication"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
  }

  export type CommunicationOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    type?: SortOrder
    direction?: SortOrder
    subject?: SortOrderInput | SortOrder
    content?: SortOrder
    status?: SortOrder
    metadata?: SortOrderInput | SortOrder
    sentAt?: SortOrderInput | SortOrder
    deliveredAt?: SortOrderInput | SortOrder
    readAt?: SortOrderInput | SortOrder
    failedAt?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
  }

  export type CommunicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CommunicationWhereInput | CommunicationWhereInput[]
    OR?: CommunicationWhereInput[]
    NOT?: CommunicationWhereInput | CommunicationWhereInput[]
    customerId?: StringFilter<"Communication"> | string
    type?: StringFilter<"Communication"> | string
    direction?: StringFilter<"Communication"> | string
    subject?: StringNullableFilter<"Communication"> | string | null
    content?: StringFilter<"Communication"> | string
    status?: StringFilter<"Communication"> | string
    metadata?: JsonNullableFilter<"Communication">
    sentAt?: DateTimeNullableFilter<"Communication"> | Date | string | null
    deliveredAt?: DateTimeNullableFilter<"Communication"> | Date | string | null
    readAt?: DateTimeNullableFilter<"Communication"> | Date | string | null
    failedAt?: DateTimeNullableFilter<"Communication"> | Date | string | null
    error?: StringNullableFilter<"Communication"> | string | null
    createdAt?: DateTimeFilter<"Communication"> | Date | string
    updatedAt?: DateTimeFilter<"Communication"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
  }, "id">

  export type CommunicationOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    type?: SortOrder
    direction?: SortOrder
    subject?: SortOrderInput | SortOrder
    content?: SortOrder
    status?: SortOrder
    metadata?: SortOrderInput | SortOrder
    sentAt?: SortOrderInput | SortOrder
    deliveredAt?: SortOrderInput | SortOrder
    readAt?: SortOrderInput | SortOrder
    failedAt?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CommunicationCountOrderByAggregateInput
    _max?: CommunicationMaxOrderByAggregateInput
    _min?: CommunicationMinOrderByAggregateInput
  }

  export type CommunicationScalarWhereWithAggregatesInput = {
    AND?: CommunicationScalarWhereWithAggregatesInput | CommunicationScalarWhereWithAggregatesInput[]
    OR?: CommunicationScalarWhereWithAggregatesInput[]
    NOT?: CommunicationScalarWhereWithAggregatesInput | CommunicationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Communication"> | string
    customerId?: StringWithAggregatesFilter<"Communication"> | string
    type?: StringWithAggregatesFilter<"Communication"> | string
    direction?: StringWithAggregatesFilter<"Communication"> | string
    subject?: StringNullableWithAggregatesFilter<"Communication"> | string | null
    content?: StringWithAggregatesFilter<"Communication"> | string
    status?: StringWithAggregatesFilter<"Communication"> | string
    metadata?: JsonNullableWithAggregatesFilter<"Communication">
    sentAt?: DateTimeNullableWithAggregatesFilter<"Communication"> | Date | string | null
    deliveredAt?: DateTimeNullableWithAggregatesFilter<"Communication"> | Date | string | null
    readAt?: DateTimeNullableWithAggregatesFilter<"Communication"> | Date | string | null
    failedAt?: DateTimeNullableWithAggregatesFilter<"Communication"> | Date | string | null
    error?: StringNullableWithAggregatesFilter<"Communication"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Communication"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Communication"> | Date | string
  }

  export type CustomerNoteWhereInput = {
    AND?: CustomerNoteWhereInput | CustomerNoteWhereInput[]
    OR?: CustomerNoteWhereInput[]
    NOT?: CustomerNoteWhereInput | CustomerNoteWhereInput[]
    id?: StringFilter<"CustomerNote"> | string
    customerId?: StringFilter<"CustomerNote"> | string
    content?: StringFilter<"CustomerNote"> | string
    type?: StringFilter<"CustomerNote"> | string
    authorId?: StringFilter<"CustomerNote"> | string
    isInternal?: BoolFilter<"CustomerNote"> | boolean
    isPinned?: BoolFilter<"CustomerNote"> | boolean
    createdAt?: DateTimeFilter<"CustomerNote"> | Date | string
    updatedAt?: DateTimeFilter<"CustomerNote"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
  }

  export type CustomerNoteOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    authorId?: SortOrder
    isInternal?: SortOrder
    isPinned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
  }

  export type CustomerNoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomerNoteWhereInput | CustomerNoteWhereInput[]
    OR?: CustomerNoteWhereInput[]
    NOT?: CustomerNoteWhereInput | CustomerNoteWhereInput[]
    customerId?: StringFilter<"CustomerNote"> | string
    content?: StringFilter<"CustomerNote"> | string
    type?: StringFilter<"CustomerNote"> | string
    authorId?: StringFilter<"CustomerNote"> | string
    isInternal?: BoolFilter<"CustomerNote"> | boolean
    isPinned?: BoolFilter<"CustomerNote"> | boolean
    createdAt?: DateTimeFilter<"CustomerNote"> | Date | string
    updatedAt?: DateTimeFilter<"CustomerNote"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
  }, "id">

  export type CustomerNoteOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    authorId?: SortOrder
    isInternal?: SortOrder
    isPinned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerNoteCountOrderByAggregateInput
    _max?: CustomerNoteMaxOrderByAggregateInput
    _min?: CustomerNoteMinOrderByAggregateInput
  }

  export type CustomerNoteScalarWhereWithAggregatesInput = {
    AND?: CustomerNoteScalarWhereWithAggregatesInput | CustomerNoteScalarWhereWithAggregatesInput[]
    OR?: CustomerNoteScalarWhereWithAggregatesInput[]
    NOT?: CustomerNoteScalarWhereWithAggregatesInput | CustomerNoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CustomerNote"> | string
    customerId?: StringWithAggregatesFilter<"CustomerNote"> | string
    content?: StringWithAggregatesFilter<"CustomerNote"> | string
    type?: StringWithAggregatesFilter<"CustomerNote"> | string
    authorId?: StringWithAggregatesFilter<"CustomerNote"> | string
    isInternal?: BoolWithAggregatesFilter<"CustomerNote"> | boolean
    isPinned?: BoolWithAggregatesFilter<"CustomerNote"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"CustomerNote"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CustomerNote"> | Date | string
  }

  export type CustomerActivityWhereInput = {
    AND?: CustomerActivityWhereInput | CustomerActivityWhereInput[]
    OR?: CustomerActivityWhereInput[]
    NOT?: CustomerActivityWhereInput | CustomerActivityWhereInput[]
    id?: StringFilter<"CustomerActivity"> | string
    customerId?: StringFilter<"CustomerActivity"> | string
    action?: StringFilter<"CustomerActivity"> | string
    resource?: StringNullableFilter<"CustomerActivity"> | string | null
    resourceId?: StringNullableFilter<"CustomerActivity"> | string | null
    metadata?: JsonNullableFilter<"CustomerActivity">
    ipAddress?: StringNullableFilter<"CustomerActivity"> | string | null
    userAgent?: StringNullableFilter<"CustomerActivity"> | string | null
    createdAt?: DateTimeFilter<"CustomerActivity"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
  }

  export type CustomerActivityOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    action?: SortOrder
    resource?: SortOrderInput | SortOrder
    resourceId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
  }

  export type CustomerActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomerActivityWhereInput | CustomerActivityWhereInput[]
    OR?: CustomerActivityWhereInput[]
    NOT?: CustomerActivityWhereInput | CustomerActivityWhereInput[]
    customerId?: StringFilter<"CustomerActivity"> | string
    action?: StringFilter<"CustomerActivity"> | string
    resource?: StringNullableFilter<"CustomerActivity"> | string | null
    resourceId?: StringNullableFilter<"CustomerActivity"> | string | null
    metadata?: JsonNullableFilter<"CustomerActivity">
    ipAddress?: StringNullableFilter<"CustomerActivity"> | string | null
    userAgent?: StringNullableFilter<"CustomerActivity"> | string | null
    createdAt?: DateTimeFilter<"CustomerActivity"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
  }, "id">

  export type CustomerActivityOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    action?: SortOrder
    resource?: SortOrderInput | SortOrder
    resourceId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CustomerActivityCountOrderByAggregateInput
    _max?: CustomerActivityMaxOrderByAggregateInput
    _min?: CustomerActivityMinOrderByAggregateInput
  }

  export type CustomerActivityScalarWhereWithAggregatesInput = {
    AND?: CustomerActivityScalarWhereWithAggregatesInput | CustomerActivityScalarWhereWithAggregatesInput[]
    OR?: CustomerActivityScalarWhereWithAggregatesInput[]
    NOT?: CustomerActivityScalarWhereWithAggregatesInput | CustomerActivityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CustomerActivity"> | string
    customerId?: StringWithAggregatesFilter<"CustomerActivity"> | string
    action?: StringWithAggregatesFilter<"CustomerActivity"> | string
    resource?: StringNullableWithAggregatesFilter<"CustomerActivity"> | string | null
    resourceId?: StringNullableWithAggregatesFilter<"CustomerActivity"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"CustomerActivity">
    ipAddress?: StringNullableWithAggregatesFilter<"CustomerActivity"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"CustomerActivity"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CustomerActivity"> | Date | string
  }

  export type CustomerSegmentWhereInput = {
    AND?: CustomerSegmentWhereInput | CustomerSegmentWhereInput[]
    OR?: CustomerSegmentWhereInput[]
    NOT?: CustomerSegmentWhereInput | CustomerSegmentWhereInput[]
    id?: StringFilter<"CustomerSegment"> | string
    name?: StringFilter<"CustomerSegment"> | string
    description?: StringNullableFilter<"CustomerSegment"> | string | null
    criteria?: JsonFilter<"CustomerSegment">
    createdAt?: DateTimeFilter<"CustomerSegment"> | Date | string
    updatedAt?: DateTimeFilter<"CustomerSegment"> | Date | string
  }

  export type CustomerSegmentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    criteria?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerSegmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CustomerSegmentWhereInput | CustomerSegmentWhereInput[]
    OR?: CustomerSegmentWhereInput[]
    NOT?: CustomerSegmentWhereInput | CustomerSegmentWhereInput[]
    description?: StringNullableFilter<"CustomerSegment"> | string | null
    criteria?: JsonFilter<"CustomerSegment">
    createdAt?: DateTimeFilter<"CustomerSegment"> | Date | string
    updatedAt?: DateTimeFilter<"CustomerSegment"> | Date | string
  }, "id" | "name">

  export type CustomerSegmentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    criteria?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerSegmentCountOrderByAggregateInput
    _max?: CustomerSegmentMaxOrderByAggregateInput
    _min?: CustomerSegmentMinOrderByAggregateInput
  }

  export type CustomerSegmentScalarWhereWithAggregatesInput = {
    AND?: CustomerSegmentScalarWhereWithAggregatesInput | CustomerSegmentScalarWhereWithAggregatesInput[]
    OR?: CustomerSegmentScalarWhereWithAggregatesInput[]
    NOT?: CustomerSegmentScalarWhereWithAggregatesInput | CustomerSegmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CustomerSegment"> | string
    name?: StringWithAggregatesFilter<"CustomerSegment"> | string
    description?: StringNullableWithAggregatesFilter<"CustomerSegment"> | string | null
    criteria?: JsonWithAggregatesFilter<"CustomerSegment">
    createdAt?: DateTimeWithAggregatesFilter<"CustomerSegment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CustomerSegment"> | Date | string
  }

  export type CustomerSegmentAssignmentWhereInput = {
    AND?: CustomerSegmentAssignmentWhereInput | CustomerSegmentAssignmentWhereInput[]
    OR?: CustomerSegmentAssignmentWhereInput[]
    NOT?: CustomerSegmentAssignmentWhereInput | CustomerSegmentAssignmentWhereInput[]
    id?: StringFilter<"CustomerSegmentAssignment"> | string
    customerId?: StringFilter<"CustomerSegmentAssignment"> | string
    segmentId?: StringFilter<"CustomerSegmentAssignment"> | string
    assignedAt?: DateTimeFilter<"CustomerSegmentAssignment"> | Date | string
  }

  export type CustomerSegmentAssignmentOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    segmentId?: SortOrder
    assignedAt?: SortOrder
  }

  export type CustomerSegmentAssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    customerId_segmentId?: CustomerSegmentAssignmentCustomerIdSegmentIdCompoundUniqueInput
    AND?: CustomerSegmentAssignmentWhereInput | CustomerSegmentAssignmentWhereInput[]
    OR?: CustomerSegmentAssignmentWhereInput[]
    NOT?: CustomerSegmentAssignmentWhereInput | CustomerSegmentAssignmentWhereInput[]
    customerId?: StringFilter<"CustomerSegmentAssignment"> | string
    segmentId?: StringFilter<"CustomerSegmentAssignment"> | string
    assignedAt?: DateTimeFilter<"CustomerSegmentAssignment"> | Date | string
  }, "id" | "customerId_segmentId">

  export type CustomerSegmentAssignmentOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    segmentId?: SortOrder
    assignedAt?: SortOrder
    _count?: CustomerSegmentAssignmentCountOrderByAggregateInput
    _max?: CustomerSegmentAssignmentMaxOrderByAggregateInput
    _min?: CustomerSegmentAssignmentMinOrderByAggregateInput
  }

  export type CustomerSegmentAssignmentScalarWhereWithAggregatesInput = {
    AND?: CustomerSegmentAssignmentScalarWhereWithAggregatesInput | CustomerSegmentAssignmentScalarWhereWithAggregatesInput[]
    OR?: CustomerSegmentAssignmentScalarWhereWithAggregatesInput[]
    NOT?: CustomerSegmentAssignmentScalarWhereWithAggregatesInput | CustomerSegmentAssignmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CustomerSegmentAssignment"> | string
    customerId?: StringWithAggregatesFilter<"CustomerSegmentAssignment"> | string
    segmentId?: StringWithAggregatesFilter<"CustomerSegmentAssignment"> | string
    assignedAt?: DateTimeWithAggregatesFilter<"CustomerSegmentAssignment"> | Date | string
  }

  export type SupportMessageWhereInput = {
    AND?: SupportMessageWhereInput | SupportMessageWhereInput[]
    OR?: SupportMessageWhereInput[]
    NOT?: SupportMessageWhereInput | SupportMessageWhereInput[]
    id?: StringFilter<"SupportMessage"> | string
    customerId?: StringNullableFilter<"SupportMessage"> | string | null
    customerName?: StringFilter<"SupportMessage"> | string
    customerEmail?: StringFilter<"SupportMessage"> | string
    customerPhone?: StringNullableFilter<"SupportMessage"> | string | null
    subject?: StringFilter<"SupportMessage"> | string
    body?: StringFilter<"SupportMessage"> | string
    status?: StringFilter<"SupportMessage"> | string
    priority?: StringFilter<"SupportMessage"> | string
    orderId?: StringNullableFilter<"SupportMessage"> | string | null
    orderNumber?: StringNullableFilter<"SupportMessage"> | string | null
    assignedTo?: StringNullableFilter<"SupportMessage"> | string | null
    assignedToName?: StringNullableFilter<"SupportMessage"> | string | null
    resolvedAt?: DateTimeNullableFilter<"SupportMessage"> | Date | string | null
    createdAt?: DateTimeFilter<"SupportMessage"> | Date | string
    updatedAt?: DateTimeFilter<"SupportMessage"> | Date | string
    replies?: SupportMessageReplyListRelationFilter
  }

  export type SupportMessageOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrderInput | SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerPhone?: SortOrderInput | SortOrder
    subject?: SortOrder
    body?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    orderId?: SortOrderInput | SortOrder
    orderNumber?: SortOrderInput | SortOrder
    assignedTo?: SortOrderInput | SortOrder
    assignedToName?: SortOrderInput | SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    replies?: SupportMessageReplyOrderByRelationAggregateInput
  }

  export type SupportMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SupportMessageWhereInput | SupportMessageWhereInput[]
    OR?: SupportMessageWhereInput[]
    NOT?: SupportMessageWhereInput | SupportMessageWhereInput[]
    customerId?: StringNullableFilter<"SupportMessage"> | string | null
    customerName?: StringFilter<"SupportMessage"> | string
    customerEmail?: StringFilter<"SupportMessage"> | string
    customerPhone?: StringNullableFilter<"SupportMessage"> | string | null
    subject?: StringFilter<"SupportMessage"> | string
    body?: StringFilter<"SupportMessage"> | string
    status?: StringFilter<"SupportMessage"> | string
    priority?: StringFilter<"SupportMessage"> | string
    orderId?: StringNullableFilter<"SupportMessage"> | string | null
    orderNumber?: StringNullableFilter<"SupportMessage"> | string | null
    assignedTo?: StringNullableFilter<"SupportMessage"> | string | null
    assignedToName?: StringNullableFilter<"SupportMessage"> | string | null
    resolvedAt?: DateTimeNullableFilter<"SupportMessage"> | Date | string | null
    createdAt?: DateTimeFilter<"SupportMessage"> | Date | string
    updatedAt?: DateTimeFilter<"SupportMessage"> | Date | string
    replies?: SupportMessageReplyListRelationFilter
  }, "id">

  export type SupportMessageOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrderInput | SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerPhone?: SortOrderInput | SortOrder
    subject?: SortOrder
    body?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    orderId?: SortOrderInput | SortOrder
    orderNumber?: SortOrderInput | SortOrder
    assignedTo?: SortOrderInput | SortOrder
    assignedToName?: SortOrderInput | SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SupportMessageCountOrderByAggregateInput
    _max?: SupportMessageMaxOrderByAggregateInput
    _min?: SupportMessageMinOrderByAggregateInput
  }

  export type SupportMessageScalarWhereWithAggregatesInput = {
    AND?: SupportMessageScalarWhereWithAggregatesInput | SupportMessageScalarWhereWithAggregatesInput[]
    OR?: SupportMessageScalarWhereWithAggregatesInput[]
    NOT?: SupportMessageScalarWhereWithAggregatesInput | SupportMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SupportMessage"> | string
    customerId?: StringNullableWithAggregatesFilter<"SupportMessage"> | string | null
    customerName?: StringWithAggregatesFilter<"SupportMessage"> | string
    customerEmail?: StringWithAggregatesFilter<"SupportMessage"> | string
    customerPhone?: StringNullableWithAggregatesFilter<"SupportMessage"> | string | null
    subject?: StringWithAggregatesFilter<"SupportMessage"> | string
    body?: StringWithAggregatesFilter<"SupportMessage"> | string
    status?: StringWithAggregatesFilter<"SupportMessage"> | string
    priority?: StringWithAggregatesFilter<"SupportMessage"> | string
    orderId?: StringNullableWithAggregatesFilter<"SupportMessage"> | string | null
    orderNumber?: StringNullableWithAggregatesFilter<"SupportMessage"> | string | null
    assignedTo?: StringNullableWithAggregatesFilter<"SupportMessage"> | string | null
    assignedToName?: StringNullableWithAggregatesFilter<"SupportMessage"> | string | null
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"SupportMessage"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SupportMessage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SupportMessage"> | Date | string
  }

  export type SupportMessageReplyWhereInput = {
    AND?: SupportMessageReplyWhereInput | SupportMessageReplyWhereInput[]
    OR?: SupportMessageReplyWhereInput[]
    NOT?: SupportMessageReplyWhereInput | SupportMessageReplyWhereInput[]
    id?: StringFilter<"SupportMessageReply"> | string
    messageId?: StringFilter<"SupportMessageReply"> | string
    body?: StringFilter<"SupportMessageReply"> | string
    authorId?: StringFilter<"SupportMessageReply"> | string
    authorName?: StringNullableFilter<"SupportMessageReply"> | string | null
    isInternal?: BoolFilter<"SupportMessageReply"> | boolean
    createdAt?: DateTimeFilter<"SupportMessageReply"> | Date | string
    message?: XOR<SupportMessageScalarRelationFilter, SupportMessageWhereInput>
  }

  export type SupportMessageReplyOrderByWithRelationInput = {
    id?: SortOrder
    messageId?: SortOrder
    body?: SortOrder
    authorId?: SortOrder
    authorName?: SortOrderInput | SortOrder
    isInternal?: SortOrder
    createdAt?: SortOrder
    message?: SupportMessageOrderByWithRelationInput
  }

  export type SupportMessageReplyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SupportMessageReplyWhereInput | SupportMessageReplyWhereInput[]
    OR?: SupportMessageReplyWhereInput[]
    NOT?: SupportMessageReplyWhereInput | SupportMessageReplyWhereInput[]
    messageId?: StringFilter<"SupportMessageReply"> | string
    body?: StringFilter<"SupportMessageReply"> | string
    authorId?: StringFilter<"SupportMessageReply"> | string
    authorName?: StringNullableFilter<"SupportMessageReply"> | string | null
    isInternal?: BoolFilter<"SupportMessageReply"> | boolean
    createdAt?: DateTimeFilter<"SupportMessageReply"> | Date | string
    message?: XOR<SupportMessageScalarRelationFilter, SupportMessageWhereInput>
  }, "id">

  export type SupportMessageReplyOrderByWithAggregationInput = {
    id?: SortOrder
    messageId?: SortOrder
    body?: SortOrder
    authorId?: SortOrder
    authorName?: SortOrderInput | SortOrder
    isInternal?: SortOrder
    createdAt?: SortOrder
    _count?: SupportMessageReplyCountOrderByAggregateInput
    _max?: SupportMessageReplyMaxOrderByAggregateInput
    _min?: SupportMessageReplyMinOrderByAggregateInput
  }

  export type SupportMessageReplyScalarWhereWithAggregatesInput = {
    AND?: SupportMessageReplyScalarWhereWithAggregatesInput | SupportMessageReplyScalarWhereWithAggregatesInput[]
    OR?: SupportMessageReplyScalarWhereWithAggregatesInput[]
    NOT?: SupportMessageReplyScalarWhereWithAggregatesInput | SupportMessageReplyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SupportMessageReply"> | string
    messageId?: StringWithAggregatesFilter<"SupportMessageReply"> | string
    body?: StringWithAggregatesFilter<"SupportMessageReply"> | string
    authorId?: StringWithAggregatesFilter<"SupportMessageReply"> | string
    authorName?: StringNullableWithAggregatesFilter<"SupportMessageReply"> | string | null
    isInternal?: BoolWithAggregatesFilter<"SupportMessageReply"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"SupportMessageReply"> | Date | string
  }

  export type CustomerCreateInput = {
    id?: string
    userId: string
    email: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    language?: string
    timezone?: string
    currency?: string
    loyaltyPoints?: number
    loyaltyTier?: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    loginCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    preferences?: CustomerPreferenceCreateNestedOneWithoutCustomerInput
    addresses?: AddressCreateNestedManyWithoutCustomerInput
    communications?: CommunicationCreateNestedManyWithoutCustomerInput
    notes?: CustomerNoteCreateNestedManyWithoutCustomerInput
    activities?: CustomerActivityCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: string
    userId: string
    email: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    language?: string
    timezone?: string
    currency?: string
    loyaltyPoints?: number
    loyaltyTier?: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    loginCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    preferences?: CustomerPreferenceUncheckedCreateNestedOneWithoutCustomerInput
    addresses?: AddressUncheckedCreateNestedManyWithoutCustomerInput
    communications?: CommunicationUncheckedCreateNestedManyWithoutCustomerInput
    notes?: CustomerNoteUncheckedCreateNestedManyWithoutCustomerInput
    activities?: CustomerActivityUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    loyaltyPoints?: IntFieldUpdateOperationsInput | number
    loyaltyTier?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: CustomerPreferenceUpdateOneWithoutCustomerNestedInput
    addresses?: AddressUpdateManyWithoutCustomerNestedInput
    communications?: CommunicationUpdateManyWithoutCustomerNestedInput
    notes?: CustomerNoteUpdateManyWithoutCustomerNestedInput
    activities?: CustomerActivityUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    loyaltyPoints?: IntFieldUpdateOperationsInput | number
    loyaltyTier?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: CustomerPreferenceUncheckedUpdateOneWithoutCustomerNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutCustomerNestedInput
    communications?: CommunicationUncheckedUpdateManyWithoutCustomerNestedInput
    notes?: CustomerNoteUncheckedUpdateManyWithoutCustomerNestedInput
    activities?: CustomerActivityUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    id?: string
    userId: string
    email: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    language?: string
    timezone?: string
    currency?: string
    loyaltyPoints?: number
    loyaltyTier?: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    loginCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    loyaltyPoints?: IntFieldUpdateOperationsInput | number
    loyaltyTier?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    loyaltyPoints?: IntFieldUpdateOperationsInput | number
    loyaltyTier?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerPreferenceCreateInput = {
    id?: string
    emailNotifications?: boolean
    smsNotifications?: boolean
    pushNotifications?: boolean
    marketingEmails?: boolean
    dataSharingConsent?: boolean
    cookieConsent?: boolean
    preferredCategories?: CustomerPreferenceCreatepreferredCategoriesInput | string[]
    preferredBrands?: CustomerPreferenceCreatepreferredBrandsInput | string[]
    productViewHistory?: NullableJsonNullValueInput | InputJsonValue
    searchHistory?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutPreferencesInput
  }

  export type CustomerPreferenceUncheckedCreateInput = {
    id?: string
    customerId: string
    emailNotifications?: boolean
    smsNotifications?: boolean
    pushNotifications?: boolean
    marketingEmails?: boolean
    dataSharingConsent?: boolean
    cookieConsent?: boolean
    preferredCategories?: CustomerPreferenceCreatepreferredCategoriesInput | string[]
    preferredBrands?: CustomerPreferenceCreatepreferredBrandsInput | string[]
    productViewHistory?: NullableJsonNullValueInput | InputJsonValue
    searchHistory?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerPreferenceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    smsNotifications?: BoolFieldUpdateOperationsInput | boolean
    pushNotifications?: BoolFieldUpdateOperationsInput | boolean
    marketingEmails?: BoolFieldUpdateOperationsInput | boolean
    dataSharingConsent?: BoolFieldUpdateOperationsInput | boolean
    cookieConsent?: BoolFieldUpdateOperationsInput | boolean
    preferredCategories?: CustomerPreferenceUpdatepreferredCategoriesInput | string[]
    preferredBrands?: CustomerPreferenceUpdatepreferredBrandsInput | string[]
    productViewHistory?: NullableJsonNullValueInput | InputJsonValue
    searchHistory?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutPreferencesNestedInput
  }

  export type CustomerPreferenceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    smsNotifications?: BoolFieldUpdateOperationsInput | boolean
    pushNotifications?: BoolFieldUpdateOperationsInput | boolean
    marketingEmails?: BoolFieldUpdateOperationsInput | boolean
    dataSharingConsent?: BoolFieldUpdateOperationsInput | boolean
    cookieConsent?: BoolFieldUpdateOperationsInput | boolean
    preferredCategories?: CustomerPreferenceUpdatepreferredCategoriesInput | string[]
    preferredBrands?: CustomerPreferenceUpdatepreferredBrandsInput | string[]
    productViewHistory?: NullableJsonNullValueInput | InputJsonValue
    searchHistory?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerPreferenceCreateManyInput = {
    id?: string
    customerId: string
    emailNotifications?: boolean
    smsNotifications?: boolean
    pushNotifications?: boolean
    marketingEmails?: boolean
    dataSharingConsent?: boolean
    cookieConsent?: boolean
    preferredCategories?: CustomerPreferenceCreatepreferredCategoriesInput | string[]
    preferredBrands?: CustomerPreferenceCreatepreferredBrandsInput | string[]
    productViewHistory?: NullableJsonNullValueInput | InputJsonValue
    searchHistory?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerPreferenceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    smsNotifications?: BoolFieldUpdateOperationsInput | boolean
    pushNotifications?: BoolFieldUpdateOperationsInput | boolean
    marketingEmails?: BoolFieldUpdateOperationsInput | boolean
    dataSharingConsent?: BoolFieldUpdateOperationsInput | boolean
    cookieConsent?: BoolFieldUpdateOperationsInput | boolean
    preferredCategories?: CustomerPreferenceUpdatepreferredCategoriesInput | string[]
    preferredBrands?: CustomerPreferenceUpdatepreferredBrandsInput | string[]
    productViewHistory?: NullableJsonNullValueInput | InputJsonValue
    searchHistory?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerPreferenceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    smsNotifications?: BoolFieldUpdateOperationsInput | boolean
    pushNotifications?: BoolFieldUpdateOperationsInput | boolean
    marketingEmails?: BoolFieldUpdateOperationsInput | boolean
    dataSharingConsent?: BoolFieldUpdateOperationsInput | boolean
    cookieConsent?: BoolFieldUpdateOperationsInput | boolean
    preferredCategories?: CustomerPreferenceUpdatepreferredCategoriesInput | string[]
    preferredBrands?: CustomerPreferenceUpdatepreferredBrandsInput | string[]
    productViewHistory?: NullableJsonNullValueInput | InputJsonValue
    searchHistory?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressCreateInput = {
    id?: string
    label: string
    type?: string
    line1: string
    line2?: string | null
    city: string
    state?: string | null
    postalCode: string
    country: string
    phone?: string | null
    isDefault?: boolean
    isActive?: boolean
    latitude?: number | null
    longitude?: number | null
    deliveryInstructions?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutAddressesInput
  }

  export type AddressUncheckedCreateInput = {
    id?: string
    customerId: string
    label: string
    type?: string
    line1: string
    line2?: string | null
    city: string
    state?: string | null
    postalCode: string
    country: string
    phone?: string | null
    isDefault?: boolean
    isActive?: boolean
    latitude?: number | null
    longitude?: number | null
    deliveryInstructions?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutAddressesNestedInput
  }

  export type AddressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressCreateManyInput = {
    id?: string
    customerId: string
    label: string
    type?: string
    line1: string
    line2?: string | null
    city: string
    state?: string | null
    postalCode: string
    country: string
    phone?: string | null
    isDefault?: boolean
    isActive?: boolean
    latitude?: number | null
    longitude?: number | null
    deliveryInstructions?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommunicationCreateInput = {
    id?: string
    type: string
    direction: string
    subject?: string | null
    content: string
    status: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: Date | string | null
    deliveredAt?: Date | string | null
    readAt?: Date | string | null
    failedAt?: Date | string | null
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutCommunicationsInput
  }

  export type CommunicationUncheckedCreateInput = {
    id?: string
    customerId: string
    type: string
    direction: string
    subject?: string | null
    content: string
    status: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: Date | string | null
    deliveredAt?: Date | string | null
    readAt?: Date | string | null
    failedAt?: Date | string | null
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommunicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutCommunicationsNestedInput
  }

  export type CommunicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommunicationCreateManyInput = {
    id?: string
    customerId: string
    type: string
    direction: string
    subject?: string | null
    content: string
    status: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: Date | string | null
    deliveredAt?: Date | string | null
    readAt?: Date | string | null
    failedAt?: Date | string | null
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommunicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommunicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerNoteCreateInput = {
    id?: string
    content: string
    type: string
    authorId: string
    isInternal?: boolean
    isPinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutNotesInput
  }

  export type CustomerNoteUncheckedCreateInput = {
    id?: string
    customerId: string
    content: string
    type: string
    authorId: string
    isInternal?: boolean
    isPinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerNoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutNotesNestedInput
  }

  export type CustomerNoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerNoteCreateManyInput = {
    id?: string
    customerId: string
    content: string
    type: string
    authorId: string
    isInternal?: boolean
    isPinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerNoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerNoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerActivityCreateInput = {
    id?: string
    action: string
    resource?: string | null
    resourceId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    customer: CustomerCreateNestedOneWithoutActivitiesInput
  }

  export type CustomerActivityUncheckedCreateInput = {
    id?: string
    customerId: string
    action: string
    resource?: string | null
    resourceId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type CustomerActivityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutActivitiesNestedInput
  }

  export type CustomerActivityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerActivityCreateManyInput = {
    id?: string
    customerId: string
    action: string
    resource?: string | null
    resourceId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type CustomerActivityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerActivityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerSegmentCreateInput = {
    id?: string
    name: string
    description?: string | null
    criteria: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerSegmentUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    criteria: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerSegmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    criteria?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerSegmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    criteria?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerSegmentCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    criteria: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerSegmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    criteria?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerSegmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    criteria?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerSegmentAssignmentCreateInput = {
    id?: string
    customerId: string
    segmentId: string
    assignedAt?: Date | string
  }

  export type CustomerSegmentAssignmentUncheckedCreateInput = {
    id?: string
    customerId: string
    segmentId: string
    assignedAt?: Date | string
  }

  export type CustomerSegmentAssignmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    segmentId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerSegmentAssignmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    segmentId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerSegmentAssignmentCreateManyInput = {
    id?: string
    customerId: string
    segmentId: string
    assignedAt?: Date | string
  }

  export type CustomerSegmentAssignmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    segmentId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerSegmentAssignmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    segmentId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportMessageCreateInput = {
    id?: string
    customerId?: string | null
    customerName: string
    customerEmail: string
    customerPhone?: string | null
    subject: string
    body: string
    status?: string
    priority?: string
    orderId?: string | null
    orderNumber?: string | null
    assignedTo?: string | null
    assignedToName?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: SupportMessageReplyCreateNestedManyWithoutMessageInput
  }

  export type SupportMessageUncheckedCreateInput = {
    id?: string
    customerId?: string | null
    customerName: string
    customerEmail: string
    customerPhone?: string | null
    subject: string
    body: string
    status?: string
    priority?: string
    orderId?: string | null
    orderNumber?: string | null
    assignedTo?: string | null
    assignedToName?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: SupportMessageReplyUncheckedCreateNestedManyWithoutMessageInput
  }

  export type SupportMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    orderNumber?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    assignedToName?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: SupportMessageReplyUpdateManyWithoutMessageNestedInput
  }

  export type SupportMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    orderNumber?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    assignedToName?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: SupportMessageReplyUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type SupportMessageCreateManyInput = {
    id?: string
    customerId?: string | null
    customerName: string
    customerEmail: string
    customerPhone?: string | null
    subject: string
    body: string
    status?: string
    priority?: string
    orderId?: string | null
    orderNumber?: string | null
    assignedTo?: string | null
    assignedToName?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupportMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    orderNumber?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    assignedToName?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    orderNumber?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    assignedToName?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportMessageReplyCreateInput = {
    id?: string
    body: string
    authorId: string
    authorName?: string | null
    isInternal?: boolean
    createdAt?: Date | string
    message: SupportMessageCreateNestedOneWithoutRepliesInput
  }

  export type SupportMessageReplyUncheckedCreateInput = {
    id?: string
    messageId: string
    body: string
    authorId: string
    authorName?: string | null
    isInternal?: boolean
    createdAt?: Date | string
  }

  export type SupportMessageReplyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    message?: SupportMessageUpdateOneRequiredWithoutRepliesNestedInput
  }

  export type SupportMessageReplyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportMessageReplyCreateManyInput = {
    id?: string
    messageId: string
    body: string
    authorId: string
    authorName?: string | null
    isInternal?: boolean
    createdAt?: Date | string
  }

  export type SupportMessageReplyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportMessageReplyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type CustomerPreferenceNullableScalarRelationFilter = {
    is?: CustomerPreferenceWhereInput | null
    isNot?: CustomerPreferenceWhereInput | null
  }

  export type AddressListRelationFilter = {
    every?: AddressWhereInput
    some?: AddressWhereInput
    none?: AddressWhereInput
  }

  export type CommunicationListRelationFilter = {
    every?: CommunicationWhereInput
    some?: CommunicationWhereInput
    none?: CommunicationWhereInput
  }

  export type CustomerNoteListRelationFilter = {
    every?: CustomerNoteWhereInput
    some?: CustomerNoteWhereInput
    none?: CustomerNoteWhereInput
  }

  export type CustomerActivityListRelationFilter = {
    every?: CustomerActivityWhereInput
    some?: CustomerActivityWhereInput
    none?: CustomerActivityWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AddressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommunicationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerNoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerActivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    avatar?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    language?: SortOrder
    timezone?: SortOrder
    currency?: SortOrder
    loyaltyPoints?: SortOrder
    loyaltyTier?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    loginCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerAvgOrderByAggregateInput = {
    loyaltyPoints?: SortOrder
    loginCount?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    avatar?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    language?: SortOrder
    timezone?: SortOrder
    currency?: SortOrder
    loyaltyPoints?: SortOrder
    loyaltyTier?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    loginCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    avatar?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    language?: SortOrder
    timezone?: SortOrder
    currency?: SortOrder
    loyaltyPoints?: SortOrder
    loyaltyTier?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    loginCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerSumOrderByAggregateInput = {
    loyaltyPoints?: SortOrder
    loginCount?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
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

  export type CustomerScalarRelationFilter = {
    is?: CustomerWhereInput
    isNot?: CustomerWhereInput
  }

  export type CustomerPreferenceCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    emailNotifications?: SortOrder
    smsNotifications?: SortOrder
    pushNotifications?: SortOrder
    marketingEmails?: SortOrder
    dataSharingConsent?: SortOrder
    cookieConsent?: SortOrder
    preferredCategories?: SortOrder
    preferredBrands?: SortOrder
    productViewHistory?: SortOrder
    searchHistory?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerPreferenceMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    emailNotifications?: SortOrder
    smsNotifications?: SortOrder
    pushNotifications?: SortOrder
    marketingEmails?: SortOrder
    dataSharingConsent?: SortOrder
    cookieConsent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerPreferenceMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    emailNotifications?: SortOrder
    smsNotifications?: SortOrder
    pushNotifications?: SortOrder
    marketingEmails?: SortOrder
    dataSharingConsent?: SortOrder
    cookieConsent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type AddressCustomerIdLabelCompoundUniqueInput = {
    customerId: string
    label: string
  }

  export type AddressCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    label?: SortOrder
    type?: SortOrder
    line1?: SortOrder
    line2?: SortOrder
    city?: SortOrder
    state?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    phone?: SortOrder
    isDefault?: SortOrder
    isActive?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    deliveryInstructions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AddressAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type AddressMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    label?: SortOrder
    type?: SortOrder
    line1?: SortOrder
    line2?: SortOrder
    city?: SortOrder
    state?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    phone?: SortOrder
    isDefault?: SortOrder
    isActive?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    deliveryInstructions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AddressMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    label?: SortOrder
    type?: SortOrder
    line1?: SortOrder
    line2?: SortOrder
    city?: SortOrder
    state?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    phone?: SortOrder
    isDefault?: SortOrder
    isActive?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    deliveryInstructions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AddressSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type CommunicationCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    type?: SortOrder
    direction?: SortOrder
    subject?: SortOrder
    content?: SortOrder
    status?: SortOrder
    metadata?: SortOrder
    sentAt?: SortOrder
    deliveredAt?: SortOrder
    readAt?: SortOrder
    failedAt?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommunicationMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    type?: SortOrder
    direction?: SortOrder
    subject?: SortOrder
    content?: SortOrder
    status?: SortOrder
    sentAt?: SortOrder
    deliveredAt?: SortOrder
    readAt?: SortOrder
    failedAt?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommunicationMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    type?: SortOrder
    direction?: SortOrder
    subject?: SortOrder
    content?: SortOrder
    status?: SortOrder
    sentAt?: SortOrder
    deliveredAt?: SortOrder
    readAt?: SortOrder
    failedAt?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerNoteCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    authorId?: SortOrder
    isInternal?: SortOrder
    isPinned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerNoteMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    authorId?: SortOrder
    isInternal?: SortOrder
    isPinned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerNoteMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    content?: SortOrder
    type?: SortOrder
    authorId?: SortOrder
    isInternal?: SortOrder
    isPinned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerActivityCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrder
    metadata?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type CustomerActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type CustomerActivityMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
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

  export type CustomerSegmentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    criteria?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerSegmentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerSegmentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type CustomerSegmentAssignmentCustomerIdSegmentIdCompoundUniqueInput = {
    customerId: string
    segmentId: string
  }

  export type CustomerSegmentAssignmentCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    segmentId?: SortOrder
    assignedAt?: SortOrder
  }

  export type CustomerSegmentAssignmentMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    segmentId?: SortOrder
    assignedAt?: SortOrder
  }

  export type CustomerSegmentAssignmentMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    segmentId?: SortOrder
    assignedAt?: SortOrder
  }

  export type SupportMessageReplyListRelationFilter = {
    every?: SupportMessageReplyWhereInput
    some?: SupportMessageReplyWhereInput
    none?: SupportMessageReplyWhereInput
  }

  export type SupportMessageReplyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SupportMessageCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerPhone?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    orderId?: SortOrder
    orderNumber?: SortOrder
    assignedTo?: SortOrder
    assignedToName?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupportMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerPhone?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    orderId?: SortOrder
    orderNumber?: SortOrder
    assignedTo?: SortOrder
    assignedToName?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupportMessageMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerPhone?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    orderId?: SortOrder
    orderNumber?: SortOrder
    assignedTo?: SortOrder
    assignedToName?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupportMessageScalarRelationFilter = {
    is?: SupportMessageWhereInput
    isNot?: SupportMessageWhereInput
  }

  export type SupportMessageReplyCountOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    body?: SortOrder
    authorId?: SortOrder
    authorName?: SortOrder
    isInternal?: SortOrder
    createdAt?: SortOrder
  }

  export type SupportMessageReplyMaxOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    body?: SortOrder
    authorId?: SortOrder
    authorName?: SortOrder
    isInternal?: SortOrder
    createdAt?: SortOrder
  }

  export type SupportMessageReplyMinOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    body?: SortOrder
    authorId?: SortOrder
    authorName?: SortOrder
    isInternal?: SortOrder
    createdAt?: SortOrder
  }

  export type CustomerPreferenceCreateNestedOneWithoutCustomerInput = {
    create?: XOR<CustomerPreferenceCreateWithoutCustomerInput, CustomerPreferenceUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: CustomerPreferenceCreateOrConnectWithoutCustomerInput
    connect?: CustomerPreferenceWhereUniqueInput
  }

  export type AddressCreateNestedManyWithoutCustomerInput = {
    create?: XOR<AddressCreateWithoutCustomerInput, AddressUncheckedCreateWithoutCustomerInput> | AddressCreateWithoutCustomerInput[] | AddressUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutCustomerInput | AddressCreateOrConnectWithoutCustomerInput[]
    createMany?: AddressCreateManyCustomerInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type CommunicationCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CommunicationCreateWithoutCustomerInput, CommunicationUncheckedCreateWithoutCustomerInput> | CommunicationCreateWithoutCustomerInput[] | CommunicationUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CommunicationCreateOrConnectWithoutCustomerInput | CommunicationCreateOrConnectWithoutCustomerInput[]
    createMany?: CommunicationCreateManyCustomerInputEnvelope
    connect?: CommunicationWhereUniqueInput | CommunicationWhereUniqueInput[]
  }

  export type CustomerNoteCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CustomerNoteCreateWithoutCustomerInput, CustomerNoteUncheckedCreateWithoutCustomerInput> | CustomerNoteCreateWithoutCustomerInput[] | CustomerNoteUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerNoteCreateOrConnectWithoutCustomerInput | CustomerNoteCreateOrConnectWithoutCustomerInput[]
    createMany?: CustomerNoteCreateManyCustomerInputEnvelope
    connect?: CustomerNoteWhereUniqueInput | CustomerNoteWhereUniqueInput[]
  }

  export type CustomerActivityCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CustomerActivityCreateWithoutCustomerInput, CustomerActivityUncheckedCreateWithoutCustomerInput> | CustomerActivityCreateWithoutCustomerInput[] | CustomerActivityUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerActivityCreateOrConnectWithoutCustomerInput | CustomerActivityCreateOrConnectWithoutCustomerInput[]
    createMany?: CustomerActivityCreateManyCustomerInputEnvelope
    connect?: CustomerActivityWhereUniqueInput | CustomerActivityWhereUniqueInput[]
  }

  export type CustomerPreferenceUncheckedCreateNestedOneWithoutCustomerInput = {
    create?: XOR<CustomerPreferenceCreateWithoutCustomerInput, CustomerPreferenceUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: CustomerPreferenceCreateOrConnectWithoutCustomerInput
    connect?: CustomerPreferenceWhereUniqueInput
  }

  export type AddressUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<AddressCreateWithoutCustomerInput, AddressUncheckedCreateWithoutCustomerInput> | AddressCreateWithoutCustomerInput[] | AddressUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutCustomerInput | AddressCreateOrConnectWithoutCustomerInput[]
    createMany?: AddressCreateManyCustomerInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type CommunicationUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CommunicationCreateWithoutCustomerInput, CommunicationUncheckedCreateWithoutCustomerInput> | CommunicationCreateWithoutCustomerInput[] | CommunicationUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CommunicationCreateOrConnectWithoutCustomerInput | CommunicationCreateOrConnectWithoutCustomerInput[]
    createMany?: CommunicationCreateManyCustomerInputEnvelope
    connect?: CommunicationWhereUniqueInput | CommunicationWhereUniqueInput[]
  }

  export type CustomerNoteUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CustomerNoteCreateWithoutCustomerInput, CustomerNoteUncheckedCreateWithoutCustomerInput> | CustomerNoteCreateWithoutCustomerInput[] | CustomerNoteUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerNoteCreateOrConnectWithoutCustomerInput | CustomerNoteCreateOrConnectWithoutCustomerInput[]
    createMany?: CustomerNoteCreateManyCustomerInputEnvelope
    connect?: CustomerNoteWhereUniqueInput | CustomerNoteWhereUniqueInput[]
  }

  export type CustomerActivityUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CustomerActivityCreateWithoutCustomerInput, CustomerActivityUncheckedCreateWithoutCustomerInput> | CustomerActivityCreateWithoutCustomerInput[] | CustomerActivityUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerActivityCreateOrConnectWithoutCustomerInput | CustomerActivityCreateOrConnectWithoutCustomerInput[]
    createMany?: CustomerActivityCreateManyCustomerInputEnvelope
    connect?: CustomerActivityWhereUniqueInput | CustomerActivityWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CustomerPreferenceUpdateOneWithoutCustomerNestedInput = {
    create?: XOR<CustomerPreferenceCreateWithoutCustomerInput, CustomerPreferenceUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: CustomerPreferenceCreateOrConnectWithoutCustomerInput
    upsert?: CustomerPreferenceUpsertWithoutCustomerInput
    disconnect?: CustomerPreferenceWhereInput | boolean
    delete?: CustomerPreferenceWhereInput | boolean
    connect?: CustomerPreferenceWhereUniqueInput
    update?: XOR<XOR<CustomerPreferenceUpdateToOneWithWhereWithoutCustomerInput, CustomerPreferenceUpdateWithoutCustomerInput>, CustomerPreferenceUncheckedUpdateWithoutCustomerInput>
  }

  export type AddressUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<AddressCreateWithoutCustomerInput, AddressUncheckedCreateWithoutCustomerInput> | AddressCreateWithoutCustomerInput[] | AddressUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutCustomerInput | AddressCreateOrConnectWithoutCustomerInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutCustomerInput | AddressUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: AddressCreateManyCustomerInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutCustomerInput | AddressUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutCustomerInput | AddressUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type CommunicationUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CommunicationCreateWithoutCustomerInput, CommunicationUncheckedCreateWithoutCustomerInput> | CommunicationCreateWithoutCustomerInput[] | CommunicationUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CommunicationCreateOrConnectWithoutCustomerInput | CommunicationCreateOrConnectWithoutCustomerInput[]
    upsert?: CommunicationUpsertWithWhereUniqueWithoutCustomerInput | CommunicationUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CommunicationCreateManyCustomerInputEnvelope
    set?: CommunicationWhereUniqueInput | CommunicationWhereUniqueInput[]
    disconnect?: CommunicationWhereUniqueInput | CommunicationWhereUniqueInput[]
    delete?: CommunicationWhereUniqueInput | CommunicationWhereUniqueInput[]
    connect?: CommunicationWhereUniqueInput | CommunicationWhereUniqueInput[]
    update?: CommunicationUpdateWithWhereUniqueWithoutCustomerInput | CommunicationUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CommunicationUpdateManyWithWhereWithoutCustomerInput | CommunicationUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CommunicationScalarWhereInput | CommunicationScalarWhereInput[]
  }

  export type CustomerNoteUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CustomerNoteCreateWithoutCustomerInput, CustomerNoteUncheckedCreateWithoutCustomerInput> | CustomerNoteCreateWithoutCustomerInput[] | CustomerNoteUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerNoteCreateOrConnectWithoutCustomerInput | CustomerNoteCreateOrConnectWithoutCustomerInput[]
    upsert?: CustomerNoteUpsertWithWhereUniqueWithoutCustomerInput | CustomerNoteUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CustomerNoteCreateManyCustomerInputEnvelope
    set?: CustomerNoteWhereUniqueInput | CustomerNoteWhereUniqueInput[]
    disconnect?: CustomerNoteWhereUniqueInput | CustomerNoteWhereUniqueInput[]
    delete?: CustomerNoteWhereUniqueInput | CustomerNoteWhereUniqueInput[]
    connect?: CustomerNoteWhereUniqueInput | CustomerNoteWhereUniqueInput[]
    update?: CustomerNoteUpdateWithWhereUniqueWithoutCustomerInput | CustomerNoteUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CustomerNoteUpdateManyWithWhereWithoutCustomerInput | CustomerNoteUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CustomerNoteScalarWhereInput | CustomerNoteScalarWhereInput[]
  }

  export type CustomerActivityUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CustomerActivityCreateWithoutCustomerInput, CustomerActivityUncheckedCreateWithoutCustomerInput> | CustomerActivityCreateWithoutCustomerInput[] | CustomerActivityUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerActivityCreateOrConnectWithoutCustomerInput | CustomerActivityCreateOrConnectWithoutCustomerInput[]
    upsert?: CustomerActivityUpsertWithWhereUniqueWithoutCustomerInput | CustomerActivityUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CustomerActivityCreateManyCustomerInputEnvelope
    set?: CustomerActivityWhereUniqueInput | CustomerActivityWhereUniqueInput[]
    disconnect?: CustomerActivityWhereUniqueInput | CustomerActivityWhereUniqueInput[]
    delete?: CustomerActivityWhereUniqueInput | CustomerActivityWhereUniqueInput[]
    connect?: CustomerActivityWhereUniqueInput | CustomerActivityWhereUniqueInput[]
    update?: CustomerActivityUpdateWithWhereUniqueWithoutCustomerInput | CustomerActivityUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CustomerActivityUpdateManyWithWhereWithoutCustomerInput | CustomerActivityUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CustomerActivityScalarWhereInput | CustomerActivityScalarWhereInput[]
  }

  export type CustomerPreferenceUncheckedUpdateOneWithoutCustomerNestedInput = {
    create?: XOR<CustomerPreferenceCreateWithoutCustomerInput, CustomerPreferenceUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: CustomerPreferenceCreateOrConnectWithoutCustomerInput
    upsert?: CustomerPreferenceUpsertWithoutCustomerInput
    disconnect?: CustomerPreferenceWhereInput | boolean
    delete?: CustomerPreferenceWhereInput | boolean
    connect?: CustomerPreferenceWhereUniqueInput
    update?: XOR<XOR<CustomerPreferenceUpdateToOneWithWhereWithoutCustomerInput, CustomerPreferenceUpdateWithoutCustomerInput>, CustomerPreferenceUncheckedUpdateWithoutCustomerInput>
  }

  export type AddressUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<AddressCreateWithoutCustomerInput, AddressUncheckedCreateWithoutCustomerInput> | AddressCreateWithoutCustomerInput[] | AddressUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutCustomerInput | AddressCreateOrConnectWithoutCustomerInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutCustomerInput | AddressUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: AddressCreateManyCustomerInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutCustomerInput | AddressUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutCustomerInput | AddressUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type CommunicationUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CommunicationCreateWithoutCustomerInput, CommunicationUncheckedCreateWithoutCustomerInput> | CommunicationCreateWithoutCustomerInput[] | CommunicationUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CommunicationCreateOrConnectWithoutCustomerInput | CommunicationCreateOrConnectWithoutCustomerInput[]
    upsert?: CommunicationUpsertWithWhereUniqueWithoutCustomerInput | CommunicationUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CommunicationCreateManyCustomerInputEnvelope
    set?: CommunicationWhereUniqueInput | CommunicationWhereUniqueInput[]
    disconnect?: CommunicationWhereUniqueInput | CommunicationWhereUniqueInput[]
    delete?: CommunicationWhereUniqueInput | CommunicationWhereUniqueInput[]
    connect?: CommunicationWhereUniqueInput | CommunicationWhereUniqueInput[]
    update?: CommunicationUpdateWithWhereUniqueWithoutCustomerInput | CommunicationUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CommunicationUpdateManyWithWhereWithoutCustomerInput | CommunicationUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CommunicationScalarWhereInput | CommunicationScalarWhereInput[]
  }

  export type CustomerNoteUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CustomerNoteCreateWithoutCustomerInput, CustomerNoteUncheckedCreateWithoutCustomerInput> | CustomerNoteCreateWithoutCustomerInput[] | CustomerNoteUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerNoteCreateOrConnectWithoutCustomerInput | CustomerNoteCreateOrConnectWithoutCustomerInput[]
    upsert?: CustomerNoteUpsertWithWhereUniqueWithoutCustomerInput | CustomerNoteUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CustomerNoteCreateManyCustomerInputEnvelope
    set?: CustomerNoteWhereUniqueInput | CustomerNoteWhereUniqueInput[]
    disconnect?: CustomerNoteWhereUniqueInput | CustomerNoteWhereUniqueInput[]
    delete?: CustomerNoteWhereUniqueInput | CustomerNoteWhereUniqueInput[]
    connect?: CustomerNoteWhereUniqueInput | CustomerNoteWhereUniqueInput[]
    update?: CustomerNoteUpdateWithWhereUniqueWithoutCustomerInput | CustomerNoteUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CustomerNoteUpdateManyWithWhereWithoutCustomerInput | CustomerNoteUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CustomerNoteScalarWhereInput | CustomerNoteScalarWhereInput[]
  }

  export type CustomerActivityUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CustomerActivityCreateWithoutCustomerInput, CustomerActivityUncheckedCreateWithoutCustomerInput> | CustomerActivityCreateWithoutCustomerInput[] | CustomerActivityUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerActivityCreateOrConnectWithoutCustomerInput | CustomerActivityCreateOrConnectWithoutCustomerInput[]
    upsert?: CustomerActivityUpsertWithWhereUniqueWithoutCustomerInput | CustomerActivityUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CustomerActivityCreateManyCustomerInputEnvelope
    set?: CustomerActivityWhereUniqueInput | CustomerActivityWhereUniqueInput[]
    disconnect?: CustomerActivityWhereUniqueInput | CustomerActivityWhereUniqueInput[]
    delete?: CustomerActivityWhereUniqueInput | CustomerActivityWhereUniqueInput[]
    connect?: CustomerActivityWhereUniqueInput | CustomerActivityWhereUniqueInput[]
    update?: CustomerActivityUpdateWithWhereUniqueWithoutCustomerInput | CustomerActivityUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CustomerActivityUpdateManyWithWhereWithoutCustomerInput | CustomerActivityUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CustomerActivityScalarWhereInput | CustomerActivityScalarWhereInput[]
  }

  export type CustomerPreferenceCreatepreferredCategoriesInput = {
    set: string[]
  }

  export type CustomerPreferenceCreatepreferredBrandsInput = {
    set: string[]
  }

  export type CustomerCreateNestedOneWithoutPreferencesInput = {
    create?: XOR<CustomerCreateWithoutPreferencesInput, CustomerUncheckedCreateWithoutPreferencesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutPreferencesInput
    connect?: CustomerWhereUniqueInput
  }

  export type CustomerPreferenceUpdatepreferredCategoriesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CustomerPreferenceUpdatepreferredBrandsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CustomerUpdateOneRequiredWithoutPreferencesNestedInput = {
    create?: XOR<CustomerCreateWithoutPreferencesInput, CustomerUncheckedCreateWithoutPreferencesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutPreferencesInput
    upsert?: CustomerUpsertWithoutPreferencesInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutPreferencesInput, CustomerUpdateWithoutPreferencesInput>, CustomerUncheckedUpdateWithoutPreferencesInput>
  }

  export type CustomerCreateNestedOneWithoutAddressesInput = {
    create?: XOR<CustomerCreateWithoutAddressesInput, CustomerUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutAddressesInput
    connect?: CustomerWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CustomerUpdateOneRequiredWithoutAddressesNestedInput = {
    create?: XOR<CustomerCreateWithoutAddressesInput, CustomerUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutAddressesInput
    upsert?: CustomerUpsertWithoutAddressesInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutAddressesInput, CustomerUpdateWithoutAddressesInput>, CustomerUncheckedUpdateWithoutAddressesInput>
  }

  export type CustomerCreateNestedOneWithoutCommunicationsInput = {
    create?: XOR<CustomerCreateWithoutCommunicationsInput, CustomerUncheckedCreateWithoutCommunicationsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutCommunicationsInput
    connect?: CustomerWhereUniqueInput
  }

  export type CustomerUpdateOneRequiredWithoutCommunicationsNestedInput = {
    create?: XOR<CustomerCreateWithoutCommunicationsInput, CustomerUncheckedCreateWithoutCommunicationsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutCommunicationsInput
    upsert?: CustomerUpsertWithoutCommunicationsInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutCommunicationsInput, CustomerUpdateWithoutCommunicationsInput>, CustomerUncheckedUpdateWithoutCommunicationsInput>
  }

  export type CustomerCreateNestedOneWithoutNotesInput = {
    create?: XOR<CustomerCreateWithoutNotesInput, CustomerUncheckedCreateWithoutNotesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutNotesInput
    connect?: CustomerWhereUniqueInput
  }

  export type CustomerUpdateOneRequiredWithoutNotesNestedInput = {
    create?: XOR<CustomerCreateWithoutNotesInput, CustomerUncheckedCreateWithoutNotesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutNotesInput
    upsert?: CustomerUpsertWithoutNotesInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutNotesInput, CustomerUpdateWithoutNotesInput>, CustomerUncheckedUpdateWithoutNotesInput>
  }

  export type CustomerCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<CustomerCreateWithoutActivitiesInput, CustomerUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutActivitiesInput
    connect?: CustomerWhereUniqueInput
  }

  export type CustomerUpdateOneRequiredWithoutActivitiesNestedInput = {
    create?: XOR<CustomerCreateWithoutActivitiesInput, CustomerUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutActivitiesInput
    upsert?: CustomerUpsertWithoutActivitiesInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutActivitiesInput, CustomerUpdateWithoutActivitiesInput>, CustomerUncheckedUpdateWithoutActivitiesInput>
  }

  export type SupportMessageReplyCreateNestedManyWithoutMessageInput = {
    create?: XOR<SupportMessageReplyCreateWithoutMessageInput, SupportMessageReplyUncheckedCreateWithoutMessageInput> | SupportMessageReplyCreateWithoutMessageInput[] | SupportMessageReplyUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: SupportMessageReplyCreateOrConnectWithoutMessageInput | SupportMessageReplyCreateOrConnectWithoutMessageInput[]
    createMany?: SupportMessageReplyCreateManyMessageInputEnvelope
    connect?: SupportMessageReplyWhereUniqueInput | SupportMessageReplyWhereUniqueInput[]
  }

  export type SupportMessageReplyUncheckedCreateNestedManyWithoutMessageInput = {
    create?: XOR<SupportMessageReplyCreateWithoutMessageInput, SupportMessageReplyUncheckedCreateWithoutMessageInput> | SupportMessageReplyCreateWithoutMessageInput[] | SupportMessageReplyUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: SupportMessageReplyCreateOrConnectWithoutMessageInput | SupportMessageReplyCreateOrConnectWithoutMessageInput[]
    createMany?: SupportMessageReplyCreateManyMessageInputEnvelope
    connect?: SupportMessageReplyWhereUniqueInput | SupportMessageReplyWhereUniqueInput[]
  }

  export type SupportMessageReplyUpdateManyWithoutMessageNestedInput = {
    create?: XOR<SupportMessageReplyCreateWithoutMessageInput, SupportMessageReplyUncheckedCreateWithoutMessageInput> | SupportMessageReplyCreateWithoutMessageInput[] | SupportMessageReplyUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: SupportMessageReplyCreateOrConnectWithoutMessageInput | SupportMessageReplyCreateOrConnectWithoutMessageInput[]
    upsert?: SupportMessageReplyUpsertWithWhereUniqueWithoutMessageInput | SupportMessageReplyUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: SupportMessageReplyCreateManyMessageInputEnvelope
    set?: SupportMessageReplyWhereUniqueInput | SupportMessageReplyWhereUniqueInput[]
    disconnect?: SupportMessageReplyWhereUniqueInput | SupportMessageReplyWhereUniqueInput[]
    delete?: SupportMessageReplyWhereUniqueInput | SupportMessageReplyWhereUniqueInput[]
    connect?: SupportMessageReplyWhereUniqueInput | SupportMessageReplyWhereUniqueInput[]
    update?: SupportMessageReplyUpdateWithWhereUniqueWithoutMessageInput | SupportMessageReplyUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: SupportMessageReplyUpdateManyWithWhereWithoutMessageInput | SupportMessageReplyUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: SupportMessageReplyScalarWhereInput | SupportMessageReplyScalarWhereInput[]
  }

  export type SupportMessageReplyUncheckedUpdateManyWithoutMessageNestedInput = {
    create?: XOR<SupportMessageReplyCreateWithoutMessageInput, SupportMessageReplyUncheckedCreateWithoutMessageInput> | SupportMessageReplyCreateWithoutMessageInput[] | SupportMessageReplyUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: SupportMessageReplyCreateOrConnectWithoutMessageInput | SupportMessageReplyCreateOrConnectWithoutMessageInput[]
    upsert?: SupportMessageReplyUpsertWithWhereUniqueWithoutMessageInput | SupportMessageReplyUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: SupportMessageReplyCreateManyMessageInputEnvelope
    set?: SupportMessageReplyWhereUniqueInput | SupportMessageReplyWhereUniqueInput[]
    disconnect?: SupportMessageReplyWhereUniqueInput | SupportMessageReplyWhereUniqueInput[]
    delete?: SupportMessageReplyWhereUniqueInput | SupportMessageReplyWhereUniqueInput[]
    connect?: SupportMessageReplyWhereUniqueInput | SupportMessageReplyWhereUniqueInput[]
    update?: SupportMessageReplyUpdateWithWhereUniqueWithoutMessageInput | SupportMessageReplyUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: SupportMessageReplyUpdateManyWithWhereWithoutMessageInput | SupportMessageReplyUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: SupportMessageReplyScalarWhereInput | SupportMessageReplyScalarWhereInput[]
  }

  export type SupportMessageCreateNestedOneWithoutRepliesInput = {
    create?: XOR<SupportMessageCreateWithoutRepliesInput, SupportMessageUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: SupportMessageCreateOrConnectWithoutRepliesInput
    connect?: SupportMessageWhereUniqueInput
  }

  export type SupportMessageUpdateOneRequiredWithoutRepliesNestedInput = {
    create?: XOR<SupportMessageCreateWithoutRepliesInput, SupportMessageUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: SupportMessageCreateOrConnectWithoutRepliesInput
    upsert?: SupportMessageUpsertWithoutRepliesInput
    connect?: SupportMessageWhereUniqueInput
    update?: XOR<XOR<SupportMessageUpdateToOneWithWhereWithoutRepliesInput, SupportMessageUpdateWithoutRepliesInput>, SupportMessageUncheckedUpdateWithoutRepliesInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
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

  export type CustomerPreferenceCreateWithoutCustomerInput = {
    id?: string
    emailNotifications?: boolean
    smsNotifications?: boolean
    pushNotifications?: boolean
    marketingEmails?: boolean
    dataSharingConsent?: boolean
    cookieConsent?: boolean
    preferredCategories?: CustomerPreferenceCreatepreferredCategoriesInput | string[]
    preferredBrands?: CustomerPreferenceCreatepreferredBrandsInput | string[]
    productViewHistory?: NullableJsonNullValueInput | InputJsonValue
    searchHistory?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerPreferenceUncheckedCreateWithoutCustomerInput = {
    id?: string
    emailNotifications?: boolean
    smsNotifications?: boolean
    pushNotifications?: boolean
    marketingEmails?: boolean
    dataSharingConsent?: boolean
    cookieConsent?: boolean
    preferredCategories?: CustomerPreferenceCreatepreferredCategoriesInput | string[]
    preferredBrands?: CustomerPreferenceCreatepreferredBrandsInput | string[]
    productViewHistory?: NullableJsonNullValueInput | InputJsonValue
    searchHistory?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerPreferenceCreateOrConnectWithoutCustomerInput = {
    where: CustomerPreferenceWhereUniqueInput
    create: XOR<CustomerPreferenceCreateWithoutCustomerInput, CustomerPreferenceUncheckedCreateWithoutCustomerInput>
  }

  export type AddressCreateWithoutCustomerInput = {
    id?: string
    label: string
    type?: string
    line1: string
    line2?: string | null
    city: string
    state?: string | null
    postalCode: string
    country: string
    phone?: string | null
    isDefault?: boolean
    isActive?: boolean
    latitude?: number | null
    longitude?: number | null
    deliveryInstructions?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressUncheckedCreateWithoutCustomerInput = {
    id?: string
    label: string
    type?: string
    line1: string
    line2?: string | null
    city: string
    state?: string | null
    postalCode: string
    country: string
    phone?: string | null
    isDefault?: boolean
    isActive?: boolean
    latitude?: number | null
    longitude?: number | null
    deliveryInstructions?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressCreateOrConnectWithoutCustomerInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutCustomerInput, AddressUncheckedCreateWithoutCustomerInput>
  }

  export type AddressCreateManyCustomerInputEnvelope = {
    data: AddressCreateManyCustomerInput | AddressCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type CommunicationCreateWithoutCustomerInput = {
    id?: string
    type: string
    direction: string
    subject?: string | null
    content: string
    status: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: Date | string | null
    deliveredAt?: Date | string | null
    readAt?: Date | string | null
    failedAt?: Date | string | null
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommunicationUncheckedCreateWithoutCustomerInput = {
    id?: string
    type: string
    direction: string
    subject?: string | null
    content: string
    status: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: Date | string | null
    deliveredAt?: Date | string | null
    readAt?: Date | string | null
    failedAt?: Date | string | null
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommunicationCreateOrConnectWithoutCustomerInput = {
    where: CommunicationWhereUniqueInput
    create: XOR<CommunicationCreateWithoutCustomerInput, CommunicationUncheckedCreateWithoutCustomerInput>
  }

  export type CommunicationCreateManyCustomerInputEnvelope = {
    data: CommunicationCreateManyCustomerInput | CommunicationCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type CustomerNoteCreateWithoutCustomerInput = {
    id?: string
    content: string
    type: string
    authorId: string
    isInternal?: boolean
    isPinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerNoteUncheckedCreateWithoutCustomerInput = {
    id?: string
    content: string
    type: string
    authorId: string
    isInternal?: boolean
    isPinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerNoteCreateOrConnectWithoutCustomerInput = {
    where: CustomerNoteWhereUniqueInput
    create: XOR<CustomerNoteCreateWithoutCustomerInput, CustomerNoteUncheckedCreateWithoutCustomerInput>
  }

  export type CustomerNoteCreateManyCustomerInputEnvelope = {
    data: CustomerNoteCreateManyCustomerInput | CustomerNoteCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type CustomerActivityCreateWithoutCustomerInput = {
    id?: string
    action: string
    resource?: string | null
    resourceId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type CustomerActivityUncheckedCreateWithoutCustomerInput = {
    id?: string
    action: string
    resource?: string | null
    resourceId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type CustomerActivityCreateOrConnectWithoutCustomerInput = {
    where: CustomerActivityWhereUniqueInput
    create: XOR<CustomerActivityCreateWithoutCustomerInput, CustomerActivityUncheckedCreateWithoutCustomerInput>
  }

  export type CustomerActivityCreateManyCustomerInputEnvelope = {
    data: CustomerActivityCreateManyCustomerInput | CustomerActivityCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type CustomerPreferenceUpsertWithoutCustomerInput = {
    update: XOR<CustomerPreferenceUpdateWithoutCustomerInput, CustomerPreferenceUncheckedUpdateWithoutCustomerInput>
    create: XOR<CustomerPreferenceCreateWithoutCustomerInput, CustomerPreferenceUncheckedCreateWithoutCustomerInput>
    where?: CustomerPreferenceWhereInput
  }

  export type CustomerPreferenceUpdateToOneWithWhereWithoutCustomerInput = {
    where?: CustomerPreferenceWhereInput
    data: XOR<CustomerPreferenceUpdateWithoutCustomerInput, CustomerPreferenceUncheckedUpdateWithoutCustomerInput>
  }

  export type CustomerPreferenceUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    smsNotifications?: BoolFieldUpdateOperationsInput | boolean
    pushNotifications?: BoolFieldUpdateOperationsInput | boolean
    marketingEmails?: BoolFieldUpdateOperationsInput | boolean
    dataSharingConsent?: BoolFieldUpdateOperationsInput | boolean
    cookieConsent?: BoolFieldUpdateOperationsInput | boolean
    preferredCategories?: CustomerPreferenceUpdatepreferredCategoriesInput | string[]
    preferredBrands?: CustomerPreferenceUpdatepreferredBrandsInput | string[]
    productViewHistory?: NullableJsonNullValueInput | InputJsonValue
    searchHistory?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerPreferenceUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    smsNotifications?: BoolFieldUpdateOperationsInput | boolean
    pushNotifications?: BoolFieldUpdateOperationsInput | boolean
    marketingEmails?: BoolFieldUpdateOperationsInput | boolean
    dataSharingConsent?: BoolFieldUpdateOperationsInput | boolean
    cookieConsent?: BoolFieldUpdateOperationsInput | boolean
    preferredCategories?: CustomerPreferenceUpdatepreferredCategoriesInput | string[]
    preferredBrands?: CustomerPreferenceUpdatepreferredBrandsInput | string[]
    productViewHistory?: NullableJsonNullValueInput | InputJsonValue
    searchHistory?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUpsertWithWhereUniqueWithoutCustomerInput = {
    where: AddressWhereUniqueInput
    update: XOR<AddressUpdateWithoutCustomerInput, AddressUncheckedUpdateWithoutCustomerInput>
    create: XOR<AddressCreateWithoutCustomerInput, AddressUncheckedCreateWithoutCustomerInput>
  }

  export type AddressUpdateWithWhereUniqueWithoutCustomerInput = {
    where: AddressWhereUniqueInput
    data: XOR<AddressUpdateWithoutCustomerInput, AddressUncheckedUpdateWithoutCustomerInput>
  }

  export type AddressUpdateManyWithWhereWithoutCustomerInput = {
    where: AddressScalarWhereInput
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyWithoutCustomerInput>
  }

  export type AddressScalarWhereInput = {
    AND?: AddressScalarWhereInput | AddressScalarWhereInput[]
    OR?: AddressScalarWhereInput[]
    NOT?: AddressScalarWhereInput | AddressScalarWhereInput[]
    id?: StringFilter<"Address"> | string
    customerId?: StringFilter<"Address"> | string
    label?: StringFilter<"Address"> | string
    type?: StringFilter<"Address"> | string
    line1?: StringFilter<"Address"> | string
    line2?: StringNullableFilter<"Address"> | string | null
    city?: StringFilter<"Address"> | string
    state?: StringNullableFilter<"Address"> | string | null
    postalCode?: StringFilter<"Address"> | string
    country?: StringFilter<"Address"> | string
    phone?: StringNullableFilter<"Address"> | string | null
    isDefault?: BoolFilter<"Address"> | boolean
    isActive?: BoolFilter<"Address"> | boolean
    latitude?: FloatNullableFilter<"Address"> | number | null
    longitude?: FloatNullableFilter<"Address"> | number | null
    deliveryInstructions?: StringNullableFilter<"Address"> | string | null
    createdAt?: DateTimeFilter<"Address"> | Date | string
    updatedAt?: DateTimeFilter<"Address"> | Date | string
  }

  export type CommunicationUpsertWithWhereUniqueWithoutCustomerInput = {
    where: CommunicationWhereUniqueInput
    update: XOR<CommunicationUpdateWithoutCustomerInput, CommunicationUncheckedUpdateWithoutCustomerInput>
    create: XOR<CommunicationCreateWithoutCustomerInput, CommunicationUncheckedCreateWithoutCustomerInput>
  }

  export type CommunicationUpdateWithWhereUniqueWithoutCustomerInput = {
    where: CommunicationWhereUniqueInput
    data: XOR<CommunicationUpdateWithoutCustomerInput, CommunicationUncheckedUpdateWithoutCustomerInput>
  }

  export type CommunicationUpdateManyWithWhereWithoutCustomerInput = {
    where: CommunicationScalarWhereInput
    data: XOR<CommunicationUpdateManyMutationInput, CommunicationUncheckedUpdateManyWithoutCustomerInput>
  }

  export type CommunicationScalarWhereInput = {
    AND?: CommunicationScalarWhereInput | CommunicationScalarWhereInput[]
    OR?: CommunicationScalarWhereInput[]
    NOT?: CommunicationScalarWhereInput | CommunicationScalarWhereInput[]
    id?: StringFilter<"Communication"> | string
    customerId?: StringFilter<"Communication"> | string
    type?: StringFilter<"Communication"> | string
    direction?: StringFilter<"Communication"> | string
    subject?: StringNullableFilter<"Communication"> | string | null
    content?: StringFilter<"Communication"> | string
    status?: StringFilter<"Communication"> | string
    metadata?: JsonNullableFilter<"Communication">
    sentAt?: DateTimeNullableFilter<"Communication"> | Date | string | null
    deliveredAt?: DateTimeNullableFilter<"Communication"> | Date | string | null
    readAt?: DateTimeNullableFilter<"Communication"> | Date | string | null
    failedAt?: DateTimeNullableFilter<"Communication"> | Date | string | null
    error?: StringNullableFilter<"Communication"> | string | null
    createdAt?: DateTimeFilter<"Communication"> | Date | string
    updatedAt?: DateTimeFilter<"Communication"> | Date | string
  }

  export type CustomerNoteUpsertWithWhereUniqueWithoutCustomerInput = {
    where: CustomerNoteWhereUniqueInput
    update: XOR<CustomerNoteUpdateWithoutCustomerInput, CustomerNoteUncheckedUpdateWithoutCustomerInput>
    create: XOR<CustomerNoteCreateWithoutCustomerInput, CustomerNoteUncheckedCreateWithoutCustomerInput>
  }

  export type CustomerNoteUpdateWithWhereUniqueWithoutCustomerInput = {
    where: CustomerNoteWhereUniqueInput
    data: XOR<CustomerNoteUpdateWithoutCustomerInput, CustomerNoteUncheckedUpdateWithoutCustomerInput>
  }

  export type CustomerNoteUpdateManyWithWhereWithoutCustomerInput = {
    where: CustomerNoteScalarWhereInput
    data: XOR<CustomerNoteUpdateManyMutationInput, CustomerNoteUncheckedUpdateManyWithoutCustomerInput>
  }

  export type CustomerNoteScalarWhereInput = {
    AND?: CustomerNoteScalarWhereInput | CustomerNoteScalarWhereInput[]
    OR?: CustomerNoteScalarWhereInput[]
    NOT?: CustomerNoteScalarWhereInput | CustomerNoteScalarWhereInput[]
    id?: StringFilter<"CustomerNote"> | string
    customerId?: StringFilter<"CustomerNote"> | string
    content?: StringFilter<"CustomerNote"> | string
    type?: StringFilter<"CustomerNote"> | string
    authorId?: StringFilter<"CustomerNote"> | string
    isInternal?: BoolFilter<"CustomerNote"> | boolean
    isPinned?: BoolFilter<"CustomerNote"> | boolean
    createdAt?: DateTimeFilter<"CustomerNote"> | Date | string
    updatedAt?: DateTimeFilter<"CustomerNote"> | Date | string
  }

  export type CustomerActivityUpsertWithWhereUniqueWithoutCustomerInput = {
    where: CustomerActivityWhereUniqueInput
    update: XOR<CustomerActivityUpdateWithoutCustomerInput, CustomerActivityUncheckedUpdateWithoutCustomerInput>
    create: XOR<CustomerActivityCreateWithoutCustomerInput, CustomerActivityUncheckedCreateWithoutCustomerInput>
  }

  export type CustomerActivityUpdateWithWhereUniqueWithoutCustomerInput = {
    where: CustomerActivityWhereUniqueInput
    data: XOR<CustomerActivityUpdateWithoutCustomerInput, CustomerActivityUncheckedUpdateWithoutCustomerInput>
  }

  export type CustomerActivityUpdateManyWithWhereWithoutCustomerInput = {
    where: CustomerActivityScalarWhereInput
    data: XOR<CustomerActivityUpdateManyMutationInput, CustomerActivityUncheckedUpdateManyWithoutCustomerInput>
  }

  export type CustomerActivityScalarWhereInput = {
    AND?: CustomerActivityScalarWhereInput | CustomerActivityScalarWhereInput[]
    OR?: CustomerActivityScalarWhereInput[]
    NOT?: CustomerActivityScalarWhereInput | CustomerActivityScalarWhereInput[]
    id?: StringFilter<"CustomerActivity"> | string
    customerId?: StringFilter<"CustomerActivity"> | string
    action?: StringFilter<"CustomerActivity"> | string
    resource?: StringNullableFilter<"CustomerActivity"> | string | null
    resourceId?: StringNullableFilter<"CustomerActivity"> | string | null
    metadata?: JsonNullableFilter<"CustomerActivity">
    ipAddress?: StringNullableFilter<"CustomerActivity"> | string | null
    userAgent?: StringNullableFilter<"CustomerActivity"> | string | null
    createdAt?: DateTimeFilter<"CustomerActivity"> | Date | string
  }

  export type CustomerCreateWithoutPreferencesInput = {
    id?: string
    userId: string
    email: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    language?: string
    timezone?: string
    currency?: string
    loyaltyPoints?: number
    loyaltyTier?: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    loginCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    addresses?: AddressCreateNestedManyWithoutCustomerInput
    communications?: CommunicationCreateNestedManyWithoutCustomerInput
    notes?: CustomerNoteCreateNestedManyWithoutCustomerInput
    activities?: CustomerActivityCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutPreferencesInput = {
    id?: string
    userId: string
    email: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    language?: string
    timezone?: string
    currency?: string
    loyaltyPoints?: number
    loyaltyTier?: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    loginCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    addresses?: AddressUncheckedCreateNestedManyWithoutCustomerInput
    communications?: CommunicationUncheckedCreateNestedManyWithoutCustomerInput
    notes?: CustomerNoteUncheckedCreateNestedManyWithoutCustomerInput
    activities?: CustomerActivityUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutPreferencesInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutPreferencesInput, CustomerUncheckedCreateWithoutPreferencesInput>
  }

  export type CustomerUpsertWithoutPreferencesInput = {
    update: XOR<CustomerUpdateWithoutPreferencesInput, CustomerUncheckedUpdateWithoutPreferencesInput>
    create: XOR<CustomerCreateWithoutPreferencesInput, CustomerUncheckedCreateWithoutPreferencesInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutPreferencesInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutPreferencesInput, CustomerUncheckedUpdateWithoutPreferencesInput>
  }

  export type CustomerUpdateWithoutPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    loyaltyPoints?: IntFieldUpdateOperationsInput | number
    loyaltyTier?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addresses?: AddressUpdateManyWithoutCustomerNestedInput
    communications?: CommunicationUpdateManyWithoutCustomerNestedInput
    notes?: CustomerNoteUpdateManyWithoutCustomerNestedInput
    activities?: CustomerActivityUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    loyaltyPoints?: IntFieldUpdateOperationsInput | number
    loyaltyTier?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addresses?: AddressUncheckedUpdateManyWithoutCustomerNestedInput
    communications?: CommunicationUncheckedUpdateManyWithoutCustomerNestedInput
    notes?: CustomerNoteUncheckedUpdateManyWithoutCustomerNestedInput
    activities?: CustomerActivityUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateWithoutAddressesInput = {
    id?: string
    userId: string
    email: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    language?: string
    timezone?: string
    currency?: string
    loyaltyPoints?: number
    loyaltyTier?: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    loginCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    preferences?: CustomerPreferenceCreateNestedOneWithoutCustomerInput
    communications?: CommunicationCreateNestedManyWithoutCustomerInput
    notes?: CustomerNoteCreateNestedManyWithoutCustomerInput
    activities?: CustomerActivityCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutAddressesInput = {
    id?: string
    userId: string
    email: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    language?: string
    timezone?: string
    currency?: string
    loyaltyPoints?: number
    loyaltyTier?: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    loginCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    preferences?: CustomerPreferenceUncheckedCreateNestedOneWithoutCustomerInput
    communications?: CommunicationUncheckedCreateNestedManyWithoutCustomerInput
    notes?: CustomerNoteUncheckedCreateNestedManyWithoutCustomerInput
    activities?: CustomerActivityUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutAddressesInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutAddressesInput, CustomerUncheckedCreateWithoutAddressesInput>
  }

  export type CustomerUpsertWithoutAddressesInput = {
    update: XOR<CustomerUpdateWithoutAddressesInput, CustomerUncheckedUpdateWithoutAddressesInput>
    create: XOR<CustomerCreateWithoutAddressesInput, CustomerUncheckedCreateWithoutAddressesInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutAddressesInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutAddressesInput, CustomerUncheckedUpdateWithoutAddressesInput>
  }

  export type CustomerUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    loyaltyPoints?: IntFieldUpdateOperationsInput | number
    loyaltyTier?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: CustomerPreferenceUpdateOneWithoutCustomerNestedInput
    communications?: CommunicationUpdateManyWithoutCustomerNestedInput
    notes?: CustomerNoteUpdateManyWithoutCustomerNestedInput
    activities?: CustomerActivityUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    loyaltyPoints?: IntFieldUpdateOperationsInput | number
    loyaltyTier?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: CustomerPreferenceUncheckedUpdateOneWithoutCustomerNestedInput
    communications?: CommunicationUncheckedUpdateManyWithoutCustomerNestedInput
    notes?: CustomerNoteUncheckedUpdateManyWithoutCustomerNestedInput
    activities?: CustomerActivityUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateWithoutCommunicationsInput = {
    id?: string
    userId: string
    email: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    language?: string
    timezone?: string
    currency?: string
    loyaltyPoints?: number
    loyaltyTier?: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    loginCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    preferences?: CustomerPreferenceCreateNestedOneWithoutCustomerInput
    addresses?: AddressCreateNestedManyWithoutCustomerInput
    notes?: CustomerNoteCreateNestedManyWithoutCustomerInput
    activities?: CustomerActivityCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutCommunicationsInput = {
    id?: string
    userId: string
    email: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    language?: string
    timezone?: string
    currency?: string
    loyaltyPoints?: number
    loyaltyTier?: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    loginCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    preferences?: CustomerPreferenceUncheckedCreateNestedOneWithoutCustomerInput
    addresses?: AddressUncheckedCreateNestedManyWithoutCustomerInput
    notes?: CustomerNoteUncheckedCreateNestedManyWithoutCustomerInput
    activities?: CustomerActivityUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutCommunicationsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutCommunicationsInput, CustomerUncheckedCreateWithoutCommunicationsInput>
  }

  export type CustomerUpsertWithoutCommunicationsInput = {
    update: XOR<CustomerUpdateWithoutCommunicationsInput, CustomerUncheckedUpdateWithoutCommunicationsInput>
    create: XOR<CustomerCreateWithoutCommunicationsInput, CustomerUncheckedCreateWithoutCommunicationsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutCommunicationsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutCommunicationsInput, CustomerUncheckedUpdateWithoutCommunicationsInput>
  }

  export type CustomerUpdateWithoutCommunicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    loyaltyPoints?: IntFieldUpdateOperationsInput | number
    loyaltyTier?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: CustomerPreferenceUpdateOneWithoutCustomerNestedInput
    addresses?: AddressUpdateManyWithoutCustomerNestedInput
    notes?: CustomerNoteUpdateManyWithoutCustomerNestedInput
    activities?: CustomerActivityUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutCommunicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    loyaltyPoints?: IntFieldUpdateOperationsInput | number
    loyaltyTier?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: CustomerPreferenceUncheckedUpdateOneWithoutCustomerNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutCustomerNestedInput
    notes?: CustomerNoteUncheckedUpdateManyWithoutCustomerNestedInput
    activities?: CustomerActivityUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateWithoutNotesInput = {
    id?: string
    userId: string
    email: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    language?: string
    timezone?: string
    currency?: string
    loyaltyPoints?: number
    loyaltyTier?: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    loginCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    preferences?: CustomerPreferenceCreateNestedOneWithoutCustomerInput
    addresses?: AddressCreateNestedManyWithoutCustomerInput
    communications?: CommunicationCreateNestedManyWithoutCustomerInput
    activities?: CustomerActivityCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutNotesInput = {
    id?: string
    userId: string
    email: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    language?: string
    timezone?: string
    currency?: string
    loyaltyPoints?: number
    loyaltyTier?: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    loginCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    preferences?: CustomerPreferenceUncheckedCreateNestedOneWithoutCustomerInput
    addresses?: AddressUncheckedCreateNestedManyWithoutCustomerInput
    communications?: CommunicationUncheckedCreateNestedManyWithoutCustomerInput
    activities?: CustomerActivityUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutNotesInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutNotesInput, CustomerUncheckedCreateWithoutNotesInput>
  }

  export type CustomerUpsertWithoutNotesInput = {
    update: XOR<CustomerUpdateWithoutNotesInput, CustomerUncheckedUpdateWithoutNotesInput>
    create: XOR<CustomerCreateWithoutNotesInput, CustomerUncheckedCreateWithoutNotesInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutNotesInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutNotesInput, CustomerUncheckedUpdateWithoutNotesInput>
  }

  export type CustomerUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    loyaltyPoints?: IntFieldUpdateOperationsInput | number
    loyaltyTier?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: CustomerPreferenceUpdateOneWithoutCustomerNestedInput
    addresses?: AddressUpdateManyWithoutCustomerNestedInput
    communications?: CommunicationUpdateManyWithoutCustomerNestedInput
    activities?: CustomerActivityUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    loyaltyPoints?: IntFieldUpdateOperationsInput | number
    loyaltyTier?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: CustomerPreferenceUncheckedUpdateOneWithoutCustomerNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutCustomerNestedInput
    communications?: CommunicationUncheckedUpdateManyWithoutCustomerNestedInput
    activities?: CustomerActivityUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateWithoutActivitiesInput = {
    id?: string
    userId: string
    email: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    language?: string
    timezone?: string
    currency?: string
    loyaltyPoints?: number
    loyaltyTier?: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    loginCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    preferences?: CustomerPreferenceCreateNestedOneWithoutCustomerInput
    addresses?: AddressCreateNestedManyWithoutCustomerInput
    communications?: CommunicationCreateNestedManyWithoutCustomerInput
    notes?: CustomerNoteCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutActivitiesInput = {
    id?: string
    userId: string
    email: string
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    language?: string
    timezone?: string
    currency?: string
    loyaltyPoints?: number
    loyaltyTier?: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    loginCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    preferences?: CustomerPreferenceUncheckedCreateNestedOneWithoutCustomerInput
    addresses?: AddressUncheckedCreateNestedManyWithoutCustomerInput
    communications?: CommunicationUncheckedCreateNestedManyWithoutCustomerInput
    notes?: CustomerNoteUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutActivitiesInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutActivitiesInput, CustomerUncheckedCreateWithoutActivitiesInput>
  }

  export type CustomerUpsertWithoutActivitiesInput = {
    update: XOR<CustomerUpdateWithoutActivitiesInput, CustomerUncheckedUpdateWithoutActivitiesInput>
    create: XOR<CustomerCreateWithoutActivitiesInput, CustomerUncheckedCreateWithoutActivitiesInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutActivitiesInput, CustomerUncheckedUpdateWithoutActivitiesInput>
  }

  export type CustomerUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    loyaltyPoints?: IntFieldUpdateOperationsInput | number
    loyaltyTier?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: CustomerPreferenceUpdateOneWithoutCustomerNestedInput
    addresses?: AddressUpdateManyWithoutCustomerNestedInput
    communications?: CommunicationUpdateManyWithoutCustomerNestedInput
    notes?: CustomerNoteUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    loyaltyPoints?: IntFieldUpdateOperationsInput | number
    loyaltyTier?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loginCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: CustomerPreferenceUncheckedUpdateOneWithoutCustomerNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutCustomerNestedInput
    communications?: CommunicationUncheckedUpdateManyWithoutCustomerNestedInput
    notes?: CustomerNoteUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type SupportMessageReplyCreateWithoutMessageInput = {
    id?: string
    body: string
    authorId: string
    authorName?: string | null
    isInternal?: boolean
    createdAt?: Date | string
  }

  export type SupportMessageReplyUncheckedCreateWithoutMessageInput = {
    id?: string
    body: string
    authorId: string
    authorName?: string | null
    isInternal?: boolean
    createdAt?: Date | string
  }

  export type SupportMessageReplyCreateOrConnectWithoutMessageInput = {
    where: SupportMessageReplyWhereUniqueInput
    create: XOR<SupportMessageReplyCreateWithoutMessageInput, SupportMessageReplyUncheckedCreateWithoutMessageInput>
  }

  export type SupportMessageReplyCreateManyMessageInputEnvelope = {
    data: SupportMessageReplyCreateManyMessageInput | SupportMessageReplyCreateManyMessageInput[]
    skipDuplicates?: boolean
  }

  export type SupportMessageReplyUpsertWithWhereUniqueWithoutMessageInput = {
    where: SupportMessageReplyWhereUniqueInput
    update: XOR<SupportMessageReplyUpdateWithoutMessageInput, SupportMessageReplyUncheckedUpdateWithoutMessageInput>
    create: XOR<SupportMessageReplyCreateWithoutMessageInput, SupportMessageReplyUncheckedCreateWithoutMessageInput>
  }

  export type SupportMessageReplyUpdateWithWhereUniqueWithoutMessageInput = {
    where: SupportMessageReplyWhereUniqueInput
    data: XOR<SupportMessageReplyUpdateWithoutMessageInput, SupportMessageReplyUncheckedUpdateWithoutMessageInput>
  }

  export type SupportMessageReplyUpdateManyWithWhereWithoutMessageInput = {
    where: SupportMessageReplyScalarWhereInput
    data: XOR<SupportMessageReplyUpdateManyMutationInput, SupportMessageReplyUncheckedUpdateManyWithoutMessageInput>
  }

  export type SupportMessageReplyScalarWhereInput = {
    AND?: SupportMessageReplyScalarWhereInput | SupportMessageReplyScalarWhereInput[]
    OR?: SupportMessageReplyScalarWhereInput[]
    NOT?: SupportMessageReplyScalarWhereInput | SupportMessageReplyScalarWhereInput[]
    id?: StringFilter<"SupportMessageReply"> | string
    messageId?: StringFilter<"SupportMessageReply"> | string
    body?: StringFilter<"SupportMessageReply"> | string
    authorId?: StringFilter<"SupportMessageReply"> | string
    authorName?: StringNullableFilter<"SupportMessageReply"> | string | null
    isInternal?: BoolFilter<"SupportMessageReply"> | boolean
    createdAt?: DateTimeFilter<"SupportMessageReply"> | Date | string
  }

  export type SupportMessageCreateWithoutRepliesInput = {
    id?: string
    customerId?: string | null
    customerName: string
    customerEmail: string
    customerPhone?: string | null
    subject: string
    body: string
    status?: string
    priority?: string
    orderId?: string | null
    orderNumber?: string | null
    assignedTo?: string | null
    assignedToName?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupportMessageUncheckedCreateWithoutRepliesInput = {
    id?: string
    customerId?: string | null
    customerName: string
    customerEmail: string
    customerPhone?: string | null
    subject: string
    body: string
    status?: string
    priority?: string
    orderId?: string | null
    orderNumber?: string | null
    assignedTo?: string | null
    assignedToName?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupportMessageCreateOrConnectWithoutRepliesInput = {
    where: SupportMessageWhereUniqueInput
    create: XOR<SupportMessageCreateWithoutRepliesInput, SupportMessageUncheckedCreateWithoutRepliesInput>
  }

  export type SupportMessageUpsertWithoutRepliesInput = {
    update: XOR<SupportMessageUpdateWithoutRepliesInput, SupportMessageUncheckedUpdateWithoutRepliesInput>
    create: XOR<SupportMessageCreateWithoutRepliesInput, SupportMessageUncheckedCreateWithoutRepliesInput>
    where?: SupportMessageWhereInput
  }

  export type SupportMessageUpdateToOneWithWhereWithoutRepliesInput = {
    where?: SupportMessageWhereInput
    data: XOR<SupportMessageUpdateWithoutRepliesInput, SupportMessageUncheckedUpdateWithoutRepliesInput>
  }

  export type SupportMessageUpdateWithoutRepliesInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    orderNumber?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    assignedToName?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportMessageUncheckedUpdateWithoutRepliesInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    orderNumber?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    assignedToName?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressCreateManyCustomerInput = {
    id?: string
    label: string
    type?: string
    line1: string
    line2?: string | null
    city: string
    state?: string | null
    postalCode: string
    country: string
    phone?: string | null
    isDefault?: boolean
    isActive?: boolean
    latitude?: number | null
    longitude?: number | null
    deliveryInstructions?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommunicationCreateManyCustomerInput = {
    id?: string
    type: string
    direction: string
    subject?: string | null
    content: string
    status: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: Date | string | null
    deliveredAt?: Date | string | null
    readAt?: Date | string | null
    failedAt?: Date | string | null
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerNoteCreateManyCustomerInput = {
    id?: string
    content: string
    type: string
    authorId: string
    isInternal?: boolean
    isPinned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerActivityCreateManyCustomerInput = {
    id?: string
    action: string
    resource?: string | null
    resourceId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AddressUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommunicationUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommunicationUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommunicationUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerNoteUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerNoteUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerNoteUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerActivityUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerActivityUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerActivityUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportMessageReplyCreateManyMessageInput = {
    id?: string
    body: string
    authorId: string
    authorName?: string | null
    isInternal?: boolean
    createdAt?: Date | string
  }

  export type SupportMessageReplyUpdateWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportMessageReplyUncheckedUpdateWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportMessageReplyUncheckedUpdateManyWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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