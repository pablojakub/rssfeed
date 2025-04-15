import styled, { css } from "styled-components";

export const Container = styled.div`
  position: relative;
  font-family: sans-serif;
`;

export const Input = styled.input<{ error?: string | null }>`
  width: 100%;
  padding: ${({ theme }) => theme.layout.paddingInline};
  background: white;
  font-size: 1rem;
  color: black;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  outline: 1px solid ${({ error }) => error && 'red'};

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
    font-size: clamp(0.7rem, 0.5rem + 0.4vw, 1rem);
  }

  &:focus-visible {
    outline: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Chip = styled.div<{ backgroundcolor: string }>`
  background: ${({ backgroundcolor }) => backgroundcolor};
  color: black;
  padding: 8px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
`;

export const RemoveButton = styled.span`
  margin-left: 8px;
  cursor: pointer;
  font-weight: bold;
`;

export const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 150px;
  background: white;
  border: 1px solid #ccc;
  border-top: none;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 2px 0 0;
  z-index: 4;
  border-radius: 0 0 8px 8px;
  box-shadow: ${({ theme }) => theme.layout.shadow};
`;

export const DropdownItem = styled.li<{ isdisabled: string }>`
  padding: ${({ theme }) => theme.layout.paddingInline};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }

  ${({ isdisabled, theme }) => isdisabled === 'true' && css`
    cursor: not-allowed;

    & > span {
      color: ${theme.colors.secondary};
    }
  `}
`;

export const DropdownText = styled.span`
    flex: 1;
    color: black;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const DropdownRemove = styled.span`
  margin-left: 10px;
  color: black;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    color: red;
  }
`;

export const DropdownLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 500;
  padding: 10px;
  color: ${({ theme }) => theme.colors.labelColor};
`;

export const Label = styled.label`
  font-size: clamp(0.8rem, 0.7rem + 0.3vw, 1rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.labelColor};
`;

export const ErrorLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 6px;
  margin-inline: auto;
  display: block;
  width: 100%;
  color: ${({ theme }) => theme.colors.errorLabelColor};
`;

export const StyledFeedChoserWrapper = styled.div`
    display: flex;
    gap: 8px;
    flex-direction: column;
    grid-column: content;
`;