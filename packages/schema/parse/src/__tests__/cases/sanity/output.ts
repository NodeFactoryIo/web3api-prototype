import {
  TypeInfo,
  createObjectDefinition,
  createQueryDefinition,
  createMethodDefinition,
  createImportedObjectDefinition,
  createImportedQueryDefinition,
  createScalarPropertyDefinition,
  createArrayPropertyDefinition,
  createScalarDefinition,
  createArrayDefinition,
  createObjectPropertyDefinition,
  DefinitionKind,
} from "../../../typeInfo";

export const output: TypeInfo = {
  userTypes: [
    {
      ...createObjectDefinition("CustomType"),
      properties: [
        createScalarPropertyDefinition("str", "String", true),
        createScalarPropertyDefinition("optStr", "?String", false),
        createScalarPropertyDefinition("u", "UInt", true),
        createScalarPropertyDefinition("optU", "?UInt", false),
        createScalarPropertyDefinition("u8", "UInt8", true),
        createScalarPropertyDefinition("u16", "UInt16", true),
        createScalarPropertyDefinition("u32", "UInt32", true),
        createScalarPropertyDefinition("u64", "UInt64", true),
        createScalarPropertyDefinition("i", "Int", true),
        createScalarPropertyDefinition("i8", "Int8", true),
        createScalarPropertyDefinition("i16", "Int16", true),
        createScalarPropertyDefinition("i32", "Int32", true),
        createScalarPropertyDefinition("i64", "Int64", true),
        createArrayPropertyDefinition(
          "uArray",
          "[UInt]",
          true,
          createScalarDefinition("uArray", "UInt", true)
        ),
        createArrayPropertyDefinition(
          "uOptArray",
          "?[UInt]",
          false,
          createScalarDefinition("uOptArray", "UInt", true)
        ),
        createArrayPropertyDefinition(
          "optUOptArray",
          "?[?UInt]",
          false,
          createScalarDefinition("optUOptArray", "?UInt", false)
        ),
        createArrayPropertyDefinition(
          "optStrOptArray",
          "?[?String]",
          false,
          createScalarDefinition("optStrOptArray", "?String", false)
        ),
        createArrayPropertyDefinition(
          "uArrayArray",
          "[[UInt]]",
          true,
          createArrayDefinition(
            "uArrayArray",
            "[UInt]",
            true,
            createScalarDefinition("uArrayArray", "UInt", true)
          )
        ),
        createArrayPropertyDefinition(
          "uOptArrayOptArray",
          "[?[?UInt64]]",
          true,
          createArrayDefinition(
            "uOptArrayOptArray",
            "?[?UInt64]",
            false,
            createScalarDefinition("uOptArrayOptArray", "?UInt64", false)
          )
        ),
        createArrayPropertyDefinition(
          "uArrayOptArrayArray",
          "[?[[UInt64]]]",
          true,
          createArrayDefinition(
            "uArrayOptArrayArray",
            "?[[UInt64]]",
            false,
            createArrayDefinition(
              "uArrayOptArrayArray",
              "[UInt64]",
              true,
              createScalarDefinition("uArrayOptArrayArray", "UInt64", true)
            )
          )
        ),
        createArrayPropertyDefinition(
          "crazyArray",
          "?[?[[?[UInt64]]]]",
          false,
          createArrayDefinition(
            "crazyArray",
            "?[[?[UInt64]]]",
            false,
            createArrayDefinition(
              "crazyArray",
              "[?[UInt64]]",
              true,
              createArrayDefinition(
                "crazyArray",
                "?[UInt64]",
                false,
                createScalarDefinition("crazyArray", "UInt64", true)
              )
            )
          )
        ),
        createArrayPropertyDefinition(
          "objectArray",
          "?[AnotherType]",
          false,
          createObjectDefinition("objectArray", "AnotherType", true)
        ),
      ],
    },
    {
      ...createObjectDefinition("NestedNestedObject"),
      properties: [createScalarPropertyDefinition("prop", "?String", false)],
    },
    {
      ...createObjectDefinition("NestedObject"),
      properties: [
        createScalarPropertyDefinition("fieldA", "?String", false),
        createObjectPropertyDefinition(
          "nestedObject",
          "?NestedNestedObject",
          false,
          []
        ),
      ],
    },
    {
      ...createObjectDefinition("UserObject"),
      properties: [
        createObjectPropertyDefinition(
          "nestedNestedObject",
          "?NestedObject",
          false,
          []
        ),
        createScalarPropertyDefinition("fieldB", "Int", true),
      ],
    },
  ],
  queryTypes: [
    {
      ...createQueryDefinition("Query", "Query"),
      methods: [
        {
          ...createMethodDefinition("query", "queryMethod"),
          arguments: [createScalarPropertyDefinition("arg", "String", true)],
          return: createScalarPropertyDefinition("queryMethod", "Int", true),
        },
        {
          ...createMethodDefinition("query", "importedObjectMethod"),
          arguments: [
            {
              ...createObjectPropertyDefinition(
                "importedObject",
                "TestImport_Object",
                true,
                [createScalarPropertyDefinition("prop", "String", true)]
              ),
              object: {
                ...createObjectDefinition(
                  "importedObject",
                  "TestImport_Object",
                  true,
                  [createScalarPropertyDefinition("prop", "String", true)]
                ),
                kind: DefinitionKind.ImportedObject
              }
            }
          ],
          return: {
            ...createObjectPropertyDefinition(
              "importedObjectMethod",
              "TestImport_Object",
              true,
              [createScalarPropertyDefinition("prop", "String", true)]
            ),
            object: {
              ...createObjectDefinition(
                "importedObjectMethod",
                "TestImport_Object",
                true,
                [createScalarPropertyDefinition("prop", "String", true)]
              ),
              kind: DefinitionKind.ImportedObject
            }
          }
        },
      ],
    },
  ],
  importedObjectTypes: [
    {
      ...createImportedObjectDefinition(
        "testimport.uri.eth",
        "TestImport",
        "TestImport_Object",
        "Object"
      ),
      properties: [createScalarPropertyDefinition("prop", "String", true)],
    },
  ],
  importedQueryTypes: [
    {
      ...createImportedQueryDefinition(
        "testimport.uri.eth",
        "TestImport",
        "TestImport_Query",
        "Query"
      ),
      methods: [
        {
          ...createMethodDefinition("query", "importedMethod"),
          arguments: [
            createScalarPropertyDefinition("str", "String", true),
            createScalarPropertyDefinition("optStr", "?String", false),
            createScalarPropertyDefinition("u", "UInt", true),
            createScalarPropertyDefinition("optU", "?UInt", false),
            createArrayPropertyDefinition(
              "uArrayArray",
              "[?[?UInt]]",
              true,
              createArrayDefinition(
                "uArrayArray",
                "?[?UInt]",
                false,
                createScalarDefinition("uArrayArray", "?UInt", false)
              )
            ),
          ],
          return: createScalarPropertyDefinition(
            "importedMethod",
            "String",
            true
          ),
        },
        {
          ...createMethodDefinition("query", "anotherMethod"),
          arguments: [
            createArrayPropertyDefinition(
              "arg",
              "[String]",
              true,
              createScalarDefinition("arg", "String", true)
            ),
          ],
          return: createScalarPropertyDefinition(
            "anotherMethod",
            "Int64",
            true
          ),
        },
        {
          ...createMethodDefinition("query", "userObjectMethod"),
          arguments: [
            createObjectPropertyDefinition("userObject", "?UserObject", false, [
              createObjectPropertyDefinition(
                "nestedNestedObject",
                "?NestedObject",
                false,
                []
              ),
              createScalarPropertyDefinition("fieldB", "Int", true),
            ]),
          ],
          return: createObjectPropertyDefinition(
            "userObjectMethod",
            "UserObject",
            true,
            [
              createObjectPropertyDefinition(
                "nestedNestedObject",
                "?NestedObject",
                false,
                []
              ),
              createScalarPropertyDefinition("fieldB", "Int", true),
            ]
          ),
        },
      ],
    },
  ],
};
