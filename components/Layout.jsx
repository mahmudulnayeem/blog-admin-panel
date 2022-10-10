import { Container } from "@mantine/core";
import React from "react";
import { HeaderResponsive } from "./NavBar";
const Layout = ({children}) => {
  return (
    <Container p='md'>
      <HeaderResponsive
        links={[
          {
            link: "/",
            label: "Add blog",
          },
          {
            link: "/blogs",
            label: "Blogs",
          },
        ]}
      />
      {children}
    </Container>
  );
};

export default Layout;
