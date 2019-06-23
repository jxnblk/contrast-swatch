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

const NavLink = props =>
  <Styled.a
    {...props}
    css={{
      display: 'inline-block',
      mr: 3,
      fontSize: 1,
      fontWeight: 'bold',
      color: 'inherit',
      textDecoration: 'none',
      ':hover': {
        textDecoration: 'underline',
      }
    }}
  />

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
        <Container>
          <NavLink href='https://github.com/jxnblk/contrast-swatch'>
            GitHub
          </NavLink>
          <NavLink href='https://jxnblk.com'>
            Made by Jxnblk
          </NavLink>
        </Container>
      </Footer>
    </Layout>
  </Styled.root>
