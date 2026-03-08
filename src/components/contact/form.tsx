import React from 'react'

function Form() {
  return (
     <>
        <h2>send us an query</h2>
     <div className="form_outer">
        <div className="form_group">
            <label htmlFor="name">Name</label>
            <input type="text" name="" id="" />
        </div>
         <div className="form_group">
            <label htmlFor="name">email</label>
            <input type="email" name="" id="" />
        </div>
        <div className="form_group">
            <label htmlFor="name">Phone Number</label>
            <input type="text" name="" id="" />
        </div>
        <div className="form_group">
            <label htmlFor="name">Address</label>
            <input type="text" name="" id="" />
        </div>
          <div className="form_group">
            <label htmlFor="name">Mesage</label>
            <input type="text" name="" id="" />
        </div>
        <div className="button_group">
             <button>send query</button>
        </div>
     </div>
     </>
  )
}

export default Form