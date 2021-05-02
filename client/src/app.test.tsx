import App from "./app";
import { render } from "@testing-library/react";

describe("#App", () => {
  it("should have proper structure", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
