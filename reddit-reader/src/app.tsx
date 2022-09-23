import { useState } from 'preact/hooks';
import PostCard from './PostCard';

export function App() {
  const [data, setData] = useState<null | any>();

  const submitForm = async (e: any) => {
    e.preventDefault();

    // get form data
    const formData = new FormData(e.target);
    const { subReddit } = Object.fromEntries(formData);

    // fetch reddit
    try {
      const url = `https://www.reddit.com/${subReddit}/.json`;
      const res = await fetch(url, { method: 'GET' });
      const data = await res.json();
      setData(data);
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
        <form action="" onSubmit={submitForm}>
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
            <h2>Posts</h2>
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
