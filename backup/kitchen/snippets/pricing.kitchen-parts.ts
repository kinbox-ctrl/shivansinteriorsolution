// Removed from the site on 9 Oct 2026. Original source: see backup/kitchen/README.md

function kitchenParts(area: number, o: SpaceOptions): EstimatePart[] {
  const R = RATE_CARD;
  const layout = pick(R.layout, o["layout"] ?? "l", "l");
  const cabinetRate = Math.round(
    (pick(R.carcass, o["carcass"] ?? "mr", "mr") +
      pick(R.finish, o["finish"] ?? "laminate", "laminate")) *
      layout,
  );
  const parts = [
    part("cabinets", "Base, wall & tall units (carcass + shutters)", area, "sq.ft", cabinetRate),
    part(
      "hardware",
      "Hinges, channels & fittings",
      area,
      "sq.ft",
      pick(R.hardware, o["hardware"] ?? "standard", "standard"),
    ),
  ];
  if (o["layout"] === "island")
    parts.push(part("island", "Island unit with counter", 1, "set", R.islandFlat));
  const counterRate = pick(R.counter, o["counter"] ?? "none", "none");
  if (counterRate > 0) {
    const rft = Math.max(6, Math.round(area / 6.5));
    parts.push(part("counter", `Countertop, ${rft} rft × 2 ft`, rft * 2, "sq.ft", counterRate));
  }
  const acc = pick(R.accessories, o["accessories"] ?? "none", "none");
  if (acc > 0) parts.push(part("accessories", "Accessory set", 1, "set", acc));
  parts.push(
    part("labour", "Manufacturing, transport & installation", area, "sq.ft", R.labour.kitchen),
  );
  return parts;
}

