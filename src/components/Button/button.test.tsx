import { fireEvent, render, screen } from "@testing-library/react";

import Button, { ButtonProps, ButtonSize, ButtonType} from "./button";

// test("our react component button test", () => {
//   render(<Button>Nice</Button>);
//   const element = screen.getByText("Nice");
//   expect(element).toBeTruthy();
//   expect(element).toBeInTheDocument();
// });

const defaultProps = {
  onClick: jest.fn(),
};

const testProps :ButtonProps = {
  onClick: jest.fn(),
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: "customClass"

};
const disableProps :ButtonProps = {
  onClick: jest.fn(),
  disabled: true
};


describe("test Button component", () => {
  it("should render the correct default button", () => {
    render(<Button {...defaultProps}>Default</Button>);
    const element = screen.getByText("Default");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-default");
    // 模拟按钮点击
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled()
  });
  it("should render a primary button with testProps",()=>{
    render(<Button {...testProps}>Primary</Button>);
    const element = screen.getByText(/Primary/);
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn-primary btn-lg customClass")
  })
  it("should render a link button when btnType equals link and href is provided",()=>{
    render(<Button btnType={ButtonType.Link} href={"https://dummyurl.com"}>LINK</Button>);
    const element = screen.getByText(/LINK/);
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn btn-link")
    expect(element).toHaveAttribute('href',"https://dummyurl.com")
  })
  it("should render a disable button with the disableProps",()=>{
    render(<Button {...disableProps}>DISABLE</Button>);
    const element = screen.getByText(/DISABLE/) as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disableProps.onClick).not.toHaveBeenCalled()
  })
});
