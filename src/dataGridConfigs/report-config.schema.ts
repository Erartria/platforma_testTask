const tableSchema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  type: "object",
  required: ["colums"],
  additionalProperties: false,
  properties: {
    name: {
      type: "string",
    },
    code: {
      type: "string",
    },
    colums: {
      type: "array",
      additionalItems: false,
      items: {
        $ref: "column.json",
      },
    },
    hiddenColums: {
      type: "array",
      additionalItems: false,
      items: {
        $ref: "column.json",
      },
    },
  },
} as const;

const columnSchema = {
  $id: "column.json",
  additionalProperties: false,
  type: "object",
  required: ["caption", "dataField"],
  properties: {
    dataField: {
      type: "string",
    },
    caption: {
      type: "string",
    },
    dataType: {
      type: "string",
    },
    format: {
      type: "string",
    },
    alignment: {
      type: "string",
    },
  },
} as const;

export { columnSchema, tableSchema };
