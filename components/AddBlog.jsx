import { Box, Button, TextInput } from "@mantine/core";
import axios from "axios";
import React, { useState } from "react";

const AddBlog = () => {
  
  const [title, setTitle] = useState( "");
  const [tag, setTag] = useState( "");
  const [description, setDescription] = useState( "");
  const [blogText, setBlogText] = useState( "write your blog here...");
  const handleClear = () => {
    setTitle("");
    setTag("");
    setBlogText("write your blog here...");
    setDescription("");
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/addBlog", {
        title,
        description,
        tags: tag.split(","),
        blogText,
      });
      if (response.data) handleClear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box mt="xl">
      <TextInput
        placeholder="Blog title"
        label="Title"
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
      />
      <TextInput
        mt="lg"
        placeholder="tags are saperate by comma"
        label="Tags"
        value={tag}
        onChange={(event) => setTag(event.currentTarget.value)}
      />
      <TextInput
        mt="lg"
        placeholder="description"
        label="Description"
        value={description}
        onChange={(event) => setDescription(event.currentTarget.value)}
      />
      <RichText mt="lg" id="rte" value={blogText} onChange={setBlogText} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button mt="lg" color="red" onClick={handleClear}>
          Clear
        </Button>
        <Button mt="lg" onClick={handleSubmit}>
          Post
        </Button>
      </Box>
    </Box>
  );
};

export default AddBlog;

export function RichText(props) {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line import/extensions, global-require
    const { RichTextEditor } = require("@mantine/rte");
    return <RichTextEditor {...props} />;
  }

  // Render anything as fallback on server, e.g. loader or html content without editor
  return null;
}
