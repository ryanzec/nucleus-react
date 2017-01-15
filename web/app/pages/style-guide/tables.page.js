import React from 'react';

// import CodeExample from '../../react/components/code-example';

// import StylesExample from './assets/examples/buttons/styles';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/assets/examples/buttons/styles'), 'utf8');

import Table from '../../../../src/components/table';
import TableRow from '../../../../src/components/table-row';
import TableHeader from '../../../../src/components/table-header';
import TableHeaderItem from '../../../../src/components/table-header-item';
import TableBody from '../../../../src/components/table-body';
import TableBodyItem from '../../../../src/components/table-body-item';
import TableFooter from '../../../../src/components/table-footer';
import TableFooterItem from '../../../../src/components/table-footer-item';
// import Image from '../../../../src/components/image';

class TablesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-tables">
        <h1>Tables</h1>
        <h2>Standard</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderItem>Class</TableHeaderItem>
              <TableHeaderItem>Primary Weapon Type</TableHeaderItem>
              <TableHeaderItem>Resource</TableHeaderItem>
              <TableHeaderItem>Unique Ability</TableHeaderItem>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableBodyItem>Warrior</TableBodyItem>
              <TableBodyItem>Club</TableBodyItem>
              <TableBodyItem>Stamina</TableBodyItem>
              <TableBodyItem>Enrage</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem>Ranger</TableBodyItem>
              <TableBodyItem>Bow</TableBodyItem>
              <TableBodyItem>Agility</TableBodyItem>
              <TableBodyItem>Long Range Attack</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem>Mage</TableBodyItem>
              <TableBodyItem>Staff</TableBodyItem>
              <TableBodyItem>Mana</TableBodyItem>
              <TableBodyItem>Magic Casting</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem>Necromancer</TableBodyItem>
              <TableBodyItem>Wand</TableBodyItem>
              <TableBodyItem>Blood</TableBodyItem>
              <TableBodyItem>Raising the Dead</TableBodyItem>
            </TableRow>
          </TableBody>
        </Table>
        <h2>Table Alignment</h2>
        <Table alignment="left">
          <TableHeader>
            <TableRow>
              <TableHeaderItem>Class</TableHeaderItem>
              <TableHeaderItem>Primary Weapon Type</TableHeaderItem>
              <TableHeaderItem>Resource</TableHeaderItem>
              <TableHeaderItem>Unique Ability</TableHeaderItem>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableBodyItem>Warrior</TableBodyItem>
              <TableBodyItem>Club</TableBodyItem>
              <TableBodyItem>Stamina</TableBodyItem>
              <TableBodyItem>Enrage</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem>Ranger</TableBodyItem>
              <TableBodyItem>Bow</TableBodyItem>
              <TableBodyItem>Agility</TableBodyItem>
              <TableBodyItem>Long Range Attack</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem>Mage</TableBodyItem>
              <TableBodyItem>Staff</TableBodyItem>
              <TableBodyItem>Mana</TableBodyItem>
              <TableBodyItem>Magic Casting</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem>Necromancer</TableBodyItem>
              <TableBodyItem>Wand</TableBodyItem>
              <TableBodyItem>Blood</TableBodyItem>
              <TableBodyItem>Raising the Dead</TableBodyItem>
            </TableRow>
          </TableBody>
        </Table>
        <br />
        <Table alignment="right">
          <TableHeader>
            <TableRow>
              <TableHeaderItem>Class</TableHeaderItem>
              <TableHeaderItem>Primary Weapon Type</TableHeaderItem>
              <TableHeaderItem>Resource</TableHeaderItem>
              <TableHeaderItem>Unique Ability</TableHeaderItem>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableBodyItem>Warrior</TableBodyItem>
              <TableBodyItem>Club</TableBodyItem>
              <TableBodyItem>Stamina</TableBodyItem>
              <TableBodyItem>Enrage</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem>Ranger</TableBodyItem>
              <TableBodyItem>Bow</TableBodyItem>
              <TableBodyItem>Agility</TableBodyItem>
              <TableBodyItem>Long Range Attack</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem>Mage</TableBodyItem>
              <TableBodyItem>Staff</TableBodyItem>
              <TableBodyItem>Mana</TableBodyItem>
              <TableBodyItem>Magic Casting</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem>Necromancer</TableBodyItem>
              <TableBodyItem>Wand</TableBodyItem>
              <TableBodyItem>Blood</TableBodyItem>
              <TableBodyItem>Raising the Dead</TableBodyItem>
            </TableRow>
          </TableBody>
        </Table>
        <h2>Column Alignment</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderItem alignment="left">Class</TableHeaderItem>
              <TableHeaderItem>Primary Weapon Type</TableHeaderItem>
              <TableHeaderItem>Resource</TableHeaderItem>
              <TableHeaderItem alignment="right">Unique Ability</TableHeaderItem>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableBodyItem alignment="left">Warrior</TableBodyItem>
              <TableBodyItem>Club</TableBodyItem>
              <TableBodyItem>Stamina</TableBodyItem>
              <TableBodyItem alignment="right">Enrage</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem alignment="left">Ranger</TableBodyItem>
              <TableBodyItem>Bow</TableBodyItem>
              <TableBodyItem>Agility</TableBodyItem>
              <TableBodyItem alignment="right">Long Range Attack</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem alignment="left">Mage</TableBodyItem>
              <TableBodyItem>Staff</TableBodyItem>
              <TableBodyItem>Mana</TableBodyItem>
              <TableBodyItem alignment="right">Magic Casting</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem alignment="left">Necromancer</TableBodyItem>
              <TableBodyItem>Wand</TableBodyItem>
              <TableBodyItem>Blood</TableBodyItem>
              <TableBodyItem alignment="right">Raising the Dead</TableBodyItem>
            </TableRow>
          </TableBody>
        </Table>
        <br />
        <Table alignment="left">
          <TableHeader>
            <TableRow>
              <TableHeaderItem alignment="center">Class</TableHeaderItem>
              <TableHeaderItem>Primary Weapon Type</TableHeaderItem>
              <TableHeaderItem>Resource</TableHeaderItem>
              <TableHeaderItem alignment="center">Unique Ability</TableHeaderItem>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableBodyItem alignment="center">Warrior</TableBodyItem>
              <TableBodyItem>Club</TableBodyItem>
              <TableBodyItem>Stamina</TableBodyItem>
              <TableBodyItem alignment="center">Enrage</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem alignment="center">Ranger</TableBodyItem>
              <TableBodyItem>Bow</TableBodyItem>
              <TableBodyItem>Agility</TableBodyItem>
              <TableBodyItem alignment="center">Long Range Attack</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem alignment="center">Mage</TableBodyItem>
              <TableBodyItem>Staff</TableBodyItem>
              <TableBodyItem>Mana</TableBodyItem>
              <TableBodyItem alignment="center">Magic Casting</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem alignment="center">Necromancer</TableBodyItem>
              <TableBodyItem>Wand</TableBodyItem>
              <TableBodyItem>Blood</TableBodyItem>
              <TableBodyItem alignment="center">Raising the Dead</TableBodyItem>
            </TableRow>
          </TableBody>
        </Table>
        <h2>Styles</h2>
        <h3>Zebra</h3>
        <Table styleType="zebra">
          <TableHeader>
            <TableRow>
              <TableHeaderItem>Class</TableHeaderItem>
              <TableHeaderItem>Primary Weapon Type</TableHeaderItem>
              <TableHeaderItem>Resource</TableHeaderItem>
              <TableHeaderItem>Unique Ability</TableHeaderItem>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableBodyItem>Warrior</TableBodyItem>
              <TableBodyItem>Club</TableBodyItem>
              <TableBodyItem>Stamina</TableBodyItem>
              <TableBodyItem>Enrage</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem>Ranger</TableBodyItem>
              <TableBodyItem>Bow</TableBodyItem>
              <TableBodyItem>Agility</TableBodyItem>
              <TableBodyItem>Long Range Attack</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem>Mage</TableBodyItem>
              <TableBodyItem>Staff</TableBodyItem>
              <TableBodyItem>Mana</TableBodyItem>
              <TableBodyItem>Magic Casting</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem>Necromancer</TableBodyItem>
              <TableBodyItem>Wand</TableBodyItem>
              <TableBodyItem>Blood</TableBodyItem>
              <TableBodyItem>Raising the Dead</TableBodyItem>
            </TableRow>
          </TableBody>
        </Table>
        <h3>Borderless</h3>
        <Table styleType="borderless">
          <TableHeader>
            <TableRow>
              <TableHeaderItem>Class</TableHeaderItem>
              <TableHeaderItem>Primary Weapon Type</TableHeaderItem>
              <TableHeaderItem>Resource</TableHeaderItem>
              <TableHeaderItem alignment="left">Unique Ability</TableHeaderItem>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableBodyItem>Warrior</TableBodyItem>
              <TableBodyItem>Club</TableBodyItem>
              <TableBodyItem>Stamina</TableBodyItem>
              <TableBodyItem alignment="left">Enrage</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem>Ranger</TableBodyItem>
              <TableBodyItem>Bow</TableBodyItem>
              <TableBodyItem>Agility</TableBodyItem>
              <TableBodyItem alignment="left">Long Range Attack</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem>Mage</TableBodyItem>
              <TableBodyItem>Staff</TableBodyItem>
              <TableBodyItem>Mana</TableBodyItem>
              <TableBodyItem alignment="left">Magic Casting</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem>Necromancer</TableBodyItem>
              <TableBodyItem>Wand</TableBodyItem>
              <TableBodyItem>Blood</TableBodyItem>
              <TableBodyItem alignment="left">Raising the Dead</TableBodyItem>
            </TableRow>
          </TableBody>
        </Table>
        <h2>Text Wrapping</h2>
        <Table className="wrapping-table" alignment="left">
          <TableHeader>
            <TableRow>
              <TableHeaderItem>Lorem</TableHeaderItem>
              <TableHeaderItem>Ipsum</TableHeaderItem>
              <TableHeaderItem>Xutim</TableHeaderItem>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableBodyItem>1</TableBodyItem>
              <TableBodyItem>A</TableBodyItem>
              <TableBodyItem>Suspendisse non felis tellus. Nam ac quam bibendum sem accumsan sodales. Vestibulum nec mollis tortor, nec fringilla eros. Duis porta vitae urna nec volutpat. Mauris convallis Praesent eget eros magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem>2</TableBodyItem>
              <TableBodyItem>B</TableBodyItem>
              <TableBodyItem>Suspendisse non Praesent et erat sed erat cursus pretium. Praesent eget eros magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableBodyItem>3</TableBodyItem>
              <TableBodyItem>C</TableBodyItem>
              <TableBodyItem>Suspendisse non felis tellus. Nam ac quam bibendum sem accumsan sodales. Vestibulum nec mollis tortor, nec fringilla eros. Duis porta vitae urna nec volutpat. Mauris convallis lacus nulla, sit amet ultricies ex finibus sed. Praesent et erat sed erat cursus pretium. Praesent eget eros magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</TableBodyItem>
            </TableRow>
          </TableBody>
        </Table>
        <h2>Vertical</h2>
        <Table isVertical>
          <TableBody>
            <TableRow>
              <TableHeaderItem>Class</TableHeaderItem>
              <TableBodyItem>Warrior</TableBodyItem>
              <TableBodyItem>Ranger</TableBodyItem>
              <TableBodyItem>Mage</TableBodyItem>
              <TableBodyItem>Necromancer</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableHeaderItem>Primary Weapon Type</TableHeaderItem>
              <TableBodyItem>Club</TableBodyItem>
              <TableBodyItem>Bow</TableBodyItem>
              <TableBodyItem>Staff</TableBodyItem>
              <TableBodyItem>Wand</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableHeaderItem>Resource</TableHeaderItem>
              <TableBodyItem>Stamina</TableBodyItem>
              <TableBodyItem>Agility</TableBodyItem>
              <TableBodyItem>Mana</TableBodyItem>
              <TableBodyItem>Blood</TableBodyItem>
            </TableRow>
            <TableRow>
              <TableHeaderItem>Unique Ability</TableHeaderItem>
              <TableBodyItem>Enrage</TableBodyItem>
              <TableBodyItem>Long Range Attack</TableBodyItem>
              <TableBodyItem>Magic Casting</TableBodyItem>
              <TableBodyItem>Raising the Dead</TableBodyItem>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

TablesPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default TablesPage;
