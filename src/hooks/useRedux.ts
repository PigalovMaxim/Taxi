import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../redux/store"

export default function useRedux<T>(storeKey: keyof RootState) {
  const store = useSelector((state: RootState) => state[storeKey]);
  const dispatch = useDispatch();
  return { store: store as T, dispatch };
}
