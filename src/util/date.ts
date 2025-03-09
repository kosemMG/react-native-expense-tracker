type DateInput = Date | string | number;

// Utility functions for date manipulation
export const getFormattedDate = (date: DateInput): string => {
	const d = new Date(date);
	if (isNaN(d.getTime())) {
		throw new Error('Invalid date provided');
	}
	const day = String(d.getDate()).padStart(2, '0');
	const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
	const year = d.getFullYear();
	return `${day}.${month}.${year}`;
}

export const getDateMinusDays = (date: DateInput, days: number): Date => {
	const d = new Date(date);
	if (isNaN(d.getTime())) {
		throw new Error('Invalid date provided');
	}
	d.setDate(d.getDate() - days);
	return d;
}