import { FC, useEffect, useMemo } from 'react';
import { Option } from '../types/options';

type Props = {
  options: Option[];
  onSelect: (option: Option) => void;
  searchText: string;
  selected: Option[];
  handleCreate?: () => void;
  handleErorr: (options: boolean) => void;
  handleRemove?: (option: Option) => void;
};

export const CustomDropdown: FC<Props> = ({
  options,
  onSelect,
  searchText,
  selected,
  handleErorr,
  handleRemove,
}) => {
  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.label
          ?.toString()
          .toLowerCase()
          .includes(searchText.toLowerCase())
      ),
    [options, searchText]
  );
  useEffect(() => {
    handleErorr(!!filteredOptions.length);
  }, [filteredOptions]);


  
  if (!filteredOptions.length) {
    return (
      <ul className="default-dropdown">
        <li className="default-dropdown__item" key={searchText}>
          Пользователь не найден
        </li>
      </ul>
    );
  }

  const handleOnChange = (option: Option) => {
    return selected.includes(option) ? handleRemove!(option) : onSelect(option);
  };

  return (
    <ul className="custom-dropdown">
      {filteredOptions.map((option) => (
        <li key={option.value} className="custom-dropdown__item">
          <img className="custom-dpd-img" src={option.img as string} />
          <div className="dropdown__item-container">
            <span className="user-name"> {option.label}</span>
            <span className="email"> {option.email as string}</span>
          </div>

          <label className="custom-checkbox-container">
            <input
              className="custom-checkbox"
              type="checkbox"
              name="radio"
              checked={selected.length ? selected.includes(option) : false}
              onChange={() => handleOnChange(option)}
            />
            <span className="custom-checkbox-label"></span>
          </label>
        </li>
      ))}
    </ul>
  );
};
