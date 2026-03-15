"use client"

import { saveContactForm } from '@/lib/wordpress'
import { ErrorType, UserType } from '@/types/wordpress'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { Oval } from 'react-loader-spinner'

function Form() {

    const [user, setUser] = useState<UserType>({
        yourname: '',
        youremail: '',
        phone: '',
        address: '',
        yourmessage: '',
    })

    const [errors, setErrors] = useState<ErrorType>({
        yourname: false,
        youremail: false,
        address: false,
        phone: false,
    })

    const [loading, setLoading] = useState(false)


    const getUserData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const { name, value } = e.target

        if (name === 'phone' && value.length > 10) {
            return
        }

        setUser(prev => ({
            ...prev,
            [name]: value,
        }))

        setErrors(prev => ({
            ...prev,
            [name]: false,
        }))
    }


    const submitUserData = async () => {

        let formData = new FormData()

        formData.append('_wpcf7_unit_tag', '153')
        formData.append('yourname', user.yourname)
        formData.append('youremail', user.youremail)
        formData.append('phone', user.phone)
        formData.append('address', user.address)
        formData.append('yourmessage', user.yourmessage)

        let formValid = true
        const requiredFields = Object.keys(errors) as (keyof ErrorType)[]

        requiredFields.forEach(field => {

            if (!user[field]) {

                formValid = false

                setErrors(prev => ({
                    ...prev,
                    [field]: true,
                }))
            }
        })

        if (!formValid) return

        try {

            setLoading(true)

            let response = await saveContactForm({
                method: 'POST',
                body: formData
            })

            if (response?.status === 'mail_sent') {
                toast.success(`Dear ${user.yourname}, your message has been sent!`)
            }

            setUser({
                yourname: '',
                youremail: '',
                phone: '',
                address: '',
                yourmessage: '',
            })

        } catch (error) {

            toast.error('Mail not send')

        } finally {

            setLoading(false)

        }
    }


    return (
        <>

            <h2>send us an query</h2>

            <div className="form_outer">

                <div className="form_group">
                    <label>Name</label>

                    <input
                        type="text"
                        name="yourname"
                        value={user.yourname}
                        onChange={getUserData}
                    />

                    {errors.yourname && (
                        <span className='error_fields'>Name is required</span>
                    )}

                </div>


                <div className="form_group">
                    <label>Email</label>

                    <input
                        type="email"
                        name="youremail"
                        value={user.youremail}
                        onChange={getUserData}
                    />

                    {errors.youremail && (
                        <span className='error_fields'>Email is required</span>
                    )}

                </div>


                <div className="form_group">
                    <label>Phone Number</label>

                    <input
                        type="text"
                        name="phone"
                        value={user.phone}
                        onChange={getUserData}
                    />

                    {errors.phone && (
                        <span className='error_fields'>Phone Number is required</span>
                    )}

                </div>


                <div className="form_group">
                    <label>Address</label>

                    <input
                        type="text"
                        name="address"
                        value={user.address}
                        onChange={getUserData}
                    />

                    {errors.address && (
                        <span className='error_fields'>Address is required</span>
                    )}

                </div>


                <div className="form_group">
                    <label>Message</label>

                    <textarea
                        name="yourmessage"
                        value={user.yourmessage}
                        onChange={getUserData}
                    />
                </div>


                <div className="button_group">

                    <button
                        onClick={submitUserData}
                        disabled={loading}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
                    >

                        {loading ? (
                            <>
                                <Oval
                                    height={18}
                                    width={18}
                                    color="#fff"
                                    visible={true}
                                    ariaLabel="oval-loading"
                                    secondaryColor="#fff"
                                    strokeWidth={5}
                                />
                                Sending...
                            </>
                        ) : (
                            "send your query"
                        )}

                    </button>

                </div>

            </div>

        </>
    )
}

export default Form