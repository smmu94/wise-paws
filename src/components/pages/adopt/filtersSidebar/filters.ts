import { energyLevelEnum, healthStatusEnum } from "@/db/schema";

export const ENERGY_LEVEL_OPTIONS = energyLevelEnum.enumValues.map((value) => ({
  value,
  label: `energyLevel.options.${value}`,
}));

export const HEALTH_STATUS_OPTIONS = healthStatusEnum.enumValues.map((value) => ({
  value,
  label: `healthStatus.options.${value}`
}));

export const AGE_RANGES = [
  { id: "senior", label: "Senior", description: "7-10", min: 7, max: 10 },
  { id: "super-senior", label: "Super Senior", description: "11+", min: 11, max: 30 },
];