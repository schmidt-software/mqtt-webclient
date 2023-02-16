import { QoS } from "mqtt";

export const QoSOptions: { [key in QoS]: string } = {
  0: "0 - At most once",
  1: "1 - At least once",
  2: "2 - Exactly once",
} as const;
