/** @jsx jsx */
import {
  jsx,
  Layout,
  Main,
  Header,
  Container,
  Styled,
} from 'theme-ui'

export default props =>
  <Styled.root>
    <Layout>
      <Main>
        <Container>
          {props.children}
        </Container>
      </Main>
    </Layout>
  </Styled.root>
