import CreateLesson from "../../components/Lesson/CreateLesson/createlesson.tsx";
import { Sidebar } from "../../components/Sidebar/sidebar.tsx";
import "./schedulepage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Day } from "../../types/LessonType.ts";
import EditLesson from "../../components/Lesson/EditLesson/EditLesson.tsx";
import DeleteLesson from "../../components/Lesson/DeleteLesson/DeleteLesson.tsx";
import { CheckStatus } from "../../components/CheckStatus.ts";


const Mainpage: React.FC = () => {
  const [lessons, setLessons] = useState<Day[]>([]);
  const [redIsOpen, setRedIsOpen] = useState(false);
  useEffect(() => { 
    CheckStatus();
  }, []);
 

  const fetchLessons = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/lesson/getlessons",
        {
          withCredentials: true,
        }
      );
      setLessons(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <div className="mainpage">
      <Sidebar />
      <div className="content">
        <div className="top-bar">
          <h1>Головна</h1>
          <div className="top-bar-btns">
            <CreateLesson fetchLessons={fetchLessons} />
            <button
              className="top-bar-btn"
              onClick={() => setRedIsOpen(!redIsOpen)}
            >
              Редагувати
            </button>
          </div>
        </div>
        <div className="schedule">
          {lessons.map((day) => (
            <div key={day.id} className="schedule-day">
              <div className="day-name">{day.name}</div>
              {day.lessons.length !== 0 ? (
                <div className="day-lessons">
                  {day.lessons.map((lesson) => {
                    return (
                      <div key={lesson.id} className="lesson">
                        <div className="lesson-time">{lesson.time}</div>
                        <a
                          href={lesson.link}
                          target="_blank"
                          className="lesson-name"
                        >
                          {lesson.name}
                        </a>
                        {redIsOpen && (
                          <div className="lesson-btns">
                            <DeleteLesson
                              fetchLessons={fetchLessons}
                              id={lesson.id}
                            />
                            <EditLesson
                              fetchLessons={fetchLessons}
                              lesson={lesson}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ color: "#fff" }}>Уроків нема</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mainpage;

