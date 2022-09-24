import { useEffect, useState } from 'preact/hooks';
import PostList from './components/PostList';
import SubRedditForm from './components/SubRedditForm';

export function App() {
  const [data, setData] = useState<null | any>();

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
        <section>
          <SubRedditForm setData={setData} />
        </section>
        {data && <PostList posts={data.data.children} />}
      </main>
    </div>
  );
}
