export type rawTodo = {
  _id: string;
  content: string;
  completed: boolean;
  create_time: string;
  update_time: string;
};

export type todo = {
  id: string;
  content: string;
  completed: boolean;
};

export type user = {
  username: string;
  password: string;
};

export type filter = Partial<{
  label: string;
  value: string;
}>;

export type response = {
  data: any;
  errno: number;
  message: string;
};
