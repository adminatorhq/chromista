import {
  faPlus,
  faEdit,
  faChevronLeft,
  faCog,
  faTimes,
  faEye,
  faSave,
} from '@fortawesome/free-solid-svg-icons';

export const ICON_MAP = {
  edit: faEdit,
  add: faPlus,
  save: faSave,
  settings: faCog,
  close: faTimes,
  eye: faEye,
  back: faChevronLeft,
};

export type SoftButtonIconTypes = keyof typeof ICON_MAP;
