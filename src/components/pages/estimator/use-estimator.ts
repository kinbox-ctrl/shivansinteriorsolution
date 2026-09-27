import { useMemo, useReducer } from "react";
import {
  SPACE_BY_ID,
  defaultConfig,
  estimate,
  optionsForGrade,
  spacesForHome,
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
  | { type: "option"; id: SpaceId; group: string; value: string }
  | { type: "resetOptions"; id: SpaceId }
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
      return {
        config: {
          ...state.config,
          homeType: action.id,
          spaces: spacesForHome(action.id, state.config.grade),
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
    case "option": {
      const current = state.config.spaces[action.id];
      if (current.options[action.group] === action.value) return state;
      return {
        config: {
          ...state.config,
          spaces: {
            ...state.config.spaces,
            [action.id]: {
              ...current,
              options: { ...current.options, [action.group]: action.value },
            },
          },
        },
        touched: { ...state.touched, spaces: true, grade: true },
      };
    }
    case "resetOptions": {
      const current = state.config.spaces[action.id];
      return {
        config: {
          ...state.config,
          spaces: {
            ...state.config.spaces,
            [action.id]: { ...current, options: optionsForGrade(action.id, state.config.grade) },
          },
        },
        touched: state.touched,
      };
    }
    case "grade": {
      if (action.id === state.config.grade) return state;
      // A grade sets the board, finish and hardware for every space.
      const spaces = { ...state.config.spaces };
      for (const id of Object.keys(spaces) as SpaceId[]) {
        spaces[id] = { ...spaces[id], options: optionsForGrade(id, action.id) };
      }
      return {
        config: { ...state.config, grade: action.id, spaces },
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

/** Configurator state: home type preset, spaces (on/area/options), grade, and the estimate. */
export function useEstimator(): Estimator {
  const [state, dispatch] = useReducer(estimatorReducer, undefined, init);
  const result = useMemo(() => estimate(state.config), [state.config]);
  const activeStep = state.touched.grade ? 4 : 3;
  return { state, config: state.config, result, activeStep, dispatch };
}
