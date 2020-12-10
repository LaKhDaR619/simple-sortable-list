import React, { useState } from "react";

function dnd(Container) {
  return (props) => {
    const [draggedItem, setDragedItem] = useState(null);

    const { items, setItems } = props;

    const handleDragOver = (index) => {
      let newItems = [...items];

      // getting a copy of the dragged item
      const dragging = newItems.find((item) => item.id === draggedItem.item_id);

      newItems = newItems.filter((item) => item.id !== dragging.id);

      // add it to the other container
      newItems.splice(index, 0, dragging);

      setItems(newItems);
    };

    const handleDragStart = (item_id) => {
      setDragedItem({ item_id });
    };

    const handleDragEnd = () => {
      setDragedItem(null);
    };

    const transformChildren = (children, items) => {
      return children.map((child, index) => {
        const clone = React.cloneElement(child, {
          draggable: true,
          onDragStart: () => handleDragStart(items[index].id),
          onDragEnd: handleDragEnd,
          onDragOver: () => handleDragOver(index),
        });

        return clone;
      });
    };

    return (
      <Container
        {...props}
        children={transformChildren(props.children, items)}
      ></Container>
    );
  };
}

let Container = ({ children }) => {
  return <div className="container">{children}</div>;
};

Container = dnd(Container);

export default Container;
