import { createContext, ComponentChildren } from 'preact';
import { useContext, useReducer } from 'preact/hooks';

type SRCProviderProps = {
  children: ComponentChildren;
};

type SRCState = {
  subReddit: null | string;
  subRedditData: null | Array<any>;
  state: 'idle' | 'loading';
};

type SRCAction = {
  type: 'sr-fetch' | 'sr-loaded' | 'sr-error';
  data: any;
};

const initState: SRCState = {
  subReddit: null,
  subRedditData: null,
  state: 'idle',
};

const SubRedditContext = createContext(initState);

const SRCReducer = (state: SRCState, action: SRCAction): SRCState => {
  switch (action.type) {
    // for loading new data
    case 'sr-fetch':
      return {
        ...state,
        state: 'loading',
      };
    // for when data has been loaded.
    case 'sr-loaded':
      return {
        ...state,
        subReddit: action.data.subReddit,
        subRedditData: action.data.posts,
        state: 'idle',
      };
    default:
      console.error('invalid action type dispatched to reducer.');
      return state;
  }
};

export const SubRedditContextProvider = ({ children }: SRCProviderProps) => {
  const [state, dispatch] = useReducer(SRCReducer, initState);

  return (
    <SubRedditContext.Provider value={[state, dispatch]}>
      {children}
    </SubRedditContext.Provider>
  );
};

export const useSubReddit = () => {
  const [state, dispatch] = useContext<SRCState>(SubRedditContext);
  return [state, dispatch];
};
