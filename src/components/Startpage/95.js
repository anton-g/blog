import React from 'react'
import styled from 'styled-components'
import { animated, useTransition, config } from 'react-spring'

const Btn = styled.button`
  background-color: #c3c7cb;
  padding: 7px 20px 5px;
  border: none;
  font-size: 12px;
  box-shadow: inset 1px 1px 0px 1px #ffffff, inset 0 0 0 1px #868a8e,
    1px 1px 0 0px #000;
  &:disabled {
    color: #868a8e;
  }
  &:focus {
    outline: none;
    box-shadow: inset 1px 1px 0px 1px #ffffff,
      inset -0.5px -0.5px 0px 1px #868a8e, 1px 1px 0 1px #000;
    outline: 1px dotted #000;
    outline-offset: -5px;
  }
  &:active {
    padding: 8px 20px 5px;
    outline: 1px dotted #000;
    outline-offset: -5px;
    box-shadow: inset 0 0 0 1px #868a8e, 0 0 0 1px #000;
  }
`

const ModalWrapper = styled(animated.div)`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 50px;
  z-index: 999;

  position: fixed;

  padding: 2px 2px 8px;
  ${({ width, height }) => `max-width: ${width}; height: ${height};`}

  background-color: #c3c7cb;

  box-shadow: inset 1px 1px 0px 1px #ffffff, inset 0 0 0 1px #868a8e,
    1px 1px 0 1px #000;
`

const TitleBar = styled.div`
  height: 18px;
  margin-bottom: 2px;

  background-color: #00007f;
  color: white;
  padding: 2px 2px 0;

  display: flex;
`

const Title = styled.div`
  flex-grow: 1;
`

const OptionsBox = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
`

const Option = styled(Btn)`
  margin-right: 2px;
  padding: 0;

  width: 17px;
  height: 14px;
  min-width: 0;

  font-size: 10px;

  &:last-child {
    margin-right: 0;
  }

  &:active {
    padding: 1px 0 0 1px;

    outline: none;
  }

  &:focus {
    box-shadow: inset 1px 1px 0px 1px #ffffff, inset -1px -1px 0px 1px #868a8e;
  }
`

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  padding: 12px;
`

const Background = styled(animated.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.4);
  z-index: 998;
`

const Modal = ({
  closeModal,
  title,
  children,
  buttons,
  width,
  height,
  open,
  ...rest
}) => {
  const transition = useTransition(open, {
    from: { transform: 'scale(0.95)', opacity: 0 },
    enter: {
      transform: `scale(1)`,
      opacity: 1,
    },
    leave: {
      transform: `scale(0.95)`,
      opacity: 0,
    },
    config: config.stiff,
  })

  if (!open) return null

  return transition((props, show) => {
    if (!show) return null

    return (
      <>
        <Background
          onClick={closeModal}
          style={{ opacity: props.opacity }}
        ></Background>
        <ModalWrapper width={width} height={height} style={props} {...rest}>
          <TitleBar className="draggable">
            <Title>{title}</Title>
            <OptionsBox>
              <Option onClick={closeModal}>x</Option>
            </OptionsBox>
          </TitleBar>

          <Content>{children}</Content>
        </ModalWrapper>
      </>
    )
  })
}

export { Btn, Modal }
