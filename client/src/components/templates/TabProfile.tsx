import { useState } from 'react';
import { Tabs, Transition } from '@mantine/core';

type Props = {
  PageThreads: React.ReactNode;
  PageReplies: React.ReactNode;
  PageReposts: React.ReactNode;
};

export default function TabProfile({
  PageThreads,
  PageReplies,
  PageReposts,
}: Props) {
  const [activeTab, setActiveTab] = useState<string | null>('Threads');

  return (
    <Tabs defaultValue="Threads" color="dark" onTabChange={setActiveTab}>
      <Tabs.List grow className="sticky top-0 bg-white z-30">
        <Tabs.Tab
          value="Threads"
          p="md"
          className={
            activeTab === 'Threads' ? 'font-semibold' : 'text-gray-400'
          }>
          Threads
        </Tabs.Tab>
        <Tabs.Tab
          value="Replies"
          p="md"
          className={
            activeTab === 'Replies' ? 'font-semibold' : 'text-gray-400'
          }>
          Replies
        </Tabs.Tab>
        <Tabs.Tab
          value="Reposts"
          p="md"
          className={
            activeTab === 'Reposts' ? 'font-semibold' : 'text-gray-400'
          }>
          Reposts
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Threads" pt="md">
        <Transition
          mounted={activeTab === 'Threads' ? true : false}
          transition="slide-up"
          duration={400}
          timingFunction="ease">
          {(styles) => <div style={styles}>{PageThreads}</div>}
        </Transition>
      </Tabs.Panel>

      <Tabs.Panel value="Replies" pt="md">
        <Transition
          mounted={activeTab === 'Replies' ? true : false}
          transition="slide-up"
          duration={400}
          timingFunction="ease">
          {(styles) => <div style={styles}>{PageReplies}</div>}
        </Transition>
      </Tabs.Panel>

      <Tabs.Panel value="Reposts" pt="md">
        <Transition
          mounted={activeTab === 'Reposts' ? true : false}
          transition="slide-up"
          duration={400}
          timingFunction="ease">
          {(styles) => <div style={styles}>{PageReposts}</div>}
        </Transition>
      </Tabs.Panel>
    </Tabs>
  );
}
