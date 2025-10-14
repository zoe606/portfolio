import { clsx, type ClassValue } from 'clsx';

/**
 * Utility function for merging class names
 * Compatible with UnoCSS
 */
export function cn(...inputs: ClassValue[]) {
	return clsx(inputs);
}
