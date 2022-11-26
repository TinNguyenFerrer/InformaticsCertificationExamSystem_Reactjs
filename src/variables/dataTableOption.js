import React from "react";
import paginationFactory from 'react-bootstrap-table2-paginator';

const sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => {
    return (
        <div className="btn-group">
            <button type="button" class="btn btn-outline-info btn-sm dropdown-toggle" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                {currSizePerPage}
            </button>
            <div className="dropdown-menu">
                {
                    options.map(option => (
                        <div className="dropdown-item" key={option.text} onClick={() => onSizePerPageChange(option.page)}
                        >
                            {option.text}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
const pagination = paginationFactory({
    sizePerPageRenderer,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: '<<', nextPageText: '>', prePageText: '<', showTotal: true, alwaysShowAllBtns: true,
});

export {sizePerPageRenderer, pagination}