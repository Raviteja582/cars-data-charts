import { ActionMeta, MultiValue, PropsValue } from "react-select";
import AsyncSelect from "react-select/async";
import { UserSelectionOptions } from "store/models/modelsStore";

interface Props<T> {
  name: string;
  options?: T[],
  loadOptions?: (inputString: string) => Promise<T[]>;
  onChange: (selection: MultiValue<T>, actionMeta: ActionMeta<any>) => void;
  value?: PropsValue<T>;
  styles?: any;
}

export const Select: React.FC<Props<UserSelectionOptions>> = ({
  name,
  loadOptions,
  onChange,
  value,
  styles,
  options
}) => {
  return (
      <AsyncSelect
        name={name}
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        options={options}
        onChange={onChange}
        isClearable={true}
        value={value}
        isMulti
        placeholder="ALL"
        styles={styles}
      />
  );
};
