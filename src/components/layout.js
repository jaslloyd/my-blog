import React from "react"
import { Link } from "gatsby"
import Toggle from './Toggle';
import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {

  state = {
    theme: window.localStorage ? localStorage.getItem('theme') || 'light' : 'light'
  }

  componentDidMount = () => {
    console.log(localStorage.getItem('theme'))
    this.setBodyClass(this.state.theme)
  }

  handleThemeChange = () => {
    this.setState({ theme: this.state.theme === 'light' ? 'dark' : 'light' }, () => {
      this.setBodyClass(this.state.theme);
      localStorage.setItem('theme', this.state.theme)
    })
  }

  setBodyClass = (theme) => {
    const body = document.querySelector('body');
    body.className = theme;
  }

  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: 0,
            marginTop: 0,
            fontSize: "1.976425rem",
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
            marginBottom: 0
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2.625rem'
        }}>
          {header}

          <Toggle
            isChecked={this.state.theme === 'dark'}
            handleThemeChange={this.handleThemeChange} />
        </header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}

export default Layout
