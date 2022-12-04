import React, { Children, useState } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';

function DropdownList({ direction,item,onItemSelected,children, ...args }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <div>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
                <DropdownToggle caret color="success" size='sm'>{children}</DropdownToggle>
                <DropdownMenu {...args}>
                {item.map(e => {
                        return <DropdownItem id={e.id} key={e.id} onClick={()=>onItemSelected(e)}>{e.name} - {e.examCode}</DropdownItem>
                    })}
                    
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

DropdownList.propTypes = {
    direction: PropTypes.string,
};

export default DropdownList;