import { FC, useEffect, useRef, useState } from 'react';
import { DefaultLabel } from './DefaultLabel';
import { DefaultDropdown } from './DefaultDropdown';
import { Option } from '../types/options';
import dropDown from '../assets/dropDowm.svg';

type SelectProps = {
  options: Option[];
  multiple?: boolean;
  dropdownRender?: (
    options: Option[],
    onSelect: (value: Option) => void,
    searchText: string,
    selected: Option[],
    handleCreate: (() => void) | undefined,
    handleErorr: (options: boolean) => void,
    handleRemove?: (option: Option) => void
  ) => React.ReactNode;
  labelRender?: (option: Option, onRemove: () => void) => React.ReactNode;
  onCreateOption?: (value: string) => Promise<Option>;
  onChange?: (selected: Option | Option[]) => void;
};

export const Select: FC<SelectProps> = ({
  options,
  multiple = false,
  dropdownRender,
  labelRender,
  onCreateOption,
  onChange,
}) => {
  const [selected, setSelected] = useState<Option[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchText, setSearchText] = useState('');

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, dropdownOpen]);

  const handleSelect = (option: Option) => {
    let updatedSelected: Option[];

    if (multiple) {
      if (selected.find((item) => item.value === option.value)) {
        return;
      }
      updatedSelected = [...selected, option];
      setSelected(updatedSelected);
    } else {
      updatedSelected = [option];
      setSelected(updatedSelected);
      setSearchText(updatedSelected[0].label!.toString());
      setDropdownOpen(false);
    }

    if (onChange) {
      onChange(multiple ? updatedSelected : option);
    }
  };

  const handleErorr = (options: boolean) => {
    if (!options) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  const handleRemove = (option: Option) => {
    const updatedSelected = selected.filter(
      (item) => item.value !== option.value
    );
    setSelected(updatedSelected);
    if (onChange) {
      onChange(multiple ? updatedSelected : updatedSelected[0]);
    }
  };

  const handleCreate = async () => {
    if (onCreateOption && searchText) {
      const newOption = await onCreateOption(searchText);
      const updatedSelected = [...selected, newOption];
      if (multiple) {
        setSelected(updatedSelected);
      } else {
        setSelected([newOption]);
      }

      if (onChange) {
        onChange(multiple ? updatedSelected : newOption);
      }
    }
  };

  return (
    <div className="select" ref={ref}>
      <div
        className={` select-input-container ${
          multiple && selected.length ? 'select-multiply' : ''
        }  ${isError ? 'error' : ''} `}
        onClick={() => setDropdownOpen(true)}>
        {multiple &&
          selected.length > 0 &&
          selected.map((option) =>
            labelRender ? (
              labelRender(option, () => handleRemove(option))
            ) : (
              <DefaultLabel
                key={option.value}
                option={option}
                onRemove={() => handleRemove(option)}
              />
            )
          )}

        <input
          className={`select-input ${multiple && 'multiply-input'}`}
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={multiple && selected.length > 0 ? `` : 'Search'}
        />

        {!multiple && (
          <img
            className={`chek-icon ${!dropdownOpen && 'icon-rotate'} `}
            src={dropDown}
          />
        )}
      </div>
      {dropdownOpen && (
        <div className="select-dropdown">
          {dropdownRender ? (
            dropdownRender(
              options,
              handleSelect,
              searchText,
              selected,
              handleCreate,
              handleErorr,
              handleRemove
            )
          ) : (
            <DefaultDropdown
              options={options}
              onSelect={handleSelect}
              searchText={searchText}
              handleErorr={handleErorr}
              handleCreate={handleCreate}
            />
          )}
        </div>
      )}
    </div>
  );
};
