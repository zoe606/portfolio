import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const countMonths = (from: Date, to: Date = new Date()): number => {
	let firstYear = 0;
	let wholeYears = 0;
	let newYear = 0;

	if (to.getFullYear() !== from.getFullYear()) {
		newYear = to.getMonth();
		wholeYears = (to.getFullYear() - from.getFullYear() - 1) * 12;
		firstYear = 12 - from.getMonth();
	} else {
		firstYear = to.getMonth() - from.getMonth();
	}

	return firstYear + wholeYears + newYear + 1;
};

export const getMonthName = (index: number): string => {
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	return monthNames[index];
};

export const useImage = (url: string, base: string): string => `${base}${url}`;

export const useTitle = (title: string, suffix: string) => `${title} | ${suffix}`;

export function getTimeDiff(date1: Date, date2 = new Date(Date.now() + 1000 * 60 * 60 * 24)) {
	const d1 = dayjs(date1);
	const d2 = dayjs(date2);

	const duration = dayjs.duration(d2.diff(d1));

	let n = 0;
	let u = 'day';

	if (duration.as('days') <= 7) {
		u = 'day';
		n = duration.as('days');
	} else if (duration.as('months') <= 1) {
		u = 'week';
		n = duration.as('weeks');
	} else if (duration.as('years') <= 1) {
		u = 'month';
		n = duration.as('months');
	} else {
		u = 'year';
		n = duration.as('years');
	}

	n = Math.trunc(n);

	return `${Math.trunc(n)} ${u}${n > 1 ? 's' : ''}`;
}

export function capitalize(str: string) {
	return str.toLowerCase().charAt(0).toUpperCase() + str.slice(1);
}

export function addDaysToDate(date: Date, days: number): Date {
	return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

/**
 * Check if a value is blank (null, undefined, or empty string)
 * @param value - Value to check
 * @returns true if value is blank
 */
export function isBlank(value: string | null | undefined): boolean {
	return value === null || value === undefined || value.trim() === '';
}

/** Splits a description into sentences, e.g. to show it as a list of achievements. */
export function splitSentences(text: string): Array<string> {
	return text
		.split(/(?<=\.)\s+(?=[A-Z])/)
		.map((sentence) => sentence.trim())
		.filter(Boolean);
}

/** Formats a period as a year range: "2023 — 2024", "2026 — now", or "2024" within one year. */
export function formatYears(period: { from: Date; to?: Date }): string {
	const from = period.from.getFullYear();
	if (!period.to) return `${from} — now`;
	const to = period.to.getFullYear();
	return from === to ? `${from}` : `${from} — ${to}`;
}

/** Formats a count with its noun: "1 project", "3 projects". */
export function plural(count: number, noun: string): string {
	return `${count} ${noun}${count === 1 ? '' : 's'}`;
}
