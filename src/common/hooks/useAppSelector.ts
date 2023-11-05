import {useSelector, TypedUseSelectorHook} from 'react-redux';
import { RootState } from '../../core/redux/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
