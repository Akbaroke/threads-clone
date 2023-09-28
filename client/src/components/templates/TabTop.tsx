import { Tabs, Transition } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LOGO from '@/assets/threads-logo.png';

type Props = {
  PageForYou: React.ReactNode;
  PageFollowing: React.ReactNode;
};

export default function TabTop({ PageForYou, PageFollowing }: Props) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string | null>('fy');

  return (
    <>
      <div
        className="p-2 hover:bg-gray-100 w-max rounded-full cursor-pointer m-auto sm:hidden"
        onClick={() => navigate('/')}>
        <img src={LOGO} alt="logo" className="w-[25px]" />
      </div>
      <Tabs defaultValue="fy" color="dark" onTabChange={setActiveTab}>
        <Tabs.List grow className="sticky top-0 bg-white z-30">
          <Tabs.Tab value="fy" p="md">
            For you
          </Tabs.Tab>
          <Tabs.Tab value="fl" p="md">
            Following
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="fy" pt="md">
          <Transition
            mounted={activeTab === 'fy' ? true : false}
            transition="slide-right"
            duration={400}
            timingFunction="ease">
            {(styles) => <div style={styles}>{PageForYou}</div>}
          </Transition>
        </Tabs.Panel>

        <Tabs.Panel value="fl" pt="md">
          <Transition
            mounted={activeTab === 'fl' ? true : false}
            transition="slide-left"
            duration={400}
            timingFunction="ease">
            {(styles) => <div style={styles}>{PageFollowing}</div>}
          </Transition>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
