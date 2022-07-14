import {
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor
} from "@testing-library/react";

import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};

const testVerProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical",
};

const generateMenu2 = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={"0"}>active</MenuItem>
      <MenuItem index={"1"} disabled>
        disabled
      </MenuItem>
      <MenuItem index={"2"}>Click Item</MenuItem>
    </Menu>
  );
};
const generateMenu3 = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>Click Item</MenuItem>
      <li>ListItem</li>
      <SubMenu title={"子菜单"}>
        <MenuItem>葡萄</MenuItem>
        <MenuItem disabled>草莓</MenuItem>
        <MenuItem>菠萝</MenuItem>
      </SubMenu>
    </Menu>
  );
};
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>Click Item</MenuItem>
      <SubMenu title={"子菜单"}>
        <MenuItem>葡萄</MenuItem>
        <MenuItem disabled>草莓</MenuItem>
        <MenuItem>菠萝</MenuItem>
      </SubMenu>
    </Menu>
  );
};
let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;

const createStyleFile = () => {
  const cssFile: string = `
    .mahoo-submenu{
      display: none;
    }
    .mahoo-submenu.menu-opened{
      display: block;
    }
  `;
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style
};

const setup = () => {
  const view = render(generateMenu(testProps));
  menuElement = screen.getByTestId("test-menu");
  activeElement = screen.getByText("active");
  disabledElement = screen.getByText("disabled");
  // eslint-disable-next-line testing-library/no-container
  view.container.append(createStyleFile())
  // screen.
  
};
describe("Test Menu and MenuItem component", () => {
  setup();
  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("mahoo-menu test");
    // eslint-disable-next-line testing-library/no-node-access
    // expect(menuElement.getElementsByTagName("li")).toEqual(3);
    const children = screen.getAllByRole("listitem");
    expect(children.length).toEqual(4);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item  is-disabled");
  });
  it("click items should change active and call the right callback", () => {
    setup();
    const thirdItem = screen.getByText(/Click Item/);
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith("2");

    fireEvent.click(disabledElement);
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
  });
  it("should render vertical mode when mode is set to vertical", () => {
    render(generateMenu(testVerProps));
    const menuVertical = screen.getByTestId("test-menu");
    expect(menuVertical).toHaveClass("menu-vertical");
  });
  it("should show dropdown items when hover on subMenu", async () => {
    setup();
    expect(screen.queryByText("葡萄")).not.toBeVisible();
    const dropdownElement = screen.getByText('子菜单');
    fireEvent.mouseEnter(dropdownElement)
    // 异步操作
    await waitFor(()=>{
      expect(screen.queryByText('葡萄')).toBeVisible()
    })

    fireEvent.click(screen.getByText('葡萄'))

    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')

    fireEvent.mouseLeave(dropdownElement)

    await waitFor(()=>{
      expect(screen.queryByText('葡萄')).not.toBeVisible()
    })
  });
});