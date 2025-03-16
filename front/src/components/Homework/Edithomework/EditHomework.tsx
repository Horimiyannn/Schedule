import axios from "axios";
import { useState } from "react";
import { Homework } from "../../../types/HomeworkType";
import DatePicker from "react-datepicker";

interface props {
  fetchHomework: () => void;
  homework: Homework;
}

const EditHomework = ({ fetchHomework, homework }: props) => {
  const [editHomework, setEditHomework] = useState(homework);
  const [isOpen, setIsOpen] = useState(false);

  const EditHomeworks = async () => {
    try {
      await axios.patch(
        "http://localhost:3000/homework/redactHomework",
        editHomework,
        {
          withCredentials: true,
        }
      );
      fetchHomework();
    } catch (error) {
      console.error(error);
    }
    setIsOpen(false);
  };

  return (
    <div className="lsncrt-dd">
      <button className="deletebutton" onClick={() => setIsOpen(!isOpen)}>
        Редагувати ДЗ
      </button>
      {isOpen && (
        <div className="lesson-create-container">
          <input
            type="text"
            className="crtlsn-input"
            value={editHomework.task}
            onChange={(e) => {
              setEditHomework({ ...editHomework, task: e.target.value });
            }}
          />
          <DatePicker
            selected={editHomework.deadline}
            onChange={(date) =>
              setEditHomework({ ...editHomework, deadline: date || new Date })
            }
          />

          <button className="btn-1" onClick={EditHomeworks}>
            Змінити
          </button>
        </div>
      )}
    </div>
  );
};

export default EditHomework;
