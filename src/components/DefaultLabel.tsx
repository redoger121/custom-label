import { FC } from 'react';
import { Option } from '../types/options';

type Props = { option: Option; onRemove: () => void };

export const DefaultLabel: FC<Props> = ({ option, onRemove }) => (
  <div className="default-label">
    {option.label}
    <button onClick={onRemove}>×</button>
  </div>
);
