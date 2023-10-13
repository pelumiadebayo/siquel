import { Fragment, useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

const Header = ({ title, description, setTitle, setDescription }) => {
  return (
    <Fragment>
      <Box sx={{ mb: 3 }}>
          <TextField
            defaultValue={title}
            onBlur={(e) => setTitle(e.target.value)}
            variant="standard"
            placeholder="Form Title"
            name="title"
            sx={{ mb: 3 }}
            fullWidth
          />
          <TextField
            name="description"
            defaultValue={description}
            onBlur={(e) => setDescription(e.target.value)}
            variant="standard"
            placeholder="Form Description"
            fullWidth
            sx={{ mb: 2 }}
            multiline
            rows={2}
          />
      </Box>
    </Fragment>
  );
};

export default Header;