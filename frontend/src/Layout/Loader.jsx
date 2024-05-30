import React, { Fragment, useEffect, useState } from 'react'
import logo from '../Assets/Images/logo.png';
const Loader = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [show]);
  return (
    <Fragment>
        <div className="flash_screen">
          <img src={logo} />
        </div>
    </Fragment>
  )
}

export default Loader