import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationButtons = (props) => {
    const handleChange = (event, value) => {
      props.setPage(value);
    };
  
    return (
        <div className="center">
          <Stack spacing={2}>
            <Pagination
                className="center"
                count={props.pageCount}
                page={props.page}
                onChange={handleChange}
                showFirstButton
                showLastButton
                defaultPage={1}
                boundaryCount={2}
                variant="outlined"
                color="primary"
          />
          </Stack>
        </div>
    );
  }

export default PaginationButtons;