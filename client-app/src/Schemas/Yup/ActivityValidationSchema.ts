import * as Yup from "yup";
import { ActivityValidationConstants } from "../../Constants/Validations/ActivityValidationConstants";

const {
    TitleRequired,
    DescriptionRequired,
    DateRequired,
    CategoryRequired,
    CityRequired,
    VenueRequired
} = ActivityValidationConstants.requiredMessages;

const {
    DateTypeError
} = ActivityValidationConstants.typeErrorMessages

export default Yup.object({
    title: Yup.string().required(TitleRequired),
    description: Yup.string().required(DescriptionRequired),
    category: Yup.string().required(CategoryRequired),
    date: Yup.date().required(DateRequired).typeError(DateTypeError),
    city: Yup.string().required(CityRequired),
    venue: Yup.string().required(VenueRequired)
})