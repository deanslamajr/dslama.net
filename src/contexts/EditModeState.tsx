// Pattern from https://kentcdodds.com/blog/how-to-use-react-context-effectively
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router'
import {
  FetchPostsQuery
} from '../graphql/generated/ops';

type Post = Omit<
  FetchPostsQuery['postsPage']['posts'][number],
  '__typename' 
>;

type State = {
    isActive: boolean;
    showModal: boolean;
    postsFromConsole: Post[] | null;
};

type Setter = Dispatch<SetStateAction<State>>;

const StateContext = createContext<State | undefined>(undefined);
const SetterContext = createContext<Setter | undefined>(undefined);

const getInitializedState = (queryString?: string | string[]): State => {
  // dslama.net/?edit
  // TODO replace with proper login
  const isActive = Boolean(queryString !== undefined);
  
  return {
    isActive,
    showModal: false,
    postsFromConsole: null
  };
}

const useEditModeState = (): [State, Setter] => {
  const state = useContext(StateContext);
  const setter = useContext(SetterContext);
  if (state === undefined || setter === undefined) {
    throw new Error(`useEditModeState must be used within a EditModeContext`);
  }
  return [state, setter];
};

type Props = { children: ReactNode };
const EditModeProvider = ({ children }: Props) => {
  const router = useRouter();
  const [state, setState] = useState<State>(
    () => getInitializedState(router.query.edit)
  );

  useEffect(() => {
    setState(getInitializedState(router.query.edit));
  }, [router.query.edit]);

  return (
    <StateContext.Provider value={state}>
        <SetterContext.Provider value={setState}>
            {children}
        </SetterContext.Provider>
    </StateContext.Provider>
  );
};

export {
    EditModeProvider as Provider,
    useEditModeState as useState
};
