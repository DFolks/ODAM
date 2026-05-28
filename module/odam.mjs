import { ODAMActor } from "./documents/actor.mjs";
import { ODAMItem } from "./documents/item.mjs";
import { ODAMAnimaData } from "./data/actor-data.mjs";

import { ODAMAnimaSheet } from "./applications/sheets/actor/anima-sheet.mjs";
import { ODAMItemSheet } from "./applications/sheets/item/odam-item-sheet.mjs";

Hooks.once("init", async function () {
  console.log("ODAM | Initializing Of Dreams and Magic System");

  CONFIG.Actor.documentClass = ODAMActor;
  CONFIG.Item.documentClass = ODAMItem;

  CONFIG.Actor.dataModels = {
    anima: ODAMAnimaData,
  };

  DocumentSheetConfig.unregisterSheet(Actor, "core", ActorSheet);
  DocumentSheetConfig.unregisterSheet(Item, "core", ItemSheet);

  DocumentSheetConfig.registerSheet(Actor, "odam", ODAMAnimaSheet, {
    types: ["anima"],
    makeDefault: true,
    label: "ODAM Sheet",
  });

  DocumentSheetConfig.registerSheet(Item, "odam", ODAMItemSheet, {
    makeDefault: true,
    label: "ODAM Item Sheet",
  });
});
