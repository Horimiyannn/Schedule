import axios from "axios";
import { ChangeEvent, useState } from "react";
import "./createlesson.css";
import "../../../pages/SchedulePage/schedulepage.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import ValidInput from "../../input/validNameInput";

interface CreateLessonProps {
  fetchLessons: () => void;
}

const CreateLesson = ({ fetchLessons }: CreateLessonProps) => {
  const [newLesson, setnewLesson] = useState({ name: "", link: "", time: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [day, setDay] = useState("Понеділок");
  const [ttime, setTtime] = useState("10:00");
  const [errors, setErrors] = useState(false);

  const addNewLesson = async () => {
    if (!errors) {
      try {
        const updatedLesson = { ...newLesson, time: `${day} ${ttime}` };
        await axios.post(
          "http://localhost:3000/lesson/createlesson",
          updatedLesson,
          {
            withCredentials: true,
          }
        );

        fetchLessons();
      } catch (error) {
        console.error(error);
      }
      setnewLesson({ name: "", link: "", time: "" });
      setIsOpen(false);
    }
  };

  return (
    <div className="lsncrt-dd">
      <button className="top-bar-btn" onClick={() => setIsOpen(!isOpen)}>
        Новий урок
      </button>
      {isOpen && (
        <div className="lesson-create-container">
          <label>Назва уроку</label>

          <ValidInput
            value={newLesson.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setnewLesson({ ...newLesson, name: e.target.value });
            }}
            type="text"
            min={5}
            max={20}
            errors={(e: boolean) => setErrors(e)}
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
          <div className="time-container">
            <div>
              <TimePicker
                disableClock
                locale="uk"
                format="HH-mm"
                value={ttime}
                onChange={(t) => t && setTtime(t)}
              />
            </div>

            <select
              className="time-day"
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
          </div>

          <button className="btn-1" onClick={addNewLesson}>
            Створити
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateLesson;
