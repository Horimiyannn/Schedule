import axios from "axios";

type props = {
  fetchLessons: () => void;
  id: string;
};

const DeleteLesson = ({ fetchLessons, id }: props) => {
  const deletel = async () => {
    try {
      await axios.post(
        "http://localhost:3000/lesson/deletelesson",
        { data: id },
        { withCredentials: true }
      );
      fetchLessons();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className="deletebutton" onClick={deletel}>
      x
    </button>
  );
};

export default DeleteLesson