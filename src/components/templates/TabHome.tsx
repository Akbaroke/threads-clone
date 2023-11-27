import { Tabs, Transition } from '@mantine/core';
import { LegacyRef, useState } from 'react';
import LOGO from '@/assets/threads-logo.png';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  PageForYou: React.ReactNode;
  RefForYou: LegacyRef<HTMLDivElement>;
  PageFollowing: React.ReactNode;
  RefFollowing: LegacyRef<HTMLDivElement>;
};

export default function TabHome({
  PageForYou,
  PageFollowing,
  RefForYou,
  RefFollowing,
}: Props) {
  const [activeTab, setActiveTab] = useState<string | null>('fy');

  return (
    <>
      <Link
        href="/"
        className="p-2 hover:bg-gray-100 w-max rounded-full cursor-pointer m-auto sm:hidden">
        <Image src={LOGO} alt="logo" className="w-[25px]" />
      </Link>
      <Tabs defaultValue="fy" color="dark" onTabChange={setActiveTab}>
        <Tabs.List grow className="sticky top-0 bg-white z-30">
          <Tabs.Tab
            value="fy"
            p="md"
            className={activeTab === 'fy' ? 'font-semibold' : 'text-gray-400'}>
            For you
          </Tabs.Tab>
          <Tabs.Tab
            value="fl"
            p="md"
            className={activeTab === 'fl' ? 'font-semibold' : 'text-gray-400'}>
            Following
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="fy" pt="md">
          <Transition
            mounted={activeTab === 'fy' ? true : false}
            transition="slide-right"
            duration={400}
            timingFunction="ease">
            {(styles) => (
              <div style={styles} ref={RefForYou}>
                {PageForYou}
              </div>
            )}
          </Transition>
        </Tabs.Panel>

        <Tabs.Panel value="fl" pt="md">
          <Transition
            mounted={activeTab === 'fl' ? true : false}
            transition="slide-left"
            duration={400}
            timingFunction="ease">
            {(styles) => (
              <div style={styles} ref={RefFollowing}>
                {PageFollowing}
              </div>
            )}
          </Transition>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
