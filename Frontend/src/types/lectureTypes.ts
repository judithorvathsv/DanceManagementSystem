import { components } from "../lib/api/v1";

export type YoutubeEmbedProps = {
  url: string;
};

export type LectureProps = components["schemas"]["Lecture"];

export type CreateLectureProp = {
  danceClassId: string;
  handleCreateLecture: () => void;
  onLectureCreated?: (name: string) => void;
};

export type LectureRequestProps = components["schemas"]["LectureRequest"];

export type LectureDetailProps = {
  lecture: LectureProps;
  index: number;
  handleDeleteLecture: (name: string) => void;
};
