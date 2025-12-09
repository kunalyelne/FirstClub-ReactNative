/**
 * Result Type
 * Functional error handling pattern used by companies like Rust, Swift, Kotlin
 * Provides type-safe error handling without exceptions
 */

/**
 * Result type for operations that can succeed or fail
 * @template T - Success value type
 * @template E - Error type (defaults to Error)
 */
export type Result<T, E = Error> =
  | {success: true; data: T}
  | {success: false; error: E};

/**
 * Creates a successful Result
 */
export const success = <T, E = Error>(data: T): Result<T, E> => ({
  success: true,
  data,
});

/**
 * Creates a failed Result
 */
export const failure = <E = Error>(error: E): Result<never, E> => ({
  success: false,
  error,
});
