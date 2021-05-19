import Link from 'next/link'

import classes from './Button.module.css'

const Button = ({ children, link, onClick }) => {
  return (
    <>
      {link ? (
        <Link href={link}>
          <a className={classes.btn}>{children}</a>
        </Link>
      ) : (
        <button className={classes.btn} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  )
}

export default Button
