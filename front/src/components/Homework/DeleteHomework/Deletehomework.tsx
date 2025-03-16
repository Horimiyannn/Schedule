import axios from "axios";

type props = {
  fetchHomework: () => void;
  id: string;
};

const DeleteHomework = ({ fetchHomework, id }: props) => {
  const deletel = async () => {
    try {
      console.log(id)
      await axios.post(
        "http://localhost:3000/homework/deletehomework",
        { data: id },
        { withCredentials: true }
      );
      fetchHomework();
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

export default DeleteHomework