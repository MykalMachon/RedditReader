type PostCardProps = {
  data: any
}

const PostCard = ({ data }: PostCardProps) => {
  const { title, score, url, selftext } = data;

  const readPost = async (e: any) => {
    e.preventDefault();
    // ! commented out as it seems like all I need is in the initial fetch
    // get post specific data
    // const res = await fetch(`${url}.json`, { method: 'GET' });
    // const postData = await res.json();
    // console.log(postData);

    // const post = postData[0].data.children[0].data;
    // const comments = postData[1].data.children;

    // log the text for debugging
    console.log(selftext);

    // read it
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = selftext;
    speechSynthesis.speak(utterance);
  };

  return (
    <article className="post-card">
      <p>{title}</p>
      <small>~{Math.floor(selftext.split(' ').length / 100)} minute listen, {score} up-votes</small>
      <button className="btn--secondary" onClick={readPost}>read-it</button>
    </article>
  );
};

export default PostCard;
