

const initialState = {
  status: "0",
  conditionType: "0",
  success: false,
  loading: false,
  selectedItem: [],
  name: "",
  discount: 0,
  id: ""
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case 'GET_ALL_CP_SUCCESS':
      state = {
        ...state,
        status: action.payload[0].status === true ? "1" : "0",
        selectedItem: action.payload[0].selecProduct,
        name: action.payload[0].name,
        discount: action.payload[0].value,
        conditionType: action.payload[0].productType === "1" ? "1" : "0",
        id: action.payload[0]._id,

      }
    // eslint-disable-next-line no-fallthrough
    case 'UPDATE_CP_SUCCESS':
      state = {
        ...state,
        status: action.payload[0].status === true ? "1" : "0",
        success: true,
        selectedItem: action.payload[0].selecProduct,
        name: action.payload[0].name,
        discount: action.payload[0].value,
        conditionType: action.payload[0].productType === "1" ? "1" : "0",
        id: action.payload[0]._id,

      }
    // eslint-disable-next-line no-fallthrough
    case 'SELECTION_OPTION':
      console.log("state:", action)
      let selected = action.selected;
      let id = action.id;
      if (id) {
        if (selected.indexOf(id) === -1) {
          selected.push(id);

        } else {
          let data = []
          selected.forEach(i => {
            if (i !== id) {
              data.push(i);
            }
          });
          selected.length = 0
          data.forEach(i => {
            if (i !== id) {
              selected.push(i);
            }
          });
        }
        state = {
          ...state,
          selectedItem: selected
        }

      }

  }
  return state;
}