import { ChangeEvent } from "react";

interface LabeledInput {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputType?: string;
}
export const LabeledInput = ({
  label,
  placeholder,
  onChange,
  inputType,
}: LabeledInput) => {
  return (
    <div className="flex flex-col gap-[0.5rem]">
      <div className="text-[17px] text-[#331922] font-bold">{label}</div>
      <input
        className="rounded-md border-[2px] border-[#331922] p-[0.5rem] placeholder:text-[#331922]"
        type={inputType || "text"}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
