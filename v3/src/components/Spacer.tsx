import styled from 'styled-components'

type Axis = 'horizontal' | 'vertical'
type HelperInput = { axis?: Axis; size: number; inline?: true }

function getHeight({ axis, size }: HelperInput) {
  return axis === 'horizontal' ? 1 : size
}

function getWidth({ axis, size }: HelperInput) {
  return axis === 'vertical' ? 1 : size
}

export const Spacer = styled.span<HelperInput>`
  display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
  width: ${getWidth}px;
  min-width: ${getWidth}px;
  height: ${getHeight}px;
  min-height: ${getHeight}px;
`
