import InputErrors from "../input-errors";
import { IconInfo } from "./icons";

const Input = ({
  label,
  value,
  id,
  tooltip,
  input_type,
  radio,
  placeholder,
  disabled,
  type,
  errors,
  onChange,
}: _IInput) => {
  // const LinkIcon = icon ? iconMap[icon] : undefined;
  const err_bool = Boolean(errors);
  return (
    <div>
      <label htmlFor={id}>
        <span className="font-semibold text-base text-gray-700">{label}</span>
        {tooltip && <IconInfo className="text-blue-400" />}
      </label>
      {input_type === "radio" ? (
        <>
          {radio && (
            <div className="mt-3 flex gap-3">
              {radio.map((option) => (
                <label
                  key={option}
                  htmlFor={option}
                  className={`cursor-pointer py-2 px-4 rounded-lg border-2 w-22 text-center ${
                    value === option ? "radio_button" : "border-gray-300"
                  }`}
                >
                  <input
                    id={option}
                    type="radio"
                    name={id}
                    defaultValue={option}
                    defaultChecked={value === option}
                    onChange={onChange}
                    className="hidden"
                  />
                  <span className="font-semibold text-base text-gray-700 capitalize">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          )}
        </>
      ) : input_type === "textarea" ? (
        <>
          <textarea
            id={id}
            name={id}
            className={`form_textarea  ${
              err_bool ? "!outline-2 !outline-red-400" : ""
            }`}
            placeholder={placeholder}
            defaultValue={String(value)}
            aria-describedby={`${id}-error`}
            aria-labelledby={id}
            autoComplete={"on"}
            disabled={disabled}
          />
        </>
      ) : (
        <>
          <input
            id={id}
            name={id}
            className={`form_input  ${
              err_bool ? "!outline-2 !outline-red-400" : ""
            }`}
            placeholder={placeholder}
            type={type}
            defaultValue={String(value)}
            aria-describedby={`${id}-error`}
            aria-labelledby={id}
            autoComplete={"on"}
            disabled={disabled}
          />
        </>
      )}

      {errors && (
        <InputErrors
          id={id}
          errors={errors}
          prependComponent={<IconInfo className="h-5 w-5 text-red-500" />}
        />
      )}
    </div>
  );
};

export default Input;
