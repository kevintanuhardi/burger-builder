module.exports = (self, field, preferedState) => {
  self.setState((state) => {
    preferedState = preferedState !== undefined ? preferedState : !state[field]

    return { [field]: preferedState };
  });
}
