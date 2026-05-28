const fields = foundry.data.fields;
export class ODAMAnimaData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      details: new fields.SchemaField({
        concept: new fields.StringField({ initial: "" }),
        calling: new fields.StringField({ initial: "" }),
        faction: new fields.StringField({ initial: "" }),
        rankTitle: new fields.StringField({ initial: "" }),
      }),
      attributes: new fields.SchemaField({
        strength: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, min: 1, initial: 1 }),
        }),
        agility: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, min: 1, initial: 1 }),
        }),
        endurance: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, min: 1, initial: 1 }),
        }),
        perception: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, min: 1, initial: 1 }),
        }),
        intelligence: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, min: 1, initial: 1 }),
        }),
        charisma: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, min: 1, initial: 1 }),
        }),
      }),
      derived: new fields.SchemaField({
        health: new fields.NumberField({ integer: true, initial: 100 }),
        stamina: new fields.NumberField({ integer: true, initial: 55 }),
        reaction: new fields.NumberField({ integer: true, initial: 2 }),
        shaping: new fields.NumberField({ integer: true, initial: 5 }),
      }),
      pools: new fields.SchemaField({
        conviction: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, initial: 100 }),
          max: new fields.NumberField({ integer: true, initial: 100 }),
        }),
        nightmare: new fields.NumberField({ integer: true, initial: 0 }),
        doubt: new fields.NumberField({ integer: true, initial: 0 }),
      }),
      progression: new fields.SchemaField({
        rank: new fields.NumberField({ integer: true, min: 1, initial: 1 }),
        experience: new fields.NumberField({
          integer: true,
          min: 0,
          initial: 0,
        }),
        cap: new fields.NumberField({ integer: true, initial: 0 }),
      }),
    };
  }
  prepareDerivedData() {
    this.derived.stamina = this.attributes.endurance.value * 5 + 50;
    this.derived.reaction =
      this.attributes.perception.value + this.attributes.agility.value;
  }
}
