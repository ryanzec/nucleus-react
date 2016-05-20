import React from 'react';

import SvgIcon from '../../../../../../../assets/components/svg-icon.component.jsx';

class SvgIconsIndicatorsExample extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span>
                <SvgIcon
                    styleType="success"
                    fragment="user"
                />
                <SvgIcon
                    styleType="info"
                    fragment="user"
                />
                <SvgIcon
                    styleType="warning"
                    fragment="user"
                />
                <SvgIcon
                    styleType="danger"
                    fragment="user"
                />
            </span>
        );
    }
}

SvgIconsIndicatorsExample.displayName = 'SvgIconsIndicatorsExample';

export default SvgIconsIndicatorsExample;
