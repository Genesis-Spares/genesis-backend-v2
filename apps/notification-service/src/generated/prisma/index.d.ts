
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
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model NotificationPreference
 * 
 */
export type NotificationPreference = $Result.DefaultSelection<Prisma.$NotificationPreferencePayload>
/**
 * Model StaffNotification
 * 
 */
export type StaffNotification = $Result.DefaultSelection<Prisma.$StaffNotificationPayload>
/**
 * Model StaffNotificationRead
 * 
 */
export type StaffNotificationRead = $Result.DefaultSelection<Prisma.$StaffNotificationReadPayload>
/**
 * Model StaffNotificationCursor
 * "Mark all as read": everything created before `readBefore` counts as read for this user.
 */
export type StaffNotificationCursor = $Result.DefaultSelection<Prisma.$StaffNotificationCursorPayload>
/**
 * Model PushSubscription
 * A browser/device that asked for push notifications (Web Push).
 */
export type PushSubscription = $Result.DefaultSelection<Prisma.$PushSubscriptionPayload>
/**
 * Model AppSetting
 * Small key/value store; holds the generated VAPID key pair when none is set in the env.
 */
export type AppSetting = $Result.DefaultSelection<Prisma.$AppSettingPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Notifications
 * const notifications = await prisma.notification.findMany()
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
   * // Fetch zero or more Notifications
   * const notifications = await prisma.notification.findMany()
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
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notificationPreference`: Exposes CRUD operations for the **NotificationPreference** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NotificationPreferences
    * const notificationPreferences = await prisma.notificationPreference.findMany()
    * ```
    */
  get notificationPreference(): Prisma.NotificationPreferenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.staffNotification`: Exposes CRUD operations for the **StaffNotification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StaffNotifications
    * const staffNotifications = await prisma.staffNotification.findMany()
    * ```
    */
  get staffNotification(): Prisma.StaffNotificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.staffNotificationRead`: Exposes CRUD operations for the **StaffNotificationRead** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StaffNotificationReads
    * const staffNotificationReads = await prisma.staffNotificationRead.findMany()
    * ```
    */
  get staffNotificationRead(): Prisma.StaffNotificationReadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.staffNotificationCursor`: Exposes CRUD operations for the **StaffNotificationCursor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StaffNotificationCursors
    * const staffNotificationCursors = await prisma.staffNotificationCursor.findMany()
    * ```
    */
  get staffNotificationCursor(): Prisma.StaffNotificationCursorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pushSubscription`: Exposes CRUD operations for the **PushSubscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PushSubscriptions
    * const pushSubscriptions = await prisma.pushSubscription.findMany()
    * ```
    */
  get pushSubscription(): Prisma.PushSubscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appSetting`: Exposes CRUD operations for the **AppSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AppSettings
    * const appSettings = await prisma.appSetting.findMany()
    * ```
    */
  get appSetting(): Prisma.AppSettingDelegate<ExtArgs, ClientOptions>;
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
    Notification: 'Notification',
    NotificationPreference: 'NotificationPreference',
    StaffNotification: 'StaffNotification',
    StaffNotificationRead: 'StaffNotificationRead',
    StaffNotificationCursor: 'StaffNotificationCursor',
    PushSubscription: 'PushSubscription',
    AppSetting: 'AppSetting'
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
      modelProps: "notification" | "notificationPreference" | "staffNotification" | "staffNotificationRead" | "staffNotificationCursor" | "pushSubscription" | "appSetting"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      NotificationPreference: {
        payload: Prisma.$NotificationPreferencePayload<ExtArgs>
        fields: Prisma.NotificationPreferenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationPreferenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationPreferenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          findFirst: {
            args: Prisma.NotificationPreferenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationPreferenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          findMany: {
            args: Prisma.NotificationPreferenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[]
          }
          create: {
            args: Prisma.NotificationPreferenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          createMany: {
            args: Prisma.NotificationPreferenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationPreferenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[]
          }
          delete: {
            args: Prisma.NotificationPreferenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          update: {
            args: Prisma.NotificationPreferenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          deleteMany: {
            args: Prisma.NotificationPreferenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationPreferenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationPreferenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[]
          }
          upsert: {
            args: Prisma.NotificationPreferenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>
          }
          aggregate: {
            args: Prisma.NotificationPreferenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificationPreference>
          }
          groupBy: {
            args: Prisma.NotificationPreferenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationPreferenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationPreferenceCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationPreferenceCountAggregateOutputType> | number
          }
        }
      }
      StaffNotification: {
        payload: Prisma.$StaffNotificationPayload<ExtArgs>
        fields: Prisma.StaffNotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StaffNotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StaffNotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationPayload>
          }
          findFirst: {
            args: Prisma.StaffNotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StaffNotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationPayload>
          }
          findMany: {
            args: Prisma.StaffNotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationPayload>[]
          }
          create: {
            args: Prisma.StaffNotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationPayload>
          }
          createMany: {
            args: Prisma.StaffNotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StaffNotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationPayload>[]
          }
          delete: {
            args: Prisma.StaffNotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationPayload>
          }
          update: {
            args: Prisma.StaffNotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationPayload>
          }
          deleteMany: {
            args: Prisma.StaffNotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StaffNotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StaffNotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationPayload>[]
          }
          upsert: {
            args: Prisma.StaffNotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationPayload>
          }
          aggregate: {
            args: Prisma.StaffNotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStaffNotification>
          }
          groupBy: {
            args: Prisma.StaffNotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<StaffNotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.StaffNotificationCountArgs<ExtArgs>
            result: $Utils.Optional<StaffNotificationCountAggregateOutputType> | number
          }
        }
      }
      StaffNotificationRead: {
        payload: Prisma.$StaffNotificationReadPayload<ExtArgs>
        fields: Prisma.StaffNotificationReadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StaffNotificationReadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationReadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StaffNotificationReadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationReadPayload>
          }
          findFirst: {
            args: Prisma.StaffNotificationReadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationReadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StaffNotificationReadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationReadPayload>
          }
          findMany: {
            args: Prisma.StaffNotificationReadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationReadPayload>[]
          }
          create: {
            args: Prisma.StaffNotificationReadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationReadPayload>
          }
          createMany: {
            args: Prisma.StaffNotificationReadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StaffNotificationReadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationReadPayload>[]
          }
          delete: {
            args: Prisma.StaffNotificationReadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationReadPayload>
          }
          update: {
            args: Prisma.StaffNotificationReadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationReadPayload>
          }
          deleteMany: {
            args: Prisma.StaffNotificationReadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StaffNotificationReadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StaffNotificationReadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationReadPayload>[]
          }
          upsert: {
            args: Prisma.StaffNotificationReadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationReadPayload>
          }
          aggregate: {
            args: Prisma.StaffNotificationReadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStaffNotificationRead>
          }
          groupBy: {
            args: Prisma.StaffNotificationReadGroupByArgs<ExtArgs>
            result: $Utils.Optional<StaffNotificationReadGroupByOutputType>[]
          }
          count: {
            args: Prisma.StaffNotificationReadCountArgs<ExtArgs>
            result: $Utils.Optional<StaffNotificationReadCountAggregateOutputType> | number
          }
        }
      }
      StaffNotificationCursor: {
        payload: Prisma.$StaffNotificationCursorPayload<ExtArgs>
        fields: Prisma.StaffNotificationCursorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StaffNotificationCursorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationCursorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StaffNotificationCursorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationCursorPayload>
          }
          findFirst: {
            args: Prisma.StaffNotificationCursorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationCursorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StaffNotificationCursorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationCursorPayload>
          }
          findMany: {
            args: Prisma.StaffNotificationCursorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationCursorPayload>[]
          }
          create: {
            args: Prisma.StaffNotificationCursorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationCursorPayload>
          }
          createMany: {
            args: Prisma.StaffNotificationCursorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StaffNotificationCursorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationCursorPayload>[]
          }
          delete: {
            args: Prisma.StaffNotificationCursorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationCursorPayload>
          }
          update: {
            args: Prisma.StaffNotificationCursorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationCursorPayload>
          }
          deleteMany: {
            args: Prisma.StaffNotificationCursorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StaffNotificationCursorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StaffNotificationCursorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationCursorPayload>[]
          }
          upsert: {
            args: Prisma.StaffNotificationCursorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffNotificationCursorPayload>
          }
          aggregate: {
            args: Prisma.StaffNotificationCursorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStaffNotificationCursor>
          }
          groupBy: {
            args: Prisma.StaffNotificationCursorGroupByArgs<ExtArgs>
            result: $Utils.Optional<StaffNotificationCursorGroupByOutputType>[]
          }
          count: {
            args: Prisma.StaffNotificationCursorCountArgs<ExtArgs>
            result: $Utils.Optional<StaffNotificationCursorCountAggregateOutputType> | number
          }
        }
      }
      PushSubscription: {
        payload: Prisma.$PushSubscriptionPayload<ExtArgs>
        fields: Prisma.PushSubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PushSubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PushSubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PushSubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PushSubscriptionPayload>
          }
          findFirst: {
            args: Prisma.PushSubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PushSubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PushSubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PushSubscriptionPayload>
          }
          findMany: {
            args: Prisma.PushSubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PushSubscriptionPayload>[]
          }
          create: {
            args: Prisma.PushSubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PushSubscriptionPayload>
          }
          createMany: {
            args: Prisma.PushSubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PushSubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PushSubscriptionPayload>[]
          }
          delete: {
            args: Prisma.PushSubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PushSubscriptionPayload>
          }
          update: {
            args: Prisma.PushSubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PushSubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.PushSubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PushSubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PushSubscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PushSubscriptionPayload>[]
          }
          upsert: {
            args: Prisma.PushSubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PushSubscriptionPayload>
          }
          aggregate: {
            args: Prisma.PushSubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePushSubscription>
          }
          groupBy: {
            args: Prisma.PushSubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PushSubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PushSubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<PushSubscriptionCountAggregateOutputType> | number
          }
        }
      }
      AppSetting: {
        payload: Prisma.$AppSettingPayload<ExtArgs>
        fields: Prisma.AppSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppSettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppSettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingPayload>
          }
          findFirst: {
            args: Prisma.AppSettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppSettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingPayload>
          }
          findMany: {
            args: Prisma.AppSettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingPayload>[]
          }
          create: {
            args: Prisma.AppSettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingPayload>
          }
          createMany: {
            args: Prisma.AppSettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppSettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingPayload>[]
          }
          delete: {
            args: Prisma.AppSettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingPayload>
          }
          update: {
            args: Prisma.AppSettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingPayload>
          }
          deleteMany: {
            args: Prisma.AppSettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppSettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppSettingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingPayload>[]
          }
          upsert: {
            args: Prisma.AppSettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingPayload>
          }
          aggregate: {
            args: Prisma.AppSettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppSetting>
          }
          groupBy: {
            args: Prisma.AppSettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppSettingCountArgs<ExtArgs>
            result: $Utils.Optional<AppSettingCountAggregateOutputType> | number
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
    notification?: NotificationOmit
    notificationPreference?: NotificationPreferenceOmit
    staffNotification?: StaffNotificationOmit
    staffNotificationRead?: StaffNotificationReadOmit
    staffNotificationCursor?: StaffNotificationCursorOmit
    pushSubscription?: PushSubscriptionOmit
    appSetting?: AppSettingOmit
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
   * Count Type StaffNotificationCountOutputType
   */

  export type StaffNotificationCountOutputType = {
    reads: number
  }

  export type StaffNotificationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reads?: boolean | StaffNotificationCountOutputTypeCountReadsArgs
  }

  // Custom InputTypes
  /**
   * StaffNotificationCountOutputType without action
   */
  export type StaffNotificationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationCountOutputType
     */
    select?: StaffNotificationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StaffNotificationCountOutputType without action
   */
  export type StaffNotificationCountOutputTypeCountReadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffNotificationReadWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    message: string | null
    type: string | null
    isRead: boolean | null
    actionUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    message: string | null
    type: string | null
    isRead: boolean | null
    actionUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    message: number
    type: number
    isRead: number
    actionUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    isRead?: true
    actionUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    isRead?: true
    actionUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    isRead?: true
    actionUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    userId: string
    title: string
    message: string
    type: string
    isRead: boolean
    actionUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    actionUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    actionUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    actionUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    actionUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "message" | "type" | "isRead" | "actionUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["notification"]>

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      message: string
      type: string
      isRead: boolean
      actionUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
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
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
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
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly isRead: FieldRef<"Notification", 'Boolean'>
    readonly actionUrl: FieldRef<"Notification", 'String'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
    readonly updatedAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
  }


  /**
   * Model NotificationPreference
   */

  export type AggregateNotificationPreference = {
    _count: NotificationPreferenceCountAggregateOutputType | null
    _min: NotificationPreferenceMinAggregateOutputType | null
    _max: NotificationPreferenceMaxAggregateOutputType | null
  }

  export type NotificationPreferenceMinAggregateOutputType = {
    id: string | null
    userId: string | null
    emailEnabled: boolean | null
    pushEnabled: boolean | null
    smsEnabled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationPreferenceMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    emailEnabled: boolean | null
    pushEnabled: boolean | null
    smsEnabled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationPreferenceCountAggregateOutputType = {
    id: number
    userId: number
    emailEnabled: number
    pushEnabled: number
    smsEnabled: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NotificationPreferenceMinAggregateInputType = {
    id?: true
    userId?: true
    emailEnabled?: true
    pushEnabled?: true
    smsEnabled?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationPreferenceMaxAggregateInputType = {
    id?: true
    userId?: true
    emailEnabled?: true
    pushEnabled?: true
    smsEnabled?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationPreferenceCountAggregateInputType = {
    id?: true
    userId?: true
    emailEnabled?: true
    pushEnabled?: true
    smsEnabled?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NotificationPreferenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationPreference to aggregate.
     */
    where?: NotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferenceOrderByWithRelationInput | NotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NotificationPreferences
    **/
    _count?: true | NotificationPreferenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationPreferenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationPreferenceMaxAggregateInputType
  }

  export type GetNotificationPreferenceAggregateType<T extends NotificationPreferenceAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificationPreference]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificationPreference[P]>
      : GetScalarType<T[P], AggregateNotificationPreference[P]>
  }




  export type NotificationPreferenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationPreferenceWhereInput
    orderBy?: NotificationPreferenceOrderByWithAggregationInput | NotificationPreferenceOrderByWithAggregationInput[]
    by: NotificationPreferenceScalarFieldEnum[] | NotificationPreferenceScalarFieldEnum
    having?: NotificationPreferenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationPreferenceCountAggregateInputType | true
    _min?: NotificationPreferenceMinAggregateInputType
    _max?: NotificationPreferenceMaxAggregateInputType
  }

  export type NotificationPreferenceGroupByOutputType = {
    id: string
    userId: string
    emailEnabled: boolean
    pushEnabled: boolean
    smsEnabled: boolean
    createdAt: Date
    updatedAt: Date
    _count: NotificationPreferenceCountAggregateOutputType | null
    _min: NotificationPreferenceMinAggregateOutputType | null
    _max: NotificationPreferenceMaxAggregateOutputType | null
  }

  type GetNotificationPreferenceGroupByPayload<T extends NotificationPreferenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationPreferenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationPreferenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationPreferenceGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationPreferenceGroupByOutputType[P]>
        }
      >
    >


  export type NotificationPreferenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    emailEnabled?: boolean
    pushEnabled?: boolean
    smsEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notificationPreference"]>

  export type NotificationPreferenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    emailEnabled?: boolean
    pushEnabled?: boolean
    smsEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notificationPreference"]>

  export type NotificationPreferenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    emailEnabled?: boolean
    pushEnabled?: boolean
    smsEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notificationPreference"]>

  export type NotificationPreferenceSelectScalar = {
    id?: boolean
    userId?: boolean
    emailEnabled?: boolean
    pushEnabled?: boolean
    smsEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NotificationPreferenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "emailEnabled" | "pushEnabled" | "smsEnabled" | "createdAt" | "updatedAt", ExtArgs["result"]["notificationPreference"]>

  export type $NotificationPreferencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NotificationPreference"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      emailEnabled: boolean
      pushEnabled: boolean
      smsEnabled: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["notificationPreference"]>
    composites: {}
  }

  type NotificationPreferenceGetPayload<S extends boolean | null | undefined | NotificationPreferenceDefaultArgs> = $Result.GetResult<Prisma.$NotificationPreferencePayload, S>

  type NotificationPreferenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationPreferenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationPreferenceCountAggregateInputType | true
    }

  export interface NotificationPreferenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NotificationPreference'], meta: { name: 'NotificationPreference' } }
    /**
     * Find zero or one NotificationPreference that matches the filter.
     * @param {NotificationPreferenceFindUniqueArgs} args - Arguments to find a NotificationPreference
     * @example
     * // Get one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationPreferenceFindUniqueArgs>(args: SelectSubset<T, NotificationPreferenceFindUniqueArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NotificationPreference that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationPreferenceFindUniqueOrThrowArgs} args - Arguments to find a NotificationPreference
     * @example
     * // Get one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationPreferenceFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationPreferenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationPreference that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceFindFirstArgs} args - Arguments to find a NotificationPreference
     * @example
     * // Get one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationPreferenceFindFirstArgs>(args?: SelectSubset<T, NotificationPreferenceFindFirstArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationPreference that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceFindFirstOrThrowArgs} args - Arguments to find a NotificationPreference
     * @example
     * // Get one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationPreferenceFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationPreferenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NotificationPreferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotificationPreferences
     * const notificationPreferences = await prisma.notificationPreference.findMany()
     * 
     * // Get first 10 NotificationPreferences
     * const notificationPreferences = await prisma.notificationPreference.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationPreferenceWithIdOnly = await prisma.notificationPreference.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationPreferenceFindManyArgs>(args?: SelectSubset<T, NotificationPreferenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NotificationPreference.
     * @param {NotificationPreferenceCreateArgs} args - Arguments to create a NotificationPreference.
     * @example
     * // Create one NotificationPreference
     * const NotificationPreference = await prisma.notificationPreference.create({
     *   data: {
     *     // ... data to create a NotificationPreference
     *   }
     * })
     * 
     */
    create<T extends NotificationPreferenceCreateArgs>(args: SelectSubset<T, NotificationPreferenceCreateArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NotificationPreferences.
     * @param {NotificationPreferenceCreateManyArgs} args - Arguments to create many NotificationPreferences.
     * @example
     * // Create many NotificationPreferences
     * const notificationPreference = await prisma.notificationPreference.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationPreferenceCreateManyArgs>(args?: SelectSubset<T, NotificationPreferenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NotificationPreferences and returns the data saved in the database.
     * @param {NotificationPreferenceCreateManyAndReturnArgs} args - Arguments to create many NotificationPreferences.
     * @example
     * // Create many NotificationPreferences
     * const notificationPreference = await prisma.notificationPreference.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NotificationPreferences and only return the `id`
     * const notificationPreferenceWithIdOnly = await prisma.notificationPreference.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationPreferenceCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationPreferenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NotificationPreference.
     * @param {NotificationPreferenceDeleteArgs} args - Arguments to delete one NotificationPreference.
     * @example
     * // Delete one NotificationPreference
     * const NotificationPreference = await prisma.notificationPreference.delete({
     *   where: {
     *     // ... filter to delete one NotificationPreference
     *   }
     * })
     * 
     */
    delete<T extends NotificationPreferenceDeleteArgs>(args: SelectSubset<T, NotificationPreferenceDeleteArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NotificationPreference.
     * @param {NotificationPreferenceUpdateArgs} args - Arguments to update one NotificationPreference.
     * @example
     * // Update one NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationPreferenceUpdateArgs>(args: SelectSubset<T, NotificationPreferenceUpdateArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NotificationPreferences.
     * @param {NotificationPreferenceDeleteManyArgs} args - Arguments to filter NotificationPreferences to delete.
     * @example
     * // Delete a few NotificationPreferences
     * const { count } = await prisma.notificationPreference.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationPreferenceDeleteManyArgs>(args?: SelectSubset<T, NotificationPreferenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotificationPreferences
     * const notificationPreference = await prisma.notificationPreference.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationPreferenceUpdateManyArgs>(args: SelectSubset<T, NotificationPreferenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationPreferences and returns the data updated in the database.
     * @param {NotificationPreferenceUpdateManyAndReturnArgs} args - Arguments to update many NotificationPreferences.
     * @example
     * // Update many NotificationPreferences
     * const notificationPreference = await prisma.notificationPreference.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NotificationPreferences and only return the `id`
     * const notificationPreferenceWithIdOnly = await prisma.notificationPreference.updateManyAndReturn({
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
    updateManyAndReturn<T extends NotificationPreferenceUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationPreferenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NotificationPreference.
     * @param {NotificationPreferenceUpsertArgs} args - Arguments to update or create a NotificationPreference.
     * @example
     * // Update or create a NotificationPreference
     * const notificationPreference = await prisma.notificationPreference.upsert({
     *   create: {
     *     // ... data to create a NotificationPreference
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotificationPreference we want to update
     *   }
     * })
     */
    upsert<T extends NotificationPreferenceUpsertArgs>(args: SelectSubset<T, NotificationPreferenceUpsertArgs<ExtArgs>>): Prisma__NotificationPreferenceClient<$Result.GetResult<Prisma.$NotificationPreferencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NotificationPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceCountArgs} args - Arguments to filter NotificationPreferences to count.
     * @example
     * // Count the number of NotificationPreferences
     * const count = await prisma.notificationPreference.count({
     *   where: {
     *     // ... the filter for the NotificationPreferences we want to count
     *   }
     * })
    **/
    count<T extends NotificationPreferenceCountArgs>(
      args?: Subset<T, NotificationPreferenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationPreferenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NotificationPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NotificationPreferenceAggregateArgs>(args: Subset<T, NotificationPreferenceAggregateArgs>): Prisma.PrismaPromise<GetNotificationPreferenceAggregateType<T>>

    /**
     * Group by NotificationPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPreferenceGroupByArgs} args - Group by arguments.
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
      T extends NotificationPreferenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationPreferenceGroupByArgs['orderBy'] }
        : { orderBy?: NotificationPreferenceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NotificationPreferenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationPreferenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NotificationPreference model
   */
  readonly fields: NotificationPreferenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NotificationPreference.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationPreferenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the NotificationPreference model
   */
  interface NotificationPreferenceFieldRefs {
    readonly id: FieldRef<"NotificationPreference", 'String'>
    readonly userId: FieldRef<"NotificationPreference", 'String'>
    readonly emailEnabled: FieldRef<"NotificationPreference", 'Boolean'>
    readonly pushEnabled: FieldRef<"NotificationPreference", 'Boolean'>
    readonly smsEnabled: FieldRef<"NotificationPreference", 'Boolean'>
    readonly createdAt: FieldRef<"NotificationPreference", 'DateTime'>
    readonly updatedAt: FieldRef<"NotificationPreference", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NotificationPreference findUnique
   */
  export type NotificationPreferenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter, which NotificationPreference to fetch.
     */
    where: NotificationPreferenceWhereUniqueInput
  }

  /**
   * NotificationPreference findUniqueOrThrow
   */
  export type NotificationPreferenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter, which NotificationPreference to fetch.
     */
    where: NotificationPreferenceWhereUniqueInput
  }

  /**
   * NotificationPreference findFirst
   */
  export type NotificationPreferenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter, which NotificationPreference to fetch.
     */
    where?: NotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferenceOrderByWithRelationInput | NotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationPreferences.
     */
    cursor?: NotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationPreferences.
     */
    distinct?: NotificationPreferenceScalarFieldEnum | NotificationPreferenceScalarFieldEnum[]
  }

  /**
   * NotificationPreference findFirstOrThrow
   */
  export type NotificationPreferenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter, which NotificationPreference to fetch.
     */
    where?: NotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferenceOrderByWithRelationInput | NotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationPreferences.
     */
    cursor?: NotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationPreferences.
     */
    distinct?: NotificationPreferenceScalarFieldEnum | NotificationPreferenceScalarFieldEnum[]
  }

  /**
   * NotificationPreference findMany
   */
  export type NotificationPreferenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter, which NotificationPreferences to fetch.
     */
    where?: NotificationPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPreferences to fetch.
     */
    orderBy?: NotificationPreferenceOrderByWithRelationInput | NotificationPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NotificationPreferences.
     */
    cursor?: NotificationPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationPreferences.
     */
    distinct?: NotificationPreferenceScalarFieldEnum | NotificationPreferenceScalarFieldEnum[]
  }

  /**
   * NotificationPreference create
   */
  export type NotificationPreferenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * The data needed to create a NotificationPreference.
     */
    data: XOR<NotificationPreferenceCreateInput, NotificationPreferenceUncheckedCreateInput>
  }

  /**
   * NotificationPreference createMany
   */
  export type NotificationPreferenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotificationPreferences.
     */
    data: NotificationPreferenceCreateManyInput | NotificationPreferenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationPreference createManyAndReturn
   */
  export type NotificationPreferenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * The data used to create many NotificationPreferences.
     */
    data: NotificationPreferenceCreateManyInput | NotificationPreferenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationPreference update
   */
  export type NotificationPreferenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * The data needed to update a NotificationPreference.
     */
    data: XOR<NotificationPreferenceUpdateInput, NotificationPreferenceUncheckedUpdateInput>
    /**
     * Choose, which NotificationPreference to update.
     */
    where: NotificationPreferenceWhereUniqueInput
  }

  /**
   * NotificationPreference updateMany
   */
  export type NotificationPreferenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NotificationPreferences.
     */
    data: XOR<NotificationPreferenceUpdateManyMutationInput, NotificationPreferenceUncheckedUpdateManyInput>
    /**
     * Filter which NotificationPreferences to update
     */
    where?: NotificationPreferenceWhereInput
    /**
     * Limit how many NotificationPreferences to update.
     */
    limit?: number
  }

  /**
   * NotificationPreference updateManyAndReturn
   */
  export type NotificationPreferenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * The data used to update NotificationPreferences.
     */
    data: XOR<NotificationPreferenceUpdateManyMutationInput, NotificationPreferenceUncheckedUpdateManyInput>
    /**
     * Filter which NotificationPreferences to update
     */
    where?: NotificationPreferenceWhereInput
    /**
     * Limit how many NotificationPreferences to update.
     */
    limit?: number
  }

  /**
   * NotificationPreference upsert
   */
  export type NotificationPreferenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * The filter to search for the NotificationPreference to update in case it exists.
     */
    where: NotificationPreferenceWhereUniqueInput
    /**
     * In case the NotificationPreference found by the `where` argument doesn't exist, create a new NotificationPreference with this data.
     */
    create: XOR<NotificationPreferenceCreateInput, NotificationPreferenceUncheckedCreateInput>
    /**
     * In case the NotificationPreference was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationPreferenceUpdateInput, NotificationPreferenceUncheckedUpdateInput>
  }

  /**
   * NotificationPreference delete
   */
  export type NotificationPreferenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
    /**
     * Filter which NotificationPreference to delete.
     */
    where: NotificationPreferenceWhereUniqueInput
  }

  /**
   * NotificationPreference deleteMany
   */
  export type NotificationPreferenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationPreferences to delete
     */
    where?: NotificationPreferenceWhereInput
    /**
     * Limit how many NotificationPreferences to delete.
     */
    limit?: number
  }

  /**
   * NotificationPreference without action
   */
  export type NotificationPreferenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPreference
     */
    select?: NotificationPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationPreference
     */
    omit?: NotificationPreferenceOmit<ExtArgs> | null
  }


  /**
   * Model StaffNotification
   */

  export type AggregateStaffNotification = {
    _count: StaffNotificationCountAggregateOutputType | null
    _min: StaffNotificationMinAggregateOutputType | null
    _max: StaffNotificationMaxAggregateOutputType | null
  }

  export type StaffNotificationMinAggregateOutputType = {
    id: string | null
    type: string | null
    title: string | null
    body: string | null
    link: string | null
    permission: string | null
    createdAt: Date | null
  }

  export type StaffNotificationMaxAggregateOutputType = {
    id: string | null
    type: string | null
    title: string | null
    body: string | null
    link: string | null
    permission: string | null
    createdAt: Date | null
  }

  export type StaffNotificationCountAggregateOutputType = {
    id: number
    type: number
    title: number
    body: number
    link: number
    permission: number
    data: number
    createdAt: number
    _all: number
  }


  export type StaffNotificationMinAggregateInputType = {
    id?: true
    type?: true
    title?: true
    body?: true
    link?: true
    permission?: true
    createdAt?: true
  }

  export type StaffNotificationMaxAggregateInputType = {
    id?: true
    type?: true
    title?: true
    body?: true
    link?: true
    permission?: true
    createdAt?: true
  }

  export type StaffNotificationCountAggregateInputType = {
    id?: true
    type?: true
    title?: true
    body?: true
    link?: true
    permission?: true
    data?: true
    createdAt?: true
    _all?: true
  }

  export type StaffNotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StaffNotification to aggregate.
     */
    where?: StaffNotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffNotifications to fetch.
     */
    orderBy?: StaffNotificationOrderByWithRelationInput | StaffNotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StaffNotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffNotifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffNotifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StaffNotifications
    **/
    _count?: true | StaffNotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StaffNotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StaffNotificationMaxAggregateInputType
  }

  export type GetStaffNotificationAggregateType<T extends StaffNotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateStaffNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStaffNotification[P]>
      : GetScalarType<T[P], AggregateStaffNotification[P]>
  }




  export type StaffNotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffNotificationWhereInput
    orderBy?: StaffNotificationOrderByWithAggregationInput | StaffNotificationOrderByWithAggregationInput[]
    by: StaffNotificationScalarFieldEnum[] | StaffNotificationScalarFieldEnum
    having?: StaffNotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StaffNotificationCountAggregateInputType | true
    _min?: StaffNotificationMinAggregateInputType
    _max?: StaffNotificationMaxAggregateInputType
  }

  export type StaffNotificationGroupByOutputType = {
    id: string
    type: string
    title: string
    body: string
    link: string | null
    permission: string | null
    data: JsonValue | null
    createdAt: Date
    _count: StaffNotificationCountAggregateOutputType | null
    _min: StaffNotificationMinAggregateOutputType | null
    _max: StaffNotificationMaxAggregateOutputType | null
  }

  type GetStaffNotificationGroupByPayload<T extends StaffNotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StaffNotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StaffNotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StaffNotificationGroupByOutputType[P]>
            : GetScalarType<T[P], StaffNotificationGroupByOutputType[P]>
        }
      >
    >


  export type StaffNotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    link?: boolean
    permission?: boolean
    data?: boolean
    createdAt?: boolean
    reads?: boolean | StaffNotification$readsArgs<ExtArgs>
    _count?: boolean | StaffNotificationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staffNotification"]>

  export type StaffNotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    link?: boolean
    permission?: boolean
    data?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["staffNotification"]>

  export type StaffNotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    link?: boolean
    permission?: boolean
    data?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["staffNotification"]>

  export type StaffNotificationSelectScalar = {
    id?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    link?: boolean
    permission?: boolean
    data?: boolean
    createdAt?: boolean
  }

  export type StaffNotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "title" | "body" | "link" | "permission" | "data" | "createdAt", ExtArgs["result"]["staffNotification"]>
  export type StaffNotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reads?: boolean | StaffNotification$readsArgs<ExtArgs>
    _count?: boolean | StaffNotificationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StaffNotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type StaffNotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StaffNotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StaffNotification"
    objects: {
      reads: Prisma.$StaffNotificationReadPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      title: string
      body: string
      link: string | null
      permission: string | null
      data: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["staffNotification"]>
    composites: {}
  }

  type StaffNotificationGetPayload<S extends boolean | null | undefined | StaffNotificationDefaultArgs> = $Result.GetResult<Prisma.$StaffNotificationPayload, S>

  type StaffNotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StaffNotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StaffNotificationCountAggregateInputType | true
    }

  export interface StaffNotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StaffNotification'], meta: { name: 'StaffNotification' } }
    /**
     * Find zero or one StaffNotification that matches the filter.
     * @param {StaffNotificationFindUniqueArgs} args - Arguments to find a StaffNotification
     * @example
     * // Get one StaffNotification
     * const staffNotification = await prisma.staffNotification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StaffNotificationFindUniqueArgs>(args: SelectSubset<T, StaffNotificationFindUniqueArgs<ExtArgs>>): Prisma__StaffNotificationClient<$Result.GetResult<Prisma.$StaffNotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StaffNotification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StaffNotificationFindUniqueOrThrowArgs} args - Arguments to find a StaffNotification
     * @example
     * // Get one StaffNotification
     * const staffNotification = await prisma.staffNotification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StaffNotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, StaffNotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StaffNotificationClient<$Result.GetResult<Prisma.$StaffNotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StaffNotification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffNotificationFindFirstArgs} args - Arguments to find a StaffNotification
     * @example
     * // Get one StaffNotification
     * const staffNotification = await prisma.staffNotification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StaffNotificationFindFirstArgs>(args?: SelectSubset<T, StaffNotificationFindFirstArgs<ExtArgs>>): Prisma__StaffNotificationClient<$Result.GetResult<Prisma.$StaffNotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StaffNotification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffNotificationFindFirstOrThrowArgs} args - Arguments to find a StaffNotification
     * @example
     * // Get one StaffNotification
     * const staffNotification = await prisma.staffNotification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StaffNotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, StaffNotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__StaffNotificationClient<$Result.GetResult<Prisma.$StaffNotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StaffNotifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffNotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StaffNotifications
     * const staffNotifications = await prisma.staffNotification.findMany()
     * 
     * // Get first 10 StaffNotifications
     * const staffNotifications = await prisma.staffNotification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const staffNotificationWithIdOnly = await prisma.staffNotification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StaffNotificationFindManyArgs>(args?: SelectSubset<T, StaffNotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffNotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StaffNotification.
     * @param {StaffNotificationCreateArgs} args - Arguments to create a StaffNotification.
     * @example
     * // Create one StaffNotification
     * const StaffNotification = await prisma.staffNotification.create({
     *   data: {
     *     // ... data to create a StaffNotification
     *   }
     * })
     * 
     */
    create<T extends StaffNotificationCreateArgs>(args: SelectSubset<T, StaffNotificationCreateArgs<ExtArgs>>): Prisma__StaffNotificationClient<$Result.GetResult<Prisma.$StaffNotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StaffNotifications.
     * @param {StaffNotificationCreateManyArgs} args - Arguments to create many StaffNotifications.
     * @example
     * // Create many StaffNotifications
     * const staffNotification = await prisma.staffNotification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StaffNotificationCreateManyArgs>(args?: SelectSubset<T, StaffNotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StaffNotifications and returns the data saved in the database.
     * @param {StaffNotificationCreateManyAndReturnArgs} args - Arguments to create many StaffNotifications.
     * @example
     * // Create many StaffNotifications
     * const staffNotification = await prisma.staffNotification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StaffNotifications and only return the `id`
     * const staffNotificationWithIdOnly = await prisma.staffNotification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StaffNotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, StaffNotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffNotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StaffNotification.
     * @param {StaffNotificationDeleteArgs} args - Arguments to delete one StaffNotification.
     * @example
     * // Delete one StaffNotification
     * const StaffNotification = await prisma.staffNotification.delete({
     *   where: {
     *     // ... filter to delete one StaffNotification
     *   }
     * })
     * 
     */
    delete<T extends StaffNotificationDeleteArgs>(args: SelectSubset<T, StaffNotificationDeleteArgs<ExtArgs>>): Prisma__StaffNotificationClient<$Result.GetResult<Prisma.$StaffNotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StaffNotification.
     * @param {StaffNotificationUpdateArgs} args - Arguments to update one StaffNotification.
     * @example
     * // Update one StaffNotification
     * const staffNotification = await prisma.staffNotification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StaffNotificationUpdateArgs>(args: SelectSubset<T, StaffNotificationUpdateArgs<ExtArgs>>): Prisma__StaffNotificationClient<$Result.GetResult<Prisma.$StaffNotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StaffNotifications.
     * @param {StaffNotificationDeleteManyArgs} args - Arguments to filter StaffNotifications to delete.
     * @example
     * // Delete a few StaffNotifications
     * const { count } = await prisma.staffNotification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StaffNotificationDeleteManyArgs>(args?: SelectSubset<T, StaffNotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StaffNotifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffNotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StaffNotifications
     * const staffNotification = await prisma.staffNotification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StaffNotificationUpdateManyArgs>(args: SelectSubset<T, StaffNotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StaffNotifications and returns the data updated in the database.
     * @param {StaffNotificationUpdateManyAndReturnArgs} args - Arguments to update many StaffNotifications.
     * @example
     * // Update many StaffNotifications
     * const staffNotification = await prisma.staffNotification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StaffNotifications and only return the `id`
     * const staffNotificationWithIdOnly = await prisma.staffNotification.updateManyAndReturn({
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
    updateManyAndReturn<T extends StaffNotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, StaffNotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffNotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StaffNotification.
     * @param {StaffNotificationUpsertArgs} args - Arguments to update or create a StaffNotification.
     * @example
     * // Update or create a StaffNotification
     * const staffNotification = await prisma.staffNotification.upsert({
     *   create: {
     *     // ... data to create a StaffNotification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StaffNotification we want to update
     *   }
     * })
     */
    upsert<T extends StaffNotificationUpsertArgs>(args: SelectSubset<T, StaffNotificationUpsertArgs<ExtArgs>>): Prisma__StaffNotificationClient<$Result.GetResult<Prisma.$StaffNotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StaffNotifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffNotificationCountArgs} args - Arguments to filter StaffNotifications to count.
     * @example
     * // Count the number of StaffNotifications
     * const count = await prisma.staffNotification.count({
     *   where: {
     *     // ... the filter for the StaffNotifications we want to count
     *   }
     * })
    **/
    count<T extends StaffNotificationCountArgs>(
      args?: Subset<T, StaffNotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StaffNotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StaffNotification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffNotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StaffNotificationAggregateArgs>(args: Subset<T, StaffNotificationAggregateArgs>): Prisma.PrismaPromise<GetStaffNotificationAggregateType<T>>

    /**
     * Group by StaffNotification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffNotificationGroupByArgs} args - Group by arguments.
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
      T extends StaffNotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StaffNotificationGroupByArgs['orderBy'] }
        : { orderBy?: StaffNotificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StaffNotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStaffNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StaffNotification model
   */
  readonly fields: StaffNotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StaffNotification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StaffNotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reads<T extends StaffNotification$readsArgs<ExtArgs> = {}>(args?: Subset<T, StaffNotification$readsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffNotificationReadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the StaffNotification model
   */
  interface StaffNotificationFieldRefs {
    readonly id: FieldRef<"StaffNotification", 'String'>
    readonly type: FieldRef<"StaffNotification", 'String'>
    readonly title: FieldRef<"StaffNotification", 'String'>
    readonly body: FieldRef<"StaffNotification", 'String'>
    readonly link: FieldRef<"StaffNotification", 'String'>
    readonly permission: FieldRef<"StaffNotification", 'String'>
    readonly data: FieldRef<"StaffNotification", 'Json'>
    readonly createdAt: FieldRef<"StaffNotification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StaffNotification findUnique
   */
  export type StaffNotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotification
     */
    select?: StaffNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotification
     */
    omit?: StaffNotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffNotificationInclude<ExtArgs> | null
    /**
     * Filter, which StaffNotification to fetch.
     */
    where: StaffNotificationWhereUniqueInput
  }

  /**
   * StaffNotification findUniqueOrThrow
   */
  export type StaffNotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotification
     */
    select?: StaffNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotification
     */
    omit?: StaffNotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffNotificationInclude<ExtArgs> | null
    /**
     * Filter, which StaffNotification to fetch.
     */
    where: StaffNotificationWhereUniqueInput
  }

  /**
   * StaffNotification findFirst
   */
  export type StaffNotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotification
     */
    select?: StaffNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotification
     */
    omit?: StaffNotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffNotificationInclude<ExtArgs> | null
    /**
     * Filter, which StaffNotification to fetch.
     */
    where?: StaffNotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffNotifications to fetch.
     */
    orderBy?: StaffNotificationOrderByWithRelationInput | StaffNotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StaffNotifications.
     */
    cursor?: StaffNotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffNotifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffNotifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffNotifications.
     */
    distinct?: StaffNotificationScalarFieldEnum | StaffNotificationScalarFieldEnum[]
  }

  /**
   * StaffNotification findFirstOrThrow
   */
  export type StaffNotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotification
     */
    select?: StaffNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotification
     */
    omit?: StaffNotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffNotificationInclude<ExtArgs> | null
    /**
     * Filter, which StaffNotification to fetch.
     */
    where?: StaffNotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffNotifications to fetch.
     */
    orderBy?: StaffNotificationOrderByWithRelationInput | StaffNotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StaffNotifications.
     */
    cursor?: StaffNotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffNotifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffNotifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffNotifications.
     */
    distinct?: StaffNotificationScalarFieldEnum | StaffNotificationScalarFieldEnum[]
  }

  /**
   * StaffNotification findMany
   */
  export type StaffNotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotification
     */
    select?: StaffNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotification
     */
    omit?: StaffNotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffNotificationInclude<ExtArgs> | null
    /**
     * Filter, which StaffNotifications to fetch.
     */
    where?: StaffNotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffNotifications to fetch.
     */
    orderBy?: StaffNotificationOrderByWithRelationInput | StaffNotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StaffNotifications.
     */
    cursor?: StaffNotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffNotifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffNotifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffNotifications.
     */
    distinct?: StaffNotificationScalarFieldEnum | StaffNotificationScalarFieldEnum[]
  }

  /**
   * StaffNotification create
   */
  export type StaffNotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotification
     */
    select?: StaffNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotification
     */
    omit?: StaffNotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffNotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a StaffNotification.
     */
    data: XOR<StaffNotificationCreateInput, StaffNotificationUncheckedCreateInput>
  }

  /**
   * StaffNotification createMany
   */
  export type StaffNotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StaffNotifications.
     */
    data: StaffNotificationCreateManyInput | StaffNotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StaffNotification createManyAndReturn
   */
  export type StaffNotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotification
     */
    select?: StaffNotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotification
     */
    omit?: StaffNotificationOmit<ExtArgs> | null
    /**
     * The data used to create many StaffNotifications.
     */
    data: StaffNotificationCreateManyInput | StaffNotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StaffNotification update
   */
  export type StaffNotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotification
     */
    select?: StaffNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotification
     */
    omit?: StaffNotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffNotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a StaffNotification.
     */
    data: XOR<StaffNotificationUpdateInput, StaffNotificationUncheckedUpdateInput>
    /**
     * Choose, which StaffNotification to update.
     */
    where: StaffNotificationWhereUniqueInput
  }

  /**
   * StaffNotification updateMany
   */
  export type StaffNotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StaffNotifications.
     */
    data: XOR<StaffNotificationUpdateManyMutationInput, StaffNotificationUncheckedUpdateManyInput>
    /**
     * Filter which StaffNotifications to update
     */
    where?: StaffNotificationWhereInput
    /**
     * Limit how many StaffNotifications to update.
     */
    limit?: number
  }

  /**
   * StaffNotification updateManyAndReturn
   */
  export type StaffNotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotification
     */
    select?: StaffNotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotification
     */
    omit?: StaffNotificationOmit<ExtArgs> | null
    /**
     * The data used to update StaffNotifications.
     */
    data: XOR<StaffNotificationUpdateManyMutationInput, StaffNotificationUncheckedUpdateManyInput>
    /**
     * Filter which StaffNotifications to update
     */
    where?: StaffNotificationWhereInput
    /**
     * Limit how many StaffNotifications to update.
     */
    limit?: number
  }

  /**
   * StaffNotification upsert
   */
  export type StaffNotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotification
     */
    select?: StaffNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotification
     */
    omit?: StaffNotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffNotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the StaffNotification to update in case it exists.
     */
    where: StaffNotificationWhereUniqueInput
    /**
     * In case the StaffNotification found by the `where` argument doesn't exist, create a new StaffNotification with this data.
     */
    create: XOR<StaffNotificationCreateInput, StaffNotificationUncheckedCreateInput>
    /**
     * In case the StaffNotification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StaffNotificationUpdateInput, StaffNotificationUncheckedUpdateInput>
  }

  /**
   * StaffNotification delete
   */
  export type StaffNotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotification
     */
    select?: StaffNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotification
     */
    omit?: StaffNotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffNotificationInclude<ExtArgs> | null
    /**
     * Filter which StaffNotification to delete.
     */
    where: StaffNotificationWhereUniqueInput
  }

  /**
   * StaffNotification deleteMany
   */
  export type StaffNotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StaffNotifications to delete
     */
    where?: StaffNotificationWhereInput
    /**
     * Limit how many StaffNotifications to delete.
     */
    limit?: number
  }

  /**
   * StaffNotification.reads
   */
  export type StaffNotification$readsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationRead
     */
    select?: StaffNotificationReadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationRead
     */
    omit?: StaffNotificationReadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffNotificationReadInclude<ExtArgs> | null
    where?: StaffNotificationReadWhereInput
    orderBy?: StaffNotificationReadOrderByWithRelationInput | StaffNotificationReadOrderByWithRelationInput[]
    cursor?: StaffNotificationReadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StaffNotificationReadScalarFieldEnum | StaffNotificationReadScalarFieldEnum[]
  }

  /**
   * StaffNotification without action
   */
  export type StaffNotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotification
     */
    select?: StaffNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotification
     */
    omit?: StaffNotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffNotificationInclude<ExtArgs> | null
  }


  /**
   * Model StaffNotificationRead
   */

  export type AggregateStaffNotificationRead = {
    _count: StaffNotificationReadCountAggregateOutputType | null
    _min: StaffNotificationReadMinAggregateOutputType | null
    _max: StaffNotificationReadMaxAggregateOutputType | null
  }

  export type StaffNotificationReadMinAggregateOutputType = {
    notificationId: string | null
    userId: string | null
    readAt: Date | null
  }

  export type StaffNotificationReadMaxAggregateOutputType = {
    notificationId: string | null
    userId: string | null
    readAt: Date | null
  }

  export type StaffNotificationReadCountAggregateOutputType = {
    notificationId: number
    userId: number
    readAt: number
    _all: number
  }


  export type StaffNotificationReadMinAggregateInputType = {
    notificationId?: true
    userId?: true
    readAt?: true
  }

  export type StaffNotificationReadMaxAggregateInputType = {
    notificationId?: true
    userId?: true
    readAt?: true
  }

  export type StaffNotificationReadCountAggregateInputType = {
    notificationId?: true
    userId?: true
    readAt?: true
    _all?: true
  }

  export type StaffNotificationReadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StaffNotificationRead to aggregate.
     */
    where?: StaffNotificationReadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffNotificationReads to fetch.
     */
    orderBy?: StaffNotificationReadOrderByWithRelationInput | StaffNotificationReadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StaffNotificationReadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffNotificationReads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffNotificationReads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StaffNotificationReads
    **/
    _count?: true | StaffNotificationReadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StaffNotificationReadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StaffNotificationReadMaxAggregateInputType
  }

  export type GetStaffNotificationReadAggregateType<T extends StaffNotificationReadAggregateArgs> = {
        [P in keyof T & keyof AggregateStaffNotificationRead]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStaffNotificationRead[P]>
      : GetScalarType<T[P], AggregateStaffNotificationRead[P]>
  }




  export type StaffNotificationReadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffNotificationReadWhereInput
    orderBy?: StaffNotificationReadOrderByWithAggregationInput | StaffNotificationReadOrderByWithAggregationInput[]
    by: StaffNotificationReadScalarFieldEnum[] | StaffNotificationReadScalarFieldEnum
    having?: StaffNotificationReadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StaffNotificationReadCountAggregateInputType | true
    _min?: StaffNotificationReadMinAggregateInputType
    _max?: StaffNotificationReadMaxAggregateInputType
  }

  export type StaffNotificationReadGroupByOutputType = {
    notificationId: string
    userId: string
    readAt: Date
    _count: StaffNotificationReadCountAggregateOutputType | null
    _min: StaffNotificationReadMinAggregateOutputType | null
    _max: StaffNotificationReadMaxAggregateOutputType | null
  }

  type GetStaffNotificationReadGroupByPayload<T extends StaffNotificationReadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StaffNotificationReadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StaffNotificationReadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StaffNotificationReadGroupByOutputType[P]>
            : GetScalarType<T[P], StaffNotificationReadGroupByOutputType[P]>
        }
      >
    >


  export type StaffNotificationReadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    notificationId?: boolean
    userId?: boolean
    readAt?: boolean
    notification?: boolean | StaffNotificationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staffNotificationRead"]>

  export type StaffNotificationReadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    notificationId?: boolean
    userId?: boolean
    readAt?: boolean
    notification?: boolean | StaffNotificationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staffNotificationRead"]>

  export type StaffNotificationReadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    notificationId?: boolean
    userId?: boolean
    readAt?: boolean
    notification?: boolean | StaffNotificationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staffNotificationRead"]>

  export type StaffNotificationReadSelectScalar = {
    notificationId?: boolean
    userId?: boolean
    readAt?: boolean
  }

  export type StaffNotificationReadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"notificationId" | "userId" | "readAt", ExtArgs["result"]["staffNotificationRead"]>
  export type StaffNotificationReadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notification?: boolean | StaffNotificationDefaultArgs<ExtArgs>
  }
  export type StaffNotificationReadIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notification?: boolean | StaffNotificationDefaultArgs<ExtArgs>
  }
  export type StaffNotificationReadIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notification?: boolean | StaffNotificationDefaultArgs<ExtArgs>
  }

  export type $StaffNotificationReadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StaffNotificationRead"
    objects: {
      notification: Prisma.$StaffNotificationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      notificationId: string
      userId: string
      readAt: Date
    }, ExtArgs["result"]["staffNotificationRead"]>
    composites: {}
  }

  type StaffNotificationReadGetPayload<S extends boolean | null | undefined | StaffNotificationReadDefaultArgs> = $Result.GetResult<Prisma.$StaffNotificationReadPayload, S>

  type StaffNotificationReadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StaffNotificationReadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StaffNotificationReadCountAggregateInputType | true
    }

  export interface StaffNotificationReadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StaffNotificationRead'], meta: { name: 'StaffNotificationRead' } }
    /**
     * Find zero or one StaffNotificationRead that matches the filter.
     * @param {StaffNotificationReadFindUniqueArgs} args - Arguments to find a StaffNotificationRead
     * @example
     * // Get one StaffNotificationRead
     * const staffNotificationRead = await prisma.staffNotificationRead.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StaffNotificationReadFindUniqueArgs>(args: SelectSubset<T, StaffNotificationReadFindUniqueArgs<ExtArgs>>): Prisma__StaffNotificationReadClient<$Result.GetResult<Prisma.$StaffNotificationReadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StaffNotificationRead that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StaffNotificationReadFindUniqueOrThrowArgs} args - Arguments to find a StaffNotificationRead
     * @example
     * // Get one StaffNotificationRead
     * const staffNotificationRead = await prisma.staffNotificationRead.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StaffNotificationReadFindUniqueOrThrowArgs>(args: SelectSubset<T, StaffNotificationReadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StaffNotificationReadClient<$Result.GetResult<Prisma.$StaffNotificationReadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StaffNotificationRead that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffNotificationReadFindFirstArgs} args - Arguments to find a StaffNotificationRead
     * @example
     * // Get one StaffNotificationRead
     * const staffNotificationRead = await prisma.staffNotificationRead.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StaffNotificationReadFindFirstArgs>(args?: SelectSubset<T, StaffNotificationReadFindFirstArgs<ExtArgs>>): Prisma__StaffNotificationReadClient<$Result.GetResult<Prisma.$StaffNotificationReadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StaffNotificationRead that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffNotificationReadFindFirstOrThrowArgs} args - Arguments to find a StaffNotificationRead
     * @example
     * // Get one StaffNotificationRead
     * const staffNotificationRead = await prisma.staffNotificationRead.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StaffNotificationReadFindFirstOrThrowArgs>(args?: SelectSubset<T, StaffNotificationReadFindFirstOrThrowArgs<ExtArgs>>): Prisma__StaffNotificationReadClient<$Result.GetResult<Prisma.$StaffNotificationReadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StaffNotificationReads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffNotificationReadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StaffNotificationReads
     * const staffNotificationReads = await prisma.staffNotificationRead.findMany()
     * 
     * // Get first 10 StaffNotificationReads
     * const staffNotificationReads = await prisma.staffNotificationRead.findMany({ take: 10 })
     * 
     * // Only select the `notificationId`
     * const staffNotificationReadWithNotificationIdOnly = await prisma.staffNotificationRead.findMany({ select: { notificationId: true } })
     * 
     */
    findMany<T extends StaffNotificationReadFindManyArgs>(args?: SelectSubset<T, StaffNotificationReadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffNotificationReadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StaffNotificationRead.
     * @param {StaffNotificationReadCreateArgs} args - Arguments to create a StaffNotificationRead.
     * @example
     * // Create one StaffNotificationRead
     * const StaffNotificationRead = await prisma.staffNotificationRead.create({
     *   data: {
     *     // ... data to create a StaffNotificationRead
     *   }
     * })
     * 
     */
    create<T extends StaffNotificationReadCreateArgs>(args: SelectSubset<T, StaffNotificationReadCreateArgs<ExtArgs>>): Prisma__StaffNotificationReadClient<$Result.GetResult<Prisma.$StaffNotificationReadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StaffNotificationReads.
     * @param {StaffNotificationReadCreateManyArgs} args - Arguments to create many StaffNotificationReads.
     * @example
     * // Create many StaffNotificationReads
     * const staffNotificationRead = await prisma.staffNotificationRead.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StaffNotificationReadCreateManyArgs>(args?: SelectSubset<T, StaffNotificationReadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StaffNotificationReads and returns the data saved in the database.
     * @param {StaffNotificationReadCreateManyAndReturnArgs} args - Arguments to create many StaffNotificationReads.
     * @example
     * // Create many StaffNotificationReads
     * const staffNotificationRead = await prisma.staffNotificationRead.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StaffNotificationReads and only return the `notificationId`
     * const staffNotificationReadWithNotificationIdOnly = await prisma.staffNotificationRead.createManyAndReturn({
     *   select: { notificationId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StaffNotificationReadCreateManyAndReturnArgs>(args?: SelectSubset<T, StaffNotificationReadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffNotificationReadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StaffNotificationRead.
     * @param {StaffNotificationReadDeleteArgs} args - Arguments to delete one StaffNotificationRead.
     * @example
     * // Delete one StaffNotificationRead
     * const StaffNotificationRead = await prisma.staffNotificationRead.delete({
     *   where: {
     *     // ... filter to delete one StaffNotificationRead
     *   }
     * })
     * 
     */
    delete<T extends StaffNotificationReadDeleteArgs>(args: SelectSubset<T, StaffNotificationReadDeleteArgs<ExtArgs>>): Prisma__StaffNotificationReadClient<$Result.GetResult<Prisma.$StaffNotificationReadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StaffNotificationRead.
     * @param {StaffNotificationReadUpdateArgs} args - Arguments to update one StaffNotificationRead.
     * @example
     * // Update one StaffNotificationRead
     * const staffNotificationRead = await prisma.staffNotificationRead.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StaffNotificationReadUpdateArgs>(args: SelectSubset<T, StaffNotificationReadUpdateArgs<ExtArgs>>): Prisma__StaffNotificationReadClient<$Result.GetResult<Prisma.$StaffNotificationReadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StaffNotificationReads.
     * @param {StaffNotificationReadDeleteManyArgs} args - Arguments to filter StaffNotificationReads to delete.
     * @example
     * // Delete a few StaffNotificationReads
     * const { count } = await prisma.staffNotificationRead.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StaffNotificationReadDeleteManyArgs>(args?: SelectSubset<T, StaffNotificationReadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StaffNotificationReads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffNotificationReadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StaffNotificationReads
     * const staffNotificationRead = await prisma.staffNotificationRead.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StaffNotificationReadUpdateManyArgs>(args: SelectSubset<T, StaffNotificationReadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StaffNotificationReads and returns the data updated in the database.
     * @param {StaffNotificationReadUpdateManyAndReturnArgs} args - Arguments to update many StaffNotificationReads.
     * @example
     * // Update many StaffNotificationReads
     * const staffNotificationRead = await prisma.staffNotificationRead.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StaffNotificationReads and only return the `notificationId`
     * const staffNotificationReadWithNotificationIdOnly = await prisma.staffNotificationRead.updateManyAndReturn({
     *   select: { notificationId: true },
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
    updateManyAndReturn<T extends StaffNotificationReadUpdateManyAndReturnArgs>(args: SelectSubset<T, StaffNotificationReadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffNotificationReadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StaffNotificationRead.
     * @param {StaffNotificationReadUpsertArgs} args - Arguments to update or create a StaffNotificationRead.
     * @example
     * // Update or create a StaffNotificationRead
     * const staffNotificationRead = await prisma.staffNotificationRead.upsert({
     *   create: {
     *     // ... data to create a StaffNotificationRead
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StaffNotificationRead we want to update
     *   }
     * })
     */
    upsert<T extends StaffNotificationReadUpsertArgs>(args: SelectSubset<T, StaffNotificationReadUpsertArgs<ExtArgs>>): Prisma__StaffNotificationReadClient<$Result.GetResult<Prisma.$StaffNotificationReadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StaffNotificationReads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffNotificationReadCountArgs} args - Arguments to filter StaffNotificationReads to count.
     * @example
     * // Count the number of StaffNotificationReads
     * const count = await prisma.staffNotificationRead.count({
     *   where: {
     *     // ... the filter for the StaffNotificationReads we want to count
     *   }
     * })
    **/
    count<T extends StaffNotificationReadCountArgs>(
      args?: Subset<T, StaffNotificationReadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StaffNotificationReadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StaffNotificationRead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffNotificationReadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StaffNotificationReadAggregateArgs>(args: Subset<T, StaffNotificationReadAggregateArgs>): Prisma.PrismaPromise<GetStaffNotificationReadAggregateType<T>>

    /**
     * Group by StaffNotificationRead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffNotificationReadGroupByArgs} args - Group by arguments.
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
      T extends StaffNotificationReadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StaffNotificationReadGroupByArgs['orderBy'] }
        : { orderBy?: StaffNotificationReadGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StaffNotificationReadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStaffNotificationReadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StaffNotificationRead model
   */
  readonly fields: StaffNotificationReadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StaffNotificationRead.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StaffNotificationReadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    notification<T extends StaffNotificationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StaffNotificationDefaultArgs<ExtArgs>>): Prisma__StaffNotificationClient<$Result.GetResult<Prisma.$StaffNotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the StaffNotificationRead model
   */
  interface StaffNotificationReadFieldRefs {
    readonly notificationId: FieldRef<"StaffNotificationRead", 'String'>
    readonly userId: FieldRef<"StaffNotificationRead", 'String'>
    readonly readAt: FieldRef<"StaffNotificationRead", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StaffNotificationRead findUnique
   */
  export type StaffNotificationReadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationRead
     */
    select?: StaffNotificationReadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationRead
     */
    omit?: StaffNotificationReadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffNotificationReadInclude<ExtArgs> | null
    /**
     * Filter, which StaffNotificationRead to fetch.
     */
    where: StaffNotificationReadWhereUniqueInput
  }

  /**
   * StaffNotificationRead findUniqueOrThrow
   */
  export type StaffNotificationReadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationRead
     */
    select?: StaffNotificationReadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationRead
     */
    omit?: StaffNotificationReadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffNotificationReadInclude<ExtArgs> | null
    /**
     * Filter, which StaffNotificationRead to fetch.
     */
    where: StaffNotificationReadWhereUniqueInput
  }

  /**
   * StaffNotificationRead findFirst
   */
  export type StaffNotificationReadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationRead
     */
    select?: StaffNotificationReadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationRead
     */
    omit?: StaffNotificationReadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffNotificationReadInclude<ExtArgs> | null
    /**
     * Filter, which StaffNotificationRead to fetch.
     */
    where?: StaffNotificationReadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffNotificationReads to fetch.
     */
    orderBy?: StaffNotificationReadOrderByWithRelationInput | StaffNotificationReadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StaffNotificationReads.
     */
    cursor?: StaffNotificationReadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffNotificationReads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffNotificationReads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffNotificationReads.
     */
    distinct?: StaffNotificationReadScalarFieldEnum | StaffNotificationReadScalarFieldEnum[]
  }

  /**
   * StaffNotificationRead findFirstOrThrow
   */
  export type StaffNotificationReadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationRead
     */
    select?: StaffNotificationReadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationRead
     */
    omit?: StaffNotificationReadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffNotificationReadInclude<ExtArgs> | null
    /**
     * Filter, which StaffNotificationRead to fetch.
     */
    where?: StaffNotificationReadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffNotificationReads to fetch.
     */
    orderBy?: StaffNotificationReadOrderByWithRelationInput | StaffNotificationReadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StaffNotificationReads.
     */
    cursor?: StaffNotificationReadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffNotificationReads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffNotificationReads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffNotificationReads.
     */
    distinct?: StaffNotificationReadScalarFieldEnum | StaffNotificationReadScalarFieldEnum[]
  }

  /**
   * StaffNotificationRead findMany
   */
  export type StaffNotificationReadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationRead
     */
    select?: StaffNotificationReadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationRead
     */
    omit?: StaffNotificationReadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffNotificationReadInclude<ExtArgs> | null
    /**
     * Filter, which StaffNotificationReads to fetch.
     */
    where?: StaffNotificationReadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffNotificationReads to fetch.
     */
    orderBy?: StaffNotificationReadOrderByWithRelationInput | StaffNotificationReadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StaffNotificationReads.
     */
    cursor?: StaffNotificationReadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffNotificationReads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffNotificationReads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffNotificationReads.
     */
    distinct?: StaffNotificationReadScalarFieldEnum | StaffNotificationReadScalarFieldEnum[]
  }

  /**
   * StaffNotificationRead create
   */
  export type StaffNotificationReadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationRead
     */
    select?: StaffNotificationReadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationRead
     */
    omit?: StaffNotificationReadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffNotificationReadInclude<ExtArgs> | null
    /**
     * The data needed to create a StaffNotificationRead.
     */
    data: XOR<StaffNotificationReadCreateInput, StaffNotificationReadUncheckedCreateInput>
  }

  /**
   * StaffNotificationRead createMany
   */
  export type StaffNotificationReadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StaffNotificationReads.
     */
    data: StaffNotificationReadCreateManyInput | StaffNotificationReadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StaffNotificationRead createManyAndReturn
   */
  export type StaffNotificationReadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationRead
     */
    select?: StaffNotificationReadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationRead
     */
    omit?: StaffNotificationReadOmit<ExtArgs> | null
    /**
     * The data used to create many StaffNotificationReads.
     */
    data: StaffNotificationReadCreateManyInput | StaffNotificationReadCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffNotificationReadIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StaffNotificationRead update
   */
  export type StaffNotificationReadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationRead
     */
    select?: StaffNotificationReadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationRead
     */
    omit?: StaffNotificationReadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffNotificationReadInclude<ExtArgs> | null
    /**
     * The data needed to update a StaffNotificationRead.
     */
    data: XOR<StaffNotificationReadUpdateInput, StaffNotificationReadUncheckedUpdateInput>
    /**
     * Choose, which StaffNotificationRead to update.
     */
    where: StaffNotificationReadWhereUniqueInput
  }

  /**
   * StaffNotificationRead updateMany
   */
  export type StaffNotificationReadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StaffNotificationReads.
     */
    data: XOR<StaffNotificationReadUpdateManyMutationInput, StaffNotificationReadUncheckedUpdateManyInput>
    /**
     * Filter which StaffNotificationReads to update
     */
    where?: StaffNotificationReadWhereInput
    /**
     * Limit how many StaffNotificationReads to update.
     */
    limit?: number
  }

  /**
   * StaffNotificationRead updateManyAndReturn
   */
  export type StaffNotificationReadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationRead
     */
    select?: StaffNotificationReadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationRead
     */
    omit?: StaffNotificationReadOmit<ExtArgs> | null
    /**
     * The data used to update StaffNotificationReads.
     */
    data: XOR<StaffNotificationReadUpdateManyMutationInput, StaffNotificationReadUncheckedUpdateManyInput>
    /**
     * Filter which StaffNotificationReads to update
     */
    where?: StaffNotificationReadWhereInput
    /**
     * Limit how many StaffNotificationReads to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffNotificationReadIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StaffNotificationRead upsert
   */
  export type StaffNotificationReadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationRead
     */
    select?: StaffNotificationReadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationRead
     */
    omit?: StaffNotificationReadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffNotificationReadInclude<ExtArgs> | null
    /**
     * The filter to search for the StaffNotificationRead to update in case it exists.
     */
    where: StaffNotificationReadWhereUniqueInput
    /**
     * In case the StaffNotificationRead found by the `where` argument doesn't exist, create a new StaffNotificationRead with this data.
     */
    create: XOR<StaffNotificationReadCreateInput, StaffNotificationReadUncheckedCreateInput>
    /**
     * In case the StaffNotificationRead was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StaffNotificationReadUpdateInput, StaffNotificationReadUncheckedUpdateInput>
  }

  /**
   * StaffNotificationRead delete
   */
  export type StaffNotificationReadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationRead
     */
    select?: StaffNotificationReadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationRead
     */
    omit?: StaffNotificationReadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffNotificationReadInclude<ExtArgs> | null
    /**
     * Filter which StaffNotificationRead to delete.
     */
    where: StaffNotificationReadWhereUniqueInput
  }

  /**
   * StaffNotificationRead deleteMany
   */
  export type StaffNotificationReadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StaffNotificationReads to delete
     */
    where?: StaffNotificationReadWhereInput
    /**
     * Limit how many StaffNotificationReads to delete.
     */
    limit?: number
  }

  /**
   * StaffNotificationRead without action
   */
  export type StaffNotificationReadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationRead
     */
    select?: StaffNotificationReadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationRead
     */
    omit?: StaffNotificationReadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffNotificationReadInclude<ExtArgs> | null
  }


  /**
   * Model StaffNotificationCursor
   */

  export type AggregateStaffNotificationCursor = {
    _count: StaffNotificationCursorCountAggregateOutputType | null
    _min: StaffNotificationCursorMinAggregateOutputType | null
    _max: StaffNotificationCursorMaxAggregateOutputType | null
  }

  export type StaffNotificationCursorMinAggregateOutputType = {
    userId: string | null
    readBefore: Date | null
  }

  export type StaffNotificationCursorMaxAggregateOutputType = {
    userId: string | null
    readBefore: Date | null
  }

  export type StaffNotificationCursorCountAggregateOutputType = {
    userId: number
    readBefore: number
    _all: number
  }


  export type StaffNotificationCursorMinAggregateInputType = {
    userId?: true
    readBefore?: true
  }

  export type StaffNotificationCursorMaxAggregateInputType = {
    userId?: true
    readBefore?: true
  }

  export type StaffNotificationCursorCountAggregateInputType = {
    userId?: true
    readBefore?: true
    _all?: true
  }

  export type StaffNotificationCursorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StaffNotificationCursor to aggregate.
     */
    where?: StaffNotificationCursorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffNotificationCursors to fetch.
     */
    orderBy?: StaffNotificationCursorOrderByWithRelationInput | StaffNotificationCursorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StaffNotificationCursorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffNotificationCursors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffNotificationCursors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StaffNotificationCursors
    **/
    _count?: true | StaffNotificationCursorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StaffNotificationCursorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StaffNotificationCursorMaxAggregateInputType
  }

  export type GetStaffNotificationCursorAggregateType<T extends StaffNotificationCursorAggregateArgs> = {
        [P in keyof T & keyof AggregateStaffNotificationCursor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStaffNotificationCursor[P]>
      : GetScalarType<T[P], AggregateStaffNotificationCursor[P]>
  }




  export type StaffNotificationCursorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffNotificationCursorWhereInput
    orderBy?: StaffNotificationCursorOrderByWithAggregationInput | StaffNotificationCursorOrderByWithAggregationInput[]
    by: StaffNotificationCursorScalarFieldEnum[] | StaffNotificationCursorScalarFieldEnum
    having?: StaffNotificationCursorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StaffNotificationCursorCountAggregateInputType | true
    _min?: StaffNotificationCursorMinAggregateInputType
    _max?: StaffNotificationCursorMaxAggregateInputType
  }

  export type StaffNotificationCursorGroupByOutputType = {
    userId: string
    readBefore: Date
    _count: StaffNotificationCursorCountAggregateOutputType | null
    _min: StaffNotificationCursorMinAggregateOutputType | null
    _max: StaffNotificationCursorMaxAggregateOutputType | null
  }

  type GetStaffNotificationCursorGroupByPayload<T extends StaffNotificationCursorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StaffNotificationCursorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StaffNotificationCursorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StaffNotificationCursorGroupByOutputType[P]>
            : GetScalarType<T[P], StaffNotificationCursorGroupByOutputType[P]>
        }
      >
    >


  export type StaffNotificationCursorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    readBefore?: boolean
  }, ExtArgs["result"]["staffNotificationCursor"]>

  export type StaffNotificationCursorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    readBefore?: boolean
  }, ExtArgs["result"]["staffNotificationCursor"]>

  export type StaffNotificationCursorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    readBefore?: boolean
  }, ExtArgs["result"]["staffNotificationCursor"]>

  export type StaffNotificationCursorSelectScalar = {
    userId?: boolean
    readBefore?: boolean
  }

  export type StaffNotificationCursorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "readBefore", ExtArgs["result"]["staffNotificationCursor"]>

  export type $StaffNotificationCursorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StaffNotificationCursor"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      readBefore: Date
    }, ExtArgs["result"]["staffNotificationCursor"]>
    composites: {}
  }

  type StaffNotificationCursorGetPayload<S extends boolean | null | undefined | StaffNotificationCursorDefaultArgs> = $Result.GetResult<Prisma.$StaffNotificationCursorPayload, S>

  type StaffNotificationCursorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StaffNotificationCursorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StaffNotificationCursorCountAggregateInputType | true
    }

  export interface StaffNotificationCursorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StaffNotificationCursor'], meta: { name: 'StaffNotificationCursor' } }
    /**
     * Find zero or one StaffNotificationCursor that matches the filter.
     * @param {StaffNotificationCursorFindUniqueArgs} args - Arguments to find a StaffNotificationCursor
     * @example
     * // Get one StaffNotificationCursor
     * const staffNotificationCursor = await prisma.staffNotificationCursor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StaffNotificationCursorFindUniqueArgs>(args: SelectSubset<T, StaffNotificationCursorFindUniqueArgs<ExtArgs>>): Prisma__StaffNotificationCursorClient<$Result.GetResult<Prisma.$StaffNotificationCursorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StaffNotificationCursor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StaffNotificationCursorFindUniqueOrThrowArgs} args - Arguments to find a StaffNotificationCursor
     * @example
     * // Get one StaffNotificationCursor
     * const staffNotificationCursor = await prisma.staffNotificationCursor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StaffNotificationCursorFindUniqueOrThrowArgs>(args: SelectSubset<T, StaffNotificationCursorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StaffNotificationCursorClient<$Result.GetResult<Prisma.$StaffNotificationCursorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StaffNotificationCursor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffNotificationCursorFindFirstArgs} args - Arguments to find a StaffNotificationCursor
     * @example
     * // Get one StaffNotificationCursor
     * const staffNotificationCursor = await prisma.staffNotificationCursor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StaffNotificationCursorFindFirstArgs>(args?: SelectSubset<T, StaffNotificationCursorFindFirstArgs<ExtArgs>>): Prisma__StaffNotificationCursorClient<$Result.GetResult<Prisma.$StaffNotificationCursorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StaffNotificationCursor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffNotificationCursorFindFirstOrThrowArgs} args - Arguments to find a StaffNotificationCursor
     * @example
     * // Get one StaffNotificationCursor
     * const staffNotificationCursor = await prisma.staffNotificationCursor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StaffNotificationCursorFindFirstOrThrowArgs>(args?: SelectSubset<T, StaffNotificationCursorFindFirstOrThrowArgs<ExtArgs>>): Prisma__StaffNotificationCursorClient<$Result.GetResult<Prisma.$StaffNotificationCursorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StaffNotificationCursors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffNotificationCursorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StaffNotificationCursors
     * const staffNotificationCursors = await prisma.staffNotificationCursor.findMany()
     * 
     * // Get first 10 StaffNotificationCursors
     * const staffNotificationCursors = await prisma.staffNotificationCursor.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const staffNotificationCursorWithUserIdOnly = await prisma.staffNotificationCursor.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends StaffNotificationCursorFindManyArgs>(args?: SelectSubset<T, StaffNotificationCursorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffNotificationCursorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StaffNotificationCursor.
     * @param {StaffNotificationCursorCreateArgs} args - Arguments to create a StaffNotificationCursor.
     * @example
     * // Create one StaffNotificationCursor
     * const StaffNotificationCursor = await prisma.staffNotificationCursor.create({
     *   data: {
     *     // ... data to create a StaffNotificationCursor
     *   }
     * })
     * 
     */
    create<T extends StaffNotificationCursorCreateArgs>(args: SelectSubset<T, StaffNotificationCursorCreateArgs<ExtArgs>>): Prisma__StaffNotificationCursorClient<$Result.GetResult<Prisma.$StaffNotificationCursorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StaffNotificationCursors.
     * @param {StaffNotificationCursorCreateManyArgs} args - Arguments to create many StaffNotificationCursors.
     * @example
     * // Create many StaffNotificationCursors
     * const staffNotificationCursor = await prisma.staffNotificationCursor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StaffNotificationCursorCreateManyArgs>(args?: SelectSubset<T, StaffNotificationCursorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StaffNotificationCursors and returns the data saved in the database.
     * @param {StaffNotificationCursorCreateManyAndReturnArgs} args - Arguments to create many StaffNotificationCursors.
     * @example
     * // Create many StaffNotificationCursors
     * const staffNotificationCursor = await prisma.staffNotificationCursor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StaffNotificationCursors and only return the `userId`
     * const staffNotificationCursorWithUserIdOnly = await prisma.staffNotificationCursor.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StaffNotificationCursorCreateManyAndReturnArgs>(args?: SelectSubset<T, StaffNotificationCursorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffNotificationCursorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StaffNotificationCursor.
     * @param {StaffNotificationCursorDeleteArgs} args - Arguments to delete one StaffNotificationCursor.
     * @example
     * // Delete one StaffNotificationCursor
     * const StaffNotificationCursor = await prisma.staffNotificationCursor.delete({
     *   where: {
     *     // ... filter to delete one StaffNotificationCursor
     *   }
     * })
     * 
     */
    delete<T extends StaffNotificationCursorDeleteArgs>(args: SelectSubset<T, StaffNotificationCursorDeleteArgs<ExtArgs>>): Prisma__StaffNotificationCursorClient<$Result.GetResult<Prisma.$StaffNotificationCursorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StaffNotificationCursor.
     * @param {StaffNotificationCursorUpdateArgs} args - Arguments to update one StaffNotificationCursor.
     * @example
     * // Update one StaffNotificationCursor
     * const staffNotificationCursor = await prisma.staffNotificationCursor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StaffNotificationCursorUpdateArgs>(args: SelectSubset<T, StaffNotificationCursorUpdateArgs<ExtArgs>>): Prisma__StaffNotificationCursorClient<$Result.GetResult<Prisma.$StaffNotificationCursorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StaffNotificationCursors.
     * @param {StaffNotificationCursorDeleteManyArgs} args - Arguments to filter StaffNotificationCursors to delete.
     * @example
     * // Delete a few StaffNotificationCursors
     * const { count } = await prisma.staffNotificationCursor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StaffNotificationCursorDeleteManyArgs>(args?: SelectSubset<T, StaffNotificationCursorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StaffNotificationCursors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffNotificationCursorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StaffNotificationCursors
     * const staffNotificationCursor = await prisma.staffNotificationCursor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StaffNotificationCursorUpdateManyArgs>(args: SelectSubset<T, StaffNotificationCursorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StaffNotificationCursors and returns the data updated in the database.
     * @param {StaffNotificationCursorUpdateManyAndReturnArgs} args - Arguments to update many StaffNotificationCursors.
     * @example
     * // Update many StaffNotificationCursors
     * const staffNotificationCursor = await prisma.staffNotificationCursor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StaffNotificationCursors and only return the `userId`
     * const staffNotificationCursorWithUserIdOnly = await prisma.staffNotificationCursor.updateManyAndReturn({
     *   select: { userId: true },
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
    updateManyAndReturn<T extends StaffNotificationCursorUpdateManyAndReturnArgs>(args: SelectSubset<T, StaffNotificationCursorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffNotificationCursorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StaffNotificationCursor.
     * @param {StaffNotificationCursorUpsertArgs} args - Arguments to update or create a StaffNotificationCursor.
     * @example
     * // Update or create a StaffNotificationCursor
     * const staffNotificationCursor = await prisma.staffNotificationCursor.upsert({
     *   create: {
     *     // ... data to create a StaffNotificationCursor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StaffNotificationCursor we want to update
     *   }
     * })
     */
    upsert<T extends StaffNotificationCursorUpsertArgs>(args: SelectSubset<T, StaffNotificationCursorUpsertArgs<ExtArgs>>): Prisma__StaffNotificationCursorClient<$Result.GetResult<Prisma.$StaffNotificationCursorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StaffNotificationCursors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffNotificationCursorCountArgs} args - Arguments to filter StaffNotificationCursors to count.
     * @example
     * // Count the number of StaffNotificationCursors
     * const count = await prisma.staffNotificationCursor.count({
     *   where: {
     *     // ... the filter for the StaffNotificationCursors we want to count
     *   }
     * })
    **/
    count<T extends StaffNotificationCursorCountArgs>(
      args?: Subset<T, StaffNotificationCursorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StaffNotificationCursorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StaffNotificationCursor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffNotificationCursorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StaffNotificationCursorAggregateArgs>(args: Subset<T, StaffNotificationCursorAggregateArgs>): Prisma.PrismaPromise<GetStaffNotificationCursorAggregateType<T>>

    /**
     * Group by StaffNotificationCursor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffNotificationCursorGroupByArgs} args - Group by arguments.
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
      T extends StaffNotificationCursorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StaffNotificationCursorGroupByArgs['orderBy'] }
        : { orderBy?: StaffNotificationCursorGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StaffNotificationCursorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStaffNotificationCursorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StaffNotificationCursor model
   */
  readonly fields: StaffNotificationCursorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StaffNotificationCursor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StaffNotificationCursorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the StaffNotificationCursor model
   */
  interface StaffNotificationCursorFieldRefs {
    readonly userId: FieldRef<"StaffNotificationCursor", 'String'>
    readonly readBefore: FieldRef<"StaffNotificationCursor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StaffNotificationCursor findUnique
   */
  export type StaffNotificationCursorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationCursor
     */
    select?: StaffNotificationCursorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationCursor
     */
    omit?: StaffNotificationCursorOmit<ExtArgs> | null
    /**
     * Filter, which StaffNotificationCursor to fetch.
     */
    where: StaffNotificationCursorWhereUniqueInput
  }

  /**
   * StaffNotificationCursor findUniqueOrThrow
   */
  export type StaffNotificationCursorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationCursor
     */
    select?: StaffNotificationCursorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationCursor
     */
    omit?: StaffNotificationCursorOmit<ExtArgs> | null
    /**
     * Filter, which StaffNotificationCursor to fetch.
     */
    where: StaffNotificationCursorWhereUniqueInput
  }

  /**
   * StaffNotificationCursor findFirst
   */
  export type StaffNotificationCursorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationCursor
     */
    select?: StaffNotificationCursorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationCursor
     */
    omit?: StaffNotificationCursorOmit<ExtArgs> | null
    /**
     * Filter, which StaffNotificationCursor to fetch.
     */
    where?: StaffNotificationCursorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffNotificationCursors to fetch.
     */
    orderBy?: StaffNotificationCursorOrderByWithRelationInput | StaffNotificationCursorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StaffNotificationCursors.
     */
    cursor?: StaffNotificationCursorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffNotificationCursors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffNotificationCursors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffNotificationCursors.
     */
    distinct?: StaffNotificationCursorScalarFieldEnum | StaffNotificationCursorScalarFieldEnum[]
  }

  /**
   * StaffNotificationCursor findFirstOrThrow
   */
  export type StaffNotificationCursorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationCursor
     */
    select?: StaffNotificationCursorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationCursor
     */
    omit?: StaffNotificationCursorOmit<ExtArgs> | null
    /**
     * Filter, which StaffNotificationCursor to fetch.
     */
    where?: StaffNotificationCursorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffNotificationCursors to fetch.
     */
    orderBy?: StaffNotificationCursorOrderByWithRelationInput | StaffNotificationCursorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StaffNotificationCursors.
     */
    cursor?: StaffNotificationCursorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffNotificationCursors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffNotificationCursors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffNotificationCursors.
     */
    distinct?: StaffNotificationCursorScalarFieldEnum | StaffNotificationCursorScalarFieldEnum[]
  }

  /**
   * StaffNotificationCursor findMany
   */
  export type StaffNotificationCursorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationCursor
     */
    select?: StaffNotificationCursorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationCursor
     */
    omit?: StaffNotificationCursorOmit<ExtArgs> | null
    /**
     * Filter, which StaffNotificationCursors to fetch.
     */
    where?: StaffNotificationCursorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffNotificationCursors to fetch.
     */
    orderBy?: StaffNotificationCursorOrderByWithRelationInput | StaffNotificationCursorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StaffNotificationCursors.
     */
    cursor?: StaffNotificationCursorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffNotificationCursors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffNotificationCursors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffNotificationCursors.
     */
    distinct?: StaffNotificationCursorScalarFieldEnum | StaffNotificationCursorScalarFieldEnum[]
  }

  /**
   * StaffNotificationCursor create
   */
  export type StaffNotificationCursorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationCursor
     */
    select?: StaffNotificationCursorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationCursor
     */
    omit?: StaffNotificationCursorOmit<ExtArgs> | null
    /**
     * The data needed to create a StaffNotificationCursor.
     */
    data: XOR<StaffNotificationCursorCreateInput, StaffNotificationCursorUncheckedCreateInput>
  }

  /**
   * StaffNotificationCursor createMany
   */
  export type StaffNotificationCursorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StaffNotificationCursors.
     */
    data: StaffNotificationCursorCreateManyInput | StaffNotificationCursorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StaffNotificationCursor createManyAndReturn
   */
  export type StaffNotificationCursorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationCursor
     */
    select?: StaffNotificationCursorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationCursor
     */
    omit?: StaffNotificationCursorOmit<ExtArgs> | null
    /**
     * The data used to create many StaffNotificationCursors.
     */
    data: StaffNotificationCursorCreateManyInput | StaffNotificationCursorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StaffNotificationCursor update
   */
  export type StaffNotificationCursorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationCursor
     */
    select?: StaffNotificationCursorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationCursor
     */
    omit?: StaffNotificationCursorOmit<ExtArgs> | null
    /**
     * The data needed to update a StaffNotificationCursor.
     */
    data: XOR<StaffNotificationCursorUpdateInput, StaffNotificationCursorUncheckedUpdateInput>
    /**
     * Choose, which StaffNotificationCursor to update.
     */
    where: StaffNotificationCursorWhereUniqueInput
  }

  /**
   * StaffNotificationCursor updateMany
   */
  export type StaffNotificationCursorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StaffNotificationCursors.
     */
    data: XOR<StaffNotificationCursorUpdateManyMutationInput, StaffNotificationCursorUncheckedUpdateManyInput>
    /**
     * Filter which StaffNotificationCursors to update
     */
    where?: StaffNotificationCursorWhereInput
    /**
     * Limit how many StaffNotificationCursors to update.
     */
    limit?: number
  }

  /**
   * StaffNotificationCursor updateManyAndReturn
   */
  export type StaffNotificationCursorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationCursor
     */
    select?: StaffNotificationCursorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationCursor
     */
    omit?: StaffNotificationCursorOmit<ExtArgs> | null
    /**
     * The data used to update StaffNotificationCursors.
     */
    data: XOR<StaffNotificationCursorUpdateManyMutationInput, StaffNotificationCursorUncheckedUpdateManyInput>
    /**
     * Filter which StaffNotificationCursors to update
     */
    where?: StaffNotificationCursorWhereInput
    /**
     * Limit how many StaffNotificationCursors to update.
     */
    limit?: number
  }

  /**
   * StaffNotificationCursor upsert
   */
  export type StaffNotificationCursorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationCursor
     */
    select?: StaffNotificationCursorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationCursor
     */
    omit?: StaffNotificationCursorOmit<ExtArgs> | null
    /**
     * The filter to search for the StaffNotificationCursor to update in case it exists.
     */
    where: StaffNotificationCursorWhereUniqueInput
    /**
     * In case the StaffNotificationCursor found by the `where` argument doesn't exist, create a new StaffNotificationCursor with this data.
     */
    create: XOR<StaffNotificationCursorCreateInput, StaffNotificationCursorUncheckedCreateInput>
    /**
     * In case the StaffNotificationCursor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StaffNotificationCursorUpdateInput, StaffNotificationCursorUncheckedUpdateInput>
  }

  /**
   * StaffNotificationCursor delete
   */
  export type StaffNotificationCursorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationCursor
     */
    select?: StaffNotificationCursorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationCursor
     */
    omit?: StaffNotificationCursorOmit<ExtArgs> | null
    /**
     * Filter which StaffNotificationCursor to delete.
     */
    where: StaffNotificationCursorWhereUniqueInput
  }

  /**
   * StaffNotificationCursor deleteMany
   */
  export type StaffNotificationCursorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StaffNotificationCursors to delete
     */
    where?: StaffNotificationCursorWhereInput
    /**
     * Limit how many StaffNotificationCursors to delete.
     */
    limit?: number
  }

  /**
   * StaffNotificationCursor without action
   */
  export type StaffNotificationCursorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffNotificationCursor
     */
    select?: StaffNotificationCursorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffNotificationCursor
     */
    omit?: StaffNotificationCursorOmit<ExtArgs> | null
  }


  /**
   * Model PushSubscription
   */

  export type AggregatePushSubscription = {
    _count: PushSubscriptionCountAggregateOutputType | null
    _avg: PushSubscriptionAvgAggregateOutputType | null
    _sum: PushSubscriptionSumAggregateOutputType | null
    _min: PushSubscriptionMinAggregateOutputType | null
    _max: PushSubscriptionMaxAggregateOutputType | null
  }

  export type PushSubscriptionAvgAggregateOutputType = {
    failureCount: number | null
  }

  export type PushSubscriptionSumAggregateOutputType = {
    failureCount: number | null
  }

  export type PushSubscriptionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    endpoint: string | null
    p256dh: string | null
    auth: string | null
    userAgent: string | null
    failureCount: number | null
    lastSuccessAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PushSubscriptionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    endpoint: string | null
    p256dh: string | null
    auth: string | null
    userAgent: string | null
    failureCount: number | null
    lastSuccessAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PushSubscriptionCountAggregateOutputType = {
    id: number
    userId: number
    endpoint: number
    p256dh: number
    auth: number
    permissions: number
    userAgent: number
    failureCount: number
    lastSuccessAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PushSubscriptionAvgAggregateInputType = {
    failureCount?: true
  }

  export type PushSubscriptionSumAggregateInputType = {
    failureCount?: true
  }

  export type PushSubscriptionMinAggregateInputType = {
    id?: true
    userId?: true
    endpoint?: true
    p256dh?: true
    auth?: true
    userAgent?: true
    failureCount?: true
    lastSuccessAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PushSubscriptionMaxAggregateInputType = {
    id?: true
    userId?: true
    endpoint?: true
    p256dh?: true
    auth?: true
    userAgent?: true
    failureCount?: true
    lastSuccessAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PushSubscriptionCountAggregateInputType = {
    id?: true
    userId?: true
    endpoint?: true
    p256dh?: true
    auth?: true
    permissions?: true
    userAgent?: true
    failureCount?: true
    lastSuccessAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PushSubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PushSubscription to aggregate.
     */
    where?: PushSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PushSubscriptions to fetch.
     */
    orderBy?: PushSubscriptionOrderByWithRelationInput | PushSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PushSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PushSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PushSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PushSubscriptions
    **/
    _count?: true | PushSubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PushSubscriptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PushSubscriptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PushSubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PushSubscriptionMaxAggregateInputType
  }

  export type GetPushSubscriptionAggregateType<T extends PushSubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregatePushSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePushSubscription[P]>
      : GetScalarType<T[P], AggregatePushSubscription[P]>
  }




  export type PushSubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PushSubscriptionWhereInput
    orderBy?: PushSubscriptionOrderByWithAggregationInput | PushSubscriptionOrderByWithAggregationInput[]
    by: PushSubscriptionScalarFieldEnum[] | PushSubscriptionScalarFieldEnum
    having?: PushSubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PushSubscriptionCountAggregateInputType | true
    _avg?: PushSubscriptionAvgAggregateInputType
    _sum?: PushSubscriptionSumAggregateInputType
    _min?: PushSubscriptionMinAggregateInputType
    _max?: PushSubscriptionMaxAggregateInputType
  }

  export type PushSubscriptionGroupByOutputType = {
    id: string
    userId: string
    endpoint: string
    p256dh: string
    auth: string
    permissions: string[]
    userAgent: string | null
    failureCount: number
    lastSuccessAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PushSubscriptionCountAggregateOutputType | null
    _avg: PushSubscriptionAvgAggregateOutputType | null
    _sum: PushSubscriptionSumAggregateOutputType | null
    _min: PushSubscriptionMinAggregateOutputType | null
    _max: PushSubscriptionMaxAggregateOutputType | null
  }

  type GetPushSubscriptionGroupByPayload<T extends PushSubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PushSubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PushSubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PushSubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], PushSubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type PushSubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    endpoint?: boolean
    p256dh?: boolean
    auth?: boolean
    permissions?: boolean
    userAgent?: boolean
    failureCount?: boolean
    lastSuccessAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pushSubscription"]>

  export type PushSubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    endpoint?: boolean
    p256dh?: boolean
    auth?: boolean
    permissions?: boolean
    userAgent?: boolean
    failureCount?: boolean
    lastSuccessAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pushSubscription"]>

  export type PushSubscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    endpoint?: boolean
    p256dh?: boolean
    auth?: boolean
    permissions?: boolean
    userAgent?: boolean
    failureCount?: boolean
    lastSuccessAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pushSubscription"]>

  export type PushSubscriptionSelectScalar = {
    id?: boolean
    userId?: boolean
    endpoint?: boolean
    p256dh?: boolean
    auth?: boolean
    permissions?: boolean
    userAgent?: boolean
    failureCount?: boolean
    lastSuccessAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PushSubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "endpoint" | "p256dh" | "auth" | "permissions" | "userAgent" | "failureCount" | "lastSuccessAt" | "createdAt" | "updatedAt", ExtArgs["result"]["pushSubscription"]>

  export type $PushSubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PushSubscription"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      endpoint: string
      p256dh: string
      auth: string
      /**
       * the user's permissions when they last opened the app, used to filter what's pushed
       */
      permissions: string[]
      userAgent: string | null
      failureCount: number
      lastSuccessAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pushSubscription"]>
    composites: {}
  }

  type PushSubscriptionGetPayload<S extends boolean | null | undefined | PushSubscriptionDefaultArgs> = $Result.GetResult<Prisma.$PushSubscriptionPayload, S>

  type PushSubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PushSubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PushSubscriptionCountAggregateInputType | true
    }

  export interface PushSubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PushSubscription'], meta: { name: 'PushSubscription' } }
    /**
     * Find zero or one PushSubscription that matches the filter.
     * @param {PushSubscriptionFindUniqueArgs} args - Arguments to find a PushSubscription
     * @example
     * // Get one PushSubscription
     * const pushSubscription = await prisma.pushSubscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PushSubscriptionFindUniqueArgs>(args: SelectSubset<T, PushSubscriptionFindUniqueArgs<ExtArgs>>): Prisma__PushSubscriptionClient<$Result.GetResult<Prisma.$PushSubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PushSubscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PushSubscriptionFindUniqueOrThrowArgs} args - Arguments to find a PushSubscription
     * @example
     * // Get one PushSubscription
     * const pushSubscription = await prisma.pushSubscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PushSubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, PushSubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PushSubscriptionClient<$Result.GetResult<Prisma.$PushSubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PushSubscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PushSubscriptionFindFirstArgs} args - Arguments to find a PushSubscription
     * @example
     * // Get one PushSubscription
     * const pushSubscription = await prisma.pushSubscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PushSubscriptionFindFirstArgs>(args?: SelectSubset<T, PushSubscriptionFindFirstArgs<ExtArgs>>): Prisma__PushSubscriptionClient<$Result.GetResult<Prisma.$PushSubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PushSubscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PushSubscriptionFindFirstOrThrowArgs} args - Arguments to find a PushSubscription
     * @example
     * // Get one PushSubscription
     * const pushSubscription = await prisma.pushSubscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PushSubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, PushSubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PushSubscriptionClient<$Result.GetResult<Prisma.$PushSubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PushSubscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PushSubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PushSubscriptions
     * const pushSubscriptions = await prisma.pushSubscription.findMany()
     * 
     * // Get first 10 PushSubscriptions
     * const pushSubscriptions = await prisma.pushSubscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pushSubscriptionWithIdOnly = await prisma.pushSubscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PushSubscriptionFindManyArgs>(args?: SelectSubset<T, PushSubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PushSubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PushSubscription.
     * @param {PushSubscriptionCreateArgs} args - Arguments to create a PushSubscription.
     * @example
     * // Create one PushSubscription
     * const PushSubscription = await prisma.pushSubscription.create({
     *   data: {
     *     // ... data to create a PushSubscription
     *   }
     * })
     * 
     */
    create<T extends PushSubscriptionCreateArgs>(args: SelectSubset<T, PushSubscriptionCreateArgs<ExtArgs>>): Prisma__PushSubscriptionClient<$Result.GetResult<Prisma.$PushSubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PushSubscriptions.
     * @param {PushSubscriptionCreateManyArgs} args - Arguments to create many PushSubscriptions.
     * @example
     * // Create many PushSubscriptions
     * const pushSubscription = await prisma.pushSubscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PushSubscriptionCreateManyArgs>(args?: SelectSubset<T, PushSubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PushSubscriptions and returns the data saved in the database.
     * @param {PushSubscriptionCreateManyAndReturnArgs} args - Arguments to create many PushSubscriptions.
     * @example
     * // Create many PushSubscriptions
     * const pushSubscription = await prisma.pushSubscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PushSubscriptions and only return the `id`
     * const pushSubscriptionWithIdOnly = await prisma.pushSubscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PushSubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, PushSubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PushSubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PushSubscription.
     * @param {PushSubscriptionDeleteArgs} args - Arguments to delete one PushSubscription.
     * @example
     * // Delete one PushSubscription
     * const PushSubscription = await prisma.pushSubscription.delete({
     *   where: {
     *     // ... filter to delete one PushSubscription
     *   }
     * })
     * 
     */
    delete<T extends PushSubscriptionDeleteArgs>(args: SelectSubset<T, PushSubscriptionDeleteArgs<ExtArgs>>): Prisma__PushSubscriptionClient<$Result.GetResult<Prisma.$PushSubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PushSubscription.
     * @param {PushSubscriptionUpdateArgs} args - Arguments to update one PushSubscription.
     * @example
     * // Update one PushSubscription
     * const pushSubscription = await prisma.pushSubscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PushSubscriptionUpdateArgs>(args: SelectSubset<T, PushSubscriptionUpdateArgs<ExtArgs>>): Prisma__PushSubscriptionClient<$Result.GetResult<Prisma.$PushSubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PushSubscriptions.
     * @param {PushSubscriptionDeleteManyArgs} args - Arguments to filter PushSubscriptions to delete.
     * @example
     * // Delete a few PushSubscriptions
     * const { count } = await prisma.pushSubscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PushSubscriptionDeleteManyArgs>(args?: SelectSubset<T, PushSubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PushSubscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PushSubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PushSubscriptions
     * const pushSubscription = await prisma.pushSubscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PushSubscriptionUpdateManyArgs>(args: SelectSubset<T, PushSubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PushSubscriptions and returns the data updated in the database.
     * @param {PushSubscriptionUpdateManyAndReturnArgs} args - Arguments to update many PushSubscriptions.
     * @example
     * // Update many PushSubscriptions
     * const pushSubscription = await prisma.pushSubscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PushSubscriptions and only return the `id`
     * const pushSubscriptionWithIdOnly = await prisma.pushSubscription.updateManyAndReturn({
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
    updateManyAndReturn<T extends PushSubscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, PushSubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PushSubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PushSubscription.
     * @param {PushSubscriptionUpsertArgs} args - Arguments to update or create a PushSubscription.
     * @example
     * // Update or create a PushSubscription
     * const pushSubscription = await prisma.pushSubscription.upsert({
     *   create: {
     *     // ... data to create a PushSubscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PushSubscription we want to update
     *   }
     * })
     */
    upsert<T extends PushSubscriptionUpsertArgs>(args: SelectSubset<T, PushSubscriptionUpsertArgs<ExtArgs>>): Prisma__PushSubscriptionClient<$Result.GetResult<Prisma.$PushSubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PushSubscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PushSubscriptionCountArgs} args - Arguments to filter PushSubscriptions to count.
     * @example
     * // Count the number of PushSubscriptions
     * const count = await prisma.pushSubscription.count({
     *   where: {
     *     // ... the filter for the PushSubscriptions we want to count
     *   }
     * })
    **/
    count<T extends PushSubscriptionCountArgs>(
      args?: Subset<T, PushSubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PushSubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PushSubscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PushSubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PushSubscriptionAggregateArgs>(args: Subset<T, PushSubscriptionAggregateArgs>): Prisma.PrismaPromise<GetPushSubscriptionAggregateType<T>>

    /**
     * Group by PushSubscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PushSubscriptionGroupByArgs} args - Group by arguments.
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
      T extends PushSubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PushSubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: PushSubscriptionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PushSubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPushSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PushSubscription model
   */
  readonly fields: PushSubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PushSubscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PushSubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the PushSubscription model
   */
  interface PushSubscriptionFieldRefs {
    readonly id: FieldRef<"PushSubscription", 'String'>
    readonly userId: FieldRef<"PushSubscription", 'String'>
    readonly endpoint: FieldRef<"PushSubscription", 'String'>
    readonly p256dh: FieldRef<"PushSubscription", 'String'>
    readonly auth: FieldRef<"PushSubscription", 'String'>
    readonly permissions: FieldRef<"PushSubscription", 'String[]'>
    readonly userAgent: FieldRef<"PushSubscription", 'String'>
    readonly failureCount: FieldRef<"PushSubscription", 'Int'>
    readonly lastSuccessAt: FieldRef<"PushSubscription", 'DateTime'>
    readonly createdAt: FieldRef<"PushSubscription", 'DateTime'>
    readonly updatedAt: FieldRef<"PushSubscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PushSubscription findUnique
   */
  export type PushSubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PushSubscription
     */
    select?: PushSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PushSubscription
     */
    omit?: PushSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which PushSubscription to fetch.
     */
    where: PushSubscriptionWhereUniqueInput
  }

  /**
   * PushSubscription findUniqueOrThrow
   */
  export type PushSubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PushSubscription
     */
    select?: PushSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PushSubscription
     */
    omit?: PushSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which PushSubscription to fetch.
     */
    where: PushSubscriptionWhereUniqueInput
  }

  /**
   * PushSubscription findFirst
   */
  export type PushSubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PushSubscription
     */
    select?: PushSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PushSubscription
     */
    omit?: PushSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which PushSubscription to fetch.
     */
    where?: PushSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PushSubscriptions to fetch.
     */
    orderBy?: PushSubscriptionOrderByWithRelationInput | PushSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PushSubscriptions.
     */
    cursor?: PushSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PushSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PushSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PushSubscriptions.
     */
    distinct?: PushSubscriptionScalarFieldEnum | PushSubscriptionScalarFieldEnum[]
  }

  /**
   * PushSubscription findFirstOrThrow
   */
  export type PushSubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PushSubscription
     */
    select?: PushSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PushSubscription
     */
    omit?: PushSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which PushSubscription to fetch.
     */
    where?: PushSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PushSubscriptions to fetch.
     */
    orderBy?: PushSubscriptionOrderByWithRelationInput | PushSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PushSubscriptions.
     */
    cursor?: PushSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PushSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PushSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PushSubscriptions.
     */
    distinct?: PushSubscriptionScalarFieldEnum | PushSubscriptionScalarFieldEnum[]
  }

  /**
   * PushSubscription findMany
   */
  export type PushSubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PushSubscription
     */
    select?: PushSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PushSubscription
     */
    omit?: PushSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which PushSubscriptions to fetch.
     */
    where?: PushSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PushSubscriptions to fetch.
     */
    orderBy?: PushSubscriptionOrderByWithRelationInput | PushSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PushSubscriptions.
     */
    cursor?: PushSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PushSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PushSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PushSubscriptions.
     */
    distinct?: PushSubscriptionScalarFieldEnum | PushSubscriptionScalarFieldEnum[]
  }

  /**
   * PushSubscription create
   */
  export type PushSubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PushSubscription
     */
    select?: PushSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PushSubscription
     */
    omit?: PushSubscriptionOmit<ExtArgs> | null
    /**
     * The data needed to create a PushSubscription.
     */
    data: XOR<PushSubscriptionCreateInput, PushSubscriptionUncheckedCreateInput>
  }

  /**
   * PushSubscription createMany
   */
  export type PushSubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PushSubscriptions.
     */
    data: PushSubscriptionCreateManyInput | PushSubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PushSubscription createManyAndReturn
   */
  export type PushSubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PushSubscription
     */
    select?: PushSubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PushSubscription
     */
    omit?: PushSubscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many PushSubscriptions.
     */
    data: PushSubscriptionCreateManyInput | PushSubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PushSubscription update
   */
  export type PushSubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PushSubscription
     */
    select?: PushSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PushSubscription
     */
    omit?: PushSubscriptionOmit<ExtArgs> | null
    /**
     * The data needed to update a PushSubscription.
     */
    data: XOR<PushSubscriptionUpdateInput, PushSubscriptionUncheckedUpdateInput>
    /**
     * Choose, which PushSubscription to update.
     */
    where: PushSubscriptionWhereUniqueInput
  }

  /**
   * PushSubscription updateMany
   */
  export type PushSubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PushSubscriptions.
     */
    data: XOR<PushSubscriptionUpdateManyMutationInput, PushSubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which PushSubscriptions to update
     */
    where?: PushSubscriptionWhereInput
    /**
     * Limit how many PushSubscriptions to update.
     */
    limit?: number
  }

  /**
   * PushSubscription updateManyAndReturn
   */
  export type PushSubscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PushSubscription
     */
    select?: PushSubscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PushSubscription
     */
    omit?: PushSubscriptionOmit<ExtArgs> | null
    /**
     * The data used to update PushSubscriptions.
     */
    data: XOR<PushSubscriptionUpdateManyMutationInput, PushSubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which PushSubscriptions to update
     */
    where?: PushSubscriptionWhereInput
    /**
     * Limit how many PushSubscriptions to update.
     */
    limit?: number
  }

  /**
   * PushSubscription upsert
   */
  export type PushSubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PushSubscription
     */
    select?: PushSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PushSubscription
     */
    omit?: PushSubscriptionOmit<ExtArgs> | null
    /**
     * The filter to search for the PushSubscription to update in case it exists.
     */
    where: PushSubscriptionWhereUniqueInput
    /**
     * In case the PushSubscription found by the `where` argument doesn't exist, create a new PushSubscription with this data.
     */
    create: XOR<PushSubscriptionCreateInput, PushSubscriptionUncheckedCreateInput>
    /**
     * In case the PushSubscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PushSubscriptionUpdateInput, PushSubscriptionUncheckedUpdateInput>
  }

  /**
   * PushSubscription delete
   */
  export type PushSubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PushSubscription
     */
    select?: PushSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PushSubscription
     */
    omit?: PushSubscriptionOmit<ExtArgs> | null
    /**
     * Filter which PushSubscription to delete.
     */
    where: PushSubscriptionWhereUniqueInput
  }

  /**
   * PushSubscription deleteMany
   */
  export type PushSubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PushSubscriptions to delete
     */
    where?: PushSubscriptionWhereInput
    /**
     * Limit how many PushSubscriptions to delete.
     */
    limit?: number
  }

  /**
   * PushSubscription without action
   */
  export type PushSubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PushSubscription
     */
    select?: PushSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PushSubscription
     */
    omit?: PushSubscriptionOmit<ExtArgs> | null
  }


  /**
   * Model AppSetting
   */

  export type AggregateAppSetting = {
    _count: AppSettingCountAggregateOutputType | null
    _min: AppSettingMinAggregateOutputType | null
    _max: AppSettingMaxAggregateOutputType | null
  }

  export type AppSettingMinAggregateOutputType = {
    key: string | null
    value: string | null
    updatedAt: Date | null
  }

  export type AppSettingMaxAggregateOutputType = {
    key: string | null
    value: string | null
    updatedAt: Date | null
  }

  export type AppSettingCountAggregateOutputType = {
    key: number
    value: number
    updatedAt: number
    _all: number
  }


  export type AppSettingMinAggregateInputType = {
    key?: true
    value?: true
    updatedAt?: true
  }

  export type AppSettingMaxAggregateInputType = {
    key?: true
    value?: true
    updatedAt?: true
  }

  export type AppSettingCountAggregateInputType = {
    key?: true
    value?: true
    updatedAt?: true
    _all?: true
  }

  export type AppSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppSetting to aggregate.
     */
    where?: AppSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppSettings to fetch.
     */
    orderBy?: AppSettingOrderByWithRelationInput | AppSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AppSettings
    **/
    _count?: true | AppSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppSettingMaxAggregateInputType
  }

  export type GetAppSettingAggregateType<T extends AppSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateAppSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppSetting[P]>
      : GetScalarType<T[P], AggregateAppSetting[P]>
  }




  export type AppSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppSettingWhereInput
    orderBy?: AppSettingOrderByWithAggregationInput | AppSettingOrderByWithAggregationInput[]
    by: AppSettingScalarFieldEnum[] | AppSettingScalarFieldEnum
    having?: AppSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppSettingCountAggregateInputType | true
    _min?: AppSettingMinAggregateInputType
    _max?: AppSettingMaxAggregateInputType
  }

  export type AppSettingGroupByOutputType = {
    key: string
    value: string
    updatedAt: Date
    _count: AppSettingCountAggregateOutputType | null
    _min: AppSettingMinAggregateOutputType | null
    _max: AppSettingMaxAggregateOutputType | null
  }

  type GetAppSettingGroupByPayload<T extends AppSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppSettingGroupByOutputType[P]>
            : GetScalarType<T[P], AppSettingGroupByOutputType[P]>
        }
      >
    >


  export type AppSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["appSetting"]>

  export type AppSettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["appSetting"]>

  export type AppSettingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["appSetting"]>

  export type AppSettingSelectScalar = {
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }

  export type AppSettingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"key" | "value" | "updatedAt", ExtArgs["result"]["appSetting"]>

  export type $AppSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AppSetting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      key: string
      value: string
      updatedAt: Date
    }, ExtArgs["result"]["appSetting"]>
    composites: {}
  }

  type AppSettingGetPayload<S extends boolean | null | undefined | AppSettingDefaultArgs> = $Result.GetResult<Prisma.$AppSettingPayload, S>

  type AppSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppSettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppSettingCountAggregateInputType | true
    }

  export interface AppSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AppSetting'], meta: { name: 'AppSetting' } }
    /**
     * Find zero or one AppSetting that matches the filter.
     * @param {AppSettingFindUniqueArgs} args - Arguments to find a AppSetting
     * @example
     * // Get one AppSetting
     * const appSetting = await prisma.appSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppSettingFindUniqueArgs>(args: SelectSubset<T, AppSettingFindUniqueArgs<ExtArgs>>): Prisma__AppSettingClient<$Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AppSetting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppSettingFindUniqueOrThrowArgs} args - Arguments to find a AppSetting
     * @example
     * // Get one AppSetting
     * const appSetting = await prisma.appSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppSettingFindUniqueOrThrowArgs>(args: SelectSubset<T, AppSettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppSettingClient<$Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingFindFirstArgs} args - Arguments to find a AppSetting
     * @example
     * // Get one AppSetting
     * const appSetting = await prisma.appSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppSettingFindFirstArgs>(args?: SelectSubset<T, AppSettingFindFirstArgs<ExtArgs>>): Prisma__AppSettingClient<$Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingFindFirstOrThrowArgs} args - Arguments to find a AppSetting
     * @example
     * // Get one AppSetting
     * const appSetting = await prisma.appSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppSettingFindFirstOrThrowArgs>(args?: SelectSubset<T, AppSettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppSettingClient<$Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AppSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AppSettings
     * const appSettings = await prisma.appSetting.findMany()
     * 
     * // Get first 10 AppSettings
     * const appSettings = await prisma.appSetting.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const appSettingWithKeyOnly = await prisma.appSetting.findMany({ select: { key: true } })
     * 
     */
    findMany<T extends AppSettingFindManyArgs>(args?: SelectSubset<T, AppSettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AppSetting.
     * @param {AppSettingCreateArgs} args - Arguments to create a AppSetting.
     * @example
     * // Create one AppSetting
     * const AppSetting = await prisma.appSetting.create({
     *   data: {
     *     // ... data to create a AppSetting
     *   }
     * })
     * 
     */
    create<T extends AppSettingCreateArgs>(args: SelectSubset<T, AppSettingCreateArgs<ExtArgs>>): Prisma__AppSettingClient<$Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AppSettings.
     * @param {AppSettingCreateManyArgs} args - Arguments to create many AppSettings.
     * @example
     * // Create many AppSettings
     * const appSetting = await prisma.appSetting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppSettingCreateManyArgs>(args?: SelectSubset<T, AppSettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AppSettings and returns the data saved in the database.
     * @param {AppSettingCreateManyAndReturnArgs} args - Arguments to create many AppSettings.
     * @example
     * // Create many AppSettings
     * const appSetting = await prisma.appSetting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AppSettings and only return the `key`
     * const appSettingWithKeyOnly = await prisma.appSetting.createManyAndReturn({
     *   select: { key: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppSettingCreateManyAndReturnArgs>(args?: SelectSubset<T, AppSettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AppSetting.
     * @param {AppSettingDeleteArgs} args - Arguments to delete one AppSetting.
     * @example
     * // Delete one AppSetting
     * const AppSetting = await prisma.appSetting.delete({
     *   where: {
     *     // ... filter to delete one AppSetting
     *   }
     * })
     * 
     */
    delete<T extends AppSettingDeleteArgs>(args: SelectSubset<T, AppSettingDeleteArgs<ExtArgs>>): Prisma__AppSettingClient<$Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AppSetting.
     * @param {AppSettingUpdateArgs} args - Arguments to update one AppSetting.
     * @example
     * // Update one AppSetting
     * const appSetting = await prisma.appSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppSettingUpdateArgs>(args: SelectSubset<T, AppSettingUpdateArgs<ExtArgs>>): Prisma__AppSettingClient<$Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AppSettings.
     * @param {AppSettingDeleteManyArgs} args - Arguments to filter AppSettings to delete.
     * @example
     * // Delete a few AppSettings
     * const { count } = await prisma.appSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppSettingDeleteManyArgs>(args?: SelectSubset<T, AppSettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AppSettings
     * const appSetting = await prisma.appSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppSettingUpdateManyArgs>(args: SelectSubset<T, AppSettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppSettings and returns the data updated in the database.
     * @param {AppSettingUpdateManyAndReturnArgs} args - Arguments to update many AppSettings.
     * @example
     * // Update many AppSettings
     * const appSetting = await prisma.appSetting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AppSettings and only return the `key`
     * const appSettingWithKeyOnly = await prisma.appSetting.updateManyAndReturn({
     *   select: { key: true },
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
    updateManyAndReturn<T extends AppSettingUpdateManyAndReturnArgs>(args: SelectSubset<T, AppSettingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AppSetting.
     * @param {AppSettingUpsertArgs} args - Arguments to update or create a AppSetting.
     * @example
     * // Update or create a AppSetting
     * const appSetting = await prisma.appSetting.upsert({
     *   create: {
     *     // ... data to create a AppSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AppSetting we want to update
     *   }
     * })
     */
    upsert<T extends AppSettingUpsertArgs>(args: SelectSubset<T, AppSettingUpsertArgs<ExtArgs>>): Prisma__AppSettingClient<$Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AppSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingCountArgs} args - Arguments to filter AppSettings to count.
     * @example
     * // Count the number of AppSettings
     * const count = await prisma.appSetting.count({
     *   where: {
     *     // ... the filter for the AppSettings we want to count
     *   }
     * })
    **/
    count<T extends AppSettingCountArgs>(
      args?: Subset<T, AppSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AppSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AppSettingAggregateArgs>(args: Subset<T, AppSettingAggregateArgs>): Prisma.PrismaPromise<GetAppSettingAggregateType<T>>

    /**
     * Group by AppSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingGroupByArgs} args - Group by arguments.
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
      T extends AppSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppSettingGroupByArgs['orderBy'] }
        : { orderBy?: AppSettingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AppSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AppSetting model
   */
  readonly fields: AppSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AppSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AppSetting model
   */
  interface AppSettingFieldRefs {
    readonly key: FieldRef<"AppSetting", 'String'>
    readonly value: FieldRef<"AppSetting", 'String'>
    readonly updatedAt: FieldRef<"AppSetting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AppSetting findUnique
   */
  export type AppSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSetting
     */
    select?: AppSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSetting
     */
    omit?: AppSettingOmit<ExtArgs> | null
    /**
     * Filter, which AppSetting to fetch.
     */
    where: AppSettingWhereUniqueInput
  }

  /**
   * AppSetting findUniqueOrThrow
   */
  export type AppSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSetting
     */
    select?: AppSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSetting
     */
    omit?: AppSettingOmit<ExtArgs> | null
    /**
     * Filter, which AppSetting to fetch.
     */
    where: AppSettingWhereUniqueInput
  }

  /**
   * AppSetting findFirst
   */
  export type AppSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSetting
     */
    select?: AppSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSetting
     */
    omit?: AppSettingOmit<ExtArgs> | null
    /**
     * Filter, which AppSetting to fetch.
     */
    where?: AppSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppSettings to fetch.
     */
    orderBy?: AppSettingOrderByWithRelationInput | AppSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppSettings.
     */
    cursor?: AppSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppSettings.
     */
    distinct?: AppSettingScalarFieldEnum | AppSettingScalarFieldEnum[]
  }

  /**
   * AppSetting findFirstOrThrow
   */
  export type AppSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSetting
     */
    select?: AppSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSetting
     */
    omit?: AppSettingOmit<ExtArgs> | null
    /**
     * Filter, which AppSetting to fetch.
     */
    where?: AppSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppSettings to fetch.
     */
    orderBy?: AppSettingOrderByWithRelationInput | AppSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppSettings.
     */
    cursor?: AppSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppSettings.
     */
    distinct?: AppSettingScalarFieldEnum | AppSettingScalarFieldEnum[]
  }

  /**
   * AppSetting findMany
   */
  export type AppSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSetting
     */
    select?: AppSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSetting
     */
    omit?: AppSettingOmit<ExtArgs> | null
    /**
     * Filter, which AppSettings to fetch.
     */
    where?: AppSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppSettings to fetch.
     */
    orderBy?: AppSettingOrderByWithRelationInput | AppSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AppSettings.
     */
    cursor?: AppSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppSettings.
     */
    distinct?: AppSettingScalarFieldEnum | AppSettingScalarFieldEnum[]
  }

  /**
   * AppSetting create
   */
  export type AppSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSetting
     */
    select?: AppSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSetting
     */
    omit?: AppSettingOmit<ExtArgs> | null
    /**
     * The data needed to create a AppSetting.
     */
    data: XOR<AppSettingCreateInput, AppSettingUncheckedCreateInput>
  }

  /**
   * AppSetting createMany
   */
  export type AppSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AppSettings.
     */
    data: AppSettingCreateManyInput | AppSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppSetting createManyAndReturn
   */
  export type AppSettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSetting
     */
    select?: AppSettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AppSetting
     */
    omit?: AppSettingOmit<ExtArgs> | null
    /**
     * The data used to create many AppSettings.
     */
    data: AppSettingCreateManyInput | AppSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppSetting update
   */
  export type AppSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSetting
     */
    select?: AppSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSetting
     */
    omit?: AppSettingOmit<ExtArgs> | null
    /**
     * The data needed to update a AppSetting.
     */
    data: XOR<AppSettingUpdateInput, AppSettingUncheckedUpdateInput>
    /**
     * Choose, which AppSetting to update.
     */
    where: AppSettingWhereUniqueInput
  }

  /**
   * AppSetting updateMany
   */
  export type AppSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AppSettings.
     */
    data: XOR<AppSettingUpdateManyMutationInput, AppSettingUncheckedUpdateManyInput>
    /**
     * Filter which AppSettings to update
     */
    where?: AppSettingWhereInput
    /**
     * Limit how many AppSettings to update.
     */
    limit?: number
  }

  /**
   * AppSetting updateManyAndReturn
   */
  export type AppSettingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSetting
     */
    select?: AppSettingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AppSetting
     */
    omit?: AppSettingOmit<ExtArgs> | null
    /**
     * The data used to update AppSettings.
     */
    data: XOR<AppSettingUpdateManyMutationInput, AppSettingUncheckedUpdateManyInput>
    /**
     * Filter which AppSettings to update
     */
    where?: AppSettingWhereInput
    /**
     * Limit how many AppSettings to update.
     */
    limit?: number
  }

  /**
   * AppSetting upsert
   */
  export type AppSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSetting
     */
    select?: AppSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSetting
     */
    omit?: AppSettingOmit<ExtArgs> | null
    /**
     * The filter to search for the AppSetting to update in case it exists.
     */
    where: AppSettingWhereUniqueInput
    /**
     * In case the AppSetting found by the `where` argument doesn't exist, create a new AppSetting with this data.
     */
    create: XOR<AppSettingCreateInput, AppSettingUncheckedCreateInput>
    /**
     * In case the AppSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppSettingUpdateInput, AppSettingUncheckedUpdateInput>
  }

  /**
   * AppSetting delete
   */
  export type AppSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSetting
     */
    select?: AppSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSetting
     */
    omit?: AppSettingOmit<ExtArgs> | null
    /**
     * Filter which AppSetting to delete.
     */
    where: AppSettingWhereUniqueInput
  }

  /**
   * AppSetting deleteMany
   */
  export type AppSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppSettings to delete
     */
    where?: AppSettingWhereInput
    /**
     * Limit how many AppSettings to delete.
     */
    limit?: number
  }

  /**
   * AppSetting without action
   */
  export type AppSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSetting
     */
    select?: AppSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppSetting
     */
    omit?: AppSettingOmit<ExtArgs> | null
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


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    message: 'message',
    type: 'type',
    isRead: 'isRead',
    actionUrl: 'actionUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const NotificationPreferenceScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    emailEnabled: 'emailEnabled',
    pushEnabled: 'pushEnabled',
    smsEnabled: 'smsEnabled',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NotificationPreferenceScalarFieldEnum = (typeof NotificationPreferenceScalarFieldEnum)[keyof typeof NotificationPreferenceScalarFieldEnum]


  export const StaffNotificationScalarFieldEnum: {
    id: 'id',
    type: 'type',
    title: 'title',
    body: 'body',
    link: 'link',
    permission: 'permission',
    data: 'data',
    createdAt: 'createdAt'
  };

  export type StaffNotificationScalarFieldEnum = (typeof StaffNotificationScalarFieldEnum)[keyof typeof StaffNotificationScalarFieldEnum]


  export const StaffNotificationReadScalarFieldEnum: {
    notificationId: 'notificationId',
    userId: 'userId',
    readAt: 'readAt'
  };

  export type StaffNotificationReadScalarFieldEnum = (typeof StaffNotificationReadScalarFieldEnum)[keyof typeof StaffNotificationReadScalarFieldEnum]


  export const StaffNotificationCursorScalarFieldEnum: {
    userId: 'userId',
    readBefore: 'readBefore'
  };

  export type StaffNotificationCursorScalarFieldEnum = (typeof StaffNotificationCursorScalarFieldEnum)[keyof typeof StaffNotificationCursorScalarFieldEnum]


  export const PushSubscriptionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    endpoint: 'endpoint',
    p256dh: 'p256dh',
    auth: 'auth',
    permissions: 'permissions',
    userAgent: 'userAgent',
    failureCount: 'failureCount',
    lastSuccessAt: 'lastSuccessAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PushSubscriptionScalarFieldEnum = (typeof PushSubscriptionScalarFieldEnum)[keyof typeof PushSubscriptionScalarFieldEnum]


  export const AppSettingScalarFieldEnum: {
    key: 'key',
    value: 'value',
    updatedAt: 'updatedAt'
  };

  export type AppSettingScalarFieldEnum = (typeof AppSettingScalarFieldEnum)[keyof typeof AppSettingScalarFieldEnum]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


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


  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    actionUrl?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    actionUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    actionUrl?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    actionUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    userId?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    type?: StringWithAggregatesFilter<"Notification"> | string
    isRead?: BoolWithAggregatesFilter<"Notification"> | boolean
    actionUrl?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type NotificationPreferenceWhereInput = {
    AND?: NotificationPreferenceWhereInput | NotificationPreferenceWhereInput[]
    OR?: NotificationPreferenceWhereInput[]
    NOT?: NotificationPreferenceWhereInput | NotificationPreferenceWhereInput[]
    id?: StringFilter<"NotificationPreference"> | string
    userId?: StringFilter<"NotificationPreference"> | string
    emailEnabled?: BoolFilter<"NotificationPreference"> | boolean
    pushEnabled?: BoolFilter<"NotificationPreference"> | boolean
    smsEnabled?: BoolFilter<"NotificationPreference"> | boolean
    createdAt?: DateTimeFilter<"NotificationPreference"> | Date | string
    updatedAt?: DateTimeFilter<"NotificationPreference"> | Date | string
  }

  export type NotificationPreferenceOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    emailEnabled?: SortOrder
    pushEnabled?: SortOrder
    smsEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationPreferenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: NotificationPreferenceWhereInput | NotificationPreferenceWhereInput[]
    OR?: NotificationPreferenceWhereInput[]
    NOT?: NotificationPreferenceWhereInput | NotificationPreferenceWhereInput[]
    emailEnabled?: BoolFilter<"NotificationPreference"> | boolean
    pushEnabled?: BoolFilter<"NotificationPreference"> | boolean
    smsEnabled?: BoolFilter<"NotificationPreference"> | boolean
    createdAt?: DateTimeFilter<"NotificationPreference"> | Date | string
    updatedAt?: DateTimeFilter<"NotificationPreference"> | Date | string
  }, "id" | "userId">

  export type NotificationPreferenceOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    emailEnabled?: SortOrder
    pushEnabled?: SortOrder
    smsEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NotificationPreferenceCountOrderByAggregateInput
    _max?: NotificationPreferenceMaxOrderByAggregateInput
    _min?: NotificationPreferenceMinOrderByAggregateInput
  }

  export type NotificationPreferenceScalarWhereWithAggregatesInput = {
    AND?: NotificationPreferenceScalarWhereWithAggregatesInput | NotificationPreferenceScalarWhereWithAggregatesInput[]
    OR?: NotificationPreferenceScalarWhereWithAggregatesInput[]
    NOT?: NotificationPreferenceScalarWhereWithAggregatesInput | NotificationPreferenceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NotificationPreference"> | string
    userId?: StringWithAggregatesFilter<"NotificationPreference"> | string
    emailEnabled?: BoolWithAggregatesFilter<"NotificationPreference"> | boolean
    pushEnabled?: BoolWithAggregatesFilter<"NotificationPreference"> | boolean
    smsEnabled?: BoolWithAggregatesFilter<"NotificationPreference"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"NotificationPreference"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NotificationPreference"> | Date | string
  }

  export type StaffNotificationWhereInput = {
    AND?: StaffNotificationWhereInput | StaffNotificationWhereInput[]
    OR?: StaffNotificationWhereInput[]
    NOT?: StaffNotificationWhereInput | StaffNotificationWhereInput[]
    id?: StringFilter<"StaffNotification"> | string
    type?: StringFilter<"StaffNotification"> | string
    title?: StringFilter<"StaffNotification"> | string
    body?: StringFilter<"StaffNotification"> | string
    link?: StringNullableFilter<"StaffNotification"> | string | null
    permission?: StringNullableFilter<"StaffNotification"> | string | null
    data?: JsonNullableFilter<"StaffNotification">
    createdAt?: DateTimeFilter<"StaffNotification"> | Date | string
    reads?: StaffNotificationReadListRelationFilter
  }

  export type StaffNotificationOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    link?: SortOrderInput | SortOrder
    permission?: SortOrderInput | SortOrder
    data?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    reads?: StaffNotificationReadOrderByRelationAggregateInput
  }

  export type StaffNotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StaffNotificationWhereInput | StaffNotificationWhereInput[]
    OR?: StaffNotificationWhereInput[]
    NOT?: StaffNotificationWhereInput | StaffNotificationWhereInput[]
    type?: StringFilter<"StaffNotification"> | string
    title?: StringFilter<"StaffNotification"> | string
    body?: StringFilter<"StaffNotification"> | string
    link?: StringNullableFilter<"StaffNotification"> | string | null
    permission?: StringNullableFilter<"StaffNotification"> | string | null
    data?: JsonNullableFilter<"StaffNotification">
    createdAt?: DateTimeFilter<"StaffNotification"> | Date | string
    reads?: StaffNotificationReadListRelationFilter
  }, "id">

  export type StaffNotificationOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    link?: SortOrderInput | SortOrder
    permission?: SortOrderInput | SortOrder
    data?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: StaffNotificationCountOrderByAggregateInput
    _max?: StaffNotificationMaxOrderByAggregateInput
    _min?: StaffNotificationMinOrderByAggregateInput
  }

  export type StaffNotificationScalarWhereWithAggregatesInput = {
    AND?: StaffNotificationScalarWhereWithAggregatesInput | StaffNotificationScalarWhereWithAggregatesInput[]
    OR?: StaffNotificationScalarWhereWithAggregatesInput[]
    NOT?: StaffNotificationScalarWhereWithAggregatesInput | StaffNotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StaffNotification"> | string
    type?: StringWithAggregatesFilter<"StaffNotification"> | string
    title?: StringWithAggregatesFilter<"StaffNotification"> | string
    body?: StringWithAggregatesFilter<"StaffNotification"> | string
    link?: StringNullableWithAggregatesFilter<"StaffNotification"> | string | null
    permission?: StringNullableWithAggregatesFilter<"StaffNotification"> | string | null
    data?: JsonNullableWithAggregatesFilter<"StaffNotification">
    createdAt?: DateTimeWithAggregatesFilter<"StaffNotification"> | Date | string
  }

  export type StaffNotificationReadWhereInput = {
    AND?: StaffNotificationReadWhereInput | StaffNotificationReadWhereInput[]
    OR?: StaffNotificationReadWhereInput[]
    NOT?: StaffNotificationReadWhereInput | StaffNotificationReadWhereInput[]
    notificationId?: StringFilter<"StaffNotificationRead"> | string
    userId?: StringFilter<"StaffNotificationRead"> | string
    readAt?: DateTimeFilter<"StaffNotificationRead"> | Date | string
    notification?: XOR<StaffNotificationScalarRelationFilter, StaffNotificationWhereInput>
  }

  export type StaffNotificationReadOrderByWithRelationInput = {
    notificationId?: SortOrder
    userId?: SortOrder
    readAt?: SortOrder
    notification?: StaffNotificationOrderByWithRelationInput
  }

  export type StaffNotificationReadWhereUniqueInput = Prisma.AtLeast<{
    notificationId_userId?: StaffNotificationReadNotificationIdUserIdCompoundUniqueInput
    AND?: StaffNotificationReadWhereInput | StaffNotificationReadWhereInput[]
    OR?: StaffNotificationReadWhereInput[]
    NOT?: StaffNotificationReadWhereInput | StaffNotificationReadWhereInput[]
    notificationId?: StringFilter<"StaffNotificationRead"> | string
    userId?: StringFilter<"StaffNotificationRead"> | string
    readAt?: DateTimeFilter<"StaffNotificationRead"> | Date | string
    notification?: XOR<StaffNotificationScalarRelationFilter, StaffNotificationWhereInput>
  }, "notificationId_userId">

  export type StaffNotificationReadOrderByWithAggregationInput = {
    notificationId?: SortOrder
    userId?: SortOrder
    readAt?: SortOrder
    _count?: StaffNotificationReadCountOrderByAggregateInput
    _max?: StaffNotificationReadMaxOrderByAggregateInput
    _min?: StaffNotificationReadMinOrderByAggregateInput
  }

  export type StaffNotificationReadScalarWhereWithAggregatesInput = {
    AND?: StaffNotificationReadScalarWhereWithAggregatesInput | StaffNotificationReadScalarWhereWithAggregatesInput[]
    OR?: StaffNotificationReadScalarWhereWithAggregatesInput[]
    NOT?: StaffNotificationReadScalarWhereWithAggregatesInput | StaffNotificationReadScalarWhereWithAggregatesInput[]
    notificationId?: StringWithAggregatesFilter<"StaffNotificationRead"> | string
    userId?: StringWithAggregatesFilter<"StaffNotificationRead"> | string
    readAt?: DateTimeWithAggregatesFilter<"StaffNotificationRead"> | Date | string
  }

  export type StaffNotificationCursorWhereInput = {
    AND?: StaffNotificationCursorWhereInput | StaffNotificationCursorWhereInput[]
    OR?: StaffNotificationCursorWhereInput[]
    NOT?: StaffNotificationCursorWhereInput | StaffNotificationCursorWhereInput[]
    userId?: StringFilter<"StaffNotificationCursor"> | string
    readBefore?: DateTimeFilter<"StaffNotificationCursor"> | Date | string
  }

  export type StaffNotificationCursorOrderByWithRelationInput = {
    userId?: SortOrder
    readBefore?: SortOrder
  }

  export type StaffNotificationCursorWhereUniqueInput = Prisma.AtLeast<{
    userId?: string
    AND?: StaffNotificationCursorWhereInput | StaffNotificationCursorWhereInput[]
    OR?: StaffNotificationCursorWhereInput[]
    NOT?: StaffNotificationCursorWhereInput | StaffNotificationCursorWhereInput[]
    readBefore?: DateTimeFilter<"StaffNotificationCursor"> | Date | string
  }, "userId">

  export type StaffNotificationCursorOrderByWithAggregationInput = {
    userId?: SortOrder
    readBefore?: SortOrder
    _count?: StaffNotificationCursorCountOrderByAggregateInput
    _max?: StaffNotificationCursorMaxOrderByAggregateInput
    _min?: StaffNotificationCursorMinOrderByAggregateInput
  }

  export type StaffNotificationCursorScalarWhereWithAggregatesInput = {
    AND?: StaffNotificationCursorScalarWhereWithAggregatesInput | StaffNotificationCursorScalarWhereWithAggregatesInput[]
    OR?: StaffNotificationCursorScalarWhereWithAggregatesInput[]
    NOT?: StaffNotificationCursorScalarWhereWithAggregatesInput | StaffNotificationCursorScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"StaffNotificationCursor"> | string
    readBefore?: DateTimeWithAggregatesFilter<"StaffNotificationCursor"> | Date | string
  }

  export type PushSubscriptionWhereInput = {
    AND?: PushSubscriptionWhereInput | PushSubscriptionWhereInput[]
    OR?: PushSubscriptionWhereInput[]
    NOT?: PushSubscriptionWhereInput | PushSubscriptionWhereInput[]
    id?: StringFilter<"PushSubscription"> | string
    userId?: StringFilter<"PushSubscription"> | string
    endpoint?: StringFilter<"PushSubscription"> | string
    p256dh?: StringFilter<"PushSubscription"> | string
    auth?: StringFilter<"PushSubscription"> | string
    permissions?: StringNullableListFilter<"PushSubscription">
    userAgent?: StringNullableFilter<"PushSubscription"> | string | null
    failureCount?: IntFilter<"PushSubscription"> | number
    lastSuccessAt?: DateTimeNullableFilter<"PushSubscription"> | Date | string | null
    createdAt?: DateTimeFilter<"PushSubscription"> | Date | string
    updatedAt?: DateTimeFilter<"PushSubscription"> | Date | string
  }

  export type PushSubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    endpoint?: SortOrder
    p256dh?: SortOrder
    auth?: SortOrder
    permissions?: SortOrder
    userAgent?: SortOrderInput | SortOrder
    failureCount?: SortOrder
    lastSuccessAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PushSubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    endpoint?: string
    AND?: PushSubscriptionWhereInput | PushSubscriptionWhereInput[]
    OR?: PushSubscriptionWhereInput[]
    NOT?: PushSubscriptionWhereInput | PushSubscriptionWhereInput[]
    userId?: StringFilter<"PushSubscription"> | string
    p256dh?: StringFilter<"PushSubscription"> | string
    auth?: StringFilter<"PushSubscription"> | string
    permissions?: StringNullableListFilter<"PushSubscription">
    userAgent?: StringNullableFilter<"PushSubscription"> | string | null
    failureCount?: IntFilter<"PushSubscription"> | number
    lastSuccessAt?: DateTimeNullableFilter<"PushSubscription"> | Date | string | null
    createdAt?: DateTimeFilter<"PushSubscription"> | Date | string
    updatedAt?: DateTimeFilter<"PushSubscription"> | Date | string
  }, "id" | "endpoint">

  export type PushSubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    endpoint?: SortOrder
    p256dh?: SortOrder
    auth?: SortOrder
    permissions?: SortOrder
    userAgent?: SortOrderInput | SortOrder
    failureCount?: SortOrder
    lastSuccessAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PushSubscriptionCountOrderByAggregateInput
    _avg?: PushSubscriptionAvgOrderByAggregateInput
    _max?: PushSubscriptionMaxOrderByAggregateInput
    _min?: PushSubscriptionMinOrderByAggregateInput
    _sum?: PushSubscriptionSumOrderByAggregateInput
  }

  export type PushSubscriptionScalarWhereWithAggregatesInput = {
    AND?: PushSubscriptionScalarWhereWithAggregatesInput | PushSubscriptionScalarWhereWithAggregatesInput[]
    OR?: PushSubscriptionScalarWhereWithAggregatesInput[]
    NOT?: PushSubscriptionScalarWhereWithAggregatesInput | PushSubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PushSubscription"> | string
    userId?: StringWithAggregatesFilter<"PushSubscription"> | string
    endpoint?: StringWithAggregatesFilter<"PushSubscription"> | string
    p256dh?: StringWithAggregatesFilter<"PushSubscription"> | string
    auth?: StringWithAggregatesFilter<"PushSubscription"> | string
    permissions?: StringNullableListFilter<"PushSubscription">
    userAgent?: StringNullableWithAggregatesFilter<"PushSubscription"> | string | null
    failureCount?: IntWithAggregatesFilter<"PushSubscription"> | number
    lastSuccessAt?: DateTimeNullableWithAggregatesFilter<"PushSubscription"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PushSubscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PushSubscription"> | Date | string
  }

  export type AppSettingWhereInput = {
    AND?: AppSettingWhereInput | AppSettingWhereInput[]
    OR?: AppSettingWhereInput[]
    NOT?: AppSettingWhereInput | AppSettingWhereInput[]
    key?: StringFilter<"AppSetting"> | string
    value?: StringFilter<"AppSetting"> | string
    updatedAt?: DateTimeFilter<"AppSetting"> | Date | string
  }

  export type AppSettingOrderByWithRelationInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppSettingWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: AppSettingWhereInput | AppSettingWhereInput[]
    OR?: AppSettingWhereInput[]
    NOT?: AppSettingWhereInput | AppSettingWhereInput[]
    value?: StringFilter<"AppSetting"> | string
    updatedAt?: DateTimeFilter<"AppSetting"> | Date | string
  }, "key">

  export type AppSettingOrderByWithAggregationInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
    _count?: AppSettingCountOrderByAggregateInput
    _max?: AppSettingMaxOrderByAggregateInput
    _min?: AppSettingMinOrderByAggregateInput
  }

  export type AppSettingScalarWhereWithAggregatesInput = {
    AND?: AppSettingScalarWhereWithAggregatesInput | AppSettingScalarWhereWithAggregatesInput[]
    OR?: AppSettingScalarWhereWithAggregatesInput[]
    NOT?: AppSettingScalarWhereWithAggregatesInput | AppSettingScalarWhereWithAggregatesInput[]
    key?: StringWithAggregatesFilter<"AppSetting"> | string
    value?: StringWithAggregatesFilter<"AppSetting"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"AppSetting"> | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    userId: string
    title: string
    message: string
    type: string
    isRead?: boolean
    actionUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    message: string
    type: string
    isRead?: boolean
    actionUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    actionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    actionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    userId: string
    title: string
    message: string
    type: string
    isRead?: boolean
    actionUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    actionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    actionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferenceCreateInput = {
    id?: string
    userId: string
    emailEnabled?: boolean
    pushEnabled?: boolean
    smsEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationPreferenceUncheckedCreateInput = {
    id?: string
    userId: string
    emailEnabled?: boolean
    pushEnabled?: boolean
    smsEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationPreferenceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emailEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushEnabled?: BoolFieldUpdateOperationsInput | boolean
    smsEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferenceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emailEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushEnabled?: BoolFieldUpdateOperationsInput | boolean
    smsEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferenceCreateManyInput = {
    id?: string
    userId: string
    emailEnabled?: boolean
    pushEnabled?: boolean
    smsEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationPreferenceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emailEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushEnabled?: BoolFieldUpdateOperationsInput | boolean
    smsEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPreferenceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emailEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushEnabled?: BoolFieldUpdateOperationsInput | boolean
    smsEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffNotificationCreateInput = {
    id?: string
    type: string
    title: string
    body: string
    link?: string | null
    permission?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    reads?: StaffNotificationReadCreateNestedManyWithoutNotificationInput
  }

  export type StaffNotificationUncheckedCreateInput = {
    id?: string
    type: string
    title: string
    body: string
    link?: string | null
    permission?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    reads?: StaffNotificationReadUncheckedCreateNestedManyWithoutNotificationInput
  }

  export type StaffNotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    permission?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reads?: StaffNotificationReadUpdateManyWithoutNotificationNestedInput
  }

  export type StaffNotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    permission?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reads?: StaffNotificationReadUncheckedUpdateManyWithoutNotificationNestedInput
  }

  export type StaffNotificationCreateManyInput = {
    id?: string
    type: string
    title: string
    body: string
    link?: string | null
    permission?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type StaffNotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    permission?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffNotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    permission?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffNotificationReadCreateInput = {
    userId: string
    readAt?: Date | string
    notification: StaffNotificationCreateNestedOneWithoutReadsInput
  }

  export type StaffNotificationReadUncheckedCreateInput = {
    notificationId: string
    userId: string
    readAt?: Date | string
  }

  export type StaffNotificationReadUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    readAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notification?: StaffNotificationUpdateOneRequiredWithoutReadsNestedInput
  }

  export type StaffNotificationReadUncheckedUpdateInput = {
    notificationId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    readAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffNotificationReadCreateManyInput = {
    notificationId: string
    userId: string
    readAt?: Date | string
  }

  export type StaffNotificationReadUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    readAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffNotificationReadUncheckedUpdateManyInput = {
    notificationId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    readAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffNotificationCursorCreateInput = {
    userId: string
    readBefore: Date | string
  }

  export type StaffNotificationCursorUncheckedCreateInput = {
    userId: string
    readBefore: Date | string
  }

  export type StaffNotificationCursorUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    readBefore?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffNotificationCursorUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    readBefore?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffNotificationCursorCreateManyInput = {
    userId: string
    readBefore: Date | string
  }

  export type StaffNotificationCursorUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    readBefore?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffNotificationCursorUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    readBefore?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PushSubscriptionCreateInput = {
    id?: string
    userId: string
    endpoint: string
    p256dh: string
    auth: string
    permissions?: PushSubscriptionCreatepermissionsInput | string[]
    userAgent?: string | null
    failureCount?: number
    lastSuccessAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PushSubscriptionUncheckedCreateInput = {
    id?: string
    userId: string
    endpoint: string
    p256dh: string
    auth: string
    permissions?: PushSubscriptionCreatepermissionsInput | string[]
    userAgent?: string | null
    failureCount?: number
    lastSuccessAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PushSubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    endpoint?: StringFieldUpdateOperationsInput | string
    p256dh?: StringFieldUpdateOperationsInput | string
    auth?: StringFieldUpdateOperationsInput | string
    permissions?: PushSubscriptionUpdatepermissionsInput | string[]
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    failureCount?: IntFieldUpdateOperationsInput | number
    lastSuccessAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PushSubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    endpoint?: StringFieldUpdateOperationsInput | string
    p256dh?: StringFieldUpdateOperationsInput | string
    auth?: StringFieldUpdateOperationsInput | string
    permissions?: PushSubscriptionUpdatepermissionsInput | string[]
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    failureCount?: IntFieldUpdateOperationsInput | number
    lastSuccessAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PushSubscriptionCreateManyInput = {
    id?: string
    userId: string
    endpoint: string
    p256dh: string
    auth: string
    permissions?: PushSubscriptionCreatepermissionsInput | string[]
    userAgent?: string | null
    failureCount?: number
    lastSuccessAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PushSubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    endpoint?: StringFieldUpdateOperationsInput | string
    p256dh?: StringFieldUpdateOperationsInput | string
    auth?: StringFieldUpdateOperationsInput | string
    permissions?: PushSubscriptionUpdatepermissionsInput | string[]
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    failureCount?: IntFieldUpdateOperationsInput | number
    lastSuccessAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PushSubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    endpoint?: StringFieldUpdateOperationsInput | string
    p256dh?: StringFieldUpdateOperationsInput | string
    auth?: StringFieldUpdateOperationsInput | string
    permissions?: PushSubscriptionUpdatepermissionsInput | string[]
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    failureCount?: IntFieldUpdateOperationsInput | number
    lastSuccessAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppSettingCreateInput = {
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type AppSettingUncheckedCreateInput = {
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type AppSettingUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppSettingUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppSettingCreateManyInput = {
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type AppSettingUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppSettingUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    actionUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    actionUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    actionUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NotificationPreferenceCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    emailEnabled?: SortOrder
    pushEnabled?: SortOrder
    smsEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationPreferenceMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    emailEnabled?: SortOrder
    pushEnabled?: SortOrder
    smsEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationPreferenceMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    emailEnabled?: SortOrder
    pushEnabled?: SortOrder
    smsEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type StaffNotificationReadListRelationFilter = {
    every?: StaffNotificationReadWhereInput
    some?: StaffNotificationReadWhereInput
    none?: StaffNotificationReadWhereInput
  }

  export type StaffNotificationReadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StaffNotificationCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    link?: SortOrder
    permission?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
  }

  export type StaffNotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    link?: SortOrder
    permission?: SortOrder
    createdAt?: SortOrder
  }

  export type StaffNotificationMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    link?: SortOrder
    permission?: SortOrder
    createdAt?: SortOrder
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

  export type StaffNotificationScalarRelationFilter = {
    is?: StaffNotificationWhereInput
    isNot?: StaffNotificationWhereInput
  }

  export type StaffNotificationReadNotificationIdUserIdCompoundUniqueInput = {
    notificationId: string
    userId: string
  }

  export type StaffNotificationReadCountOrderByAggregateInput = {
    notificationId?: SortOrder
    userId?: SortOrder
    readAt?: SortOrder
  }

  export type StaffNotificationReadMaxOrderByAggregateInput = {
    notificationId?: SortOrder
    userId?: SortOrder
    readAt?: SortOrder
  }

  export type StaffNotificationReadMinOrderByAggregateInput = {
    notificationId?: SortOrder
    userId?: SortOrder
    readAt?: SortOrder
  }

  export type StaffNotificationCursorCountOrderByAggregateInput = {
    userId?: SortOrder
    readBefore?: SortOrder
  }

  export type StaffNotificationCursorMaxOrderByAggregateInput = {
    userId?: SortOrder
    readBefore?: SortOrder
  }

  export type StaffNotificationCursorMinOrderByAggregateInput = {
    userId?: SortOrder
    readBefore?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
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

  export type PushSubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    endpoint?: SortOrder
    p256dh?: SortOrder
    auth?: SortOrder
    permissions?: SortOrder
    userAgent?: SortOrder
    failureCount?: SortOrder
    lastSuccessAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PushSubscriptionAvgOrderByAggregateInput = {
    failureCount?: SortOrder
  }

  export type PushSubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    endpoint?: SortOrder
    p256dh?: SortOrder
    auth?: SortOrder
    userAgent?: SortOrder
    failureCount?: SortOrder
    lastSuccessAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PushSubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    endpoint?: SortOrder
    p256dh?: SortOrder
    auth?: SortOrder
    userAgent?: SortOrder
    failureCount?: SortOrder
    lastSuccessAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PushSubscriptionSumOrderByAggregateInput = {
    failureCount?: SortOrder
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

  export type AppSettingCountOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppSettingMaxOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppSettingMinOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StaffNotificationReadCreateNestedManyWithoutNotificationInput = {
    create?: XOR<StaffNotificationReadCreateWithoutNotificationInput, StaffNotificationReadUncheckedCreateWithoutNotificationInput> | StaffNotificationReadCreateWithoutNotificationInput[] | StaffNotificationReadUncheckedCreateWithoutNotificationInput[]
    connectOrCreate?: StaffNotificationReadCreateOrConnectWithoutNotificationInput | StaffNotificationReadCreateOrConnectWithoutNotificationInput[]
    createMany?: StaffNotificationReadCreateManyNotificationInputEnvelope
    connect?: StaffNotificationReadWhereUniqueInput | StaffNotificationReadWhereUniqueInput[]
  }

  export type StaffNotificationReadUncheckedCreateNestedManyWithoutNotificationInput = {
    create?: XOR<StaffNotificationReadCreateWithoutNotificationInput, StaffNotificationReadUncheckedCreateWithoutNotificationInput> | StaffNotificationReadCreateWithoutNotificationInput[] | StaffNotificationReadUncheckedCreateWithoutNotificationInput[]
    connectOrCreate?: StaffNotificationReadCreateOrConnectWithoutNotificationInput | StaffNotificationReadCreateOrConnectWithoutNotificationInput[]
    createMany?: StaffNotificationReadCreateManyNotificationInputEnvelope
    connect?: StaffNotificationReadWhereUniqueInput | StaffNotificationReadWhereUniqueInput[]
  }

  export type StaffNotificationReadUpdateManyWithoutNotificationNestedInput = {
    create?: XOR<StaffNotificationReadCreateWithoutNotificationInput, StaffNotificationReadUncheckedCreateWithoutNotificationInput> | StaffNotificationReadCreateWithoutNotificationInput[] | StaffNotificationReadUncheckedCreateWithoutNotificationInput[]
    connectOrCreate?: StaffNotificationReadCreateOrConnectWithoutNotificationInput | StaffNotificationReadCreateOrConnectWithoutNotificationInput[]
    upsert?: StaffNotificationReadUpsertWithWhereUniqueWithoutNotificationInput | StaffNotificationReadUpsertWithWhereUniqueWithoutNotificationInput[]
    createMany?: StaffNotificationReadCreateManyNotificationInputEnvelope
    set?: StaffNotificationReadWhereUniqueInput | StaffNotificationReadWhereUniqueInput[]
    disconnect?: StaffNotificationReadWhereUniqueInput | StaffNotificationReadWhereUniqueInput[]
    delete?: StaffNotificationReadWhereUniqueInput | StaffNotificationReadWhereUniqueInput[]
    connect?: StaffNotificationReadWhereUniqueInput | StaffNotificationReadWhereUniqueInput[]
    update?: StaffNotificationReadUpdateWithWhereUniqueWithoutNotificationInput | StaffNotificationReadUpdateWithWhereUniqueWithoutNotificationInput[]
    updateMany?: StaffNotificationReadUpdateManyWithWhereWithoutNotificationInput | StaffNotificationReadUpdateManyWithWhereWithoutNotificationInput[]
    deleteMany?: StaffNotificationReadScalarWhereInput | StaffNotificationReadScalarWhereInput[]
  }

  export type StaffNotificationReadUncheckedUpdateManyWithoutNotificationNestedInput = {
    create?: XOR<StaffNotificationReadCreateWithoutNotificationInput, StaffNotificationReadUncheckedCreateWithoutNotificationInput> | StaffNotificationReadCreateWithoutNotificationInput[] | StaffNotificationReadUncheckedCreateWithoutNotificationInput[]
    connectOrCreate?: StaffNotificationReadCreateOrConnectWithoutNotificationInput | StaffNotificationReadCreateOrConnectWithoutNotificationInput[]
    upsert?: StaffNotificationReadUpsertWithWhereUniqueWithoutNotificationInput | StaffNotificationReadUpsertWithWhereUniqueWithoutNotificationInput[]
    createMany?: StaffNotificationReadCreateManyNotificationInputEnvelope
    set?: StaffNotificationReadWhereUniqueInput | StaffNotificationReadWhereUniqueInput[]
    disconnect?: StaffNotificationReadWhereUniqueInput | StaffNotificationReadWhereUniqueInput[]
    delete?: StaffNotificationReadWhereUniqueInput | StaffNotificationReadWhereUniqueInput[]
    connect?: StaffNotificationReadWhereUniqueInput | StaffNotificationReadWhereUniqueInput[]
    update?: StaffNotificationReadUpdateWithWhereUniqueWithoutNotificationInput | StaffNotificationReadUpdateWithWhereUniqueWithoutNotificationInput[]
    updateMany?: StaffNotificationReadUpdateManyWithWhereWithoutNotificationInput | StaffNotificationReadUpdateManyWithWhereWithoutNotificationInput[]
    deleteMany?: StaffNotificationReadScalarWhereInput | StaffNotificationReadScalarWhereInput[]
  }

  export type StaffNotificationCreateNestedOneWithoutReadsInput = {
    create?: XOR<StaffNotificationCreateWithoutReadsInput, StaffNotificationUncheckedCreateWithoutReadsInput>
    connectOrCreate?: StaffNotificationCreateOrConnectWithoutReadsInput
    connect?: StaffNotificationWhereUniqueInput
  }

  export type StaffNotificationUpdateOneRequiredWithoutReadsNestedInput = {
    create?: XOR<StaffNotificationCreateWithoutReadsInput, StaffNotificationUncheckedCreateWithoutReadsInput>
    connectOrCreate?: StaffNotificationCreateOrConnectWithoutReadsInput
    upsert?: StaffNotificationUpsertWithoutReadsInput
    connect?: StaffNotificationWhereUniqueInput
    update?: XOR<XOR<StaffNotificationUpdateToOneWithWhereWithoutReadsInput, StaffNotificationUpdateWithoutReadsInput>, StaffNotificationUncheckedUpdateWithoutReadsInput>
  }

  export type PushSubscriptionCreatepermissionsInput = {
    set: string[]
  }

  export type PushSubscriptionUpdatepermissionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type StaffNotificationReadCreateWithoutNotificationInput = {
    userId: string
    readAt?: Date | string
  }

  export type StaffNotificationReadUncheckedCreateWithoutNotificationInput = {
    userId: string
    readAt?: Date | string
  }

  export type StaffNotificationReadCreateOrConnectWithoutNotificationInput = {
    where: StaffNotificationReadWhereUniqueInput
    create: XOR<StaffNotificationReadCreateWithoutNotificationInput, StaffNotificationReadUncheckedCreateWithoutNotificationInput>
  }

  export type StaffNotificationReadCreateManyNotificationInputEnvelope = {
    data: StaffNotificationReadCreateManyNotificationInput | StaffNotificationReadCreateManyNotificationInput[]
    skipDuplicates?: boolean
  }

  export type StaffNotificationReadUpsertWithWhereUniqueWithoutNotificationInput = {
    where: StaffNotificationReadWhereUniqueInput
    update: XOR<StaffNotificationReadUpdateWithoutNotificationInput, StaffNotificationReadUncheckedUpdateWithoutNotificationInput>
    create: XOR<StaffNotificationReadCreateWithoutNotificationInput, StaffNotificationReadUncheckedCreateWithoutNotificationInput>
  }

  export type StaffNotificationReadUpdateWithWhereUniqueWithoutNotificationInput = {
    where: StaffNotificationReadWhereUniqueInput
    data: XOR<StaffNotificationReadUpdateWithoutNotificationInput, StaffNotificationReadUncheckedUpdateWithoutNotificationInput>
  }

  export type StaffNotificationReadUpdateManyWithWhereWithoutNotificationInput = {
    where: StaffNotificationReadScalarWhereInput
    data: XOR<StaffNotificationReadUpdateManyMutationInput, StaffNotificationReadUncheckedUpdateManyWithoutNotificationInput>
  }

  export type StaffNotificationReadScalarWhereInput = {
    AND?: StaffNotificationReadScalarWhereInput | StaffNotificationReadScalarWhereInput[]
    OR?: StaffNotificationReadScalarWhereInput[]
    NOT?: StaffNotificationReadScalarWhereInput | StaffNotificationReadScalarWhereInput[]
    notificationId?: StringFilter<"StaffNotificationRead"> | string
    userId?: StringFilter<"StaffNotificationRead"> | string
    readAt?: DateTimeFilter<"StaffNotificationRead"> | Date | string
  }

  export type StaffNotificationCreateWithoutReadsInput = {
    id?: string
    type: string
    title: string
    body: string
    link?: string | null
    permission?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type StaffNotificationUncheckedCreateWithoutReadsInput = {
    id?: string
    type: string
    title: string
    body: string
    link?: string | null
    permission?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type StaffNotificationCreateOrConnectWithoutReadsInput = {
    where: StaffNotificationWhereUniqueInput
    create: XOR<StaffNotificationCreateWithoutReadsInput, StaffNotificationUncheckedCreateWithoutReadsInput>
  }

  export type StaffNotificationUpsertWithoutReadsInput = {
    update: XOR<StaffNotificationUpdateWithoutReadsInput, StaffNotificationUncheckedUpdateWithoutReadsInput>
    create: XOR<StaffNotificationCreateWithoutReadsInput, StaffNotificationUncheckedCreateWithoutReadsInput>
    where?: StaffNotificationWhereInput
  }

  export type StaffNotificationUpdateToOneWithWhereWithoutReadsInput = {
    where?: StaffNotificationWhereInput
    data: XOR<StaffNotificationUpdateWithoutReadsInput, StaffNotificationUncheckedUpdateWithoutReadsInput>
  }

  export type StaffNotificationUpdateWithoutReadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    permission?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffNotificationUncheckedUpdateWithoutReadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    permission?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffNotificationReadCreateManyNotificationInput = {
    userId: string
    readAt?: Date | string
  }

  export type StaffNotificationReadUpdateWithoutNotificationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    readAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffNotificationReadUncheckedUpdateWithoutNotificationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    readAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffNotificationReadUncheckedUpdateManyWithoutNotificationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    readAt?: DateTimeFieldUpdateOperationsInput | Date | string
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