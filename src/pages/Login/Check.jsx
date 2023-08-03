import React from 'react';

const Check = () => {
    const handleImageChange = (e) => {
        console.log(e.target.files[0].name)
    }

    return (
        <div>
            <img src="" alt="" />
            <input onChange={handleImageChange} type="file" name="" id="" />
        </div>
    );
};

export default Check;