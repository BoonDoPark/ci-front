import axios from "axios";
import { useEffect, useState } from "react";

const BoardComponent = () => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://34.70.58.154:8080/api/v1/boards"
      );
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
      const request = await axios.post(
        "http://34.70.58.154:8080/api/v1/boards",
        body
      );
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
            <button>submit</button>
          </div>
        </form>
        <div>
          {data.map((data) => (
            <p key={data.id}>
              {data.name} : {data.text}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default BoardComponent;
