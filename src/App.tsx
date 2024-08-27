import './App.css';
import { CustomDropdown } from './components/CustomDropDown';
import { CustomLabel } from './components/CustomLabel';
import { Select } from './components/Select';
import { Option } from './types/options';
import Avatar from './assets/Avatars.png'
import './fonts/Inter-VariableFont_opsz,wght.ttf'

const options: Option[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 1' },
  { value: '5', label: 'Option 2' },
  { value: '6', label: 'Option 3' },
  { value: '7', label: 'Option 1' },
  { value: '8', label: 'Option 2' },
  { value: '9', label: 'Option 3' },
  { value: '10', label: 'Option 1' },
  { value: '11', label: 'Option 2' },
  { value: '12', label: 'Option 3' },
];


const customOptions: Option[] = [
  { value: '1', label: 'Соловьев Александр', img:`${Avatar}`, email:'example1mail.com', shortlabel:'Соловьев А.' },
  { value: '2', label: 'Соловьев Александр', img:`${Avatar}`, email:'example1mail.com', shortlabel:'Соловьев А.' },
  { value: '3', label: 'Соловьев Александр', img:`${Avatar}`, email:'example1mail.com', shortlabel:'Соловьев А.' },
  { value: '4', label: 'Соловьев Александр', img:`${Avatar}`, email:'example1mail.com' ,shortlabel:'Соловьев А.'},
  { value: '5', label: 'Соловьев Александр', img:`${Avatar}`, email:'example1mail.com', shortlabel:'Соловьев А.' },
  { value: '6', label: 'Соловьев Александр', img:`${Avatar}`, email:'example1mail.com', shortlabel:'Соловьев А.' },
  { value: '7', label: 'Соловьев Александр', img:`${Avatar}`, email:'example1mail.com', shortlabel:'Соловьев А.' },

];
function App() {
  const handleCreateOption = async (value: string) => {
    // Пример асинхронного создания опции (например, вызов API)
    options.push({ value, label: `New Option: ${value}` });
    return new Promise<Option>((resolve) =>
      setTimeout(() => resolve({ value, label: `Option: ${value}` }), 1000)
    );
  };

  const handleChange = (selected: Option|Option[]) => {
    console.log('Selected:', selected);
  };

  return (
    <div className="container">
      <Select
        options={options}
        onChange={handleChange}
        onCreateOption={handleCreateOption}
      />

      <Select
        options={options}
        multiple
        onChange={handleChange}
        onCreateOption={handleCreateOption}
      />

      
      <Select
        options={customOptions}
        multiple
        labelRender={(option, onRemove) => (
          <CustomLabel key={option.value} option={option} onRemove={onRemove} />
        )}
        dropdownRender={(options, onSelect, searchText, selected, handleCreate, handleErorr,handleRemove  ) => (
          <CustomDropdown
            options={options}
            onSelect={onSelect}
            searchText={searchText}
            selected={selected}
            handleCreate={handleCreate}
            handleErorr={handleErorr}
          handleRemove={handleRemove}
          />
        )}
        onChange={handleChange}
        onCreateOption={handleCreateOption}
      />
    </div>
  );
}

export default App;
