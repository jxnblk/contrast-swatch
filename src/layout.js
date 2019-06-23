/** @jsx jsx */
import {
  jsx,
  Layout,
  Main,
  Header,
  Footer,
  Container,
  Styled,
} from 'theme-ui'
import { Helmet } from 'react-helmet'
import pkg from '../package.json'

export default props =>
  <Styled.root>
    <Helmet>
      <title>Contrast Swatch</title>
      <meta name='description' content={pkg.description} />
      <link rel='icon' type='image/png' href='favicon.png' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='jxnblk' />
      <meta name='twitter:title' content='Contrast Swatch' />
      <meta name='twitter:description' content={pkg.description} />
      <meta name='twitter:image' content='https://contrast.now.sh/card.png' />
    </Helmet>
    <Layout>
      <Main>
        <Container>
          {props.children}
        </Container>
      </Main>
      <Footer>
        <Styled.a href='https://github.com/jxnblk/contrast-swatch'>
          GitHub
        </Styled.a>
        <Styled.a href='https://jxnblk.com'>
          Made by Jxnblk
        </Styled.a>
      </Footer>
    </Layout>
  </Styled.root>
