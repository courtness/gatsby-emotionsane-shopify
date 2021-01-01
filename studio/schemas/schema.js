import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

// documents
import index from "./documents/index";
import about from "./documents/about";
import contact from "./documents/collection";
import contact from "./documents/collectionIndex";
import contact from "./documents/contact";
import privacy from "./documents/privacy";
import product from "./documents/product";
import product from "./documents/products";
import terms from "./documents/terms";

// sections
import gallery from "./sections/gallery";
import otherProducts from "./sections/otherProducts";
import reviews from "./sections/reviews";
import simpleText from "./sections/simpleText";

// objects
import altImage from "./objects/altImage";
import attribute from "./objects/attribute";
import review from "./objects/review";

export default createSchema({
  name: `default`,
  types: schemaTypes.concat([
    index,
    about,
    collection,
    collectionIndex,
    contact,
    privacy,
    product,
    products,
    terms,
    //
    gallery,
    otherProducts,
    reviews,
    simpleText,
    //
    altImage,
    attribute,
    review
  ])
});
