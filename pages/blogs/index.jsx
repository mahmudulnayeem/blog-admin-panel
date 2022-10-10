import { Box, Button, Modal, Text } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [opened, setOpened] = useState(false);
  const [id, setId] = useState("");
  const [again, setAgain] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/getBlogs");
        setBlogs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, [again]);
  return (
    <Layout>
      {blogs.map((blog) => (
        <Box
          key={blog._id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text size={20} weight={600} mt="lg">
            {blog.title}
          </Text>
          <Box>
            <Button
              mx="sm"
              color="teal"
              onClick={() => router.push(`/blogs/edit/${blog._id}`)}
            >
              Edit
            </Button>
            <Button
              mx="sm"
              color="red"
              onClick={() => {
                setOpened(true);
                setId(blog._id);
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      ))}
      <DeleteModal
        opened={opened}
        setOpened={setOpened}
        id={id}
        setAgain={setAgain}
      />
    </Layout>
  );
};

export default Blogs;

const DeleteModal = ({ id, opened, setOpened, setAgain }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/deleteBlog/?id=${id}`);
      setOpened(false);
      setAgain((pre) => !pre);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      centered
      opened={opened}
      onClose={() => setOpened(false)}
      title="Delete Blog"
    >
      <Text mb="lg">Are you sure you want to delete?</Text>
      <Button mx="sm" color="teal" onClick={() => setOpened(false)}>
        Back
      </Button>
      <Button mx="sm" color="red" onClick={handleDelete}>
        Delete
      </Button>
    </Modal>
  );
};
