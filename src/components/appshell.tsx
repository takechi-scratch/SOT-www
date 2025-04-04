"use client";

import Link from 'next/link';
import Image from 'next/image';

import { AppShell, Burger, Text, NavLink, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function App({
    children,
  }: {
    children: React.ReactNode;
  }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Flex
            mih={50}
            gap="md"
            justify="flex-start"
            align="center"
            direction="row"
            wrap="wrap"
            >
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
          <Image src="/icon.png" alt="Logo" width={40} height={40} />
          <Text w="bold" size="xl">Scratch作品検索</Text>
        <Flex ml="auto">
            <input
                type="text"
                placeholder="Scratchの作品URL"
                style={{
                    padding: '5px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                }}
            />
        </Flex>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink component={Link} href="/" label="ホーム" />
        <NavLink component={Link} href="/about" label="サイトについて" />
        <NavLink component={Link} href="/search" label="検索" />
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
