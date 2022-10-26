import React, { Children, useState } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';

function DropdownListInline({ direction,item,onItemSelected,children, ...args }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <div style={{display: "inline"}}>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
                <DropdownToggle caret color="success" size='sm'>{children}</DropdownToggle>
                <DropdownMenu {...args}>
                {item.map(e => {
                        return <DropdownItem id={e.id} key={e.id} onClick={()=>onItemSelected(e)}>{e.name}</DropdownItem>
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