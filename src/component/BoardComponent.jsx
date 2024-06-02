import axios from "axios";
import { useEffect, useState } from "react";
import CommentComponent from "./CommentComponent";

const BoardComponent = () => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);

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
      name: name,
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></input>
          </div>
          <div>
            <button>board</button>
          </div>
        </form>
        <div>
          {data.map((data) => (
            <div key={data.id}>
              <p>
                {data.name} : {data.text}
              </p>
              <button onClick={() => setSelectedBoardId(data.id)}>
                댓글 입력
              </button>
              {selectedBoardId === data.id && (
                <CommentComponent boardId={data.id} />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BoardComponent;
