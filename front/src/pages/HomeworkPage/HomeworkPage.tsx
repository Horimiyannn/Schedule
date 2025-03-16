import axios from "axios";
import { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar/sidebar";
import CreateHomework from "../../components/Homework/CreateHomework/createhomework";
import "./homeworkpage.css";
import { Homework, LessonName } from "../../types/HomeworkType";
import { CheckStatus } from "../../components/CheckStatus";
import DeleteHomework from "../../components/Homework/DeleteHomework/Deletehomework";
import EditHomework from "../../components/Homework/Edithomework/EditHomework";

const HomeworkPage: React.FC = () => {
  const [homework, setHomework] = useState<Homework[]>([]);
  const [lessonNames, setLessonNames] = useState<LessonName[]>([]);
  const [redIsOpen, setRedIsOpen] = useState(false);

  useEffect(() => {
    CheckStatus();
  }, []);

  const fetchHomework = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/homework/gethomework",
        {
          withCredentials: true,
        }
      );
      setHomework(response.data.homework);
      setLessonNames(response.data.lessonNames);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHomework();
  }, []);
  
  return (
    <div className="mainpage">
      <Sidebar />
      <div className="content">
        <div className="top-bar">
          <h1>Домашнє завдання</h1>
          <div className="top-bar-btns">
            <CreateHomework
              fetchHomework={fetchHomework}
              lessonNames={lessonNames}
            />
            <button
              className="top-bar-btn"
              onClick={() => setRedIsOpen(!redIsOpen)}
            >
              Редагувати
            </button>
          </div>
        </div>
        <div className="homework-container">
          {homework.map((hw) => {
            return (
              <div key={hw.id} className="homework">
                <div className="hw-header">
                  <div className="hw-lesson-name">{hw.lesson.name}</div>
                  <div className="hw-deadline">
                    Потрібно зробити до: {hw.deadline.toString()}
                  </div>
                  {redIsOpen && (
                    <div className="lesson-btns">
                      <DeleteHomework
                        fetchHomework={fetchHomework}
                        id={hw.id}
                      />
                      <EditHomework fetchHomework={fetchHomework} homework={hw} />
                    </div>
                  )}
                </div>
                <div className="hw-task">{hw.task}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeworkPage;
