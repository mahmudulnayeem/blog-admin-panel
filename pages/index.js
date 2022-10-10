import { Text } from "@mantine/core";
import Head from "next/head";
import AddBlog from "../components/AddBlog";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout >
      <Head>
        <title>Blog admin panel</title>
        <meta name="description" content="Blog admin panel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Text size={24} weight={24}>
        Add a new blog
      </Text>
      <AddBlog />
    </Layout>
  );
}
