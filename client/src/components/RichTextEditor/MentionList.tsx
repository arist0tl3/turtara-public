import styled from 'styled-components';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { background, onSurface, surface } from '../../theme/colors';

const Container = styled.div`
  /* Dropdown menu */
  .dropdown-menu {
    background: ${surface};
    border: 1px solid ${background}
    border-radius: 0.7rem;
    box-shadow: ${background} 0 0 0 1px;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    overflow: auto;
    padding: 0.4rem;
    position: relative;

    button {
      align-items: center;
      background-color: transparent;
      display: flex;
      gap: 0.25rem;
      text-align: left;
      width: 100%;

      &:hover,
      &:hover.is-selected {
        background-color: ${background};
      }

      &.is-selected {
        background-color: ${onSurface};
      }
    }
  }
`;

const MentionList = forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];

    if (item) {
      props.command({ id: item });
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Tab') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  console.log('PROPS', props);

  return (
    <Container>
      <div className="dropdown-menu">
        {props.items.length ? (
          props.items.map((item, index) => (
            <button className={index === selectedIndex ? 'is-selected' : ''} key={index} onClick={() => selectItem(index)}>
              {item}
            </button>
          ))
        ) : (
          <div className="item">No result</div>
        )}
      </div>
    </Container>
  );
});

export default MentionList;
