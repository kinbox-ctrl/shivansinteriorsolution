import {
  Building2,
  CookingPot,
  DoorClosed,
  Home,
  Lightbulb,
  Mail,
  MapPin,
  PanelsTopLeft,
  Receipt,
  Square,
  Store,
  Tv,
  Wallet,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

/** The lucide export names used by the estimator content, resolved to components. */
const ICONS: Record<string, LucideIcon> = {
  Building2,
  CookingPot,
  DoorClosed,
  Home,
  Lightbulb,
  Mail,
  MapPin,
  PanelsTopLeft,
  Receipt,
  Store,
  Tv,
  Wallet,
  Warehouse,
};

export function contentIcon(name: string): LucideIcon {
  return ICONS[name] ?? Square;
}
