<input type="text" value={this.state.value1} onChange={this.onChangeValue1} />
<CharacterCounter
  input={this.state.value1}
  maxLimit={20}
  warningLimit={10}
/>
