export interface ExpenseDto {
	id: string;
	amount: number;
	date: string;
	description: string;
}

export type Expense = Omit<ExpenseDto, 'id'>;