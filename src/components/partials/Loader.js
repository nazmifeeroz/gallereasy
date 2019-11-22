import React from 'react'

const Loader = ({size}) => (
  <div className="center-align">
    <div className={`preloader-wrapper ${size} active`}>
      <div className="spinner-layer spinner-blue-only">
        <div className="circle-clipper left">
          <div className="circle" />
        </div>
        <div className="gap-patch">
          <div className="circle" />
        </div>
        <div className="circle-clipper right">
          <div className="circle" />
        </div>
      </div>
    </div>
  </div>
)

export default Loader
