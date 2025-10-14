/**
 * Convert hex color to RGBA with opacity
 * @param hex - Hex color string (e.g., '#ffffff' or 'ffffff')
 * @param opacity - Opacity value between 0 and 1
 * @returns RGBA color string
 */
export function changeColorOpacity(hex: string, opacity: number): string {
	// Remove # if present
	const cleanHex = hex.replace('#', '');

	// Parse hex to RGB
	const r = parseInt(cleanHex.substring(0, 2), 16);
	const g = parseInt(cleanHex.substring(2, 4), 16);
	const b = parseInt(cleanHex.substring(4, 6), 16);

	// Clamp opacity between 0 and 1
	const alpha = Math.max(0, Math.min(1, opacity));

	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
