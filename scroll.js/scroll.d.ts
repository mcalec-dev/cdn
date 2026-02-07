/**
 * scroll.js - Utility for managing scroll locking on the document body with reference counting.
 * @version 1.0.0
 * @author McAlec
 * @license MIT
 */
/**
 * Control action type for the scroll function
 */
export type ScrollAction =
  | "toggle"
  | "lock"
  | "unlock"
  | "on"
  | "off"
  | "0"
  | "1"
  | boolean;
/**
 * Main scroll control function. Toggles scroll lock by default.
 *
 * @param action - Control action:
 *   - 'toggle': Toggle current state (default)
 *   - 'lock'|'on'|'1'|false: Lock scrolling
 *   - 'unlock'|'off'|'0'|true: Unlock scrolling
 * @returns True if scroll is now enabled (unlocked), false if disabled (locked)
 *
 * @example
 * ```ts
 * // Toggle scroll lock
 * scroll(); // locks if unlocked, unlocks if locked
 * scroll.toggle(); // same as above
 *
 * // Lock scroll explicitly
 * scroll.lock();
 * scroll('lock');
 * scroll(false);
 *
 * // Unlock scroll explicitly
 * scroll.unlock();
 * scroll('unlock');
 * scroll(true);
 *
 * // Check current state
 * const isLocked = scroll.isLocked(); // true if scroll is currently locked
 * const count = scroll.getCount(); // get current lock count
 *
 * // Reference counting - useful for nested components
 * scroll.lock(); // count: 1, body overflow: hidden
 * scroll.lock(); // count: 2, body overflow: hidden
 * scroll.unlock(); // count: 1, body still overflow: hidden
 * scroll.unlock(); // count: 0, body overflow restored
 * ```
 */
export interface Scroll {
  (action?: ScrollAction): boolean;
  /**
   * Lock scrolling (disable scroll).
   * Increments the lock count and sets body overflow to hidden.
   * @returns False (scroll is now disabled)
   */
  lock(): boolean;
  /**
   * Unlock scrolling (enable scroll).
   * Decrements the lock count and restores body overflow when count reaches 0.
   * @returns True (scroll is now enabled)
   */
  unlock(): boolean;
  /**
   * Toggle scroll lock state.
   * @returns True if scroll is now enabled, false if now disabled
   */
  toggle(): boolean;
  /**
   * Enable scrolling (alias for unlock).
   * @returns True (scroll is now enabled)
   */
  enable(): boolean;
  /**
   * Disable scrolling (alias for lock).
   * @returns False (scroll is now disabled)
   */
  disable(): boolean;
  /**
   * Check if scroll is currently locked.
   * @returns True if scroll is locked (disabled), false otherwise
   */
  isLocked(): boolean;
  /**
   * Get the current lock count.
   * Useful for debugging or understanding nested lock states.
   * @returns Current lock count (0 = unlocked, >0 = locked)
   */
  getCount(): number;
}
declare const scroll: Scroll;
export { scroll };
export default scroll;
