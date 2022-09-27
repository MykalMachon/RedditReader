import { useEffect } from 'preact/hooks';
import { useSubReddit } from './SubRedditContext';

const getSubRedditData = async (subReddit: string) => {
  // fetch reddit
  try {
    const url = `https://www.reddit.com/${subReddit}/.json`;
    const res = await fetch(url, { method: 'GET' });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    alert('whoops! something went wrong');
  }
};

const SubRedditForm = () => {
  const [state, dispatch] = useSubReddit();

  useEffect(() => {
    // check for a preset subreddit.
    // @ts-ignore
    let params = new URL(document.location).searchParams;
    let subReddit = params.get('subreddit');

    const getInitSubReddit = async (sr: string) => {
      dispatch({ type: 'sr-fetch' });
      const subRedditData = await getSubRedditData(sr);
      dispatch({
        type: 'sr-loaded',
        data: {
          posts: subRedditData.data.children,
          subReddit,
        },
      });
    };

    if (subReddit) getInitSubReddit(`r/${subReddit}`);
  }, []);

  const submitForm = async (e: any) => {
    e.preventDefault();

    // get form data
    const formData = new FormData(e.target);
    const { subReddit } = Object.fromEntries(formData);

    // set form data in state
    dispatch({ type: 'sr-fetch' });
    const subRedditData = await getSubRedditData(subReddit.toString());
    dispatch({
      type: 'sr-loaded',
      data: {
        posts: subRedditData.data.children,
        subReddit,
      },
    });
  };

  return (
    <form onSubmit={submitForm}>
      <div className="form-control">
        <label htmlFor="subReddit">SubReddit</label>
        <input
          type="text"
          id="subReddit"
          name="subReddit"
          placeholder="r/amitheasshole"
          required={true}
        />
      </div>
      <button type="submit" disabled={state.state !== 'idle'}>
        {state.state === 'idle' ? <>get posts</> : <>getting posts...</>}
      </button>
    </form>
  );
};

export default SubRedditForm;
