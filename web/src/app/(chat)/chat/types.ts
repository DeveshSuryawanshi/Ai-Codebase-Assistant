export type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
};
