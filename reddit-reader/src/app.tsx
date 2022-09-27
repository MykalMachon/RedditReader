import { useState } from 'preact/hooks';
import PostList from './components/PostList';
import SubRedditForm from './components/SubRedditForm';
import { SubRedditContextProvider } from './components/SubRedditContext';

export function App() {
  const [data, setData] = useState<null | any>();

  return (
    <SubRedditContextProvider>
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
          <SubRedditForm />
          <PostList />
        </main>
      </div>
    </SubRedditContextProvider>
  );
}
