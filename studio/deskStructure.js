import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title(`Content`)
    .items([
      S.listItem()
        .title(`Index`)
        .child(
          S.editor().schemaType(`index`).documentId(`index`).title(`Index`)
        ),
      S.listItem({
        id: `all-products`,
        title: `Products`,
        schemaType: `product`,
        child: () => S.documentTypeList(`product`)
      }),
      S.listItem()
        .title(`Collection`)
        .child(
          S.editor().schemaType(`collection`).documentId(`collection`).title(`Collection`)
        ),
      S.listItem({
        id: `all-collections`,
        title: `Collections`,
        schemaType: `collection`,
        child: () => S.documentTypeList(`collection`)
      }),
      S.listItem()
        .title(`About`)
        .child(
          S.editor().schemaType(`about`).documentId(`about`).title(`About`)
        ),
      S.listItem()
        .title(`Contact`)
        .child(
          S.editor()
            .schemaType(`contact`)
            .documentId(`contact`)
            .title(`Contact`)
        ),
      S.listItem()
        .title(`Privacy`)
        .child(
          S.editor()
            .schemaType(`privacy`)
            .documentId(`privacy`)
            .title(`Privacy`)
        ),
      S.listItem()
        .title(`Terms`)
        .child(
          S.editor().schemaType(`terms`).documentId(`terms`).title(`Terms`)
        )
    ]);
