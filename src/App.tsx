import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Mahoo Design
      </header>
      <main> 
<div>
<Button autoFocus onClick={(e)=>{console.log(e)}}>Hello</Button>
        <Button size={ButtonSize.Large} btnType={ButtonType.Danger}>Large Danger</Button>
        <Button size={ButtonSize.Small}>Small</Button>
        <Button btnType={ButtonType.Primary}>Primary</Button>
        <Button btnType={ButtonType.Danger}>Danger</Button>
        <Button disabled>Disabled</Button>
        <Button btnType={ButtonType.Link} disabled>Disabled Link</Button>
        <Button btnType={ButtonType.Link} href="https://www.google.com">Link</Button>
        <Button btnType={ButtonType.Link} href="https://www.google.com" target={"_blank"}>New Window Link</Button>
        <Button size={ButtonSize.Large}>Large</Button>
        <Button size={ButtonSize.Small} className="customClassName">Small</Button>
</div>
<div>
  <Menu onSelect={(index)=>console.log("index",index)}>
    <MenuItem index={0}>
      西瓜🍉
    </MenuItem>
    <MenuItem index={1} disabled>
      苹果🍎
    </MenuItem>
    <MenuItem index={2}>
      香蕉🍌
    </MenuItem>
  </Menu>
</div>

      </main>
    </div>
  );
}

export default App;
