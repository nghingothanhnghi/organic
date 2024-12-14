// app/hooks.ts

import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Custom hooks to use throughout the app
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Use AppDispatch type
export const useAppSelector = <T>(selector: (state: RootState) => T): T => useSelector(selector); // Use RootState type
