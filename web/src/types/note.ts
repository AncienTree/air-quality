export type Note = {
  id: number;
  cityId: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
};

export type NoteUpdate = {
  title: string;
  content: string;
};
