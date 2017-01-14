import React from 'react';
import debounce from 'lodash/debounce';

import CodeExample from '../../react/components/code-example';

import StaticExample from './assets/examples/extend-text/static';
import DynamicExample from './assets/examples/extend-text/dynamic';
import DefaultValueExample from './assets/examples/extend-text/default-value';
import CharacterThresholdExample from './assets/examples/extend-text/character-threshold';
import NotSearchableExample from './assets/examples/extend-text/not-searchable';
import NotSearchableTopExample from './assets/examples/extend-text/not-searchable-top';
import DisabledExample from './assets/examples/extend-text/disabled';
import NoFilteringExample from './assets/examples/extend-text/no-filtering';
import CustomFilterExample from './assets/examples/extend-text/custom-filter';
import CustomOptionRendererExample from './assets/examples/extend-text/custom-option-renderer';
import StaticAllowCreateExample from './assets/examples/extend-text/static-allow-create';
import DynamicAllowCreateExample from './assets/examples/extend-text/dynamic-allow-create';
import TaggingExample from './assets/examples/extend-text/tagging';

import { readFileSync } from 'fs';
import { join } from 'path';

const staticExampleContent = readFileSync(join(__dirname, '/assets/examples/extend-text/static.js'), 'utf8');
const dynamicExampleContent = readFileSync(join(__dirname, '/assets/examples/extend-text/dynamic.js'), 'utf8');
const defaultValueExampleContent = readFileSync(join(__dirname, '/assets/examples/extend-text/default-value.js'), 'utf8');
const characterThresholdExampleContent = readFileSync(join(__dirname, '/assets/examples/extend-text/character-threshold.js'), 'utf8');
const notSearchableExampleContent = readFileSync(join(__dirname, '/assets/examples/extend-text/not-searchable.js'), 'utf8');
const notSearchableTopExampleContent = readFileSync(join(__dirname, '/assets/examples/extend-text/not-searchable-top.js'), 'utf8');
const disabledExampleContent = readFileSync(join(__dirname, '/assets/examples/extend-text/disabled.js'), 'utf8');
const noFilteringExampleContent = readFileSync(join(__dirname, '/assets/examples/extend-text/no-filtering.js'), 'utf8');
const customFilterExampleContent = readFileSync(join(__dirname, '/assets/examples/extend-text/custom-filter.js'), 'utf8');
const customOptionRendererExampleContent = readFileSync(join(__dirname, '/assets/examples/extend-text/custom-option-renderer.js'), 'utf8');
const staticAllowCreateExampleContent = readFileSync(join(__dirname, '/assets/examples/extend-text/static-allow-create.js'), 'utf8');
const dynamicAllowCreateExampleContent = readFileSync(join(__dirname, '/assets/examples/extend-text/dynamic-allow-create.js'), 'utf8');
const taggingExampleContent = readFileSync(join(__dirname, '/assets/examples/extend-text/tagging.js'), 'utf8');

class ExtendTextPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-extend-text">
        <h1>Extend Text</h1>
        <h2>Auto Complete</h2>
        <h4>Statically loaded</h4>
        <p>This is a standard extended text with auto complete using a static options list.  This functions pretty much like a select input with the option of searching and more styling ability (which we will see a little below).</p>
        <CodeExample
          exampleComponent={StaticExample}
          codeContent={staticExampleContent}
        />
        <h4>Dynamically loaded</h4>
        <p>You can also use an external API call to load the data dynamically.</p>
        <CodeExample
          exampleComponent={DynamicExample}
          codeContent={dynamicExampleContent}
        />
        <h4>Default Value</h4>
        <p>You can set the default value.</p>
        <CodeExample
          exampleComponent={DefaultValueExample}
          codeContent={defaultValueExampleContent}
        />
        <h4>Character threshold</h4>
        <p>By default options will start to load once you focus the input however you can control this with the characterThreshold property.</p>
        <CodeExample
          exampleComponent={CharacterThresholdExample}
          codeContent={characterThresholdExampleContent}
        />
        <h4>Not searchable</h4>
        <p>If you want the extend text component to not allow searching (make it more like a standard select drop down), then just set the isSearchable property to false</p>
        <CodeExample
          exampleComponent={NotSearchableExample}
          codeContent={notSearchableExampleContent}
        />
        <h4>Not searchable (top)</h4>
        <p>If you want the extend text component to not allow searching (make it more like a standard select drop down), then just set the isSearchable property to false</p>
        <CodeExample
          exampleComponent={NotSearchableTopExample}
          codeContent={notSearchableTopExampleContent}
        />
        <h4>Disabled</h4>
        <p>You can disable the component by passing true to the disabled property</p>
        <CodeExample
          exampleComponent={DisabledExample}
          codeContent={disabledExampleContent}
        />
        <h4>Disabled Filter</h4>
        <p>By default the auto complete list will filter however you can turn this off by setting the useFiltering property to false (<strong>NOTE: Filtering is not done on async options as it is needed to be performed on the API side</strong>).</p>
        <CodeExample
          exampleComponent={NoFilteringExample}
          codeContent={noFilteringExampleContent}
        />
        <h4>Custom filter function</h4>
        <p>By default, filtering will filter out value that don't contain the current value in the input (with the exception of the create option if enabled) but you can pass a custom filter function as the optionsFilter property.</p>
        <CodeExample
          exampleComponent={CustomFilterExample}
          codeContent={customFilterExampleContent}
        />
        <h4>Custom option renderer</h4>
        <p>You can customize the render to provide different styling to each option (<strong>NOTE: While the extend text option only cases about the display and value properties, you can pass any ohter property along with each option that will be available if functions like these</strong>).</p>
        <CodeExample
          exampleComponent={CustomOptionRendererExample}
          codeContent={customOptionRendererExampleContent}
        />
        <h4>Allow create</h4>
        <p>By default the auto complete will force the user to select an item from the auto complete list however you can allow the user to enter in any value by setting the allowCreate to true.</p>
        <CodeExample
          exampleComponent={StaticAllowCreateExample}
          codeContent={staticAllowCreateExampleContent}
        />
        <br />
        <CodeExample
          exampleComponent={DynamicAllowCreateExample}
          codeContent={dynamicAllowCreateExampleContent}
        />
        <h4>Tagging</h4>
        <p>If you want the user to be able to select multiple values, then just set the multiple property to true.</p>
        <CodeExample
          exampleComponent={TaggingExample}
          codeContent={taggingExampleContent}
        />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    );
  }
}

ExtendTextPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ExtendTextPage;
