import React, { useState } from 'react';

function CreateSilver() {

    const [drawer, setDrawer] = useState(false);
    const toggle = () => {
        setDrawer(!drawer)
        // console.log('Khong togg đc')
    }

    return <>
        {/* <FormSilver schema={toggle} /> */}
        {/* <PreTable toggle={toggle} /> */}
    </>
}

export default CreateSilver