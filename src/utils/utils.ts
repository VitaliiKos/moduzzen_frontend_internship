import {Dispatch, SetStateAction} from "react";

import {ILoginUser, IUser} from "../interfaces";

type SetDataAction = Dispatch<SetStateAction<IUser | ILoginUser>>;
const handleChange = (event: React.ChangeEvent<HTMLInputElement>, setData: SetDataAction) => {
    const {name, value} = event.target;
    setData((prevData) => ({
        ...prevData,
        [name]: value
    }));
};

export {handleChange}