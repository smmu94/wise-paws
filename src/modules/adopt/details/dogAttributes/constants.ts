import { HeartPulse, ShieldCheck, Zap, Smile, LucideIcon } from "lucide-react";

export interface DogAttributeItem {
  key: string;
  icon: LucideIcon;
  labelKey: string;
  enumSection: string;
}

export const DOG_ATTRIBUTES_MAP: DogAttributeItem[] = [
  {
    key: "energy",
    icon: Zap,
    labelKey: "energy",
    enumSection: "energyLevel",
  },
  {
    key: "health",
    icon: HeartPulse,
    labelKey: "health",
    enumSection: "healthStatus",
  },
  {
    key: "vaccination",
    icon: ShieldCheck,
    labelKey: "vaccinations",
    enumSection: "vaccinationStatus",
  },
  {
    key: "temperament",
    icon: Smile,
    labelKey: "temperament",
    enumSection: "temperament",
  },
];