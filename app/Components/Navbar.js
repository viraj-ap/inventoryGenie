import React from 'react';

const Navbar = () => {
    return (
        <>

            {/* <nav className="z-[999] flex justify-center items-center fixed top-0 left-0 right-0">
                <div className="z-20 h-[65px] w-auto max-w-[800px] min-w-[50vw] backdrop-filter backdrop-blur-md bg-[rgba(255, 255, 255, 0.2)] border-2 border-solid shadow-2xl  backdrop-blur-md border-white border-opacity-10 rounded-xl flex justify-between items-center mt-7 ">
                    <div className="image">
                        <img className='h-32 m-5 cursor-pointer' src="src\assets\logo_withoutbg.png" alt="" />
                    </div>
                    <div className="data">
                        <ul className='flex gap-3 m-5 text-sm font-semibold whitespace-nowrap text-neutral-400'>
                            <li className='cursor-pointer'>Home</li>
                            <li className='cursor-pointer'>Our Team</li>
                            <li className='cursor-pointer'>Events</li>
                            <li className='cursor-pointer'>Contact us</li>
                        </ul>
                    </div>
                </div>
            </nav> */}

            <nav className='w-full bg-green-500 text-black font-bold text-xl flex items-center justify-around p-5 mb-10'>
                {/* Left side */}
                <div>
                    <img src="" alt="logo" />
                </div>
                {/* Right side */}
                <div>
                    <h1 className=''>
                        Manage your Inventory Efficently
                    </h1>
                </div>
            </nav>

        </>
    );
};

export default Navbar;