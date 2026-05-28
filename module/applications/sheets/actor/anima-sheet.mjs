export class ODAMAnimaSheet extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.sheets.ActorSheetV2,
) {
  static DEFAULT_OPTIONS = {
    classes: ["odam", "sheet", "actor", "anima"],
    position: {
      width: 720,
      height: 800,
    },
    window: {
      title: "ODAM.AnimaSheet.Title",
      resizable: true,
    },
    form: {
      handler: ODAMAnimaSheet.#onSubmitForm,
      submitOnChange: true,
      closeOnSubmit: false,
    },
  };

  static PARTS = {
    form: {
      template: "systems/odam/templates/actor/anima-sheet.hbs",
    },
  };

  static async #onSubmitForm(event, form, formData) {
    await this.document.update(formData.object);
  }
}
