import React, { Children, useState } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';

function DropdownListInline({ direction, item, onItemSelected, children, disabled = false, ...args }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <div style={{ display: "inline" }}>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction} disabled={disabled}>
                <DropdownToggle
                    style={{ padding: "7px" }}
                    size='sm'
                    caret color="success" >
                    {children}
                </DropdownToggle>
                <DropdownMenu {...args}>
                    {item.map(e => {
                        return <DropdownItem id={e.id} key={e.id} onClick={() => onItemSelected(e)}>{e.name} {e.examCode!==undefined?` - ${e.examCode}`:``}</DropdownItem>
                    })}

                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

DropdownListInline.propTypes = {
    direction: PropTypes.string,
};

export default DropdownListInline;