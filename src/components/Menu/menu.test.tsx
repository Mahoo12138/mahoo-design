import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from "@testing-library/react";

import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: "test",
};

const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: "vertical",
};

const generateMenu2 = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>active</MenuItem>
      <MenuItem index={1} disabled>
        disabled
      </MenuItem>
      <MenuItem index={2}>Click Item</MenuItem>
    </Menu>
  );
};
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem >active</MenuItem>
      <MenuItem  disabled>
        disabled
      </MenuItem>
      <MenuItem >Click Item</MenuItem>
      <li>ListItem</li>
    </Menu>
  );
};
let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;

const setup = () => {
  render(generateMenu(testProps));
  menuElement = screen.getByTestId("test-menu");
  activeElement = screen.getByText("active");
  disabledElement = screen.getByText("disabled");
};
describe("Test Menu and MenuItem component", () => {
  setup();
  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("mahoo-menu test");
    // eslint-disable-next-line testing-library/no-node-access
    // expect(menuElement.getElementsByTagName("li")).toEqual(3);
    const children = screen.getAllByRole('listitem')
    expect(children.length).toEqual(3);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass('menu-item  is-disabled')
  });
  it("click items should change active and call the right callback", () => {
    setup();
    const thirdItem = screen.getByText(/Click Item/)
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(2)

    fireEvent.click(disabledElement)
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)

  });
  it("should render vertical mode when mode is set to vertical", () => {
    render(generateMenu(testVerProps))
    const menuVertical = screen.getByTestId('test-menu')
    expect(menuVertical).toHaveClass('menu-vertical')
  });
});
