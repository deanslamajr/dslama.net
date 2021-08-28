// Pattern from https://kentcdodds.com/blog/how-to-use-react-context-effectively
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { useRouter } from 'next/router'

type State = {
    isActive: boolean;
    showModal: boolean;
};

type Setter = Dispatch<SetStateAction<State>>;

const StateContext = createContext<State | undefined>(undefined);
const SetterContext = createContext<Setter | undefined>(undefined);

const getInitializedState = (isActive: boolean): State => ({
    isActive,
    showModal: false
});

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
    () => getInitializedState(
      // dslama.net/?edit
      // TODO replace with proper login
      Boolean(typeof router.query.edit === 'string')
    )
  );

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
