// libs
import { SignUp } from "@clerk/nextjs";

// constants
import { NavigatorPath } from "@/constants";

const SignUpPage = () => {
    return <SignUp path={NavigatorPath.SIGN_UP} />;
};

export default SignUpPage;
