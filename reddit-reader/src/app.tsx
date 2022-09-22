import { useState } from 'preact/hooks';
import preactLogo from './assets/preact.svg';
import './app.css';

export function App() {
  const [count, setCount] = useState(0);
  const [url, setUrl] = useState();
  const [data, setData] = useState();

  const submitForm = async (e) => {
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
    <>
      <h1>Reddit Reader</h1>
      <p>
        Reads you stories from reddit; just like the MineCraft videos on TikTok.
      </p>
      <form action="" onSubmit={submitForm}>
        <div className="form-control">
          <label htmlFor="subReddit">SubReddit</label>
          <input type="text" id="subReddit" name="subReddit" placeholder="r/amitheasshole" required={true} />
        </div>
        <button type="submit">Get posts</button>
      </form>
    </>
  );
}
