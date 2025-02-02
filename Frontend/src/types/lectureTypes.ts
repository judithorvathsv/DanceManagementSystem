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
  handleUpdateLecture: (name: string) => void;
};

export type LectureUpdateProps = {
  id: string;
  lectureUpdateRequest: {
    originalName: string;
    originalDescription: string;
    originalPreparationVideoLink?: string | null;
    originalLectionVideoLink?: string | null;
  };
  handleUpdateLecture: (name: string) => void;
  onLectureUpdated: (name: string) => void;
};
