// ==========================================
// IMPORTS
// ==========================================
// useState: Tracks state inside the hook.
// useEffect: Syncs state changes to browser storage automatically.
import { useState, useEffect } from 'react';

// ==========================================
// CUSTOM HOOK: useLocalStorage
// ==========================================
// <T> is a TypeScript Generic. It allows this hook to work with ANY data type 
// (e.g., Room[], Booking[], numbers, strings) while preserving type safety.
//
// Parameters:
//   1. key: The string label used to store data in localStorage (e.g., 'booked_rooms').
//   2. initialValue: Fallback data to use if nothing is stored in localStorage yet.
//
// Return Value:
//   A tuple [storedValue, setStoredValue] matching React's standard useState signature.
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {

  // ----------------------------------------
  // 1. LAZY STATE INITIALIZATION
  // Passing a function to useState (() => { ... }) ensures the code inside
  // only runs ONCE when the component mounts, rather than on every re-render.
  // ----------------------------------------
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Attempt to retrieve existing JSON string from browser storage
      const item = window.localStorage.getItem(key);

      // If key exists, parse the JSON string back into a JS object/array.
      // Otherwise, fall back to initialValue.
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      // If reading fails (e.g., corrupted JSON or restricted permissions), log the error safely
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // ----------------------------------------
  // 2. SYNCHRONIZATION SIDE EFFECT
  // Runs whenever `key` or `storedValue` changes.
  // Automatically writes the updated state back to localStorage.
  // ----------------------------------------
  useEffect(() => {
    try {
      // Convert the JavaScript value/object into a JSON string for storage
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      // Catch storage limits (quota exceeded) or storage write errors
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // ----------------------------------------
  // 3. RETURN STATE TUPLE
  // Returns current value and setter function, exactly like useState.
  // ----------------------------------------
  return [storedValue, setStoredValue];
}