// import { IconUser } from "@/components/ui/icons";

// const iconMap: Record<string, IconType> = {
//   IconUser: TagIcon,
//   ChatBubbleBottomCenterIcon: ChatBubbleBottomCenterIcon,
//   AtSymbolIcon: AtSymbolIcon,
//   UserIcon: UserIcon,
//   KeyIcon: KeyIcon,
//   PhoneIcon: PhoneIcon,
//   GlobeEuropeAfricaIcon: GlobeEuropeAfricaIcon,
//   MapPinIcon: MapPinIcon,
// };

// export default iconMap;

const createUpdatePromptFields: _IInput[] = [
  {
    id: "private",
    label: (
      <>
        Set Prompt Status <span className="text-red-500">*</span>
      </>
    ),
    type: "radio",
    input_type: "radio",
    radio: ["public", "private"],
    disabled: true
  },
  {
    id: "prompt",
    label: "Your AI Prompt",
    type: "textarea",
    input_type: "textarea",
    placeholder: "Write your prompt here...",
  },
  {
    id: "tag",
    label: (
      <>
        Tag <span className="font-normal">(#idea, #product)</span>
      </>
    ),
    type: "text",
    placeholder: "#tag",
  },
];

export { createUpdatePromptFields };
