// libs
import { SignIn } from "@clerk/nextjs";

// constants
import { NavigatorPath } from "@/constants";

// components

const SignInPage = () => {
    return <SignIn path={NavigatorPath.SIGN_IN} />;
};

export default SignInPage;
