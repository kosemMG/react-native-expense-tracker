import { AppDispatch, RootState } from '../store/store';

export interface ThunkApiConfig {
	state: RootState;
	dispatch: AppDispatch;
}