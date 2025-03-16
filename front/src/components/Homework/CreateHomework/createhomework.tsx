import axios from "axios";
import { useState } from "react";
import DatePicker, { setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LessonName } from "../../../types/HomeworkType";
setDefaultLocale('ua')

interface CreateHomeworkProps {
  fetchHomework: () => void;
  lessonNames: LessonName[];
}

const CreateHomework = ({
  fetchHomework,
  lessonNames,
}: CreateHomeworkProps) => {
  const [newHomework, setnewHomework] = useState({
    task: "",
    lid: "",
    deadline: new Date,
  });

  const addNewLesson = async () => {
    await axios.post(
      "http://localhost:3000/homework/createhomework",
      newHomework,
      {
        withCredentials: true,
      }
    );
    fetchHomework();
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lsncrt-dd">
      <button className="top-bar-btn" onClick={() => setIsOpen(!isOpen)}>
        Додати домашнє завдання
      </button>
      {isOpen && (
        <div className="lesson-create-container">
          <label>Назва уроку</label>
          <select
            className="lesson-name-select"
            value={newHomework.lid}
            onChange={(e) =>
              setnewHomework({ ...newHomework, lid: e.target.value })
            }
          >
            <option disabled value="">
              Вибрати урок
            </option>
            {lessonNames.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.name}
              </option>
            ))}
          </select>
          <label>Завдання</label>
          <input
            className="crtlsn-input"
            value={newHomework.task}
            onChange={(e) =>
              setnewHomework({ ...newHomework, task: e.target.value })
            }
          />
          <label>Час</label>

          <DatePicker
            selected={newHomework.deadline}
            onChange={(date) =>
              setnewHomework({ ...newHomework, deadline: date || new Date() })
            }
            
          />
          <button className="btn-1" onClick={addNewLesson}>
            Додати
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateHomework;
