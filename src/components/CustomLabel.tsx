import { Option } from '../types/options';
import Xmark from '../assets/xMark.svg'
type Props = { option: Option; onRemove: () => void };

export const CustomLabel: React.FC<Props> = ({ option, onRemove }) => (
  <div className="custom-label">
    <span className='custom-label-text'>{option.shortlabel as string}</span>
    <button onClick={onRemove}><img  style={{cursor:'pointer'}} src={Xmark} /></button>
  </div>
);
