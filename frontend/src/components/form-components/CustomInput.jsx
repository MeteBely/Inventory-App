import classNames from "classnames";
import { useField, ErrorMessage } from "formik";

const CustomInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <label className="block w-full">
      <div className="text-[15px] text-[#4B5563] fontRoboto font-semibold">
        {label}
      </div>
      <input
        {...props}
        {...field}
        className={classNames({
          "w-full h-10 rounded border-b outline-none px-2 fontRoboto": true,
          "focus:border-black": !meta.error,
          "focus:border-red-600": meta.error,
        })}
      />
      <ErrorMessage
        name={field.name}
        component={"small"}
        className="text-sm block mt-2 text-red-200 fontRoboto"
      />
    </label>
  );
};

export default CustomInput;