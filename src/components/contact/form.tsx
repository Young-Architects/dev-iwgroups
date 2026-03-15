import { saveContactForm } from '@/lib/wordpress';
import { ErrorType, UserType } from '@/types/wordpress';
import React, { useState } from 'react'
import { toast } from 'sonner';

function Form() {
    const [user, setUser] = useState<UserType>({
        yourname: '',
        youremail: '',
        phone: '',
        address: '',
        yourmessage: '',
    });

    const [errors, setErrors] = useState<ErrorType>({
        yourname: false,
        youremail: false,
        address: false,
        phone: false,
    });

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

        let formData = new FormData();

        formData.append('_wpcf7_unit_tag', '153');
        formData.append('yourname', user.yourname);
        formData.append('youremail', user.youremail);
        formData.append('phone', user.phone);
        formData.append('address', user.address);
        formData.append('yourmessage', user.yourmessage);


        let formValid = true;
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

        if (formValid) {
            try {
                let response = await saveContactForm({
                    method: 'POST',
                    body: formData
                });

                if (response?.status == 'mail_sent') {
                    toast.success(`Dear ${user.yourname}, your message has been sent!</div>`);
                }

                setUser({
                    yourname: '',
                    youremail: '',
                    phone: '',
                    address: '',
                    yourmessage: '',
                });
            } catch (error) {
                toast.error('Mail not send')
            }
        }
    };
    return (
        <>
            <h2>send us an query</h2>
            <div className="form_outer">
                <div className="form_group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="yourname" id="" value={user?.yourname} onChange={getUserData} />
                    <span>
                        {errors.yourname && <span className='error_fields'>Name is required</span>}
                    </span>
                </div>






                <div className="form_group">
                    <label htmlFor="name">email</label>
                    <input type="email" name="youremail" id="" value={user?.youremail} onChange={getUserData} />
                    <span>
                        {errors.youremail && <span className='error_fields'>Email is required</span>}
                    </span>
                </div>
                <div className="form_group">
                    <label htmlFor="name">Phone Number</label>
                    <input type="text" name="phone" id="" value={user?.phone} onChange={getUserData} />
                    {errors.phone && <span className='error_fields'>Phone NUmber is required</span>}
                </div>
                <div className="form_group">
                    <label htmlFor="name">Address</label>
                    <input type="text" name="address" id="" value={user?.address} onChange={getUserData} />
                    {errors.address && <span className='error_fields'>Address is required</span>}
                </div>
                <div className="form_group">
                    <label htmlFor="name">Mesage</label>
                    <textarea name="yourmessage" id="" value={user?.yourmessage} onChange={getUserData} />
                </div>
                <div className="button_group">
                    <button onClick={submitUserData}>send query</button>
                </div>
            </div>
        </>
    )
}

export default Form