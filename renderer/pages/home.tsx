import Head from 'next/head';
import Section from '../components/home/Section';
import { styled } from '../stitches.config';

const Container = styled('div', {
  width: '100vw',
  height: '100vh',
  backgroundColor: '$gray900',
  display: 'flex',
  justifyContent: 'center',
});

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Bot Selection - DBC</title>
      </Head>
      <Container>
        <Section />
      </Container>
    </>
  );
}
