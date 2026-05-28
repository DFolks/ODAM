export class ODAMAnimaSheet extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.sheets.ActorSheetV2,
) {
  static DEFAULT_OPTIONS = {
    classes: ["odam", "sheet", "actor", "anima"],
    position: {
      width: 720,
      height: 700,
    },
    window: {
      title: "ODAM.AnimaSheet.Title",
      resizable: true,
    },
  };

  static PARTS = {
    form: {
      template: "systems/odam/templates/actor/anima-sheet.hbs",
    },
  };

  _prepareSkillTotals(system) {
    const attributes = system.attributes;
    const skills = system.skills?.base ?? {};

    const attributeKeys = [
      "strength",
      "agility",
      "endurance",
      "intelligence",
      "perception",
      "charisma",
    ];

    const totals = {};

    for (const [skillKey, skillData] of Object.entries(skills)) {
      const skillValue = skillData.value ?? 0;

      totals[skillKey] = {
        value: skillValue,
        attributes: {},
      };

      for (const attributeKey of attributeKeys) {
        const attributeValue = attributes[attributeKey]?.value ?? 0;
        totals[skillKey].attributes[attributeKey] = skillValue + attributeValue;
      }
    }

    return totals;
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    context.actor = this.document;
    context.system = this.document.system;
    context.skillTotals = this._prepareSkillTotals(context.system);

    return context;
  }

  async _onRender(context, options) {
    await super._onRender(context, options);

    const form = this.element.querySelector("form");
    if (!form) return;

    form.addEventListener("change", async (event) => {
      event.preventDefault();

      const formData = new foundry.applications.ux.FormDataExtended(form);
      await this.document.update(formData.object);
    });

    this.element.querySelectorAll(".sheet-tabs a").forEach((tab) => {
      tab.addEventListener("click", (event) => {
        event.preventDefault();

        const selected = tab.dataset.tab;

        this.element.querySelectorAll(".sheet-tabs a").forEach((t) => {
          t.classList.toggle("active", t.dataset.tab === selected);
        });

        this.element.querySelectorAll(".tab-content").forEach((content) => {
          content.classList.toggle(
            "active",
            content.dataset.tabContent === selected,
          );
        });
      });
    });
  }
}
