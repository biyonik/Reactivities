import * as Yup from "yup";

export default Yup.object({
    userName: Yup.string().required(),
    displayName: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required()
})