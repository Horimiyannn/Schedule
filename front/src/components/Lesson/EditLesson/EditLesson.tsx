import axios from "axios";
import { useState } from "react";
import { lesson } from "../../../types/LessonType";
import TimePicker from "react-time-picker";

interface props {
  fetchLessons: () => void;
  lesson: lesson;
}

const EditLesson = ({ fetchLessons, lesson }: props) => {
  const [editlesson, setEditLesson] = useState({ ...lesson });
  const [isOpen, setIsOpen] = useState(false);

  const EditLessons = async () => {
    try {
      await axios.patch("http://localhost:3000/lesson/editlesson", editlesson, {
        withCredentials: true,
      });
      fetchLessons();
    } catch (error) {
      console.error(error);
    }
    setIsOpen(false);
  };

  return (
    <div className="lsncrt-dd">
      <button className="deletebutton" onClick={() => setIsOpen(!isOpen)}>
        Редагувати урок
      </button>
      {isOpen && (
        <div className="lesson-create-container">
          <label style={{ height: "20px", marginTop: "10px" }}>
            Назва Уроку
          </label>
          <input
            type="text"
            className="crtlsn-input"
            value={editlesson.name}
            onChange={(e) => {
              setEditLesson({ ...editlesson, name: e.target.value });
            }}
          />
          <label style={{ height: "20px" }}>Посилання</label>
          <input
            type="text"
            className="crtlsn-input"
            value={editlesson.link}
            onChange={(e) => {
              setEditLesson({ ...editlesson, link: e.target.value });
            }}
          />
          {editlesson.times.map((t, index) => {
            const newTimes = [...editlesson.times];
            let ltime = newTimes[index].time.split(" ")[1];
            let day = newTimes[index].time.split(" ")[0];
            return (
              <div>
                <TimePicker
                  disableClock
                  locale="uk"
                  format="HH-mm"
                  value={ltime}
                  onChange={(e) => {
                    if (!e) return;
                    ltime = String(e);        
                    newTimes[index] = { ...t, time: `${day} ${ltime}` };
                    setEditLesson({ ...editlesson, times: newTimes });     
                  }}
                />
                <select
                  className="time-day"
                  value={day}
                  onChange={(e) => {
                    day = e.target.value;
                    newTimes[index] = { ...t, time: `${day} ${ltime}` };
                    setEditLesson({ ...editlesson, times: newTimes });
                  }}
                >
                  <option disabled>День Неділі</option>
                  <option
                    style={{ backgroundColor: "red" }}
                    value={t.time.split(" ")[0]}
                  >
                    {t.time.split(" ")[0]}
                  </option>
                  <option>Понеділок</option>
                  <option>Вівторок</option>
                  <option>Середа</option>
                  <option>Четвер</option>
                  <option>Пятниця</option>
                  <option>Субота</option>
                </select>
              </div>
            );
          })}

          <button className="btn-1" onClick={EditLessons}>
            Змінити
          </button>
        </div>
      )}
    </div>
  );
};

export default EditLesson;
