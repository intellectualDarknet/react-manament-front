declare interface IUpdateTaskRequest {
  title: string;
  order: number;
  description: string;
  columnId: string;
  boardId: string;
  userId: number;
  users: string[];
}
