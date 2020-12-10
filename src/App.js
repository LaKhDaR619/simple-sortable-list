import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [containers, setContainers] = useState([]);
  const [draggedItem, setDragedItem] = useState(null);

  useEffect(() => {
    const newContainers = [
      {
        id: "1",
        items: [
          { id: "1", value: 1 },
          { id: "2", value: 2 },
        ],
      },
      {
        id: "2",
        items: [
          { id: "3", value: 3 },
          { id: "4", value: 4 },
        ],
      },
    ];
    setContainers(newContainers);
  }, []);

  const handleDragOver = (container, index) => {
    console.log("item drag over");
    let newContainers = [...containers];

    let new_container = { ...container };

    // getting a copy of the dragged item
    let old_container = newContainers.find(
      (container) => container.id === draggedItem.container_id
    );
    const dragging = old_container.items.find(
      (item) => item.id === draggedItem.item_id
    );

    // remove it from the old container
    old_container.items = old_container.items.filter(
      (item) => item.id !== dragging.id
    );

    // add it to the other container
    new_container = newContainers.find(
      (container) => container.id === new_container.id
    );
    new_container.items.splice(index, 0, dragging);

    newContainers = newContainers.map((container) => {
      if (container.id === new_container.id) return new_container;
      else if (container.id === old_container.id) return old_container;
      else return container;
    });

    setDragedItem({ ...draggedItem, container_id: new_container.id });
    setContainers(newContainers);
  };

  const handleDragStart = (container_id, item_id) => {
    setDragedItem({ container_id, item_id });
  };

  const handleDragEnd = () => {
    setDragedItem(null);
  };

  return (
    <div className="App">
      {containers.map((container) => (
        <div key={container.id} className="container">
          {container.items.map((item, index) => (
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
      ))}
    </div>
  );
}

export default App;
