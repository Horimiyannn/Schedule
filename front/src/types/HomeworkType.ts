export type LessonName = {
  name: string;
  id: string;
};

export type Homework = {
  id: string;
  task: string;
  lessonId: string;
  deadline: Date;
  lesson: LessonName;
};
