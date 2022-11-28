import React from "react";
import paginationFactory from 'react-bootstrap-table2-paginator';

const sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => {
    return (
        <div className="btn-group">
            <button type="button" className="btn btn-info btn-sm dropdown-toggle px-3" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                {currSizePerPage}
            </button>
            <div className="dropdown-menu">
                {
                    options.map((option) => (
                        <div 
                        //key={index} 
                        className="dropdown-item" 
                        key={option.text} 
                        onClick={() => onSizePerPageChange(option.page)}
                        >
                            {option.text}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      &nbsp;&nbsp; { from }&nbsp; <i class="fas fa-long-arrow-alt-right"></i> &nbsp;{ to } (Tổng {size})
    </span>
  );
const pagination = paginationFactory({
    //custom: true,
    sizePerPageRenderer,
    paginationTotalRenderer:customTotal,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: '<<', nextPageText: '>', prePageText: '<', showTotal: true, alwaysShowAllBtns: true,
});
const paginationCustom = paginationFactory({
    custom: true,
    sizePerPageRenderer,
    paginationTotalRenderer:customTotal,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: '<<', nextPageText: '>', prePageText: '<', showTotal: true, alwaysShowAllBtns: true,
});

export {sizePerPageRenderer, pagination, paginationCustom}