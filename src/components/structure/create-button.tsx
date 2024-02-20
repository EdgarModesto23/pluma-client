import axios from "axios";

const MyButton = () => {
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white 
        font-bold py-2 px-4 rounded-full"
        onClick={() => {
          PostRequest("note/");
        }}
      >
        Create
      </button>
    </div>
  );
};

const PostRequest = async (url: string) => {
  const jwt =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEwOTE4MDIwLCJpYXQiOjE3MDgzMjYwMjAsImp0aSI6ImYzYWEzNjhiMzFhMDRiMmJiNWRmYzc3MGY1NjdmOWM1IiwidXNlcl9pZCI6MX0.tzknLhkgzaQUsLOXnu8Io4y1Y5aFYueIxb5ZDGdCvkU";
  axios.interceptors.request.use((config) => {
    const token = jwt;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  const URL = import.meta.env.VITE_API_URL + url;
  const data = {
    board: "17cd2ab1-12bc-4e0a-8608-d4181da04561",
    title: "nota desde react",
    body: "chavalines",
  };
  await axios
    .post((url = URL), data)
    .then((response) => {
      console.log("todo bn benson" + response);
    })
    .catch((error) => {
      console.log("no paso" + error);
    })
    .finally(() => {
      console.log("");
    });
};

export default MyButton;
