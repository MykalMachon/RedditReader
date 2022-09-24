const SubRedditForm = () => {
  const submitForm = (e: any) => {
    e.preventDefault();
  };

  return (
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
  );
};

export default SubRedditForm;
