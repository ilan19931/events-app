import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DetailsTab from "./Tabs/DetailsTab";
import CommentsTab from "./Tabs/CommentsTab";

import "react-tabs/style/react-tabs.css";
import FilesTab from "./Tabs/FilesTab";

const TabsComponent = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Details</Tab>
        <Tab>Comments</Tab>
        <Tab>Attached Files</Tab>
      </TabList>

      <TabPanel>
        <DetailsTab />
      </TabPanel>

      <TabPanel>
        <CommentsTab />
      </TabPanel>

      <TabPanel>
        <FilesTab />
      </TabPanel>
    </Tabs>
  );
};

export default TabsComponent;
