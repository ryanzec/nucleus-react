import React from 'react';

import SvgIcon from '../../../../../../../assets/components/svg-icon.component.jsx';

class SvgIconsIndicatorsExample extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SvgIcon fragment="user" />
        );
    }
}

SvgIconsIndicatorsExample.displayName = 'SvgIconsIndicatorsExample';

export default SvgIconsIndicatorsExample;
