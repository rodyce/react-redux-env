export default function courseReducer(state = [], action) {
  // Note. It would be better to store courses by ID in a map...
  // For faster lookups.
  switch (action.type) {
    case "CREATE_COURSE":
      // DO NOT USE: state.push(action.course). Mutation won't work.
      // Update store.
      return [...state, { ...action.course }];
    default:
      // IMPORTANT!
      return state;
  }
}
