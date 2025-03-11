export type ExpenseStackParamList = {
	ManageExpense: { id: string };
};

export type AuthStackParamList = {
	Login: undefined;
	Signup: undefined;
};

export type MainStackParamList = {
	ExpensesOverview: undefined;
	ManageExpense: { id?: string }; // Optional id for editing expenses
};

export type ExpensesOverviewParamList = {
	RecentExpenses: undefined;
	AllExpenses: undefined;
	Settings: undefined;
};

export type RootStackParamList = AuthStackParamList & MainStackParamList & ExpensesOverviewParamList & ExpenseStackParamList;