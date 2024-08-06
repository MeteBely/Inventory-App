import { useField, ErrorMessage } from "formik";

const CustomSelect = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <label className="block w-full">
      <div className="text-[15px] text-[#4B5563] fontRoboto font-semibold">
        {label}
      </div>
      <select
        {...field}
        {...props}
        className="w-full h-10 rounded border-b outline-none focus:border-black"
      >
        {options.map((option, index) => (
          <option value={option.key} key={index}>
            {option.value}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <small className="text-red-600">{meta.error}</small>
      ) : null}
    </label>
  );
};

export default CustomSelect;
