import axios from "axios";
import { useState } from "react";
import "./createlesson.css";
import "../../../pages/SchedulePage/schedulepage.css";

interface CreateLessonProps {
  fetchLessons: () => void;
}

const CreateLesson = ({ fetchLessons }: CreateLessonProps) => {
  const [newLesson, setnewLesson] = useState({ name: "", link: "", time: "" });
  const [isOpen, setIsOpen] = useState(false);

  const addNewLesson = async () => {
    try {
      console.log(newLesson);
      await axios.post("http://localhost:3000/lesson/createlesson", newLesson, {
        withCredentials: true,
      });
      fetchLessons();
    } catch (error) {
      console.error(error);
    }
    setnewLesson({ name: "", link: "", time: "" });
    setIsOpen(false);
  };
  const [day, setDay] = useState("Понеділок");

  const cancat = (ltime: string) => {
    const ttime = day + " " + ltime;
    setnewLesson({ ...newLesson, time: ttime });
  };

  return (
    <div className="lsncrt-dd">
      <button className="top-bar-btn" onClick={() => setIsOpen(!isOpen)}>
        Новий урок
      </button>
      {isOpen && (
        <div className="lesson-create-container">
          <label>Назва уроку</label>
          <input
            className="crtlsn-input"
            value={newLesson.name}
            onChange={(e) =>
              setnewLesson({ ...newLesson, name: e.target.value })
            }
          />
          <label>Посилання на урок</label>
          <input
            className="crtlsn-input"
            value={newLesson.link}
            onChange={(e) =>
              setnewLesson({ ...newLesson, link: e.target.value })
            }
          />
          <label>Час</label>
          <input
            className="crtlsn-input"
            onChange={(e) => cancat(e.target.value)}
          />

          <select
            className="lesson-name-select"
            value={day}
            onChange={(e) => {
              setDay(e.target.value);
            }}
          >
            <option disabled>День неділі</option>
            <option>Понеділок</option>
            <option>Вівторок</option>
            <option>Середа</option>
            <option>Четвер</option>
            <option>Пятниця</option>
            <option>Субота</option>
          </select>
          <button className="btn-1" onClick={addNewLesson}>
            Створити
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateLesson;
