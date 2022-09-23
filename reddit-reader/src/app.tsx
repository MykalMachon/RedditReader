import { useEffect, useState } from 'preact/hooks';
import PostCard from './PostCard';

export function App() {
  const [data, setData] = useState<null | any>();

  useEffect(() => {
    // check for a preset subreddit.
    // @ts-ignore
    let params = new URL(document.location).searchParams;
    let subReddit = params.get('redditUrl');

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

    const subRedditData = await getSubRedditData(subReddit.toString());
    setData(subRedditData);
  };

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

  return (
    <div class="site-container">
      <nav className="container--wide__centered">
        <span>Reddit Reader</span>
      </nav>
      <main className="container">
        <h1>Reddit Reader</h1>
        <p>
          Reads you stories from reddit; just like the MineCraft videos on
          TikTok.
        </p>
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
        {data ? (
          <section>
            <h2>Posts from r/{data.data.children[0].data.subreddit}</h2>
            {data.data.children.map(({ data }: any) => (
              <PostCard data={data} />
            ))}
          </section>
        ) : (
          <p>no posts </p>
        )}
      </main>
    </div>
  );
}
