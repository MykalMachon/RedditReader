type PostCardProps = {
  data: any;
};

const PostCard = ({ data }: PostCardProps) => {
  const { title, score, url, selftext } = data;

  const readPost = async (e: any) => {
    e.preventDefault();

    // log the text for debugging
    // console.log(selftext);

    // read it
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = selftext;
    speechSynthesis.speak(utterance);
  };

  return (
    <article className="post-card">
      <div className="post-card__score">{score}</div>
      <div className="post-card__content">
        <p>{title}</p>
        <small>
          ~{Math.floor(selftext.split(' ').length / 100)} minute listen
        </small>
        <div className="action-bar">
          <button className="btn--secondary" onClick={readPost}>
            read to me
          </button>
          <a href={url}>see the post</a>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
