import { Box, Button, TextInput } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";

const EditBlog = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [blogText, setBlogText] = useState("write your blog here...");
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `/api/getsingleBlog/?id=${router.query.edit[1]}`
        );
        setTitle(response.data[0].title);
        setTag(response.data[0].tags.join(","));
        setDescription(response.data[0].description);
        setBlogText(response.data[0].blogText);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  }, [router]);

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/updateBlog/?id=${router.query.edit[1]}`, {
        title,
        description,
        tags: tag.split(","),
        blogText,
      });
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
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
          <Button mt="lg" color="orange" onClick={() => router.back()}>
            Back
          </Button>
          <Button mt="lg" onClick={handleUpdate}>
            Update
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default EditBlog;
export function RichText(props) {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line import/extensions, global-require
    const { RichTextEditor } = require("@mantine/rte");
    return <RichTextEditor {...props} />;
  }

  // Render anything as fallback on server, e.g. loader or html content without editor
  return null;
}
