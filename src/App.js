import { useState } from "react";
import Container from "./hocs/dnd";
import "./App.css";

function App() {
  const [items, setItems] = useState([
    { id: "1", value: 1 },
    { id: "2", value: 2 },
    { id: "3", value: 3 },
    { id: "4", value: 4 },
  ]);

  return (
    <Container items={items} setItems={setItems}>
      {items.map((item, index) => (
        <div key={item.id} className="draggable">
          {item.value}
        </div>
      ))}
    </Container>
  );
}

/*
<div className="container">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="draggable"
          draggable="true"
          onDragStart={() => handleDragStart(container.id, item.id)}
          onDragEnd={() => handleDragEnd()}
          onDragOver={() => handleDragOver(container, index)}
        >
          {item.value}
        </div>
      ))}
    </div>
*/

export default App;
