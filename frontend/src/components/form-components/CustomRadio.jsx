import { useField, ErrorMessage } from "formik";
import classNames from "classnames";

const CustomRadio = ({ label, disabled, options, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <div className="space-y-2 border-b pb-[10px]">
      <div className="text-[15px] text-[#4B5563] fontRoboto font-semibold">
        {label}
      </div>
      <div className="flex space-x-4">
        {options.map((option, key) => (
          <label
            key={key}
            className="flex gap-x-2 text-sm cursor-pointer items-center"
            htmlFor=""
          >
            <button
              disabled={disabled}
              type="button"
              onClick={() => helpers.setValue(option.key)}
              className={classNames({
                "w-5 h-5 rounded-full border transition-all flex items-center justify-center": true,
                "border-gray-300": field.value !== option.key,
                "border-[#D1D1D1]": field.value === option.key,
              })}
            >
              <div
                className={classNames({
                  "w-[14px] h-[14px] rounded-full": true,
                  "bg-[#D1D1D1]": field.value === option.key,
                })}
              />
            </button>
            {option.value}
          </label>
        ))}
      </div>
      <ErrorMessage
        name={field.name}
        component={"small"}
        className="text-sm block mt-2 text-red-600 fontRoboto"
      />
    </div>
  );
};

export default CustomRadio;
