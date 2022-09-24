import { useEffect } from 'preact/hooks';

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

type SubRedditFormProps = {
  setData: Function;
};

const SubRedditForm = ({ setData }: SubRedditFormProps) => {
  useEffect(() => {
    // check for a preset subreddit.
    // @ts-ignore
    let params = new URL(document.location).searchParams;
    let subReddit = params.get('subreddit');

    const getInitSubReddit = async (sr: string) => {
      const subRedditData = await getSubRedditData(sr);
      setData(subRedditData);
    };

    if (subReddit) getInitSubReddit(`r/${subReddit}`);
  }, []);

  const submitForm = async (e: any) => {
    e.preventDefault();

    // get form data
    const formData = new FormData(e.target);
    const { subReddit } = Object.fromEntries(formData);

    // set form data in state
    const subRedditData = await getSubRedditData(subReddit.toString());
    setData(subRedditData);
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
      <button type="submit">Get posts</button>
    </form>
  );
};

export default SubRedditForm;
