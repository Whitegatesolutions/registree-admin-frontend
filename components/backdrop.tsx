import React, {FC} from 'react';

type Props={
    close : React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>,
}

export const CustomDivBackDrop:FC<Props> = ({close}) => {
    return(
        <div id="backDropLoader" onClick={close}/>
    )
}