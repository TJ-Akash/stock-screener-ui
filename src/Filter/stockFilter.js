import React, { useState } from 'react';
import { Checkbox, Popover, Button } from 'antd';

const StockFilter = ({ filterOptions, onFilterChange, visible, onApply  }) => {

    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleCheckboxChange = (checkedValues) => {
      setSelectedFilters(checkedValues);
      onFilterChange(checkedValues);
    };
  
    return (
      <Popover
        placement="right"
        visible={visible}
        content={
          <div className="filter-popup">
            <h3>Filters</h3>
            <Checkbox.Group onChange={handleCheckboxChange}>
              {filterOptions.map((option) => (
                <Checkbox key={option.value} value={option.value}>
                  {option.label}
                </Checkbox>
              ))}
            </Checkbox.Group>
            <Button type="primary" onClick={onApply}>
              Apply
            </Button>
          </div>
        }
      />
    );
  };
  

export default StockFilter;