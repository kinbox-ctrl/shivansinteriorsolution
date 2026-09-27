import { useMemo, useReducer } from "react";
import {
  SPACE_BY_ID,
  defaultConfig,
  estimate,
  getHomeType,
  type EstimateConfig,
  type EstimateResult,
  type GradeId,
  type HomeTypeId,
  type SpaceId,
} from "@/content/pricing";

export type Touched = { home: boolean; spaces: boolean; grade: boolean };

export type EstimatorState = { config: EstimateConfig; touched: Touched };

export type EstimatorAction =
  | { type: "home"; id: HomeTypeId }
  | { type: "toggle"; id: SpaceId; on: boolean }
  | { type: "area"; id: SpaceId; area: number }
  | { type: "grade"; id: GradeId };

export function clampArea(id: SpaceId, area: number): number {
  const space = SPACE_BY_ID[id];
  if (!Number.isFinite(area)) return space.min;
  return Math.min(space.max, Math.max(space.min, Math.round(area)));
}

export function estimatorReducer(state: EstimatorState, action: EstimatorAction): EstimatorState {
  switch (action.type) {
    case "home": {
      if (action.id === state.config.homeType) return state;
      const preset = getHomeType(action.id).spaces;
      return {
        config: {
          ...state.config,
          homeType: action.id,
          spaces: {
            kitchen: { ...preset.kitchen },
            wardrobe: { ...preset.wardrobe },
            ceiling: { ...preset.ceiling },
            tvUnit: { ...preset.tvUnit },
            panelling: { ...preset.panelling },
          },
        },
        touched: { ...state.touched, home: true },
      };
    }
    case "toggle": {
      const current = state.config.spaces[action.id];
      if (current.on === action.on) return state;
      return {
        config: {
          ...state.config,
          spaces: { ...state.config.spaces, [action.id]: { ...current, on: action.on } },
        },
        touched: { ...state.touched, spaces: true },
      };
    }
    case "area": {
      const current = state.config.spaces[action.id];
      const area = clampArea(action.id, action.area);
      if (current.area === area) return state;
      return {
        config: {
          ...state.config,
          spaces: { ...state.config.spaces, [action.id]: { ...current, area } },
        },
        touched: { ...state.touched, spaces: true },
      };
    }
    case "grade": {
      if (action.id === state.config.grade) return state;
      return {
        config: { ...state.config, grade: action.id },
        touched: { ...state.touched, grade: true },
      };
    }
    default:
      return state;
  }
}

function init(): EstimatorState {
  return { config: defaultConfig(), touched: { home: false, spaces: false, grade: false } };
}

export type Estimator = {
  state: EstimatorState;
  config: EstimateConfig;
  result: EstimateResult;
  /** 1-based active stepper step. Materials (3) until a grade is chosen, then Estimate (4). */
  activeStep: number;
  dispatch: (action: EstimatorAction) => void;
};

/** Configurator state: home type preset, spaces (on/area), grade, and the derived estimate. */
export function useEstimator(): Estimator {
  const [state, dispatch] = useReducer(estimatorReducer, undefined, init);
  const result = useMemo(() => estimate(state.config), [state.config]);
  const activeStep = state.touched.grade ? 4 : 3;
  return { state, config: state.config, result, activeStep, dispatch };
}
