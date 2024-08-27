import { FC, useEffect, useMemo} from 'react';
import { Option } from '../types/options';

type Props = {
  options: Option[];
  onSelect: (option: Option) => void;
  searchText: string;
  handleErorr: (options: boolean) => void;
  handleCreate?: () => void;
};

export const DefaultDropdown: FC<Props> = ({
  options,
  onSelect,
  searchText,
  handleErorr,
  handleCreate,
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
        <li
          className="default-dropdown__item"
          key={searchText}
          onClick={handleCreate}>
          Добавить {searchText}
        </li>
      </ul>
    );
  }

  return (
    <ul className="default-dropdown">
      {filteredOptions.map((option) => (
        <li
          className="default-dropdown__item"
          key={option.value}
          onClick={() => onSelect(option)}>
          {option.label}
        </li>
      ))}
    </ul>
  );
};
