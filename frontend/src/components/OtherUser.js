import React from 'react'

const OtherUser = () => {
    return (
        <div>
            <div className='flex items-center gap-2 cursor-pointer hover:bg-zinc-300 rounded-md'>
                <div className='w-14 rounded-full'>
                    <div className='avatar online '>
                        <img src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png" alt="user image" />
                    </div>
                </div>
                <div className=''>
                    <div className='text-lg '>
                        <p>Ronak Panwar</p>
                    </div>
                </div>
                <div className='divider py-0 my-0 h-1'></div>
            </div>
            <OtherUser/>
        </div>

    )
}

export default OtherUser
