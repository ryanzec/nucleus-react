page.onOverLimit = function() {
  alert('you have gone over the limit');
};

page.onUnderLimit = function() {
  alert('you are now with-in the limit')
};

<input type="text" value={this.state.value2} onChange={this.onChangeValue2} />
<CharacterCounter
  input={this.state.value2}
  maxLimit={20}
  warningLimit={10}
  onOverLimit={this.onOverLimit}
  onUnderLimit={this.onUnderLimit}
/>
