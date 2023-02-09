import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";

import Messages from "./Messages";

const message1 = {
  id: 1,
  topic: "topic_1",
  message: "message_1",
  qos: 0
} as const;
const message2 = {
  id: 2,
  topic: "topic_2",
  message: "message_2",
  qos: 1
} as const;

describe("Messages", () => {
  it("shows empy list message if there are no messages", () => {
    render(<Messages messages={[]} />);

    expect(screen.getByText("No messages")).toBeInTheDocument();
  });

  it("shows table header", () => {
    render(<Messages messages={[message1, message2]} />);

    const headerCells = screen.getAllByRole("columnheader");

    ["Message", "Topic", "QoS"].forEach((headerText, index) => {
      expect(headerCells[index]).toHaveTextContent(headerText);
    });
  });

  it("lists one message", () => {
    render(<Messages messages={[message1]} />);

    const dataRows = screen.getAllByRole("row").slice(1);

    expect(dataRows.length).toBe(1);

    const dataCells = within(dataRows[0]).getAllByRole("cell");

    expect(dataCells[0]).toHaveTextContent(message1.message);
    expect(dataCells[1]).toHaveTextContent(message1.topic);
    expect(dataCells[2]).toHaveTextContent(message1.qos.toString());
  });

  it("lists two messages", () => {
    const messages = [message1, message2];
    render(<Messages messages={messages} />);

    const dataRows = screen.getAllByRole("row").slice(1);

    expect(dataRows.length).toBe(2);

    messages.forEach(({ message, topic, qos }, index) => {
      const dataCells = within(dataRows[index]).getAllByRole("cell");

      expect(dataCells[0]).toHaveTextContent(message);
      expect(dataCells[1]).toHaveTextContent(topic);
      expect(dataCells[2]).toHaveTextContent(qos.toString());
    });
  });
});
