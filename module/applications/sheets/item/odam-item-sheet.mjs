export class ODAMItemSheet extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.sheets.ItemSheetV2
) {
  static DEFAULT_OPTIONS = {
    classes: ["odam", "sheet", "item"],
    position: {
      width: 520,
      height: 480
    },
    window: {
      title: "ODAM.ItemSheet.Title",
      resizable: true
    }
  };

  static PARTS = {
    form: {
      template: "systems/odam/templates/item/odam-item-sheet.hbs"
    }
  };
}