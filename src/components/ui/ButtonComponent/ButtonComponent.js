import Link from 'next/link'

import classes from './ButtonComponent.module.css'

const ButtonComponent = ({ children, link, onClick }) => {
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

export default ButtonComponent
