import { IconInfo } from "./ui/icons";

interface _InputWithErrors {
  id: string;
  prependComponent?: React.ReactNode;
  errors: string | string[] | undefined;
}

export const InputErrors = ({
  errors,
  id,
  prependComponent = <IconInfo className="h-5 w-5 text-red-500" />,
}: _InputWithErrors) => {
  return (
    <>
      {errors ? (
        <div id={`${id}-error`} className="mt-2 text-sm text-red-500">
          <>
            {typeof errors === "string" ? (
              <div className="flex space-x-2">
                {prependComponent}
                <p className="text-red-500">{errors}</p>
              </div>
            ) : (
              errors?.map((error) => (
                <div className="flex space-x-2" key={error}>
                  {prependComponent}
                  <p className="text-red-500">{error}</p>
                </div>
              ))
            )}
          </>
        </div>
      ) : null}
    </>
  );
};

export default InputErrors;
