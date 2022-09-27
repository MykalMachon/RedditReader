import PostCard from './PostCard';
import { useSubReddit } from './SubRedditContext';

const PostList = () => {
  const [state] = useSubReddit();

  return (
    <section className="post-list">
      {state.state === 'idle' && !state.subRedditData ? (
        <p>Select a subreddit above</p>
      ) : (
        <>
          <h2>Posts from r/{state.subRedditData[0].data.subreddit}</h2>
          {state.subRedditData.length > 0 ? (
            <>
              {state.subRedditData.map((post: any) => (
                <PostCard data={post.data} />
              ))}
            </>
          ) : (
            <p>there are no posts in this SubReddit.</p>
          )}
        </>
      )}
    </section>
  );
};

export default PostList;
