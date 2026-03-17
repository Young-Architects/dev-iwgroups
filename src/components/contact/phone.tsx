import { PhoneProps } from '@/types/wordpress'
import React from 'react'
import { FiMail, FiPhone } from "react-icons/fi"

function Phone({ result }:PhoneProps) {

  return (
    <>
  
     

 
      <div className="number_wrapper">
        {result?.phone_numbers?.map((e, i:number) => {
          return (
            <div className="c_n_card" key={i}>
              <h4>{e?.service_number_name}</h4>

              <div className="c_n_w">
                <div className="phone_item">
                  <FiPhone className="icon" />
                  <a href={`tel:+${e?.first_number}`}>
                    {e?.first_number}
                  </a>
                </div>

                <div className="phone_item">
                  <FiPhone className="icon" />
                  <a href={`tel:+${e?.second_number}`}>
                    {e?.second_number}
                  </a>
                </div>
              </div>

            </div>
          )
        })}
      </div>
    </>
  )
}

export default Phone