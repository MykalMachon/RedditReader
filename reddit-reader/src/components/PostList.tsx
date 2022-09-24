import PostCard from './PostCard';

type PostListProps = {
  posts: Array<any>;
};

const PostList = ({ posts }: PostListProps) => {
  return (
    <section className="post-list">
      <h2>Posts</h2>
      {posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <PostCard data={post.data} />
          ))}
        </>
      ) : (
        <p>there are no posts yet</p>
      )}
    </section>
  );
};

export default PostList;
