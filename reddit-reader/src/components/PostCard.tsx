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
      <p>{title}</p>
      <small>
        ~{Math.floor(selftext.split(' ').length / 100)} minute listen,
        {score} up-votes
      </small>
      <button className="btn--secondary" onClick={readPost}>
        read-it
      </button>
    </article>
  );
};

export default PostCard;
