const CommentComponent = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/v1/boards");
      setData(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      text: text,
    };

    try {
      const request = await axios.post("/api/v1/boards", body);
      fetchData();
      console.log(request.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData(); // 컴포넌트가 마운트될 때 데이터를 가져옵니다.
  }, []);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></input>
          </div>
          <div>
            <button>comment</button>
          </div>
        </form>
        <div>
          {/* {data.map((data) => (
            <div>
              <p>
                {data.id}. {data.text}
              </p>
            </div>
          ))} */}
          <div>
            <p>1. {text}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentComponent;
