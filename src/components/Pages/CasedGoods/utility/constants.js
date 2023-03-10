export const defaultValue = {
  basic: {
    brand: "",
    distillery: "",
    spirit_type: "",
    gift_box: ""
  },
  case: {
    abv: "",
    bpc: "",
    volume: "",
    whole_case: "",
    bottles_in_partial_case: "",
    bottles: "",
    case_reference: "",
    loA: ""
  },
  price: {
    export_price: "",
    offer_price: ""
  },
  others: {
    last_location: "",
    date_added: "",
    evaluated_bottles_in_partial_case: "",
    offers: "",
    comments: "",
    cask: "",
    quantity: "",
    cask_type: "",
    ays: "",
    age: "",
    bottling_date: "",
    tags: []
  }
};

export const quantityOptions = [
  {
    value: "add",
    label: "Add Quantity"
  },
  {
    value: "reduce",
    label: "Reduce Quantity"
  }
];

export const YesOrNoValues = [
  {
    value: true,
    label: "Yes"
  },
  {
    value: false,
    label: "No"
  }
];

export const dummyOptions = [
  {
    value: "abc",
    label: "ABC"
  },
  {
    value: "xyz",
    label: "XYZ"
  }
];
